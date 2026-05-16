// --- SISTEMA DO MINIMAPA ---
let mapX = -400;
let mapY = -400;
const velocidade = 15;
const mapa = document.getElementById('mapa');

// Nova função adaptada para receber as coordenadas do GTA SA (Ex: 2494, -1685)
function changePosition(xGTA, yGTA) {
    const tamanhoImagem = 1000; // Largura/Altura da imagem do mapa no CSS
    const centroRadar = 100;    // Metade da moldura de 200px para centralizar o ponto

    // 1. Converte a posição do GTA (-3000 a 3000) para pixels (0 a 1000)
    let pixelX = ((xGTA + 3000) / 6000) * tamanhoImagem;
    let pixelY = ((3000 - yGTA) / 6000) * tamanhoImagem;

    // 2. Calcula o deslocamento do mapa em relação ao centro do radar (invertendo o valor)
    mapX = (pixelX - centroRadar) * -1;
    mapY = (pixelY - centroRadar) * -1;

    // 3. Aplica o posicionamento no elemento HTML
    if (mapa) {
        mapa.style.left = mapX + 'px';
        mapa.style.top = mapY + 'px';
    }
}
