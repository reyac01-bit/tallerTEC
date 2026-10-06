'use strict';
const assert=require('node:assert/strict'),L=require('./laberinto-motor');
const map=L.crearMapa();assert.equal(map.doors.length,3);assert.equal(new Set(map.doors.map(d=>d.x+','+d.y)).size,3);
function reach(blocked){const stack=[[1,1]],seen=new Set(['1,1']);while(stack.length){const [x,y]=stack.pop();for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,k=nx+','+ny;if(map.grid[ny]?.[nx]==='.'&&!seen.has(k)&&!blocked.has(k)){seen.add(k);stack.push([nx,ny]);}}}return seen.has(map.exit.x+','+map.exit.y);}
assert(reach(new Set()));for(const d of map.doors)assert.equal(reach(new Set([d.x+','+d.y])),false,'Ninguna puerta puede evitarse para ganar.');
const state=L.crearEstado();assert.equal(L.mover(state,0,-1),'pared');assert.deepEqual(state.player,map.start);
for(let i=1;i<map.path.length;i++){
 const [x,y]=map.path[i],dx=x-state.player.x,dy=y-state.player.y;let result=L.mover(state,dx,dy);
 if(result==='puerta'){
  const id=state.active;assert.equal(L.resolver(state,'1/0'),'formato');assert.equal(L.resolver(state,'99'),'incorrecto');assert.equal(state.active,id);assert(!state.open.includes(id));assert.equal(L.mover(state,dx,dy),'reto');
  assert.equal(L.resolver(state,['2/8','2/30','10/24'][id-1]),'correcto');result=L.mover(state,dx,dy);
 }
 if(i<map.path.length-1)assert.equal(result,'paso');else assert.equal(result,'salida');
}
assert(state.won);assert.equal(state.open.length,3);assert.equal(L.mover(state,-1,0),'fin');assert.equal(L.crearEstado().open.length,0);
console.log('Laberinto: ruta resoluble, tres puertas obligatorias, muros, errores, fracciones equivalentes, bloqueo y victoria verificados.');
