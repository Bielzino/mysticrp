const markerConfig = {
    bank: {
        icon: '$',
        eyebrow: 'SERVIÇOS FINANCEIROS',
        title: 'Banco',
        action: 'APERTAR PARA ABRIR'
    },
    hospital: {
        icon: '+',
        eyebrow: 'ATENDIMENTO MÉDICO',
        title: 'Hospital',
        action: 'CURAR AGORA'
    },
    shop: {
        icon: 'S',
        eyebrow: 'LOJA DE SUPRIMENTOS',
        title: 'Loja',
        action: 'COMPRAR ITENS'
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
    icon.textContent = config.icon;
    eyebrow.textContent = config.eyebrow;
    title.textContent = config.title;
    action.textContent = config.action;
}

if (panel) {
    applyMarker(panel.dataset.type || 'bank');
}

if (typeof cef !== 'undefined' && typeof cef.on === 'function') {
    cef.on('marker:type', (type) => {
        applyMarker(String(type || 'bank').toLowerCase());
    });
}
