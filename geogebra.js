'use strict';
function construirTriangulo(api) {
 const commands=['b=6','h=4','A=(0,0)','B=(b,0)','g: y=h','C=Point(g)','t=Polygon(A,B,C)','D=(x(C),0)','altura=Segment(C,D)','area=Area(t)'];
 for(const command of commands){
  if(api.evalCommand(command)===false){
   console.error('GeoGebra rechazó:',command);
   throw Error('No se pudo completar la construcción ('+command.split('=')[0]+').');
  }
 }
 // round es una función de GeoGebra en minúscula, no un comando Round.
 // Una etiqueta opcional no debe impedir usar el triángulo.
 try {return api.evalCommand('Text("Área = " + round(area,2) + " cm²", (0,-1))')!==false;}
 catch {return false;}
}
if(typeof module!=='undefined')module.exports={construirTriangulo};
if(typeof document!=='undefined') (() => {
 const button=document.getElementById('cargar-geogebra'),status=document.getElementById('geo-estado');
 let api=null,scriptPromise=null,attempt=0;
 function sync(){if(!api)return;const b=Number(document.getElementById('b').value),h=Number(document.getElementById('h').value),x=Number(document.getElementById('x').value);api.setValue('b',b);api.setValue('h',h);api.setCoords('C',x,h);}
 ['b','h','x'].forEach(id=>document.getElementById(id).addEventListener('input',sync));
 function loadScript(){
  if(window.GGBApplet)return Promise.resolve();
  if(scriptPromise)return scriptPromise;
  scriptPromise=new Promise((resolve,reject)=>{
   const script=document.createElement('script');script.src='https://www.geogebra.org/apps/deployggb.js';script.async=true;
   const timeout=setTimeout(()=>{script.remove();reject(Error('La conexión tardó demasiado.'));},30000);
   script.onload=()=>{clearTimeout(timeout);window.GGBApplet?resolve():reject(Error('GeoGebra no está disponible.'));};
   script.onerror=()=>{clearTimeout(timeout);script.remove();reject(Error('No se pudo conectar con GeoGebra.'));};document.head.appendChild(script);
  }).catch(e=>{scriptPromise=null;throw e;});return scriptPromise;
 }
 button.addEventListener('click',async()=>{
  button.disabled=true;status.textContent='Cargando GeoGebra…';const token=++attempt;let timer;
  const fail=message=>{if(token!==attempt)return;attempt++;clearTimeout(timer);api=null;document.getElementById('geo-applet').replaceChildren();button.disabled=false;button.textContent='Reintentar GeoGebra';status.textContent=message+' Puedes continuar con la exploración sin conexión.';};
  try{
   await loadScript();timer=setTimeout(()=>fail('GeoGebra no terminó de iniciar.'),45000);
   const applet=new window.GGBApplet({id:'tallerGeo',appName:'classic',width:900,height:480,language:'es',showToolBar:false,showAlgebraInput:false,showMenuBar:false,showResetIcon:false,enableShiftDragZoom:true,scaleContainerClass:'geo-stage',allowUpscale:false,
    appletOnLoad:ggb=>{
     if(token!==attempt)return;
     try{
      api=ggb;
      const etiquetaDisponible=construirTriangulo(api);
      api.setFixed('A',true,false);api.setFixed('B',true,false);api.setFixed('D',true,false);api.setColor('t',17,108,99);api.setColor('altura',171,73,43);api.setLineStyle('altura',1);api.setCoordSystem(-2,14,-2,12);sync();clearTimeout(timer);status.textContent='GeoGebra listo. Arrastra C sobre la línea horizontal; cambia base y altura con los controles anteriores.'+(etiquetaDisponible?'':' El área puede calcularse con base × altura ÷ 2.');button.hidden=true;
     }catch(e){fail(e.message);}
    }
   },true);applet.inject('geo-applet');
  }catch(e){fail(e.message);}
 });
})();
