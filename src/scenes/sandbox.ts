import {
    DefaultShader,
    degs,
    Flatten,
    Obj3d,
    rads,
    Repeat,
    Scene,
    zeros,
} from 'webgl-engine';
import { drawCube } from '../drawing3d';
import { initUseCamera, useCamera } from '../hooks/useCamera';
import { useLoadModels } from '../hooks/useLoadModels';
import { FogShader } from '../shaders/fog';
import { getWorldTile, WorldTile } from '../worldgen';

const models = {};
useLoadModels(['/models/tree.obj', '/models/ship.obj'])
    .then((loadedModels) => {
        for (const path in loadedModels) {
            models[path] = loadedModels[path];
        }

        SandboxScene.status = 'ready';
    })
    .then(() => {
        const model = models['/models/ship.obj'];
        const { camera } = SandboxScene;
        SandboxScene.addObject({
            ...model,
            position: camera.position,
            offsets: zeros(),
            rotation: zeros(),
            scale: [50, 50, 50],

            update: function (time_t, engine) {
                this.position = [...camera.position];
                this.position[2] += 500;
                this.rotation[0] = rads(180 + 45);
                this.rotation[1] = rads(90);
                this.rotation[2] = rads(-45 + 180);

                const cx = engine.canvas.clientWidth / 2;
                const cy = engine.canvas.clientHeight / 2;

                const deltaX = rads(engine.mousex - cx) / (10 * Math.PI);
                const deltaY = rads(cy - engine.mousey) / (10 * Math.PI);
                this.rotation[0] += deltaY;
                this.rotation[1] += deltaX;

                camera.position[0] += degs(deltaX);
                camera.position[1] -= degs(deltaY);
                camera.rotation[2] = degs(deltaX) / 50;
            },
        });
    });

type LoadedWorldTile = WorldTile & {
    objList: Obj3d[];
};

let activeTile: LoadedWorldTile = undefined;
export const SandboxScene = new Scene<unknown>({
    title: 'sandbox',
    status: 'initializing',
    shaders: [DefaultShader, FogShader],
    once: (engine) => {
        SandboxScene.camera.setY(-50);
        SandboxScene.camera.setZ(-500);
    },
    init: (engine) => {
        const { camera } = engine.activeScene;
        engine.settings.fogColor = [0.9, 0.9, 0.9, 1];
        engine.settings.fogDensity = 0.06;
        camera.position[1] = -1500;
        initUseCamera(engine);
    },
    update: (time, engine) => {
        useCamera(engine);

        const [x, _, z] = engine.activeScene.camera.position;
        const tile = getWorldTile(engine, x, z);

        if (
            activeTile?.x !== tile?.x ||
            activeTile?.y !== tile?.y ||
            !activeTile
        ) {
            if (activeTile) {
                unloadTile(activeTile);
            }

            activeTile = {
                ...tile,
                objList: loadTile(tile),
            };
        }
    },
});

function unloadTile(tile: LoadedWorldTile) {
    for (const obj of tile.objList) {
        obj.visible = false;
        SandboxScene.removeObject(obj);
    }
}

function loadTile(tile: WorldTile): Obj3d[] {
    const result = [];
    for (const segment of tile.segments) {
        switch (segment.type) {
            case 'tree': {
                const obj = {
                    ...models['/models/tree.obj'],
                    name: 'tree',
                    hideWhenFarAway: true,
                    position: segment.position,
                    scale: segment.scale,
                    offsets: zeros(),
                    rotation: zeros(),
                };
                SandboxScene.addObject(obj);
                result.push(obj);
                break;
            }
            case 'floor': {
                const obj = drawCube({
                    x: segment.position[0],
                    y: segment.position[1],
                    z: segment.position[2],
                    w: segment.scale[0],
                    h: segment.scale[1],
                    d: segment.scale[2],
                });

                obj.colors = Flatten(
                    Repeat([135, 120, 95], obj.vertexes.length / 3)
                );

                SandboxScene.addObject(obj);
                result.push(obj);
                break;
            }
        }
    }

    return result;
}
