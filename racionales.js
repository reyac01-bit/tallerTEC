'use strict';
function leerRespuesta(texto) {
 const s=texto.trim().replace(',', '.');
 if (!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:\s*\/\s*[+-]?\d+)?$/.test(s)) return null;
 const [n,d='1']=s.split('/').map(Number); const v=n/d;
 return d!==0 && Number.isFinite(v)?v:null;
}
if (typeof module!=='undefined') module.exports={leerRespuesta};
if (typeof document!=='undefined') {
 const $=id=>document.getElementById(id), fields=[...document.querySelectorAll('[data-save]')];
 const key='tallertec.racionales.v2';let hints=0;
 const defaults={a:'-1',b:'2',c:'3',d:'4'};
 try { const saved=JSON.parse(localStorage.getItem(key)||'{}');fields.forEach(el=>{if(typeof saved[el.id]==='string')el.value=saved[el.id];});$('guardado').textContent='Tu trabajo se guarda automáticamente en este navegador.'; }
 catch { $('guardado').textContent='El guardado local no está disponible. Imprime tu ficha para conservarla.'; }
 function save(){try{localStorage.setItem(key,JSON.stringify(Object.fromEntries(fields.map(el=>[el.id,el.value]))));$('guardado').textContent='Trabajo guardado en este navegador.';}catch{$('guardado').textContent='No se pudo guardar. Imprime tu ficha para conservarla.';}}
 function values(){return ['a','b','c','d'].map(id=>{if(!$(id).value.trim())throw Error('Completa las cuatro casillas del recorrido.');return Number($(id).value);});}
 function calculation(){const [a,b,c,d]=values();if(a < -12||a>12||c < -12||c>12||b>12||d>12)throw Error('Respeta los límites indicados para las fracciones.');return sumarFracciones(a,b,c,d);}
 function draw(){
 hints=0;$('feedback').textContent='';$('pista-texto').textContent='';
 try{
 const s=calculation(),[a,b,c,d]=values(),start=a/b;
 const limit=Math.max(1,Math.ceil(Math.max(Math.abs(start),Math.abs(s.valor))));
 const pos=v=>360+v*300/limit;
 const line=(x1,y1,x2,y2,color,extra='')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3" ${extra}/>`;
 let svg='<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#ab492b"/></marker></defs>';
 svg+=line(45,220,675,220,'#42666b');
 // Cuartos en recorridos cortos; marcas enteras en recorridos extensos.
 const step=limit<=2?.25:Math.ceil(limit/4);
 for(let v=-Math.floor(limit/step)*step;v<=limit+.0001;v+=step){const x=pos(v);svg+=line(x,214,x,226,'#42666b')+`<text x="${x}" y="250" text-anchor="middle" font-size="16" fill="#23474c">${Number(v.toFixed(2))}</text>`;}
 svg+=line(pos(start),105,pos(start),218,'#116c63','stroke-dasharray="5 5"')+line(pos(s.valor),160,pos(s.valor),218,'#ab492b','stroke-dasharray="5 5"');
 svg+=line(pos(start),145,pos(s.valor),145,'#ab492b',c===0?'':'marker-end="url(#arrow)"');
 svg+=`<circle cx="${pos(start)}" cy="105" r="8" fill="#116c63"/><path d="M${pos(s.valor)} 151l9 9-9 9-9-9Z" fill="#ab492b"/>`;
 svg+=`<text x="${pos(start)}" y="80" text-anchor="middle" font-size="18" fill="#116c63">Inicio ${a}/${b}</text><text x="${pos(s.valor)}" y="195" text-anchor="middle" font-size="18" fill="#8d3c24">Final ${s.n}/${s.d}</text><text x="360" y="285" text-anchor="middle" font-size="16">Posición respecto al encuentro (km)</text>`;
 const message=`${a}/${b} + ${c}/${d} = ${s.n}/${s.d} km. ${c===0?'Sin desplazamiento.':c>0?'Avance hacia la derecha.':'Avance hacia la izquierda.'}`;
 $('grafica').innerHTML=svg;$('grafica').setAttribute('aria-label',message);$('resultado').textContent=message;
 }catch(e){$('grafica').innerHTML='';$('resultado').textContent=e.message;}
 }
 fields.forEach(el=>el.addEventListener('input',()=>{if(el.id in defaults)draw();else if(el.id==='respuesta')$('feedback').textContent='';save();}));
 $('respuesta-form').addEventListener('submit',e=>{e.preventDefault();try{const s=calculation(),answer=leerRespuesta($('respuesta').value);$('feedback').textContent=answer===null?'Escribe una fracción válida o un decimal; el denominador debe ser distinto de cero.':Math.abs(answer-s.valor)<1e-9?'¡Correcto! Ahora explica por qué el recorrido y el cálculo coinciden.':'Aún no coincide. Revisa el signo del desplazamiento y busca un denominador común. Puedes volver a intentarlo.';}catch(e){$('feedback').textContent=e.message;}});
 $('pista').addEventListener('click',()=>{try{const [a,b,c,d]=values();calculation();const tips=['Ubica el punto inicial. Un desplazamiento positivo va a la derecha y uno negativo, a la izquierda.',`Usa ${b*d} como denominador común: multiplica cada numerador por el denominador de la otra fracción.`,`Los numeradores equivalentes son ${a*d} y ${c*b}. Súmalos y conserva el denominador ${b*d}; después simplifica.`];$('pista-texto').textContent=tips[Math.min(hints++,2)];}catch(e){$('pista-texto').textContent=e.message;}});
 $('restablecer').addEventListener('click',()=>{Object.entries(defaults).forEach(([id,v])=>$(id).value=v);draw();save();});
 $('borrar').addEventListener('click',()=>{if(!window.confirm('¿Borrar tus respuestas y restablecer el recorrido?'))return;fields.forEach(el=>el.value=defaults[el.id]||'');try{localStorage.removeItem(key);}catch{}draw();$('guardado').textContent='Trabajo borrado. Puedes comenzar de nuevo.';});
 $('imprimir').addEventListener('click',()=>window.print());draw();
}
