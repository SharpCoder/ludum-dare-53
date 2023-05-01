import { loadModel, ParsedModel } from 'webgl-engine';

export async function useLoadModels(
    paths: string[]
): Promise<Record<string, ParsedModel>> {
    const result = {};
    const promises: Array<Promise<[string, ParsedModel]>> = [];
    for (const path of paths) {
        promises.push(
            fetch(path)
                .then((file) => file.blob())
                .then(async (blob) => {
                    return [
                        path,
                        await loadModel(
                            blob,
                            path,
                            path.includes('.obj') ? 'obj' : 'off'
                        ),
                    ];
                })
        );
    }

    const models = await Promise.all(promises);
    for (const [name, model] of models) {
        result[name] = model;
    }
    return result;
}
