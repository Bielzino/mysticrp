// Mostra/esconde o velocímetro
cef.on("UI:ShowSpeed", (status) => {
    if(status == true){
        activeSpeed();
    }
});

// Mostra/esconde o HUD de status
cef.on("UI:ShowHUD", () => {
    controllHud();        
});

// Atualiza o HUD de status
cef.on("UpdateHUD", (hp, hunger, thirst, armor, money, bank) => {
    updateHud('hp', hp);
    updateHud('ar', armor);
    updateHud('fd', hunger);
    updateHud('wt', thirst);
    updateMoney(money, bank);
});

// Atualiza o velocímetro
cef.on("UpdateSpeed", (speed) => {
    updateSpeed(speed);
});

// Atualiza posição no radar
cef.on("UpdatePosition", (x, y, angle) => {
    updateRadar(x, y, angle);
});

// Atualiza status do veículo
cef.on("UpdateVehicle", (vehLife, vehGas) => {
    updateVeh(vehLife, vehGas);
});
