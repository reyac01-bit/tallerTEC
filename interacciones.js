'use strict';
function resumirDatos(datos) {
 const orden = [...datos].sort((a,b)=>a-b), n=orden.length;
 if (!n || orden.some(x=>!Number.isFinite(x)||x<0)) throw Error('Introduce tiempos no negativos válidos.');
 return {media:orden.reduce((a,b)=>a+b,0)/n,mediana:n%2?orden[(n-1)/2]:(orden[n/2-1]+orden[n/2])/2,rango:orden[n-1]-orden[0]};
}
function sumarFracciones(a,b,c,d) {
 if (![a,b,c,d].every(Number.isInteger)||b<=0||d<=0) throw Error('Usa numeradores enteros y denominadores enteros positivos.');
 let n=a*d+c*b, q=b*d;
 const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
 const g=gcd(n,q); return {n:n/g,d:q/g,valor:n/q};
}
function iniciar(tipo) {
 const $=id=>document.getElementById(id), num=id=>Number($(id).value);
 const line=(x1,y1,x2,y2,color='#075c98')=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3"/>`;
 const text=(x,y,t)=>`<text x="${x}" y="${y}" font-size="16">${t}</text>`;
 function actualizar(){try{
 let dibujo='', mensaje='';
 if(tipo==='racionales'){
 const a=num('a'),b=num('b'),c=num('c'),d=num('d'),s=sumarFracciones(a,b,c,d);
 const inicio=a/b, escala=Math.max(2,Math.abs(inicio),Math.abs(s.valor))+1;
 const pos=v=>300+v*260/escala;
 dibujo=line(40,160,560,160)+text(292,192,'0')+line(300,80,pos(inicio),80)+line(pos(inicio),120,pos(s.valor),120,'#9a4900');
 for(const [v,y,label] of [[inicio,80,'Inicio'],[s.valor,120,'Final']]) dibujo+=`<circle cx="${pos(v)}" cy="${y}" r="6" fill="#075c98"/>`+text(Math.max(10,Math.min(470,pos(v))),y-15,`${label}: ${v.toFixed(2)}`);
 mensaje=`${a}/${b} + ${c}/${d} = ${s.n}/${s.d} = ${s.valor.toFixed(3)} km. Azul: primera posición; naranja: desplazamiento.`;
 } else if(tipo==='relaciones'){
 const m=num('m'),b=num('b');
 if(!Number.isFinite(m)||!Number.isFinite(b)||m<0||m>1000||b<0||b>2000) throw Error('Usa una tasa de 0 a 1000 y tarifa inicial de 0 a 2000.');
 const max=Math.max(1,5*m+b),y=v=>250-210*v/max;
 $('tabla').innerHTML='<table><caption>Distancia y costo</caption><tr><th scope="col">km</th><th scope="col">Colones</th></tr>'+Array.from({length:6},(_,x)=>`<tr><td>${x}</td><td>${m*x+b}</td></tr>`).join('')+'</table>';
 dibujo=line(50,250,550,250)+line(50,250,50,25)+line(50,y(b),550,y(5*m+b));
 for(let x=0;x<=5;x++) dibujo+=text(50+x*100,278,x)+`<circle cx="${50+x*100}" cy="${y(m*x+b)}" r="5" fill="#9a4900"/>`;
 dibujo+=text(65,25,`Costo máximo mostrado: ₡${max}`);
 mensaje=`Costo = ${m} × distancia + ${b}. Para 3 km: ₡${3*m+b}. Eje horizontal: km; eje vertical: costo.`;
 } else if(tipo==='geometria'){
 const b=num('b'),h=num('h'),x=num('x');
 dibujo=`<polygon points="100,260 ${100+b*30},260 ${100+x*30},${260-h*20}" fill="#bfdeef" stroke="#075c98" stroke-width="3"/>`+line(100+x*30,260,100+x*30,260-h*20,'#9a4900');
 mensaje=`Base ${b} cm; altura ${h} cm; área ${b*h/2} cm². El segmento naranja indica la altura perpendicular.`;
 }else{
 const partes=$('datos').value.split(',').map(x=>x.trim());
 if(partes.some(x=>!x)||partes.length>30) throw Error('Introduce entre 1 y 30 tiempos separados por comas.');
 const datos=partes.map(Number),s=resumirDatos(datos),max=Math.max(1,...datos),ancho=500/datos.length;
 dibujo=line(50,250,550,250);
 datos.forEach((v,i)=>{const h=200*v/max;dibujo+=`<rect x="${50+i*ancho}" y="${250-h}" width="${ancho*.75}" height="${h}" fill="#075c98"/>`+text(50+i*ancho,275,v);});
 mensaje=`Media: ${s.media.toFixed(2)}; mediana: ${s.mediana}; rango: ${s.rango} minutos. Cada barra representa una observación.`;
 }
 $('resultado').textContent=mensaje; $('grafica').innerHTML=dibujo; $('grafica').setAttribute('aria-label',mensaje);
 }catch(e){$('resultado').textContent=e.message;$('grafica').innerHTML='';if($('tabla'))$('tabla').innerHTML='';}}
 document.querySelectorAll('input').forEach(i=>i.addEventListener('input',actualizar));actualizar();
}
if(typeof module!=='undefined') module.exports={sumarFracciones,resumirDatos};
