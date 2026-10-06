'use strict';
(()=>{
 const $=id=>document.getElementById(id);let state=Laberinto.crearEstado(),hints=0,sketch;
 const directions={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
 function progress(){ $('progreso-juego').textContent=`${state.open.length} de 3 puertas abiertas · ${state.moves} pasos`;$('posicion-juego').textContent=`Estás en la fila ${state.player.y}, columna ${state.player.x}.`; }
 function drawPuzzle(){const r=Laberinto.retos[state.active-1];hints=0;$('reto-titulo').textContent=r.titulo;$('reto-pregunta').textContent=r.pregunta;$('respuesta-juego').value='';$('pista-juego').textContent='';$('feedback-juego').textContent='';$('panel-reto').hidden=false;$('instruccion-reto').hidden=true;$('respuesta-juego').focus();}
 function move(direction){const [dx,dy]=directions[direction],result=Laberinto.mover(state,dx,dy);if(result==='puerta'){drawPuzzle();$('estado-juego').textContent='Puerta cerrada: resuelve el reto para abrirla.';}else if(result==='pared')$('estado-juego').textContent='Hay un muro. Prueba otra dirección.';else if(result==='reto')$('estado-juego').textContent='Resuelve el reto o pulsa «Volver al laberinto».';else if(result==='paso')$('estado-juego').textContent='Sigue explorando.';else if(result==='salida'){$('victoria').hidden=false;$('victoria').focus();$('estado-juego').textContent='¡Llegaste a la salida con las tres puertas abiertas!';}progress();sketch?.redraw();}
 document.querySelectorAll('[data-direction]').forEach(button=>button.addEventListener('click',()=>move(button.dataset.direction)));
 $('tablero-juego').addEventListener('keydown',e=>{const keys={ArrowUp:'up',ArrowDown:'down',ArrowLeft:'left',ArrowRight:'right',w:'up',s:'down',a:'left',d:'right'};const direction=keys[e.key]||keys[e.key.toLowerCase()];if(direction){e.preventDefault();move(direction);}});
 $('form-reto').addEventListener('submit',e=>{e.preventDefault();const id=state.active,result=Laberinto.resolver(state,$('respuesta-juego').value);if(result==='correcto'){$('panel-reto').hidden=true;$('instruccion-reto').hidden=false;$('instruccion-reto').textContent='¡Puerta abierta! '+Laberinto.retos[id-1].explicacion+' Vuelve a avanzar para cruzarla.';$('estado-juego').textContent='Respuesta correcta. Puerta '+id+' abierta.';progress();sketch?.redraw();$('tablero-juego').focus();}else $('feedback-juego').textContent=result==='formato'?'Escribe una fracción válida o un decimal; no uses denominador cero.':'Todavía no coincide. Revisa el procedimiento; puedes pedir una pista y volver a intentarlo.';});
 $('pedir-pista').addEventListener('click',()=>{if(state.active!==null)$('pista-juego').textContent=Laberinto.retos[state.active-1].pistas[Math.min(hints++,1)];});
 $('volver-juego').addEventListener('click',()=>{state.active=null;$('panel-reto').hidden=true;$('instruccion-reto').hidden=false;$('instruccion-reto').textContent='La puerta sigue cerrada. Puedes explorar y volver al reto cuando quieras.';$('tablero-juego').focus();});
 $('reiniciar-juego').addEventListener('click',()=>{state=Laberinto.crearEstado();$('panel-reto').hidden=true;$('victoria').hidden=true;$('instruccion-reto').hidden=false;$('instruccion-reto').textContent='Acércate a una puerta numerada para descubrir su reto.';$('estado-juego').textContent='Nueva partida. Busca las tres puertas y llega a la salida.';progress();sketch?.redraw();$('tablero-juego').focus();});
 progress();
 if(typeof p5==='undefined'){$('estado-juego').textContent='No se pudo cargar el juego. Recarga la página o vuelve a la actividad de racionales.';document.querySelectorAll('[data-direction]').forEach(b=>b.disabled=true);return;}
 new p5(p=>{sketch=p;const size=40;
  p.setup=()=>{const canvas=p.createCanvas(13*size,11*size);canvas.parent('canvas-juego');canvas.attribute('aria-hidden','true');p.noLoop();};
  p.draw=()=>{p.background('#e5efe9');p.textAlign(p.CENTER,p.CENTER);p.textSize(16);
   for(let y=0;y<11;y++)for(let x=0;x<13;x++){p.noStroke();p.fill(state.map.grid[y][x]==='#'?'#23474c':'#edf4ec');p.rect(x*size+1,y*size+1,size-2,size-2,5);}
   for(const door of state.map.doors){p.fill(state.open.includes(door.id)?'#a9d8c2':'#efc96b');p.rect(door.x*size+5,door.y*size+5,30,30,6);p.fill('#23474c');p.text(state.open.includes(door.id)?'✓':door.id,door.x*size+20,door.y*size+20);}
   p.fill('#bcddd4');p.rect(state.map.exit.x*size+4,state.map.exit.y*size+4,32,32,6);p.fill('#23474c');p.text('FIN',state.map.exit.x*size+20,state.map.exit.y*size+20);
   p.fill('#bf542f');p.circle(state.player.x*size+20,state.player.y*size+20,25);p.fill('#fff');p.circle(state.player.x*size+24,state.player.y*size+15,5);
  };
 });
})();
