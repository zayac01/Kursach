// "use strict";
// import { createSlider } from './Slider.js';

// export function createAdFullView(ad, onClose) {
//     const fullView = document.createElement('div');
//     fullView.className = 'ad-full-view';
//     fullView.style.position = 'fixed';
//     fullView.style.top = '60px'; // Below header
//     fullView.style.left = '0';
//     fullView.style.right = '0';
//     fullView.style.bottom = '0';
//     fullView.style.background = 'white';
//     fullView.style.padding = '20px';
//     fullView.style.overflowY = 'auto';
//     const closeButton = document.createElement('button');
//     closeButton.textContent = 'Закрыть';
//     closeButton.style.position = 'absolute';
//     closeButton.style.top = '10px';
//     closeButton.style.right = '10px';
//     closeButton.addEventListener('click', onClose);
//     const h2 = document.createElement('h2');
//     h2.textContent = `${ad.brand} ${ad.model} ${ad.generation || ''}`;
//     const yearP = document.createElement('p');
//     yearP.textContent = `Год: ${ad.year}`;
//     const priceP = document.createElement('p');
//     priceP.textContent = `Стоимость: ${ad.price} руб.`;
//     const engineP = document.createElement('p');
//     engineP.textContent = `Двигатель: ${ad.engineMod}`;
//     const driveP = document.createElement('p');
//     driveP.textContent = `Привод: ${ad.driveType}`;
//     const bodyP = document.createElement('p');
//     bodyP.textContent = `Кузов: ${ad.body}`;
//     const steeringP = document.createElement('p');
//     steeringP.textContent = `Руль: ${ad.engineType.includes('right') ? 'Правый' : 'Левый'}`;
//     const transmissionP = document.createElement('p');
//     transmissionP.textContent = `Коробка передач: ${ad.transmission}`;
//     const optionsP = document.createElement('p');
//     optionsP.textContent = `Комплектация: ${ad.options.join(', ')}`;
//     const descriptionP = document.createElement('p');
//     descriptionP.textContent = `Описание: ${ad.description}`;
//     const contactsP = document.createElement('p');
//     contactsP.textContent = `Телефон: ${ad.contacts}`;
//     const slider = createSlider(ad.images.slice(0, 11).map(img => img.url));
//     fullView.append(closeButton, h2, yearP, priceP, engineP, driveP, bodyP, steeringP, transmissionP, optionsP, descriptionP, contactsP, slider);
//     return fullView;
// }


// "use strict";
// import { createSlider } from './Slider.js';

// export function createAdFullView(ad, onClose) {
//     // Create modal container for background overlay
//     const modalContainer = document.createElement('div');
//     modalContainer.className = 'modal-container';
//     modalContainer.style.position = 'fixed';
//     modalContainer.style.top = '0';
//     modalContainer.style.left = '0';
//     modalContainer.style.right = '0';
//     modalContainer.style.bottom = '0';
//     modalContainer.style.background = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent background
//     modalContainer.style.display = 'flex';
//     modalContainer.style.justifyContent = 'center';
//     modalContainer.style.alignItems = 'center';
//     modalContainer.style.zIndex = '1000';

//     // Create the modal window itself
//     const fullView = document.createElement('div');
//     fullView.className = 'ad-full-view';
//     fullView.style.background = 'white';
//     fullView.style.padding = '20px';
//     fullView.style.width = '80%'; // Adjustable width
//     fullView.style.maxHeight = '90vh';
//     fullView.style.overflowY = 'auto';
//     fullView.style.position = 'relative';
//     fullView.style.borderRadius = '5px';

//     // Close button
//     const closeButton = document.createElement('button');
//     closeButton.textContent = 'Закрыть';
//     closeButton.style.position = 'absolute';
//     closeButton.style.top = '10px';
//     closeButton.style.right = '10px';
//     closeButton.addEventListener('click', () => {
//         onClose();
//         document.body.classList.remove('no-scroll');
//     });

//     // Ad content elements
//     const h2 = document.createElement('h2');
//     h2.textContent = `${ad.brand} ${ad.model} ${ad.generation || ''}`;
//     const yearP = document.createElement('p');
//     yearP.textContent = `Год: ${ad.year}`;
//     const priceP = document.createElement('p');
//     priceP.textContent = `Стоимость: ${ad.price} руб.`;
//     const engineP = document.createElement('p');
//     engineP.textContent = `Двигатель: ${ad.engineMod}`;
//     const driveP = document.createElement('p');
//     driveP.textContent = `Привод: ${ad.driveType}`;
//     const bodyP = document.createElement('p');
//     bodyP.textContent = `Кузов: ${ad.body}`;
//     const steeringP = document.createElement('p');
//     steeringP.textContent = `Руль: ${ad.engineType.includes('right') ? 'Правый' : 'Левый'}`;
//     const transmissionP = document.createElement('p');
//     transmissionP.textContent = `Коробка передач: ${ad.transmission}`;
//     const optionsP = document.createElement('p');
//     optionsP.textContent = `Комплектация: ${ad.options.join(', ')}`;
//     const descriptionP = document.createElement('p');
//     descriptionP.textContent = `Описание: ${ad.description}`;
//     const contactsP = document.createElement('p');
//     contactsP.textContent = `Телефон: ${ad.contacts}`;
//     const slider = createSlider(ad.images.slice(0, 11).map(img => img.url));

//     // Append content to modal window
//     fullView.append(closeButton, h2, yearP, priceP, engineP, driveP, bodyP, steeringP, transmissionP, optionsP, descriptionP, contactsP, slider);

