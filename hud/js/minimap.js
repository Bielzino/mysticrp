function changePosition(xGTA, yGTA, anguloGTA) {

    const tamanhoImagem = 1000;
    const centroRadar = 100;

    // Converte coordenadas GTA -> pixels
    const pixelX = ((xGTA + 3000) / 6000) * tamanhoImagem;
    const pixelY = ((3000 - yGTA) / 6000) * tamanhoImagem;

    // Faz o player ficar no centro do radar
    const mapX = centroRadar - pixelX;
    const mapY = centroRadar - pixelY;

    if (mapa) {

        mapa.style.transformOrigin = "50% 50%";

        mapa.style.transform =
            `translate(${mapX}px, ${mapY}px) rotate(${-anguloGTA}deg)`;
    }
}
