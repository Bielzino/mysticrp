let angle = 0;

function updateRotation(anguloGTA) {
    if (mapa) {
        if(angle != anguloGTA){
            angle = anguloGTA;
            mapa.style.transform = `rotate(${-anguloGTA}deg)`;
        }
    }
}

function changePosition(xGTA, yGTA) {
    if (!mapa) return; // Garante que o mapa existe antes de aplicar

    const tamanhoImagem = 1000;
    const centroRadar = 100;

    // Converte coordenadas GTA -> pixels
    const pixelX = ((xGTA + 3000) / 6000) * tamanhoImagem;
    const pixelY = ((3000 - yGTA) / 6000) * tamanhoImagem;

    // Faz o player ficar no centro do radar
    const mapX = centroRadar - pixelX;
    const mapY = centroRadar - pixelY;

    // --- O QUE ESTAVA FALTANDO: Aplicar no CSS ---
    mapa.style.left = `${mapX}px`;
    mapa.style.top = `${mapY}px`;
}