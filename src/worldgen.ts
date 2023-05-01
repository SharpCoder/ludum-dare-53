import { Engine } from 'webgl-engine';

export type WorldSegmentType = 'tree' | 'floor';
export type WorldSegment = {
    type: WorldSegmentType;
    position: number[];
    scale: number[];
};

export type WorldTile = {
    x: number;
    y: number;
    segments: WorldSegment[];
};

function generateWorldSegment(
    engine: Engine<unknown>,
    worldX: number,
    worldY: number
): WorldSegment[] {
    const result: WorldSegment[] = [];
    const range = engine.settings.zFar;

    // Generate the trees
    result.push({
        type: 'floor',
        position: [worldX * range, 0, worldY * range],
        scale: [range, 1, range],
    });

    for (let i = 0; i < 15; i++) {
        const scale = 35 + Math.random() * 50;
        const x = Math.random() * range - Math.random() * range;
        const z = Math.random() * range - Math.random() * range;

        result.push({
            type: 'tree',
            position: [worldX * range + x, 0, worldY * range + z],
            scale: [scale, scale, scale],
        });
    }
    return result;
}

let tiles = {};
function ensureTiles(
    engine: Engine<unknown>,
    x: number,
    y: number
): WorldSegment[] {
    // Ensure there are 9 tiles
    const segments = [];
    const tileList = [
        [y, x],
        [y + 1, x],
        [y - 1, x],
        [y, x + 1],
        [y, x - 1],

        [y + 1, x + 1],
        [y - 1, x + 1],
        [y + 1, x - 1],
        [y - 1, x - 1],
    ];

    for (const [tileY, tileX] of tileList) {
        const tile = tiles[tileY]?.[tileX];
        if (tile === undefined) {
            tiles[tileY] = tiles[tileY] ?? {};
            tiles[tileY][tileX] = generateWorldSegment(engine, tileX, tileY);
        }

        for (const segment of tiles[tileY][tileX]) {
            segments.push(segment);
        }
    }

    return segments;
}

export function getWorldTile(
    engine: Engine<unknown>,
    x: number,
    z: number
): WorldTile {
    const { zFar } = engine.settings;
    const worldX = Math.round(x / zFar);
    const worldY = Math.round(z / zFar);

    return {
        x: worldX,
        y: worldY,
        segments: ensureTiles(engine, worldX, worldY),
    };
}
