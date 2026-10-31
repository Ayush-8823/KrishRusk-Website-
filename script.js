var P=[
{n:"Butter Rusk",img:document.getElementById("hb").getAttribute("src"),b:"#F2D98D",d:"Rich, buttery flavour in every bite. Soft inside, crispy outside, and made with the goodness of wheat. Perfect with every cup of chai."},
{n:"Elaichi Rusk",img:document.getElementById("he").getAttribute("src"),b:"#BFDDBE",d:"Fragrant with cardamom. Soft inside, crispy outside, and a perfect start to your morning chai."},
{n:"Milk Rusk",img:document.getElementById("hm").getAttribute("src"),b:"#D7B494",d:"A light, milky sweetness in every bite. Soft inside, crispy outside, and enjoyed by kids and adults alike."}
];
var WA="https://wa.me/917080662223?text=";
var chips=document.getElementById("chips");
function pick(i){
 var p=P[i],im=document.getElementById("dimgp");
 document.getElementById("dn").textContent=p.n;
 document.getElementById("dd").textContent=p.d;
 im.src=p.img;im.alt=p.n+" pack";
 document.getElementById("dimg").style.background=p.b;
 [].forEach.call(chips.children,function(c,j){c.setAttribute("aria-selected",j===i)});
}
P.forEach(function(p,i){
 var b=document.createElement("button");
 b.className="chip";b.setAttribute("role","tab");
 b.innerHTML='<img src="'+p.img+'" alt="">'+p.n;
 b.onclick=function(){pick(i)};
 chips.appendChild(b);
});
pick(1);
var m=document.getElementById("menu"),l=document.getElementById("links");
m.onclick=function(){var o=l.classList.toggle("open");m.setAttribute("aria-expanded",o)};
[].forEach.call(l.querySelectorAll("a"),function(a){a.onclick=function(){l.classList.remove("open");m.setAttribute("aria-expanded","false")}});
var d=document.getElementById("dlg");
var R=document.documentElement,tt=document.getElementById("tt");
function isDark(){var t=R.getAttribute("data-theme");return t?t==="dark":matchMedia("(prefers-color-scheme: dark)").matches}
function sync(){var k=isDark();tt.textContent=k?"☀️":"🌙";tt.setAttribute("aria-label",k?"Switch to light theme":"Switch to dark theme")}
try{var s=localStorage.getItem("kr-theme");if(s)R.setAttribute("data-theme",s)}catch(e){}
sync();
tt.onclick=function(){var n=isDark()?"light":"dark";R.setAttribute("data-theme",n);try{localStorage.setItem("kr-theme",n)}catch(e){}sync()};
var mv=document.getElementById("mv");
document.getElementById("vbtn").onclick=function(){
 d.showModal();mv.currentTime=0;var p=mv.play();if(p&&p.catch)p.catch(function(){});
};
d.addEventListener("close",function(){mv.pause()});
document.getElementById("close").onclick=function(){d.close()};


/* Call: try the phone dialer; if the page is blocked from opening it, show the number instead */
var cd=document.getElementById("calldlg"),cp=document.getElementById("cpy"),cn=document.getElementById("cnum");
var TEL="tel:+917080662223",framed=false;
try{framed=window.top!==window}catch(err){framed=true}
if(framed){document.querySelector("a[data-nodlg]").style.display="none";document.getElementById("cnote").style.display="block"}
[].forEach.call(document.querySelectorAll('a[href^="tel:"]:not([data-nodlg])'),function(a){
 a.addEventListener("click",function(e){
  e.preventDefault();
  if(framed){cd.showModal();return}
  var left=false;function gone(){left=true}
  window.addEventListener("blur",gone,{once:true});
  document.addEventListener("visibilitychange",gone,{once:true});
  window.location.href=TEL;
  setTimeout(function(){if(!left&&!cd.open)cd.showModal()},900);
 });
});
[].forEach.call(document.querySelectorAll('a[data-nodlg]'),function(a){a.addEventListener("click",function(e){e.preventDefault();window.location.href=TEL})});
cp.onclick=function(){
 function done(){cp.textContent="Copied \u2713"}
 function sel(){cn.focus();cn.select();try{if(document.execCommand("copy"))done()}catch(e){}}
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText("+917080662223").then(done,sel)}else{sel()}
};
cn.onclick=function(){cn.select()};
document.getElementById("cclose").onclick=function(){cd.close();cp.textContent="Copy number"};

