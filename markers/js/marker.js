//Ex: changeColor('#ff0000');

function changeColor(color) {
    const circle = document.querySelector('.circle');
    if (circle) {
        circle.style.borderColor = color;
        circle.style.setProperty('box-shadow', `0 0 35px ${color}, inset 0 0 25px ${color}`, 'important');
        circle.style.background = color + '20'; // Adiciona transparência
    }
}

cef.on('changeColor', (color) => {
    console.log('Received color change event:', color);
    changeColor(color);
})