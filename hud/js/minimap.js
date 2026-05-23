const mapaImage = document.querySelector('.map-image');

function updateRadar(xGTA, yGTA, anguloGTA) {
    if (!mapaImage) return;

    const tamanhoImagem = 1000; // Tamanho da imagem no CSS
    const centroRadar = 100;    // Metade do tamanho do radar (200px / 2)

    // 1. Converte coordenadas GTA -> Pixels (Onde o player está no mapa)
    const pixelX = ((xGTA + 3000) / 6000) * tamanhoImagem;
    const pixelY = ((3000 - yGTA) / 6000) * tamanhoImagem;

    // 2. Move a imagem de forma que o ponto do Player fique no centro do Radar
    // Usamos left e top puros aqui para travar a posição linear
    const mapaLeft = centroRadar - pixelX;
    const mapaTop = centroRadar - pixelY;
    
    mapaImage.style.left = `${mapaLeft}px`;
    mapaImage.style.top = `${mapaTop}px`;

    // 3. O SEGREDO: Define o ponto de rotação EXATAMENTE em cima do player
    // Assim, quando o mapa girar, o player continua no mesmo X e Y
    mapaImage.style.transformOrigin = `${pixelX}px ${pixelY}px`;

    // 4. Aplica a rotação invertida
    mapaImage.style.transform = `rotate(${-anguloGTA}deg)`;
}