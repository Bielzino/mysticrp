// app.js
import { initEvents } from './events.js';
import { renderCarDetails } from './render.js';

document.addEventListener('DOMContentLoaded', () => {
    initEvents();
    renderCarDetails(0); // Mostra o primeiro carro ao abrir
});