/* version 2: loads the free demo times into the form. F._needSlot is on only when times loaded, so the form still
   works without them (the lead then gets the "choose your slot" link on WhatsApp). */
(function(){
  var F=document.getElementById("rgF"),S=document.getElementById("rgSl"),IN=S.querySelector('input[name="slot"]'),days=[],day=0;
  function esc(x){return String(x==null?"":x).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})}
  function put(h){S.innerHTML="";S.appendChild(IN);S.insertAdjacentHTML("beforeend",h)}
  function draw(){
    var h='<div class="slt-h">Pick your demo time <span>(IST, on Google Meet)</span></div><div class="slt-d">';
    days.forEach(function(d,i){var w=d.day.split(" ");h+='<button type="button" data-i="'+i+'" class="'+(i===day?"on":"")+'" aria-pressed="'+(i===day)+'">'+esc(w[0])+'<strong>'+esc(w[1])+'</strong>'+esc(w[2]||"")+'</button>'});
    h+='</div><div class="slt-t">'+days[day].slots.map(function(s){var on=String(s.ts)===IN.value;return '<button type="button" data-t="'+s.ts+'" class="'+(on?"on":"")+'" aria-pressed="'+on+'">'+esc(s.label)+'</button>'}).join("")+'</div>';
    put(h);
  }
  function load(){
    IN.value="";F._needSlot=false;
    function none(){put('<p class="slt-n">Send the form and we will send you a link on WhatsApp to pick your demo time.</p>')}
    /* never stuck on loading: after 12s show the WhatsApp fallback (times that arrive later still show) */
    var slow=setTimeout(none,12000);
    fetch("api/slots.php").then(function(r){if(!r.ok)throw 0;return r.json()}).then(function(j){
      clearTimeout(slow);days=j.days||[];day=0;
      if(!days.length)return put('<p class="slt-n">No demo times are open right now. Send the form and we will fix a time with you on WhatsApp.</p>');
      F._needSlot=true;draw();
    }).catch(function(){clearTimeout(slow);none()});
  }
  S.addEventListener("click",function(e){
    var b=e.target.closest("button");if(!b)return;
    if(b.hasAttribute("data-i")){day=+b.getAttribute("data-i");IN.value="";draw();return}
    IN.value=b.getAttribute("data-t");S.classList.remove("bad");document.getElementById("rgMsg").textContent="";draw();
  });
  window.rgSlotsReload=load;
  /* booked: the time and the Meet link right in the form */
  window.rgBooked=function(j){
    F.querySelector(".done").innerHTML='<b>Your demo is booked</b><span class="when">'+esc(j.label)+'</span><p>We have sent the meeting link on WhatsApp too.</p>'+
      (j.link?'<a class="join" href="'+esc(j.link)+'" target="_blank" rel="noopener">Open Google Meet link</a>':'')+'<small>Please join a minute early. Need a different time? Just reply on WhatsApp.</small>';
  };
  load();
})();
