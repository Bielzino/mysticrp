const markerConfig = {
    bank: {
        icon: 'imgs/bank.png',
        eyebrow: 'SERVIÇOS FINANCEIROS',
        title: 'Banco',
        action: 'APERTAR PARA ABRIR'
    },
    hospital: {
        icon: 'imgs/life.png',
        eyebrow: 'ATENDIMENTO MÉDICO',
        title: 'Hospital',
        action: 'CURAR AGORA'
    },
    shop: {
        icon: 'imgs/shop.png',
        eyebrow: 'LOJA DE SUPRIMENTOS',
        title: 'Loja',
        action: 'COMPRAR ITENS'
    },
    conce: {
        icon: 'imgs/conce.png',
        eyebrow: 'CONCESSIONÁRIA',
        title: 'Concessionária',
        action: 'COMPRAR VEÍCULO'
    }
};

const panel = document.getElementById('marker-panel');
const icon = document.getElementById('marker-icon');
const eyebrow = document.getElementById('marker-eyebrow');
const title = document.getElementById('marker-title');
const action = document.getElementById('marker-action');

function applyMarker(type) {
    const config = markerConfig[type] || markerConfig.bank;
    panel.setAttribute('data-type', type || 'bank');
    
    // Adicionado style="width: 24px; height: 24px;" (mude os valores conforme preferir)
    if (config.icon) {
        icon.innerHTML = `<img src="${config.icon}" alt="${config.title || 'Icon'}" style="width: 24px; height: 24px; object-fit: contain;" />`;
    } else {
        icon.innerHTML = '';
    }

    eyebrow.textContent = config.eyebrow;
    title.textContent = config.title;
    action.textContent = config.action;
}

if (panel) {
    applyMarker(panel.dataset.type || 'bank');
}

cef.on('marker:type', (type) => {
        applyMarker(String(type || 'bank').toLowerCase());
});