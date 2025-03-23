export function showMessage(type, message) {
    const messageWindow = document.querySelector('.window-message-all');
    const typeSpan = document.querySelector('.type-of-message span');
    const messageP = document.querySelector('.message p');
    const typeContainer = document.querySelector('.type-of-message');

    typeSpan.textContent = type;
    messageP.textContent = message;

    // Удаляем предыдущий класс и добавляем новый в зависимости от типа
    typeContainer.classList.remove('fail');
    if (type === 'Fail:(') {
        typeContainer.classList.add('fail');
    }

    messageWindow.style.display = 'flex';

    messageWindow.addEventListener('click', (event) => {
        if (event.target === messageWindow) {
            messageWindow.style.display = 'none';
        }
    });
}