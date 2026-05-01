// render.js
import { cars } from './cars.js';

export const ui = {
    list: document.getElementById('car-list'),
    background: document.getElementById('car-bg'),
    price: document.getElementById('car-price'),
    stats: document.querySelector('.stats-container')
};

export function renderCarDetails(index) {
    const car = cars[index];
    
    ui.background.style.backgroundImage = `url('${car.img}')`;
    ui.price.innerText = car.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    ui.stats.innerHTML = Object.entries(car.stats).map(([key, value]) => `
        <div class="stat-group">
            <span class="stat-label">${key}</span>
            <div class="progress-bar"><div class="progress-fill" style="width: ${value}%"></div></div>
        </div>
    `).join('');

    document.querySelectorAll('.car-item').forEach((el, i) => el.classList.toggle('active', i === index));
}