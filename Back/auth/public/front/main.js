import { validateEmail } from './FieldValidator/validation.js';
import { showMessage } from './MessageManager/message.js';

// Получаем элементы
const nameBlockRegistr = document.querySelector('.name-block-registr'); // Заголовок "Регистрация"
const nameBlockLogin = document.querySelector('.name-block-login');     // Заголовок "Вход"
const registrForm = document.querySelector('.registr-form');           // Форма регистрации
const loginForm = document.querySelector('.login-form');               // Форма входа
const orLoginBlock = document.querySelector('.orLogin');               // Блок "Уже есть аккаунт?"
const orRegistrBlock = document.querySelector('.orRegistr');           // Блок "Нет аккаунта?"
const btnOrLogin = document.querySelector('.btn-orLogin button');      // Кнопка "Войти"
const btnOrRegistr = document.querySelector('.btn-orRegistr button');  // Кнопка "Зарегистрироваться"
const preload = document.getElementById('preload');                    // Прелоадер (должен быть в HTML)

// Функция для показа формы регистрации
function showRegistr() {
    nameBlockRegistr.classList.add('active');    // Показываем заголовок "Регистрация"
    registrForm.classList.add('active');         // Показываем форму регистрации
    orLoginBlock.classList.add('active');        // Показываем блок "Уже есть аккаунт?"
    nameBlockLogin.classList.remove('active');   // Скрываем заголовок "Вход"
    loginForm.classList.remove('active');        // Скрываем форму входа
    orRegistrBlock.classList.remove('active');   // Скрываем блок "Нет аккаунта?"
}

// Функция для показа формы входа
function showLogin() {
    nameBlockLogin.classList.add('active');      // Показываем заголовок "Вход"
    loginForm.classList.add('active');           // Показываем форму входа
    orRegistrBlock.classList.add('active');      // Показываем блок "Нет аккаунта?"
    nameBlockRegistr.classList.remove('active'); // Скрываем заголовок "Регистрация"
    registrForm.classList.remove('active');      // Скрываем форму регистрации
    orLoginBlock.classList.remove('active');     // Скрываем блок "Уже есть аккаунт?"
}

// Изначально показываем регистрацию
showRegistr();

// Переключение между формами
btnOrLogin.addEventListener('click', showLogin);
btnOrRegistr.addEventListener('click', showRegistr);

// Обработчик формы регистрации
registrForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.querySelector('.registr-form input[name="nameProfile"]').value.trim();
    const email = document.querySelector('.registr-form input[name="email"]').value.trim();
    const password = document.querySelector('.registr-form input[name="password"]').value.trim();

    if (!name || !email || !password) {
        showMessage('Fail:(', 'Все поля обязательны для заполнения');
        return;
    }
    if (!validateEmail(email)) {
        showMessage('Fail', 'Неверный формат email');
        return;
    }
    if (password.length < 6) {
        showMessage('Fail:(', 'Пароль должен быть не менее 6 символов');
        return;
    }
    if (name.length < 2) {
        showMessage('Fail:(', 'Имя должно содержать минимум 2 символа');
        return;
    }
    if (!/[0-9]/.test(password) || !/[A-Z]/.test(password)) {
        showMessage('Fail:(', 'Пароль должен содержать цифры и заглавные буквы');
        return;
    }

    try {
        showMessage('Loading...', 'Отправка данных...');
        const response = await fetch('http://localhost:5500/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();

        if (response.ok) {
            showMessage('Success!', 'Регистрация успешна');
            setTimeout(() => {
                preload.style.display = 'flex'; // Показываем прелоадер
                window.location.href = 'main.html';
            }, 2000);
        } else {
            showMessage('Fail:(', data.error || 'Ошибка регистрации');
        }
        if (response.status === 422) {
            showMessage('Fail:(', 'Пользователь с таким email уже существует');
        } else if (response.status === 500) {
            showMessage('Fail:(', 'Внутренняя ошибка сервера');
        }
    } catch (error) {
        showMessage('Fail:(', 'Ошибка сервера');
    }
});

// Обработчик формы входа
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.querySelector('.login-form input[name="nameProfile"]').value.trim();
    const email = document.querySelector('.login-form input[name="email"]').value.trim();
    const password = document.querySelector('.login-form input[name="password"]').value.trim();

    if (!email || !password) {
        showMessage('Fail:(', 'Все поля обязательны для заполнения');
        return;
    }
    if (!validateEmail(email)) {
        showMessage('Fail:(', 'Неверный формат email');
        return;
    }
    if (name.length < 2) {
        showMessage('Fail:(', 'Имя должно содержать минимум 2 символа');
        return;
    }

    try {
        showMessage('Loading...', 'Вход в систему...');
        const response = await fetch('http://localhost:5500/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.jwt);
            showMessage('Success!', 'Вход успешен');
            preload.style.display = 'flex'; // Показываем прелоадер
            setTimeout(() => {
                window.location.href = 'main.html';
            }, 2000);
        } else {
            showMessage('Fail:(', data.error || 'Неверный email или пароль');
        }
    } catch (error) {
        showMessage('Fail:(', 'Ошибка сервера');
    }
});