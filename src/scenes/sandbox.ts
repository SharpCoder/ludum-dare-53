import {
    cuboid,
    DefaultShader,
    Flatten,
    loadModel,
    Obj3d,
    rads,
    Repeat,
    Scene,
    zeros,
} from 'webgl-engine';
import { drawCube } from '../drawing3d';
import { initUseCamera, useCamera } from '../hooks/useCamera';
import { generateWorldSegment } from '../worldgen';

export const SandboxScene = new Scene<unknown>({
    title: 'sandbox',
    status: 'initializing',
    shaders: [DefaultShader],
    once: (engine) => {
        SandboxScene.camera.setY(-50);
        SandboxScene.camera.setZ(-500);

        const floor = drawCube({
            x: 0,
            y: 0,
            z: 0,
            w: 100000,
            h: 1,
            d: 100000,
        });

        SandboxScene.addObject(floor);
    },
    init: (engine) => {
        engine.settings.fogColor = [0.98, 0.98, 0.98, 1];
        initUseCamera(engine);
    },
    update: (time, engine) => {
        useCamera(engine);
    },
});

fetch('/models/tree.obj')
    .then((file) => file.blob())
    .then((blob) => {
        loadModel(blob, '/models/tree.obj', 'obj').then((tree) => {
            const segments = generateWorldSegment();
            for (const segment of segments) {
                switch (segment.type) {
                    case 'tree': {
                        SandboxScene.addObject({
                            ...tree,
                            name: 'tree',
                            hideWhenFarAway: true,
                            position: segment.position,
                            scale: [
                                segment.scale[0],
                                segment.scale[1],
                                segment.scale[2],
                            ],

                            colors: Flatten(
                                Repeat(
                                    [255, 255, 255],
                                    tree.vertexes.length / 3
                                )
                            ),
                            offsets: zeros(),
                            rotation: zeros(),
                        });
                        break;
                    }
                }
            }
            SandboxScene.status = 'ready';
        });
    });
