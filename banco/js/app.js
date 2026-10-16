const amountInput = document.getElementById('amountInput');
const idInput = document.getElementById('idInput');
const transferPanel = document.getElementById('transferPanel');
const confirmBtn = document.getElementById('confirmBtn');
const closeBtn = document.querySelector('.close-btn');
const actionButtons = document.querySelectorAll('.action-btn');
const balanceValue = document.getElementById('balanceValue');
const bankValue = document.getElementById('bankValue');
const accountName = document.getElementById('accountName');

let currentAction = 'depositar';

const formatMoney = (value) => `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

function setActiveAction(action) {
    currentAction = action;

    actionButtons.forEach((button) => {
        const isActive = button.dataset.action === action;
        button.classList.toggle('primary', isActive);
    });

    transferPanel.classList.toggle('hidden', action !== 'transferir');
}

function setBankData(name, cash, bank) {
    if (name) {
        accountName.textContent = String(name).toUpperCase();
    }

    if (cash !== undefined && cash !== null) {
        balanceValue.dataset.value = cash;
        balanceValue.textContent = formatMoney(cash);
    }

    if (bank !== undefined && bank !== null) {
        bankValue.dataset.value = bank;
        bankValue.textContent = formatMoney(bank);
    }
}

function confirmAction() {
    const amount = Number(amountInput.value || 0);
    if (amount <= 0) return;

    if (currentAction === 'depositar') {
        cef.emit('bank:deposit', amount);
        return;
    }

    if (currentAction === 'sacar') {
        cef.emit('bank:saque', amount);
        return;
    }

    if (currentAction === 'transferir') {
        const targetId = Number(idInput.value || 0);
        cef.emit('bank:transfer', targetId, amount);
    }
}

cef.on('bank:load', (name, cash, bank) => {
    setBankData(name, cash, bank);
});

cef.on('bank:notify', (message) => {
    console.log('[BANK]', message);
});

cef.on('bank:error', (message) => {
    console.log('[BANK ERROR]', message);
});

actionButtons.forEach((button) => {
    button.addEventListener('click', () => setActiveAction(button.dataset.action));
});

confirmBtn.addEventListener('click', confirmAction);

closeBtn.addEventListener('click', () => {
    if (typeof cef !== 'undefined' && typeof cef.emit === 'function') {
        cef.emit('bank:close');
    }
});

setActiveAction('depositar');