import { Engine } from 'webgl-engine';

let ox = 0,
    oy = 0,
    oz = 0,
    vx = 0,
    vz = 0;

export function initUseCamera(engine: Engine<unknown>) {}
export function useCamera(engine: Engine<unknown>) {
    const { camera } = engine.activeScene;

    if (engine.keymap['w']) {
        vz = (vz + 1) * 1.01;
    } else if (engine.keymap['s']) {
        vz = vz - 1;
    }

    if (engine.keymap['d']) {
        vx = (vx + 1) * 1.01;
    } else if (engine.keymap['a']) {
        vx = vx - 1;
    }

    if (vz > 0.5) {
        vz -= 0.5;
    } else if (vz < -0.5) {
        vz += 0.5;
    } else {
        vz = 0;
    }

    if (vx > 0.5) {
        vx -= 0.5;
    } else if (vx < -0.5) {
        vx += 0.5;
    } else {
        vx = 0;
    }

    camera.position[0] += vx;
    camera.position[2] += vz;
}
