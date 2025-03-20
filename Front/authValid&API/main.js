import FieldValidator from './FieldValidator/validation.js';
import ApiService from './ApiService/api.js';
import MessageManager from './MessageManager/message.js';
import TransitionManager from './TransitionManager/transition.js';

document.querySelector('.registr form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    // Получаем элементы ввода
    const nameProfileInput = document.querySelector('input[name="nameProfile"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    // Получаем значения полей
    const name = nameProfileInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    // Проводим валидацию
    const isNameValid = FieldValidator.validateName(name);
    const isEmailValid = FieldValidator.validateEmail(email);
    const isPasswordValid = FieldValidator.validatePassword(password);

    // Подсвечиваем поля в зависимости от результата валидации
    FieldValidator.highlightField(nameProfileInput, isNameValid);
    FieldValidator.highlightField(emailInput, isEmailValid);
    FieldValidator.highlightField(passwordInput, isPasswordValid);

    // Если все поля валидны, отправляем данные на сервер
    // if (isNameValid && isEmailValid && isPasswordValid) {
    //     try {
    //         const response = await fetch('/users/register', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ nameProfile, email, password })
    //         });
    //         const data = await response.json();

    //         // Обрабатываем ответ сервера
    //         if (data.success) {
    //             MessageManager.show('Success!', 'Регистрация успешна');
    //             setTimeout(() => TransitionManager.start('/'), 2000); // Переход на главную страницу через 2 секунды
    //         } else {
    //             MessageManager.show('Fail:(', 'Ошибка регистрации');
    //         }
    //     } catch (error) {
    //         MessageManager.show('Fail:(', 'Ошибка сервера');
    //     }
    // } else {
    //     // Показываем сообщение об ошибке, если валидация не прошла
    //     MessageManager.show('Fail:(', 'Ошибки в форме');
    // }
    
        try { // for test
            const response = await fetch('/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await response.json();

            // Обрабатываем ответ сервера
            if (data.success) {
                MessageManager.show('Success!', 'Регистрация успешна');
                setTimeout(() => TransitionManager.start('/'), 2000); // Переход на главную страницу через 2 секунды
            } else {
                MessageManager.show('Fail:(', 'Ошибка регистрации');
            }
        } catch (error) {
            MessageManager.show('Fail:(', 'Ошибка сервера');
        }
    
});