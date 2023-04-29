import { Engine, zeros } from "webgl-engine";
import { container, drawBox, lineTo } from "../drawing";
import { useMouse } from "../hooks/useMouse";

let ox = 0;
let oy = 0;

function spawnShip(x, y, vx, vy) {
  const obj = drawBox(x, y, 15, 15);
  obj.update = function () {
    obj.position[0] += vx;
    obj.position[1] += vy;

    if (vx > 0) {
      vx -= 0.1;
    } else {
      vx += 0.1;
    }

    if (vy > 0) {
      vy -= 0.1;
    } else {
      vy += 0.1;
    }
  };
  return obj;
}

export function createSpawner(engine: Engine<unknown>) {
  const obj = container();
  const line = lineTo(0, 0, 0, 0);

  window.addEventListener("mousedown", (ev) => {
    const [mx, my] = useMouse(engine);
    ox = mx;
    oy = my;
  });

  window.addEventListener("mouseup", () => {
    // Do the spawn argh!
    const [mx, my] = useMouse(engine);
    const cox = engine.activeScene.camera.position[0];
    const coy = engine.activeScene.camera.position[1];

    // Calculate velocity
    const mag = Math.hypot(mx, my);
    const velMag = Math.hypot(ox - mx, oy - my);

    const vx = (mx / mag) * Math.max(velMag / 50, 5);
    const vy = (my / mag) * Math.max(velMag / 50, 5);

    engine.activeScene.addObject(spawnShip(0, 0, vx, vy));
  });

  obj.children.push(line);
  obj.update = function (time_t, engine) {
    const [mx, my] = useMouse(engine);

    const nextLine = lineTo(ox, oy, mx, my);
    line.vertexes = nextLine.vertexes;
    line.position = nextLine.position;
    line.rotation = nextLine.rotation;

    if (engine.mousebutton == 0) {
      line.visible = false;
    } else {
      line.visible = true;
    }
  };

  return obj;
}

export function initSpawner(engine: Engine<unknown>) {}
