'use strict';
function urlFormulario(value) {
 try {
  const u=new URL(value);
  if(u.protocol!=='https:'||u.username||u.password||u.port) return null;
  if(u.hostname==='forms.gle'&&u.pathname.length>1) return u.href;
  if(u.hostname==='docs.google.com'&&/^\/forms\/(?:u\/\d+\/)?d\/(?:e\/)?[^/]+\/viewform$/.test(u.pathname)) return u.href;
  if(['forms.office.com','forms.microsoft.com'].includes(u.hostname)&&(/^\/r\/[A-Za-z0-9]+\/?$/.test(u.pathname)||/^\/(?:Pages\/)?ResponsePage\.aspx$/i.test(u.pathname))) return u.href;
 } catch {}
 return null;
}
if(typeof module!=='undefined')module.exports={urlFormulario};
if(typeof document!=='undefined'){
 for(const name of ['inscripcion','valoracion']){
  const raw=window.TALLERTEC_FORMULARIOS?.[name],url=urlFormulario(raw);
  const link=document.getElementById(name+'-link'),status=document.getElementById(name+'-estado');
  if(url){link.href=name==='valoracion'&&document.getElementById('formulario-valoracion')?'#formulario-valoracion':url;link.hidden=false;status.textContent=name==='valoracion'?'Formulario disponible más abajo; también puedes abrirlo en Google Forms.':'Formulario disponible. Se abre en el servicio externo.';}
  else if(raw){status.textContent='Formulario no disponible: el organizador debe revisar el enlace de respuesta.';}
 }
}
