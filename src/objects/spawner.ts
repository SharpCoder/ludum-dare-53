import { Engine, zeros } from 'webgl-engine';
import { container, drawBox, lineTo } from '../drawing';
import { useMouse } from '../hooks/useMouse';

let ox = 0;
let oy = 0;
let ships = [];

function spawnShip(x, y, vx, vy) {
    const obj = drawBox(x, y, 15, 15);
    obj.properties = {
        vx,
        vy,
    };

    obj.update = function () {
        obj.position[0] += obj.properties.vx;
        obj.position[1] += obj.properties.vy;

        if (obj.properties.vx > 0) {
            obj.properties.vx -= 0.1;
        } else {
            obj.properties.vx += 0.1;
        }

        if (obj.properties.vy > 0) {
            obj.properties.vy -= 0.1;
        } else {
            obj.properties.vy += 0.1;
        }
    };

    ships.push(obj);
    return obj;
}

function useMouseVelocity(engine: Engine<unknown>) {
    // Do the spawn argh!
    const [mx, my] = useMouse(engine);

    // Calculate velocity
    const mag = Math.hypot(mx, my);
    const velMag = Math.hypot(ox - mx, oy - my);

    const vx = (mx / mag) * Math.max(velMag / 50, 5);
    const vy = (my / mag) * Math.max(velMag / 50, 5);

    return [vx, vy];
}

export function createSpawner(engine: Engine<unknown>) {
    const obj = container();
    const line = lineTo(0, 0, 0, 0);

    window.addEventListener('mousedown', (ev) => {
        const [mx, my] = useMouse(engine);
        ox = mx;
        oy = my;
    });

    window.addEventListener('mouseup', () => {
        const [vx, vy] = useMouseVelocity(engine);

        if (ships.length === 0) {
            engine.activeScene.addObject(spawnShip(0, 0, vx, vy));
        } else {
            ships[0].properties = {
                vx,
                vy,
            };
        }
    });

    obj.children.push(line);
    obj.update = function (time_t, engine) {
        const [mx, my] = useMouse(engine);

        const nextLine = lineTo(ox, oy, mx, my);
        line.vertexes = nextLine.vertexes;
        line.position = nextLine.position;
        line.rotation = nextLine.rotation;

        if (ships.length > 0) {
            const { camera } = engine.activeScene;
            const { canvas } = engine;
            camera.position = [
                canvas.clientWidth / 2 - ships[0].position[0],
                -canvas.clientHeight / 2 - ships[0].position[1],
                0,
            ];
        }

        if (engine.mousebutton == 0) {
            line.visible = false;
        } else {
            line.visible = true;
        }
    };

    return obj;
}

export function initSpawner(engine: Engine<unknown>) {}
