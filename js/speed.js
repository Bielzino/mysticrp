const speedEl = document.getElementById('speed-val');
const rpmEl = document.getElementById('rpm-arc');
const gearEl = document.getElementById('gear-val');
let speed = false;

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

function updateSpeed(speedMph) {
    // MPH -> KM/H
    let speed = Math.floor(speedMph * 1.60934);

    // Limite do velocímetro
    speed = Math.min(speed, 260);

    // Atualiza velocidade
    if (speedEl) speedEl.innerText = speed.toString().padStart(3, '0');

    // Calcula marcha
    const gear = getGear(speed);

    // Atualiza marcha
    if (gearEl) gearEl.innerText = gear;

    // Calcula RPM
    const rpmRatio = getRPMRatio(speed, gear);

    // Atualiza arco RPM
    if (rpmEl) {
        rpmEl.style.strokeDashoffset = 440 - (rpmRatio * (440 * 0.65));

        // Cor RPM
        if (rpmRatio > 0.80) {
            rpmEl.style.stroke = "var(--danger)";
        } else {
            rpmEl.style.stroke = "var(--primary)";
        }
    }
}

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