function changeImgMarker(type) {
    let imgName;

    switch(type) {
        case 'bank':
            imgName = 'bank.png';
            break;
        case 'hospital':
            imgName = 'hospital.png';
            break;
        case 'shop':
            imgName = 'shop.png';
            break;
        default:
            imgName = 'shop.png';
            break;
    }

    document.getElementById('markerImg').src = `./imgs/${imgName}`;
}