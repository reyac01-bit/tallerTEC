'use strict';
const Laberinto = (()=>{
 const retos=[
  {titulo:'El puente de las fracciones',pregunta:'Estás a −1/2 km del encuentro y avanzas 3/4 km en dirección positiva. ¿Cuál es tu posición final, en km?',respuesta:1/4,pistas:['Representa −1/2 en la recta y avanza hacia la derecha.','Convierte −1/2 en −2/4. Ahora suma −2/4 + 3/4.'],explicacion:'−1/2 + 3/4 = −2/4 + 3/4 = 1/4 km.'},
  {titulo:'Dos caminos, una diferencia',pregunta:'Un sendero mide 2/3 km y otro 3/5 km. ¿Cuánto más largo es el primero? Responde en km.',respuesta:1/15,pistas:['Compara las distancias con una misma unidad: quinceavos.','2/3 = 10/15 y 3/5 = 9/15. Resta las distancias.'],explicacion:'2/3 − 3/5 = 10/15 − 9/15 = 1/15 km.'},
  {titulo:'La reserva de agua',pregunta:'Una reserva tiene 3/4 de su capacidad llena. Se usa 1/3 de la capacidad total. ¿Qué fracción de la capacidad total queda llena?',respuesta:5/12,pistas:['Las dos fracciones se refieren a la capacidad total. Resta lo utilizado.','3/4 = 9/12 y 1/3 = 4/12. Calcula 9/12 − 4/12.'],explicacion:'3/4 − 1/3 = 9/12 − 4/12 = 5/12 de la capacidad total.'}
 ];
 function leer(texto){const s=texto.trim().replace(',','.');if(!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:\s*\/\s*[+-]?\d+)?$/.test(s))return null;const [a,b='1']=s.split('/').map(Number),v=a/b;return b!==0&&Number.isFinite(v)?v:null;}
 function crearMapa(seed=27){
  const width=13,height=11,grid=Array.from({length:height},()=>Array(width).fill('#'));
  const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const stack=[[1,1]];grid[1][1]='.';
  while(stack.length){const [x,y]=stack[stack.length-1],next=[[2,0],[-2,0],[0,2],[0,-2]].map(([dx,dy])=>[x+dx,y+dy]).filter(([a,b])=>a>0&&b>0&&a<width-1&&b<height-1&&grid[b][a]==='#');
   if(!next.length){stack.pop();continue;}const [nx,ny]=next[Math.floor(random()*next.length)];grid[(y+ny)/2][(x+nx)/2]='.';grid[ny][nx]='.';stack.push([nx,ny]);}
  const start={x:1,y:1},exit={x:width-2,y:height-2};
  const queue=[[start.x,start.y]],prev=new Map([['1,1',null]]);
  for(let i=0;i<queue.length;i++){const [x,y]=queue[i];for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy,key=nx+','+ny;if(grid[ny]?.[nx]==='.'&&!prev.has(key)){prev.set(key,[x,y]);queue.push([nx,ny]);}}}
  const path=[];for(let cur=[exit.x,exit.y];cur;cur=prev.get(cur.join(',')))path.unshift(cur);
  const doors=[1,2,3].map(n=>{const [x,y]=path[Math.floor((path.length-1)*n/4)];return {id:n,x,y};});
  return {grid,start,exit,doors,path};
 }
 function crearEstado(){const map=crearMapa();return {map,player:{...map.start},open:[],active:null,moves:0,won:false};}
 function mover(state,dx,dy){
  if(state.won)return 'fin';
  if(Math.abs(dx)+Math.abs(dy)!==1)return 'invalido';
  if(state.active!==null)return 'reto';
  const x=state.player.x+dx,y=state.player.y+dy;
  if(!state.map.grid[y]||state.map.grid[y][x]!=='.')return 'pared';
  const door=state.map.doors.find(d=>d.x===x&&d.y===y);
  if(door&&!state.open.includes(door.id)){state.active=door.id;return 'puerta';}
  state.player={x,y};state.moves++;
  if(x===state.map.exit.x&&y===state.map.exit.y&&state.open.length===3){state.won=true;return 'salida';}
  return 'paso';
 }
 function resolver(state,text){if(state.active===null)return 'sin-reto';const answer=leer(text);if(answer===null)return 'formato';if(Math.abs(answer-retos[state.active-1].respuesta)>1e-9)return 'incorrecto';state.open.push(state.active);state.active=null;return 'correcto';}
 return {retos,leer,crearMapa,crearEstado,mover,resolver};
})();
if(typeof module!=='undefined')module.exports=Laberinto;
