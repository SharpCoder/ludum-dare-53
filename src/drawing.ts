import { Obj3d, rads, zeros } from "webgl-engine";

export function container(): Obj3d {
  return {
    vertexes: square(0, 0),
    position: zeros(),
    offsets: zeros(),
    rotation: zeros(),
    scale: [1, 1, 1],
    children: [],
    properties: {
      container: true,
    },
  };
}

export function square(w, h) {
  const x1 = -w / 2;
  const x2 = w / 2;
  const y1 = -h / 2;
  const y2 = h / 2;

  return [x1, y1, x2, y1, x2, y2, x1, y2, x1, y1, x2, y2];
}

export function drawBox(x, y, w, h) {
  const obj: Obj3d = {
    vertexes: square(w, h),
    position: [x, y, 0],
    offsets: [0, 0, 0],
    rotation: [0, 0, 0],
    properties: {
      box: true,
    },
  };

  return obj;
}

export function drawArc(x, y, r, thickness = 2) {
  const obj = container();
  // Create all the children
  for (let i = 0; i < 360; i++) {
    const cx = x + Math.cos(rads(i)) * r;
    const cy = y + Math.sin(rads(i)) * r;

    obj.children.push(drawBox(cx, cy, thickness, thickness));
  }

  return obj;
}

export function lineTo(x1, y1, x2, y2, thickness = 2) {
  const cx = x2 + x1;
  const cy = y2 + y1;
  const w = Math.hypot(x2 - x1, y2 - y1);
  const h = thickness;
  const obj = drawBox(cx / 2, cy / 2, w, h);
  obj.rotation[0] = Math.atan2(y2 - y1, x2 - x1);
  return obj;
}
