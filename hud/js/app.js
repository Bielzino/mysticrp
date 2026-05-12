import { updateHud , controllHud } from './stats.js';
import { updateSpeed , activeSpeed} from './speed.js';

// Evento para mostrar/esconder o velocímetro
cef.on("UI:ShowSpeed", (status) => {
    if(status == true){
        activeSpeed();
    }
});

// Evento para mostrar/esconder o HUD de status
cef.on("UI:ShowHUD", () => {
    controllHud();
});

// Evento para atualizar o HUD de status
cef.on("UpdateHUD", (hp, hunger, thirst, armor) => {
    updateHud('hp', hp);
    updateHud('ar', armor);
    updateHud('fd', hunger);
    updateHud('wt', thirst);
});

// Evento para atualizar o velocímetro
cef.on("UpdateSpeed", (speed) => {
    updateSpeed(speed);
});