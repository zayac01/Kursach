import { Ad } from "./Ad";

export function createAdFullView(ad: Ad, onClose: () => void): HTMLElement {
    const fullView = document.createElement('div');
    fullView.className = 'ad-full-view';
    fullView.style.position = 'fixed';
    fullView.style.top = '60px'; // Below header
    fullView.style.left = '0';
    fullView.style.right = '0';
    fullView.style.bottom = '0';
    fullView.style.background = 'white';
    fullView.style.padding = '20px';
    fullView.style.overflowY = 'auto';
  
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Закрыть';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.addEventListener('click', onClose);
  
    const h2 = document.createElement('h2');
    h2.textContent = `${ad.brand} ${ad.model} ${ad.generation || ''}`;
  
    const yearP = document.createElement('p');
    yearP.textContent = `Год: ${ad.year}`;
  
    const priceP = document.createElement('p');
    priceP.textContent = `Стоимость: ${ad.price} руб.`;
  
    const engineP = document.createElement('p');
    engineP.textContent = `Двигатель: ${ad.engineMod}`;
  
    const driveP = document.createElement('p');
    driveP.textContent = `Привод: ${ad.driveType}`;
  
    const bodyP = document.createElement('p');
    bodyP.textContent = `Кузов: ${ad.body}`;
  
    const steeringP = document.createElement('p');
    steeringP.textContent = `Руль: ${ad.engineType.includes('right') ? 'Правый' : 'Левый'}`;
  
    const transmissionP = document.createElement('p');
    transmissionP.textContent = `Коробка передач: ${ad.transmission}`;
  
    const optionsP = document.createElement('p');
    optionsP.textContent = `Комплектация: ${ad.options.join(', ')}`;
  
    const descriptionP = document.createElement('p');
    descriptionP.textContent = `Описание: ${ad.description}`;
  
    const contactsP = document.createElement('p');
    contactsP.textContent = `Телефон: ${ad.contacts}`;
  
    const slider = createSlider(ad.images.slice(0, 11).map(img => img.url));
  
    fullView.append(closeButton, h2, yearP, priceP, engineP, driveP, bodyP, steeringP, transmissionP, optionsP, descriptionP, contactsP, slider);
  
    return fullView;
  }