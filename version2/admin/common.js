// Shared admin helpers: login, session, data load, small utilities.
(function(){
  var KEY="rgAdminPw";
  var RG=window.RG={pw:"",leads:[],STATUSES:["New","Called","Not answered","Follow-up","Interested","Converted","Not interested"]};
  var $=RG.$=function(i){return document.getElementById(i)};
  RG.esc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
  RG.fmt=function(t){var d=new Date(t);return isNaN(d)?"":d.toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"})};
  RG.dayKey=function(d){return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2)};

  var tip=document.createElement("div");tip.id="tip";document.body.appendChild(tip);
  RG.showTip=function(e,txt){tip.textContent=txt;tip.style.opacity=1;var x=Math.min(e.clientX+12,innerWidth-tip.offsetWidth-8);tip.style.left=Math.max(8,x)+"px";tip.style.top=Math.max(8,e.clientY-34)+"px"};
  RG.hideTip=function(){tip.style.opacity=0};

  RG.load=function(p){
    return fetch("../api/leads.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:p})})
      .then(function(r){return r.json().then(function(j){if(!r.ok)throw new Error(j.error||"Error");return j.leads})});
  };

  // render() is called once logged in and again after every refresh.
  RG.start=function(render){
    function show(list){document.documentElement.className="";RG.leads=list;$("login").style.display="none";$("app").style.display="block";render()}
    RG.refresh=function(){return RG.load(RG.pw).then(show)};
    $("lf").addEventListener("submit",function(e){
      e.preventDefault();$("err").textContent="";var p=$("pw").value;
      RG.load(p).then(function(l){RG.pw=p;try{sessionStorage.setItem(KEY,p)}catch(x){}show(l)}).catch(function(x){$("err").textContent=x.message});
    });
    $("out").addEventListener("click",function(){try{sessionStorage.removeItem(KEY)}catch(x){}location.reload()});
    if($("ref"))$("ref").addEventListener("click",function(){RG.refresh().catch(function(x){alert(x.message)})});
    var saved="";try{saved=sessionStorage.getItem(KEY)||""}catch(x){}
    if(saved)RG.load(saved).then(function(l){RG.pw=saved;show(l)}).catch(function(){document.documentElement.className="";try{sessionStorage.removeItem(KEY)}catch(x){}});
  };
})();
