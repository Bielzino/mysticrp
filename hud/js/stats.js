let hud = false;

// Atualiza as barras de status
function updateHud(type, percent) {
    const bar = document.querySelector(`.bar-inner.${type}`);
    if (bar) {
        bar.style.width = `${percent}%`;
    }
}

// Alterna a exibição da HUD
function controllHud(status){
    if(hud == true){
        document.querySelector(".speed-wrap").style.display = "none";
        hud = false;
    }
    else if(hud == false){
        document.querySelector(".speed-wrap").style.display = "block";
        hud = true;
    }
}

// Atualiza valores de dinheiro
function updateMoney(money, bank){
    document.getElementById('money-carteira').innerText = `$RS${money}`;
    document.getElementById('money-banco').innerText = `$RS${bank}`;
}
