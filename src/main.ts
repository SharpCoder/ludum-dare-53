import { Engine } from "webgl-engine";
import "./app.css";
import App from "./App.svelte";
import { InitialScene } from "./scenes/initial";

let engine = new Engine<unknown>();
window["gameEngine"] = engine;

engine.addScene(InitialScene);

function draw() {
  engine.draw();
  requestAnimationFrame(draw.bind(this));
}

function update() {
  engine.update();
  requestAnimationFrame(update.bind(this));
}

draw();
update();

const app = new App({
  target: document.getElementById("app"),
});

export default app;
