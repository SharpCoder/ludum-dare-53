import { cuboid, Flatten, Obj3d, Repeat, zeros } from 'webgl-engine';

export function drawCube({ x, y, z, w, h, d }) {
    const vertexes = cuboid(w, h, d);
    const obj: Obj3d = {
        vertexes: vertexes,
        offsets: [-w / 2, -h / 2, -d / 2],
        position: [x, y, z],
        rotation: zeros(),
        colors: Flatten([
            Repeat([0, 0, 186], 6),
            Repeat([255, 0, 0], 6),
            Repeat([0, 255, 0], 6),
            Repeat([255, 0, 255], 6),
            Repeat([53, 94, 255], 6),
            Repeat([255, 215, 0], 6),
        ]),
    };

    return obj;
}
