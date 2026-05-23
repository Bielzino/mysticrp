const mapaImage = document.querySelector('.map-image');

// Removemos o controle por left/top e centralizamos tudo no transform matemático
function updateRadar(xGTA, yGTA, anguloGTA) {
    if (!mapaImage) return;

    const tamanhoImagem = 1000; // Tamanho da imagem no CSS
    const centroRadar = 100;    // Metade do tamanho do radar (200px / 2)

    // 1. Converte coordenadas GTA -> Pixels
    const pixelX = ((xGTA + 3000) / 6000) * tamanhoImagem;
    const pixelY = ((3000 - yGTA) / 6000) * tamanhoImagem;

    // 2. Zeramos o top e left do elemento para que eles não interfiram no cálculo
    mapaImage.style.left = '0px';
    mapaImage.style.top = '0px';

    // 3. Forçamos o ponto de rotação (Pivot) a ser SEMPRE o centro do radar (100px, 100px)
    // Isso impede o mapa de "orbitar" ou sambar para longe do meio
    mapaImage.style.transformOrigin = `${centroRadar}px ${centroRadar}px`;

    // 4. Calculamos o deslocamento linear puro para centralizar o ponto do player no radar
    const offsetX = centroRadar - pixelX;
    const offsetY = centroRadar - pixelY;

    // 5. A ORDEM DOS FATORES ALTERA O PRODUTO: 
    // Primeiro aplicamos a rotação baseada no centro do radar, e DEPOIS a translação.
    // Inverter essa ordem no string do CSS é o que elimina o efeito "samba".
    mapaImage.style.transform = `rotate(${-anguloGTA}deg) translate(${offsetX}px, ${offsetY}px)`;
}