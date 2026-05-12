hud

export function updateHud(type, percent) {
    const bar = document.querySelector(`.bar-inner.${type}`);
    if (bar) {
        bar.style.width = `${percent}%`;
    }
}

export function controllHud(status){
    if(hud == true){
        activeSpeed();
    }
    else if(hud == false){
        document.querySelector(".speed-wrap").style.display = "none";
        speed = false;
    }
}