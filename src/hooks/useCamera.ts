import { Engine } from 'webgl-engine';

let ox = 0,
    oy = 0,
    oz = 0,
    vx = 0,
    vz = 0;

export function initUseCamera(engine: Engine<unknown>) {}
export function useCamera(engine: Engine<unknown>) {
    const { camera } = engine.activeScene;
    const MAX_SPEED = 100;

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

    // Clamp
    if (vx > 0) {
        vx = Math.min(vx, MAX_SPEED);
    } else {
        vx = Math.max(vx, -MAX_SPEED);
    }

    if (vz > 0) {
        vz = Math.min(vz, MAX_SPEED);
    } else {
        vz = Math.max(vz, -MAX_SPEED);
    }

    camera.position[0] += vx;
    camera.position[2] += vz;
}
