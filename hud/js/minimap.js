const mapaImage = document.querySelector('.map-image');

// Atualiza o radar com a posição e rotação do jogador
function updateRadar(xGTA, yGTA, anguloGTA) {
    if (!mapaImage) return;

    const tamanhoImagem = 1000; 
    const centroRadar = 100;    

    const pixelX = ((xGTA + 3000) / 6000) * tamanhoImagem;
    const pixelY = ((3000 - yGTA) / 6000) * tamanhoImagem;

    mapaImage.style.left = '0px';
    mapaImage.style.top = '0px';

    mapaImage.style.transformOrigin = `${centroRadar}px ${centroRadar}px`;

    const offsetX = centroRadar - pixelX;
    const offsetY = centroRadar - pixelY;

    mapaImage.style.transform = `rotate(${-anguloGTA}deg) translate(${offsetX}px, ${offsetY}px)`;
}
