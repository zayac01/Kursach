import { Ad } from "./Ad";


export function createAdCard(ad: Ad, onClick: () => void): HTMLElement {
    const card = document.createElement('div');
    card.className = 'ad-card';
    card.style.cursor = 'pointer';
    card.style.border = '1px solid #ccc';
    card.style.padding = '10px';
    card.style.width = '200px';
  
    const firstImage = ad.images[0]?.url || 'placeholder.jpg';
    const img = document.createElement('img');
    img.src = firstImage;
    img.alt = `${ad.brand} ${ad.model}`;
    img.style.width = '100%';
    img.style.height = 'auto';
  
    const h3 = document.createElement('h3');
    h3.textContent = `${ad.brand} ${ad.model} ${ad.generation || ''}`;
  
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
  
    const priceP = document.createElement('p');
    priceP.textContent = `Стоимость: ${ad.price} руб.`;
  
    card.append(img, h3, yearP, mileageP, engineP, driveP, bodyP, steeringP, priceP);
    card.addEventListener('click', onClick);
  
    return card;
  }