"use strict";
export function createSlider(images) {
    let currentIndex = 0;
    const slider = document.createElement('div');
    slider.className = 'slider';
    slider.style.textAlign = 'center';
    const prevButton = document.createElement('button');
    prevButton.textContent = '←';
    prevButton.style.marginRight = '10px';
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateMainImage();
    });
    const mainImage = document.createElement('img');
    mainImage.style.width = '600px';
    mainImage.style.height = '400px';
    const nextButton = document.createElement('button');
    nextButton.textContent = '→';
    nextButton.style.marginLeft = '10px';
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateMainImage();
    });
    const thumbnails = document.createElement('div');
    thumbnails.className = 'thumbnails';
    thumbnails.style.marginTop = '10px';
    images.forEach((img, index) => {
        const thumb = document.createElement('img');
        thumb.src = img;
        thumb.alt = `Thumbnail ${index}`;
        thumb.style.width = '100px';
        thumb.style.height = '60px';
        thumb.style.margin = '5px';
        thumb.style.cursor = 'pointer';
        thumb.addEventListener('click', () => {
            currentIndex = index;
            updateMainImage();
        });
        thumbnails.appendChild(thumb);
    });
    function updateMainImage() {
        mainImage.src = images[currentIndex];
        Array.from(thumbnails.children).forEach((thumb, idx) => {
            if (thumb instanceof HTMLElement) {
                thumb.style.border = idx === currentIndex ? '2px solid blue' : '1px solid #ccc';
            }
        });
    }
    slider.append(prevButton, mainImage, nextButton, thumbnails);
    updateMainImage();
    return slider;
}
