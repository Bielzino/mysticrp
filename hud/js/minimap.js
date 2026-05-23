const mapaImage = document.querySelector('.map-image');

// Variáveis para guardar a posição visual atual do mapa na tela
let mapaVisualLeft = null;
let mapaVisualTop = null;

// Configurações do Radar
const tamanhoImagem = 1000; 
const centroRadar = 100;    

/**
 * Atualiza o radar. A rotação é instantânea, mas o X e Y deslizam suavemente.
 * @param {number} xGTA - Coordenada X do jogo
 * @param {number} yGTA - Coordenada Y do jogo
 * @param {number} anguloGTA - Rotação do jogador/câmera
 */
function updateRadar(xGTA, yGTA, anguloGTA) {
    if (!mapaImage) return;

    // 1. Converte coordenadas GTA -> Pixels (Alvo para onde o mapa deve ir)
    const pixelX = ((xGTA + 3000) / 6000) * tamanhoImagem;
    const pixelY = ((3000 - yGTA) / 6000) * tamanhoImagem;

    const alvoLeft = centroRadar - pixelX;
    const alvoTop = centroRadar - pixelY;

    // 2. Se for a primeira vez que a função roda, joga o mapa direto na posição
    if (mapaVisualLeft === null || mapaVisualTop === null) {
        mapaVisualLeft = alvoLeft;
        mapaVisualTop = alvoTop;
    }

    // 3. MATEMÁTICA DA SUAVIZAÇÃO (LERP) apenas para X e Y:
    // O valor 0.1 significa que o mapa vai andar 10% da distância até o alvo por frame.
    // Aumente para andar mais rápido (ex: 0.2) ou diminua para ficar mais lento (ex: 0.05).
    const suavizacao = 0.1; 
    mapaVisualLeft += (alvoLeft - mapaVisualLeft) * suavizacao;
    mapaVisualTop += (alvoTop - mapaVisualTop) * suavizacao;

    // 4. Aplica a posição suavizada no left/top
    mapaImage.style.left = `${mapaVisualLeft}px`;
    mapaImage.style.top = `${mapaTopVisual}px`;

    // 5. ROTAÇÃO INSTANTÂNEA: 
    // O eixo de rotação acompanha a suavização da posição para não bugar
    const pivotX = centroRadar - mapaVisualLeft;
    const pivotY = centroRadar - mapaVisualTop;
    
    mapaImage.style.transformOrigin = `${pivotX}px ${pivotY}px`;
    mapaImage.style.transform = `rotate(${-anguloGTA}deg)`;
}