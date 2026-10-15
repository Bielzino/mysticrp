const amountInput = document.getElementById('amountInput');
const confirmBtn = document.getElementById('confirmBtn');
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

    if (typeof cef !== 'undefined' && typeof cef.emit === 'function') {
        cef.emit('bank:action', currentAction, amount);
        return;
    }

    if (currentAction === 'depositar') {
        const current = Number(balanceValue.dataset.value || 0);
        balanceValue.dataset.value = current + amount;
        balanceValue.textContent = formatMoney(current + amount);
    }

    if (currentAction === 'sacar') {
        const current = Number(balanceValue.dataset.value || 0);
        balanceValue.dataset.value = Math.max(0, current - amount);
        balanceValue.textContent = formatMoney(Math.max(0, current - amount));
    }

    if (currentAction === 'transferir') {
        const current = Number(bankValue.dataset.value || 0);
        bankValue.dataset.value = current + amount;
        bankValue.textContent = formatMoney(current + amount);
    }
}

if (typeof cef !== 'undefined' && typeof cef.on === 'function') {
    cef.on('bank:load', (name, cash, bank) => {
        setBankData(name, cash, bank);
    });

    cef.on('bank:notify', (message) => {
        console.log('[BANK]', message);
    });

    cef.on('bank:error', (message) => {
        console.log('[BANK ERROR]', message);
    });
}

actionButtons.forEach((button) => {
    button.addEventListener('click', () => setActiveAction(button.dataset.action));
});

confirmBtn.addEventListener('click', confirmAction);

setBankData('CLIENTE', 2500, 15000);
setActiveAction('depositar');
