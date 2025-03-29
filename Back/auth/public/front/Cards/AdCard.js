"use strict";
export function createAdCard(ad, onClick) {
    var _a;
    const card = document.createElement('div');
    card.className = 'offer';
    card.style.cursor = 'pointer';

    const imgBlock = document.createElement('div');
    imgBlock.className = 'img-block-offer';
    const img = document.createElement('img');
    img.src = ad.images?.[0]?.url || 'https://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fleostone.ru%2Fwp-content%2Fuploads%2Fwood-blog-placeholder.jpg&lr=49&pos=5&rpt=simage&text=placeholder';
    img.alt = `${ad.brand} ${ad.model}`;
    img.onerror = function() {
        this.src = 'https://yandex.ru/images/search?from=tabbar&img_url=https%3A%2F%2Fleostone.ru%2Fwp-content%2Fuploads%2Fwood-blog-placeholder.jpg&lr=49&pos=5&rpt=simage&text=placeholder';
    };
    imgBlock.appendChild(img);

    const nameBlock = document.createElement('div');
    nameBlock.className = 'name-block-offer';
    const nameH3 = document.createElement('h3');
    nameH3.textContent = `${ad.brand} ${ad.model} ${ad.generation || ''}`;
    nameBlock.appendChild(nameH3);

    const aboutBlock = document.createElement('div');
    aboutBlock.className = 'about-block-offer';
    const yearP = document.createElement('p');
    yearP.textContent = `Год: ${ad.year}`;
    const mileageP = document.createElement('p');
    mileageP.textContent = `Пробег: ${ad.mileage} км`;
    const engineP = document.createElement('p');
    engineP.textContent = `Двигатель: ${ad.engineMod}`;
    const driveP = document.createElement('p');
    driveP.textContent = `Привод: ${ad.driveType}`;
    const bodyP = document.createElement('p');
    bodyP.textContent = `Кузов: ${ad.body}`;
    const steeringP = document.createElement('p');
    steeringP.textContent = `Руль: ${ad.engineType.includes('right') ? 'Правый' : 'Левый'}`;
    aboutBlock.append(yearP, mileageP, engineP, driveP, bodyP, steeringP);

    const priceBlock = document.createElement('div');
    priceBlock.className = 'price-block-offer';
    const priceH3 = document.createElement('h3');
    priceH3.textContent = `${ad.price} руб.`;
    priceBlock.appendChild(priceH3);

    card.append(imgBlock, nameBlock, aboutBlock, priceBlock);
    card.addEventListener('click', onClick);
    return card;
}
