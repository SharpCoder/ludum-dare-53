import { Engine } from "webgl-engine";
import { lineTo } from "../drawing";

let ox = 0;
let oy = 0;
let obj = lineTo(0, 0, 0, 0);

function pos(engine: Engine<unknown>) {
  const [ox, oy] = engine.activeScene.camera.position;
  return [engine.mousex - ox, engine.mousey - engine.canvas.clientHeight - oy];
}

export function initClickDrag(engine: Engine<unknown>) {
  window.addEventListener("click", (ev) => {
    const [mx, my] = pos(engine);
    ox = mx;
    oy = my;
  });

  engine.activeScene.addObject(obj);
}

export function useClickDrag(engine: Engine<unknown>) {
  const [mx, my] = pos(engine);

  const line = lineTo(ox, oy, mx, my);
  obj.vertexes = line.vertexes;
  obj.position = line.position;
  obj.rotation = line.rotation;

  console.log(ox, oy, mx, my);
}
