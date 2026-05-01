// events.js
import { cars } from './cars.js';
import { ui, renderCarDetails } from './render.js';

export function initEvents() {
    // 1. Gera a lista baseada no seu Figma (Grid de cards)
    ui.list.innerHTML = cars.map((car, index) => `
        <li class="car-item" data-index="${index}">
            <div class="card-content">
                <h3>${car.name}</h3>
                <span>$ ${car.price.toLocaleString()}</span>
            </div>
        </li>
    `).join('');

    // 2. Escuta os cliques na lista
    ui.list.addEventListener('click', (e) => {
        // Busca o elemento .car-item mais próximo do clique
        const clickedItem = e.target.closest('.car-item');
        
        if (clickedItem) {
            // --- LÓGICA DE TROCA DO ACTIVE ---
            
            // Busca todos os itens que tenham a classe 'active' no momento
            const previousActive = document.querySelectorAll('.car-item.active');
            
            // Remove a classe de todos eles (limpa o antigo)
            previousActive.forEach(item => {
                item.classList.remove('active');
            });

            // Adiciona a classe no que foi clicado agora
            clickedItem.classList.add('active');

            // --- ATUALIZAÇÃO DA INTERFACE ---
            const index = clickedItem.dataset.index;
            renderCarDetails(index); 
        }
    });
}