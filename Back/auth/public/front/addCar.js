class AdFormHandler {
    constructor(formId, preloadId) {
        this.form = document.getElementById(formId);
        this.preload = document.getElementById(preloadId);
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
        this.preload.style.display = 'flex'; // Показываем прелоадер

        const token = localStorage.getItem('token');
        if (!token) {
            alert('Необходимо авторизоваться');
            this.preload.style.display = 'none';
            return;
        }

        // Получаем параметры аутентификации от сервера
        let authParams;
        try {
            const response = await fetch('http://localhost:5500/auth');
            authParams = await response.json();
        } catch (error) {
            alert('Не удалось получить параметры аутентификации');
            this.preload.style.display = 'none';
            return;
        }

        // Настраиваем ImageKit
        const imagekit = new ImageKit({
            publicKey: 'public_c3jSvrlv3iH5+hdRLooMtczaVqc=', // Замените на ваш публичный ключ
            urlEndpoint: 'https://ik.imagekit.io/your_imagekit_id/'
        });

        // Получаем файлы из формы
        const fileInput = this.form.querySelector('input[type="file"]');
        const files = fileInput?.files;
        if (!files || files.length === 0) {
            alert('Выберите хотя бы одно изображение');
            this.preload.style.display = 'none';
            return;
        }

        // Загружаем изображения в ImageKit
        const uploadPromises = Array.from(files).map(file => {
            return new Promise((resolve, reject) => {
                imagekit.upload({
                    file: file,
                    fileName: file.name,
                    token: authParams.token,
                    signature: authParams.signature,
                    expire: authParams.expire,
                    folder: '/VarCar-Img'
                }, (err, result) => {
                    if (err) reject(err);
                    else resolve(result.url);
                });
            });
        });

        try {
            const imageUrls = await Promise.all(uploadPromises);
            console.log('Изображения загружены:', imageUrls);

            // Собираем данные формы
            const formData = new FormData(this.form);
            const adData = {};
            formData.forEach((value, key) => {
                adData[key] = value;
            });
            adData.images = imageUrls; // Добавляем массив URL изображений

            // Отправляем данные на сервер
            const response = await fetch('http://localhost:5500/api/ads', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(adData)
            });

            if (response.ok) {
                alert('Объявление успешно создано');
                setTimeout(() => {
                    window.location.href = 'main.html';
                }, 2000);
            } else {
                const data = await response.json();
                alert(data.error || 'Ошибка при создании объявления');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка сервера');
        } finally {
            this.preload.style.display = 'none';
        }
    }
}

// Инициализация обработчика формы
const adFormHandler = new AdFormHandler('createAdForm', 'preload');