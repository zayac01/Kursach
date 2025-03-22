// addCar.js
import { showMessage } from './MessageManager/message';

// Класс для обработки формы
class AdFormHandler {
    constructor(formId, preloadId) {
        this.form = document.getElementById(formId);
        this.preload = document.getElementById(preloadId);
        console.log('Форма:', this.form); // Должна вывести элемент формы
        console.log('Прелоадер:', this.preload);
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        if (!this.form) {
            console.error('Форма не найдена!');
            return;
        }
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log('Форма отправлена, стандартное поведение предотвращено');
        this.preload.style.display = 'flex'; // Показываем прелоадер

        const formData = new FormData(this.form);
        const token = localStorage.getItem('token');
        console.log('Токен:', token);
        if (!token) {
            showMessage('Fail:(', 'Необходимо авторизоваться');
            this.preload.style.display = 'none';
            console.log('Токен отсутствует, сообщение должно появиться');
            return;
        }

        try {
            console.log('Отправка запроса на сервер');
            const response = await fetch('http://localhost:5500/api/ads', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            console.log('Статус ответа:', response.status);
            const data = await response.json();

            if (response.ok) {
                showMessage('Success!', 'Объявление успешно создано');
                setTimeout(() => {
                    window.location.href = 'main.html';
                }, 2000);
            } else {
                console.log('Ошибка от сервера:', data);
                showMessage('Fail:(', data.error || 'Ошибка при создании объявления');
                this.preload.style.display = 'none';
            }
        } catch (error) {
            console.error('Ошибка в запросе:', error);
            showMessage('Fail:(', 'Ошибка сервера');
            this.preload.style.display = 'none';
        }
    }
}

// Инициализация обработчика формы
const adFormHandler = new AdFormHandler('createAdForm', 'preload');