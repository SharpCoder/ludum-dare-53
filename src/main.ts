import { Engine } from 'webgl-engine';
import './app.css';
import App from './App.svelte';
import { SandboxScene } from './scenes/sandbox';

let engine = new Engine<unknown>();
window['gameEngine'] = engine;

engine.addScene(SandboxScene);

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
    target: document.getElementById('app'),
});

export default app;
