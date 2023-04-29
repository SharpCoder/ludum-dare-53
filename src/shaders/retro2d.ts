import { m3, type ProgramTemplate } from "webgl-engine";

const default3DVertexShader = `
    attribute vec2 a_position;
    uniform mat3 u_matrix;

    varying vec4 v_color;
    
    void main() {
        gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
    }
`;

const default3DFragmentShader = `
    precision mediump float;
    
    varying vec4 v_color;
    
    void main() {
        gl_FragColor = vec4(255, 0, 0, 1);
    }
`;

const gl = document.createElement("canvas").getContext("webgl");
export const Retro2DShader: ProgramTemplate = {
  name: "default",
  order: 0,
  objectDrawArgs: {
    components: 2,
    depthFunc: gl?.LESS,
    mode: gl?.TRIANGLES,
  },
  beforeDraw: function (engine) {
    const { gl } = engine;
    gl.disable(gl.CULL_FACE);
  },
  vertexShader: default3DVertexShader,
  fragmentShader: default3DFragmentShader,
  attributes: {
    a_position: {
      components: 2,
      type: gl?.FLOAT,
      normalized: false,
      generateData: (engine) => {
        return new Float32Array(
          engine.activeScene.objects.flatMap((obj) => obj.vertexes)
        );
      },
    },
  },
  staticUniforms: {},
  dynamicUniforms: {
    u_matrix: (engine, loc, obj) => {
      const { gl } = engine;
      const { camera } = engine.activeScene;
      let matrix = m3.combine([
        m3.projection(gl.canvas.clientWidth, gl.canvas.clientHeight),
        m3.translate(camera.position[0], camera.position[1]),
        // m3.translate(gl.canvas.clientWidth / 2, gl.canvas.clientHeight / 2),
        m3.translate(0, gl.canvas.clientHeight),
        m3.translate(obj.position[0], obj.position[1]),
        m3.translate(obj.offsets[0], obj.offsets[1]),
        m3.rotate(-obj.rotation[0]),
        m3.scale(obj.scale?.[0] ?? 1, obj.scale?.[1] ?? 1),
      ]);

      gl.uniformMatrix3fv(loc, false, matrix);
    },
  },
};
