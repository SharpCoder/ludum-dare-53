import { rads } from 'webgl-engine';
import { container, drawArc, drawBox } from '../drawing';
import { useMouse } from '../hooks/useMouse';

export function drawFactory() {
    const radius = 50;
    const targetRadius = 10;

    const factory = container();
    const target = drawBox(0, 0, targetRadius, targetRadius);

    factory.children.push(drawArc(0, 0, radius, 1));
    factory.children.push(target);

    target.update = function (time_t, engine) {
        const { canvas } = engine;
        const cx = canvas.clientWidth / 2;
        const cy = -canvas.clientHeight / 2;

        const theta = Math.atan2(engine.mousey + cy, engine.mousex - cx);
        const x = Math.cos(theta) * radius;
        const y = Math.sin(theta) * radius;

        target.position = [x, y, 0];
    };

    return factory;
}
