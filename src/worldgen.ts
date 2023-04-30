export type WorldSegmentType = 'tree' | 'floor';
export type WorldSegment = {
    type: WorldSegmentType;
    position: number[];
    scale: number[];
};

export function generateWorldSegment(): WorldSegment[] {
    const result: WorldSegment[] = [];

    // Generate the trees
    for (let i = 0; i < 55; i++) {
        const scale = 35 + Math.random() * 50;
        const x = Math.random() * 12000 - Math.random() * 12000;
        const z = Math.random() * 12000 - Math.random() * 12000;

        result.push({
            type: 'tree',
            position: [x, 0, z],
            scale: [scale, scale, scale],
        });
    }
    return result;
}
