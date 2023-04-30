import { Obj3d } from 'webgl-engine';
import { container, drawArc } from '../drawing';
import { MapElement } from '../mapgen';

export function drawPlanet(mapElement: MapElement): Obj3d {
    const planet = container();
    planet.children.push(drawArc(mapElement.x, mapElement.y, mapElement.r, 3));
    return planet;
}
