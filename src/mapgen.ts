import { rads } from 'webgl-engine';

export type MapElementType = 'planet' | 'asteroid';
export type MapElement = {
    type: MapElementType;
    name: string;
    x: number;
    y: number;
    r: number;
};

export function generateMap() {
    // origin is 0,0 so we want to create some radially placed planets around the origin
    const mapObjects: MapElement[] = [];
    for (let i = 0; i < 1; i++) {
        const radius = 500 + Math.random() * 100;
        const theta = Math.random() * 360;
        const x = Math.cos(rads(theta)) * radius;
        const y = Math.sin(rads(theta)) * radius;

        mapObjects.push({
            type: 'planet',
            name: 'Osirus III',
            x,
            y,
            r: 50,
        });
    }

    return mapObjects;
}
