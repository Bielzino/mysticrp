let hud = false;

function updateHud(type, percent) {
    const bar = document.querySelector(`.bar-inner.${type}`);
    if (bar) {
        bar.style.width = `${percent}%`;
    }
}

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