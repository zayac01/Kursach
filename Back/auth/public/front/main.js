import { validateEmail } from './FieldValidator/validation.js';
import { showMessage } from './MessageManager/message.js';

document.querySelector('.registr-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Предотвращаем стандартную отправку формы

    // Получаем элементы ввода
    const nameProfileInput = document.querySelector('input[name="nameProfile"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    // Получаем значения полей
    const name = nameProfileInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Валидация данных
    if (!name || !email || !password) {
        showMessage('Fail:(', 'Все поля обязательны для заполнения');
        return;
    }
    if (!validateEmail(email)) {
        showMessage('Fail:(', 'Неверный формат email');
        return;
    }
    if (password.length < 6) {
        showMessage('Fail:(', 'Пароль должен быть не менее 6 символов');
        return;
    }

    // Отправка данных на сервер
    try {
        const response = await fetch('http://localhost:5500/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();

        if (response.ok) {
            showMessage('Success!', 'Регистрация успешна');
            // Здесь можно добавить перенаправление или очистку формы
        } else {
            showMessage('Fail:(', data.error || 'Ошибка регистрации');
        }
    } catch (error) {
        showMessage('Fail:(', 'Ошибка сервера');
    }
});