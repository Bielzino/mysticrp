const speedEl = document.getElementById('speed-val');
const rpmEl = document.getElementById('rpm-arc');
const gearEl = document.getElementById('gear-val');
let speed = false;

// Calcula a marcha baseada na velocidade
function getGear(speed)
{
    if(speed <= 0) return 'N';
    if(speed < 20) return 1;
    if(speed < 45) return 2;
    if(speed < 80) return 3;
    if(speed < 120) return 4;
    if(speed < 170) return 5;

    return 6;
}

// Calcula a proporção de RPM
function getRPMRatio(speed, gear)
{
    const ratios = {
        1: 0.90,
        2: 0.70,
        3: 0.55,
        4: 0.40,
        5: 0.30,
        6: 0.22
    };

    if(gear === 'N')
        return 0;

    return Math.min(
        1,
        (speed / 260) / ratios[gear]
    );
}

// Atualiza o velocímetro visualmente
function updateSpeed(speedMph) {
    let speed = Math.floor(speedMph * 1.60934);

    speed = Math.min(speed, 260);

    if (speedEl) speedEl.innerText = speed.toString().padStart(3, '0');

    const gear = getGear(speed);

    if (gearEl) gearEl.innerText = gear;

    const rpmRatio = getRPMRatio(speed, gear);

    if (rpmEl) {
        rpmEl.style.strokeDashoffset = 440 - (rpmRatio * (440 * 0.65));

        if (rpmRatio > 0.80) {
            rpmEl.style.stroke = "var(--danger)";
        } else {
            rpmEl.style.stroke = "var(--primary)";
        }
    }
}

// Atualiza vida e combustível do veículo
function updateVeh(vehLife, vehGas){
    document.getElementById('health-val').innerText = vehLife;
    document.getElementById('fuel-val').innerText = vehGas;
}

// Alterna a exibição do velocímetro
function activeSpeed(){
    if(speed == false){
        document.querySelector(".speed-wrap").style.display = "flex";
        speed = true;   
    }
    else if(speed == true){
        document.querySelector(".speed-wrap").style.display = "none";
        speed = false;   
    }
}
