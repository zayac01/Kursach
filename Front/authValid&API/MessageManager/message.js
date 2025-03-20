class MessageManager {
    static show(type, message) {
        const messageWindow = document.querySelector('.window-message-all');
        const typeSpan = document.querySelector('.type-of-message span');
        const messageP = document.querySelector('.message p');

        typeSpan.textContent = type;
        messageP.textContent = message;
        messageWindow.style.display = 'flex';
        messageWindow.classList.toggle('fail', type === 'Fail:(');

        messageWindow.addEventListener('click', (event) => {
            if (event.target === messageWindow) {
                messageWindow.style.display = 'none';
            }
        });
    }
}

export default MessageManager;