/* Order now box: rusk + cartons + customer details, then send on WhatsApp */
var od=document.getElementById("orddlg"),os=document.getElementById("osend"),oe=document.getElementById("oerr");
var rows=[].slice.call(od.querySelectorAll(".orow"));
var STATES=["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"];
var ss=document.getElementById("o-state");
STATES.forEach(function(s){var o=document.createElement("option");o.value=s;o.textContent=s;ss.appendChild(o)});
function fv(id){return document.getElementById(id).value.trim()}
function phoneDigits(){var d=fv("o-phone").replace(/\D/g,"");if(d.length===12&&d.indexOf("91")===0)d=d.slice(2);if(d.length===11&&d.charAt(0)==="0")d=d.slice(1);return d}
function mapQ(){return [fv("o-addr"),fv("o-city"),fv("o-dist"),fv("o-state"),fv("o-pin")].filter(Boolean).join(", ")}
function mapsSearch(){return "https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(mapQ())}
function mapsDir(){return "https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(mapQ())}
function message(){
 var items=[],m="Hello KrishRusk! I would like to place an order (cartons only).\n\n*Order*\n";
 rows.forEach(function(r){if(r.q>0)items.push("- "+r.getAttribute("data-name")+" x "+r.q+(r.q===1?" carton":" cartons"))});
 m+=items.join("\n")+"\n\n*Customer details*\nName: "+fv("o-name");
 if(fv("o-shop"))m+="\nShop name: "+fv("o-shop");
 m+="\nContact number: "+phoneDigits();
 if(fv("o-email"))m+="\nEmail: "+fv("o-email");
 m+="\n\n*Delivery address*\nAddress: "+fv("o-addr")+"\nCity: "+fv("o-city")+"\nCounty/District: "+fv("o-dist")+"\nState: "+fv("o-state")+"\nPincode: "+fv("o-pin")+"\nMap: "+mapsSearch()+"\n\nThank you.";
 return m;
}
function upd(){os.href=WA+encodeURIComponent(message());document.getElementById("odir").href=mapsDir();oe.style.display="none"}
function setQ(r,n){r.q=Math.max(0,Math.min(100,n));r.querySelector("output").textContent=r.q;upd()}
rows.forEach(function(r){
 r.q=0;
 r.querySelector("img").src=document.getElementById(r.getAttribute("data-src")).getAttribute("src");
 r.querySelector(".m").onclick=function(){setQ(r,r.q-1)};
 r.querySelector(".p").onclick=function(){setQ(r,r.q+1)};
});
function flag(id,bad){var el=document.getElementById(id);if(bad)el.setAttribute("aria-invalid","true");else el.removeAttribute("aria-invalid");return bad}
function validate(){
 var bad=[];
 if(!rows.some(function(r){return r.q>0}))bad.push("rusk (at least 1 carton)");
 if(flag("o-name",!fv("o-name")))bad.push("name");
 if(flag("o-phone",!/^[6-9]\d{9}$/.test(phoneDigits())))bad.push("a valid 10-digit contact number");
 if(flag("o-email",fv("o-email")&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fv("o-email"))))bad.push("a valid email");
 if(flag("o-addr",!fv("o-addr")))bad.push("full address");
 if(flag("o-city",!fv("o-city")))bad.push("city");
 if(flag("o-dist",!fv("o-dist")))bad.push("county / district");
 if(flag("o-state",!fv("o-state")))bad.push("state");
 if(flag("o-pin",!/^\d{6}$/.test(fv("o-pin"))))bad.push("a 6-digit pincode");
 return bad;
}
function showErr(t){oe.textContent=t;oe.style.display="block";oe.scrollIntoView({block:"nearest"})}
[].forEach.call(od.querySelectorAll("input,textarea,select"),function(el){
 el.addEventListener("input",function(){el.removeAttribute("aria-invalid");upd()});
 el.addEventListener("change",upd);
});
os.addEventListener("click",function(e){
 var bad=validate();
 if(bad.length){e.preventDefault();showErr("Please check: "+bad.join(", ")+".");return}
 os.href=WA+encodeURIComponent(message());
 setTimeout(function(){od.close()},500);
});
document.getElementById("oshow").onclick=function(){
 if(!fv("o-addr")&&!fv("o-city")&&!fv("o-pin")){showErr("Enter the address, city or pincode first.");return}
 var f=document.getElementById("omap");
 f.src="https://www.google.com/maps?q="+encodeURIComponent(mapQ())+"&output=embed";
 f.style.display="block";oe.style.display="none";
};
document.getElementById("odir").addEventListener("click",function(e){
 if(!mapQ()){e.preventDefault();showErr("Enter the address first, then tap Get directions.");return}
 this.href=mapsDir();
});
document.getElementById("ordopen").onclick=function(){upd();od.showModal()};
document.getElementById("oclose").onclick=function(){od.close()};
upd();
/* Product section "Order now": open the order box with the selected rusk (1 carton) */
document.getElementById("obtn").onclick=function(){
 var sel=[].indexOf.call(chips.children,chips.querySelector('[aria-selected="true"]'));
 if(sel>=0&&!rows.some(function(r){return r.q>0}))setQ(rows[sel],1);
 upd();od.showModal();
};
