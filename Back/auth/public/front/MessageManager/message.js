export function showMessage(type, message) {
    const messageWindow = document.querySelector('.window-message-all');
    const typeSpan = document.querySelector('.type-of-message span');
    const messageP = document.querySelector('.message p');

    typeSpan.textContent = type;
    messageP.textContent = message;
    messageWindow.style.display = 'flex';

    // Закрытие окна при клике вне его
    messageWindow.addEventListener('click', (event) => {
        if (event.target === messageWindow) {
            messageWindow.style.display = 'none';
        }
    });
}