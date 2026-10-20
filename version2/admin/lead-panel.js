// Lead panel: open one lead and do everything on it (call, WhatsApp, status, follow-up, notes) with its full history.
// The lead stays open while you work, whatever its status becomes. Used by both leads pages (main and version 2).
// History is saved in its own table (lead_activity); the lead rows only ever get status and notes, as before.
(function(){
  var RG=window.RG,$=RG.$,esc=RG.esc;
  var IC='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z"/></svg>';
  RG.CALL_IC=IC;

  function post(f,b){
    b.password=RG.pw;
    return fetch("../api/"+f,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)})
      .then(function(r){return r.json().then(function(j){if(!r.ok)throw new Error(j.error||"Error");return j})});
  }
  function add(l,j){l.log=(l.log||[]).concat(j.log||[])}
  // Saves run one after another, so a note saved on blur and a status tapped right after never overwrite each other.
  var Q=Promise.resolve();
  function queue(fn){var p=Q.then(fn);Q=p.catch(function(){});return p}
  RG.saveLead=function(l,st,nt){
    return queue(function(){
      var s=st==null?l.status:st,n=nt==null?l.notes:nt;
      if(s===l.status&&n===l.notes)return {};
      return post("lead_update.php",{id:l.id,status:s,notes:n}).then(function(j){l.status=s;l.notes=n;add(l,j);return j});
    });
  };
  RG.logLead=function(l,kind,detail){
    return queue(function(){return post("lead_log.php",{id:l.id,kind:kind,detail:detail||""}).then(function(j){add(l,j);return j})});
  };
  // Call tapped: note the time, and New / Not answered / Follow-up become Called.
  RG.markCalled=function(l){
    var p=RG.logLead(l,"call");
    if(["New","Not answered","Follow-up"].indexOf(l.status)>-1)p=p.then(function(){return RG.saveLead(l,"Called")});
    return p;
  };

  /* ---------- reading the history ---------- */
  RG.calls=function(l){return (l.log||[]).filter(function(x){return x.kind==="call"})};
  RG.followUp=function(l){
    var a=(l.log||[]).filter(function(x){return x.kind==="followup"}),f=a[a.length-1];
    return f&&f.detail?new Date(f.detail):null;
  };
  // Meeting link pasted on the lead (Google Meet, Zoom...), or "".
  RG.meetLink=function(l){
    var a=(l.log||[]).filter(function(x){return x.kind==="meet"}),m=a[a.length-1];
    return m?m.detail:"";
  };
  // Overdue / Today / Upcoming / Not set. A Converted or Not interested lead has nothing to follow up.
  RG.followState=function(l){
    var d=RG.followUp(l),now=new Date();
    if(!d||l.status==="Converted"||l.status==="Not interested")return "Not set";
    if(d<now)return "Overdue";
    return RG.dayKey(d)===RG.dayKey(now)?"Today":"Upcoming";
  };
  RG.callState=function(l){
    var c=RG.calls(l),last=c[c.length-1];
    if(!last)return l.status==="New"?"Not called yet":"Called (time not recorded)";
    return RG.dayKey(new Date(last.time))===RG.dayKey(new Date())?"Called today":"Called earlier";
  };
  RG.rel=function(t){
    var d=new Date(t),s=(Date.now()-d)/1e3,f=s<0,a=Math.abs(s),v;
    if(isNaN(s))return "";
    if(a<60)return "just now";
    v=a<3600?Math.floor(a/60)+" min":a<86400?Math.floor(a/3600)+" h":Math.floor(a/86400)===1?"1 day":Math.floor(a/86400)+" days";
    return f?"in "+v:v+" ago";
  };
  // CSV / search fields
  RG.derive=function(l){
    var c=RG.calls(l),fu=RG.followUp(l);
    l.last_call=c.length?RG.fmt(c[c.length-1].time):"";l.calls=c.length;l.follow_up=fu?RG.fmt(fu):"";l.meeting_link=RG.meetLink(l);
  };
  // One line on the card: when it was last called and the next follow-up.
  RG.actLine=function(l){
    var c=RG.calls(l),last=c[c.length-1],fs=RG.followState(l);
    var a=last?'<span>Last call <b>'+esc(RG.fmt(last.time))+'</b> ('+esc(RG.rel(last.time))+')'+(c.length>1?' · '+c.length+' calls':'')+'</span>'
      :'<span class="no">'+(l.status==="New"?"Not called yet":"Call time not recorded")+'</span>';
    if(fs!=="Not set")a+='<span class="fu '+fs.toLowerCase()+'">Follow-up <b>'+esc(RG.fmt(RG.followUp(l)))+'</b>'+(fs==="Overdue"?" · overdue":fs==="Today"?" · today":"")+'</span>';
    var mt=RG.meetLink(l);
    if(mt)a+='<a class="mtg" href="'+esc(mt)+'" target="_blank" rel="noopener">Meeting link</a>';
    return '<div class="act">'+a+'</div>';
  };

  /* ---------- the panel ---------- */
  var P={l:null,ids:[],o:null,hot:false},box;
  function loc(d){if(!d)return "";var p=function(n){return ("0"+n).slice(-2)};return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate())+"T"+p(d.getHours())+":"+p(d.getMinutes())}
  function hist(l){
    var a=(l.log||[]).slice().reverse().map(function(x){
      var t=x.kind==="call"?"Called":x.kind==="whatsapp"?"WhatsApp opened":x.kind==="status"?"Status: "+x.detail:x.kind==="note"?"Note saved"
        :x.kind==="followup"?(x.detail?"Follow-up set for "+RG.fmt(x.detail):"Follow-up cleared")
        :x.kind==="meet"?(x.detail?"Meeting link added":"Meeting link removed"):x.kind;
      return '<li class="k-'+esc(x.kind)+'"><b>'+esc(t)+'</b>'+((x.kind==="note"||x.kind==="meet")&&x.detail?'<small>'+esc(x.detail)+'</small>':"")+'<span>'+esc(RG.fmt(x.time))+' · '+esc(RG.rel(x.time))+'</span></li>';
    });
    a.push('<li class="k-in"><b>Lead came in</b><span>'+esc(RG.fmt(l.time))+' · '+esc(RG.rel(l.time))+'</span></li>');
    return '<ol class="lp-h">'+a.join("")+'</ol>';
  }
  // Meeting link: paste it once, then Join or send it to the lead on WhatsApp from here.
  function meetBox(l){
    var m=RG.meetLink(l),wa="https://wa.me/91"+encodeURIComponent(l.phone)+"?text="+encodeURIComponent("Hi "+l.name+", here is the link for your RestroGrow meeting: "+m);
    return '<section class="lp-s"><h3>Meeting link</h3>'
      +(m?'<div class="lp-mt"><a class="btn" href="'+esc(m)+'" target="_blank" rel="noopener">Join meeting</a><a class="btn ghost" data-wa href="'+esc(wa)+'" target="_blank" rel="noopener">Send on WhatsApp</a></div><small class="lp-ml">'+esc(m)+'</small>':"")
      +'<div class="lp-fr"><input type="url" id="lpMt" placeholder="Paste Google Meet / Zoom link" value="'+esc(m)+'" aria-label="Meeting link"><button type="button" class="btn" data-ms>'+(m?"Update":"Save")+'</button>'+(m?'<button type="button" class="btn ghost" data-mc>Remove</button>':"")+'</div></section>';
  }
  function draw(){
    var l=P.l,i=P.ids.indexOf(l.id),n=P.ids.length,fu=RG.followUp(l),t=$("lpNt"),keep=t?t.value:null,foc=t&&document.activeElement===t;
    var kv=[["Business",l.business],["Outlets",l.outlets],["Orders / day",l.orders],["Turnover",l.turnover],["Budget",l.budget]].filter(function(x){return x[1]})
      .map(function(x){return '<div><dt>'+x[0]+'</dt><dd>'+esc(x[1])+'</dd></div>'}).join("");
    $("lpIn").innerHTML='<div class="lp-hd"><div class="av">'+esc((l.name||"?").trim().charAt(0).toUpperCase())+'</div><div class="hi"><div class="nm" id="lpN">'+esc(l.name)+(l.is_demo?' <span class="demo">DEMO</span>':"")+'</div>'
        +'<div class="mt">'+esc(l.brand)+' · '+esc(l.location)+'</div><div class="mt">Came in '+esc(RG.fmt(l.time))+' ('+esc(RG.rel(l.time))+')</div></div>'
        +'<button type="button" class="lp-x" data-x aria-label="Close">×</button></div>'
      +'<div class="lp-b">'
      +'<div class="acts"><a class="cl" data-call href="tel:+91'+encodeURIComponent(l.phone)+'">'+IC+'Call +91 '+esc(l.phone)+'</a><a class="wa" data-wa href="'+esc(P.o.wa(l))+'" target="_blank" rel="noopener">WhatsApp</a></div>'
      +(l.email?'<div class="mt"><a href="mailto:'+esc(l.email)+'">'+esc(l.email)+'</a></div>':"")
      +RG.actLine(l)
      +'<section class="lp-s'+(P.hot?" hot":"")+'"><h3>'+(P.hot?"How did the call go?":"Status")+'</h3><div class="lp-st">'
        +RG.STATUSES.map(function(s){return '<button type="button" data-st="'+esc(s)+'" data-s="'+esc(s)+'"'+(s===l.status?' class="on" aria-pressed="true"':' aria-pressed="false"')+'>'+esc(s)+'</button>'}).join("")+'</div></section>'
      +'<section class="lp-s"><h3>Next follow-up</h3><div class="lp-fu">'+(fu?'<b>'+esc(RG.fmt(fu))+'</b> ('+esc(RG.rel(fu))+')':'Not set')+'</div>'
        +'<div class="lp-fq"><button type="button" data-fq="1h">In 1 hour</button><button type="button" data-fq="ev">Today 6 pm</button><button type="button" data-fq="tm">Tomorrow 11 am</button><button type="button" data-fq="2d">In 2 days</button></div>'
        +'<div class="lp-fr"><input type="datetime-local" id="lpFu" value="'+loc(fu)+'" aria-label="Follow-up date and time"><button type="button" class="btn" data-fs>Set</button>'+(fu?'<button type="button" class="btn ghost" data-fc>Clear</button>':"")+'</div></section>'
      +meetBox(l)
      +'<section class="lp-s"><h3>Notes <span id="lpSv"></span></h3><textarea id="lpNt" class="nt" maxlength="2000" placeholder="What did they say?">'+esc(l.notes)+'</textarea></section>'
      +'<section class="lp-s"><h3>Details</h3>'+(kv?'<dl class="kv">'+kv+'</dl>':"")+(P.o.extra?P.o.extra(l):"")+'</section>'
      +'<section class="lp-s"><h3>History</h3>'+hist(l)+'</section>'
      +'</div>'
      +'<div class="lp-nav"><button type="button" class="btn ghost" data-nv="-1"'+(i<1?" disabled":"")+'>‹ Previous</button><span>'+(i>-1?(i+1)+" of "+n:"")+'</span><button type="button" class="btn ghost" data-nv="1"'+(i<0||i>=n-1?" disabled":"")+'>Next ›</button></div>';
    t=$("lpNt");
    if(keep!==null&&keep!==l.notes){t.value=keep}
    if(foc){t.focus();t.setSelectionRange(t.value.length,t.value.length)}
  }
  function done(){P.o.changed(P.l);if(!box.hidden)draw()}
  function fail(x){alert("Not saved: "+x.message)}
  function saveNote(){
    var l=P.l,v=$("lpNt").value;if(v===l.notes)return;
    $("lpSv").textContent="Saving...";
    RG.saveLead(l,null,v).then(function(){if(P.l===l&&$("lpSv"))$("lpSv").textContent="Saved";P.o.changed(l)}).catch(function(x){if($("lpSv"))$("lpSv").textContent="";fail(x)});
  }
  function setFollow(d){
    if(d&&isNaN(d)){alert("Pick a date and time first.");return}
    RG.logLead(P.l,"followup",d?d.toISOString():"").then(done).catch(fail);
  }
  function click(e){
    var b=e.target.closest("[data-x],[data-call],[data-wa],[data-st],[data-fq],[data-fs],[data-fc],[data-ms],[data-mc],[data-nv]");if(!b)return;
    var l=P.l;
    if(b.hasAttribute("data-x"))return close();
    // no redraw inside the click, so the tel: link still opens the dialer
    if(b.hasAttribute("data-call")){P.hot=true;RG.markCalled(l).then(done).catch(fail);return}
    if(b.hasAttribute("data-wa")){RG.logLead(l,"whatsapp").then(done).catch(function(){});return}
    if(b.hasAttribute("data-st")){
      var s=b.getAttribute("data-st");P.hot=false;
      RG.saveLead(l,s,$("lpNt").value).then(done).catch(fail);
      if(s==="Follow-up"&&!RG.followUp(l))setTimeout(function(){var f=$("lpFu");if(f){f.scrollIntoView({block:"center",behavior:"smooth"});f.focus()}},50);
      return;
    }
    if(b.hasAttribute("data-fq")){
      var k=b.getAttribute("data-fq"),d=new Date();
      if(k==="1h")d=new Date(Date.now()+36e5);
      else if(k==="ev")d.setHours(18,0,0,0);
      else if(k==="tm"){d.setDate(d.getDate()+1);d.setHours(11,0,0,0)}
      else{d.setDate(d.getDate()+2);d.setHours(11,0,0,0)}
      return setFollow(d);
    }
    if(b.hasAttribute("data-fs")){var v=$("lpFu").value;return setFollow(v?new Date(v):NaN)}
    if(b.hasAttribute("data-fc"))return setFollow(null);
    if(b.hasAttribute("data-ms")){
      var u=$("lpMt").value.trim();
      if(!/^https?:\/\/\S+$/i.test(u)){alert("Paste the full meeting link, starting with https://");return}
      if(u===RG.meetLink(l))return;
      return RG.logLead(l,"meet",u).then(done).catch(fail);
    }
    if(b.hasAttribute("data-mc"))return RG.logLead(l,"meet","").then(done).catch(fail);
    if(b.hasAttribute("data-nv")){
      saveNote();
      var id=P.ids[P.ids.indexOf(l.id)+(+b.getAttribute("data-nv"))];
      if(id!=null)show(id);
    }
  }
  function show(id){
    var l=P.o.get(id);if(!l)return;
    P.l=l;P.hot=false;box.hidden=false;document.documentElement.classList.add("lp-open");
    $("lpIn").innerHTML="";draw();$("lpIn").parentNode.scrollTop=0;
  }
  function close(){
    if(!P.l)return;
    saveNote();box.hidden=true;document.documentElement.classList.remove("lp-open");
    var c=document.querySelector('.lead[data-id="'+P.l.id+'"]');P.l=null;
    if(c)c.scrollIntoView({block:"nearest"});
  }
  // o: {get(id), list() -> ids in screen order, changed(lead), wa(lead) -> WhatsApp link, extra(lead) -> extra details html}
  RG.panel=function(o){
    P.o=o;
    box=document.createElement("div");box.id="lp";box.className="lp";box.hidden=true;
    box.innerHTML='<div class="lp-bg" data-x></div><aside class="lp-box" role="dialog" aria-modal="true" aria-labelledby="lpN"><div id="lpIn"></div></aside>';
    document.body.appendChild(box);
    box.addEventListener("click",click);
    box.addEventListener("focusout",function(e){if(e.target.id==="lpNt")saveNote()});
    document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!box.hidden)close()});
  };
  // hot: opened from a Call tap, so the panel asks how the call went.
  RG.openLead=function(id,hot){P.ids=P.o.list();show(id);if(hot){P.hot=true;draw()}};
  RG.panelRedraw=function(){if(P.l&&!box.hidden)draw()};
})();