//     // Append modal window to container
//     modalContainer.appendChild(fullView);

//     // Lock scroll on body
//     document.body.classList.add('no-scroll');

//     // Close on click outside the modal window
//     modalContainer.addEventListener('click', (event) => {
//         if (event.target === modalContainer) {
//             onClose();
//             document.body.classList.remove('no-scroll');
//         }
//     });

//     return modalContainer;
// }

"use strict";
import { createSlider } from './Slider.js';

export function createAdFullView(ad, onClose) {
    // Create modal container for background overlay
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    modalContainer.style.position = 'fixed';
    modalContainer.style.top = '0';
    modalContainer.style.left = '0';
    modalContainer.style.right = '0';
    modalContainer.style.bottom = '0';
    modalContainer.style.background = 'rgba(0, 0, 0, 0.5)'; // Semi-transparent background
    modalContainer.style.display = 'flex';
    modalContainer.style.justifyContent = 'center';
    modalContainer.style.alignItems = 'center';
    modalContainer.style.zIndex = '1000';

    // Create the modal window itself (section.selected-card-sec)
    const section = document.createElement('section');
    section.className = 'selected-card-sec';

    // Create the selected-card div
    const selectedCard = document.createElement('div');
    selectedCard.className = 'selected-card';

    // Name and cost block
    const nameAndCostBlock = document.createElement('div');
    nameAndCostBlock.className = 'name-and-cost-selected-card-block';
    const nameDiv = document.createElement('div');
    nameDiv.className = 'name-selected-card';
    const nameH1 = document.createElement('h1');
    nameH1.textContent = `${ad.brand} ${ad.model}, ${ad.year}`;
    nameDiv.appendChild(nameH1);
    const costDiv = document.createElement('div');
    costDiv.className = 'cost-of-selected-card';
    const costH1 = document.createElement('h1');
    costH1.textContent = `${ad.price} руб.`;
    costDiv.appendChild(costH1);
    nameAndCostBlock.append(nameDiv, costDiv);

    // Image slider block
    const imgSliderBlock = document.createElement('div');
    imgSliderBlock.className = 'img-slider-selected-card-block';
    const mainImgDiv = document.createElement('div');
    mainImgDiv.className = 'img-slider-selected-card main';
    const mainImg = document.createElement('img');
    mainImg.src = ad.images[0]?.url || 'placeholder.jpg';
    mainImg.alt = 'Main image';
    mainImgDiv.appendChild(mainImg);
    const thumbsDiv = document.createElement('div');
    thumbsDiv.className = 'img-slider-selected-card';
    ad.images.slice(0, 5).forEach(img => {
        const thumbImg = document.createElement('img');
        thumbImg.src = img.url;
        thumbImg.alt = 'Thumbnail';
        thumbsDiv.appendChild(thumbImg);
    });
    imgSliderBlock.append(mainImgDiv, thumbsDiv);

    // Button block (for "Показать телефон")
    const btnBlock = document.createElement('div');
    btnBlock.className = 'btn-selected-card-block';
    const showPhoneBtn = document.createElement('button');
    showPhoneBtn.textContent = 'Показать телефон';
    showPhoneBtn.addEventListener('click', () => alert(ad.contacts));
    btnBlock.appendChild(showPhoneBtn);

    // Characteristics block
    const charBlock = document.createElement('div');
    charBlock.className = 'char-selected-card-block';
    const charNameDiv = document.createElement('div');
    charNameDiv.className = 'char-selected-card-block-name';
    const charNameH1 = document.createElement('h1');
    charNameH1.className = 'char-name';
    charNameH1.textContent = 'Характеристики';
    charNameDiv.appendChild(charNameH1);
    const charValueDiv = document.createElement('div');
    charValueDiv.className = 'char-selected-card-block-value';

    // Create characteristic columns
    const charColumns = [
        ['Год', ad.year],
        ['Пробег', `${ad.mileage} км`],
        ['Двигатель', ad.engineMod],
        ['Привод', ad.driveType],
        ['Кузов', ad.body],
        ['Руль', ad.engineType.includes('right') ? 'Правый' : 'Левый'],
        ['Коробка передач', ad.transmission],
        ['Комплектация', ad.options.join(', ')],
        ['Описание', ad.description],
        ['Телефон', ad.contacts]
    ];

    charColumns.forEach(([label, value]) => {
        const column = document.createElement('div');
        column.className = 'char-value-column';
        const row = document.createElement('div');
        row.className = 'char-value-rows';
        row.textContent = `${label}: ${value}`;
        column.appendChild(row);
        charValueDiv.appendChild(column);
    });
    charBlock.append(charNameDiv, charValueDiv);

    // Map block (empty for now)
    const mapBlock = document.createElement('div');
    mapBlock.className = 'map-selected-card-block';

    // About block (empty for now)
    const aboutBlock = document.createElement('div');
    aboutBlock.className = 'about-selected-card-block';

    // Append all blocks to selected-card
    selectedCard.append(nameAndCostBlock, imgSliderBlock, btnBlock, charBlock, mapBlock, aboutBlock);
    section.appendChild(selectedCard);

    // Append section to modal container
    modalContainer.appendChild(section);

    // Lock scroll on body
    document.body.classList.add('no-scroll');

    // Close on click outside the modal window
    modalContainer.addEventListener('click', (event) => {
        if (event.target === modalContainer) {
            onClose();
            document.body.classList.remove('no-scroll');
        }
    });

    return modalContainer;
}