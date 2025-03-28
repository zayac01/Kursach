// import ImageKit from "imagekit";

class AdFormHandler {
    constructor(formId, preloadId) {
        this.form = document.getElementById(formId);
        this.preload = document.getElementById(preloadId);
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        if (!this.form) {
            // Форма не найдена, просто выходим, обработка ошибки опциональна
            return;
        }
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.preload.style.display = 'flex'; // Показываем прелоадер

        const token = localStorage.getItem('token');
        if (!token) {
            // Токен отсутствует, выходим (можно добавить свою обработку)
            this.preload.style.display = 'none';
            return;
        }

        // Настраиваем Cloudinary Upload Widget
        const widget = cloudinary.createUploadWidget({
            cloudName: 'di2irrwgs', // Замените на ваше cloud_name
            uploadPreset: 'Signed', // Замените на ваш upload preset
            folder: 'FirstFolder', // Папка в Cloudinary
            multiple: true,
            maxFiles: 11,
        }, (error, result) => {
            if (error) {
                console.error('Ошибка в виджете Cloudinary:', error);
                alert('Ошибка загрузки изображений');
                this.preload.style.display = 'none';
                return;
            }
            if (result && result.event === "success") {
                const imageUrls = result.info.files ? result.info.files.map(file => file.url) : [result.info.url];
                this.uploadImagesToServer(imageUrls);
            } else {
                console.log('Неожиданный результат от виджета:', result);
                this.preload.style.display = 'none'; // Скрываем прелоадер, если событие не "success"
            }
        });

        // Открываем виджет для загрузки
        widget.open().then(() => {
            clearTimeout(timeout);
            this.preload.style.display = 'none';
        }).catch(error => {
            clearTimeout(timeout);
            console.error('Ошибка при открытии виджета:', error);
            this.preload.style.display = 'none';
        });
    }

    async uploadImagesToServer(imageUrls) {
        // Собираем данные формы
        const formData = new FormData(this.form);
        const adData = {};
        formData.forEach((value, key) => {
            adData[key] = value;
        });
        adData.images = imageUrls; // Добавляем массив URL изображений

        const token = localStorage.getItem('token');
        console.log('Токен перед запросом:', token);

        // Отправляем данные на сервер
        try {
            const response = await fetch('http://localhost:5500/ads', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(adData)
            });

            if (response.ok) {
                // Успешно, перенаправляем без уведомления
                alert("Успешно");
                setTimeout(() => {
                    window.location.href = '../sheets/main.html';
                }, 2000);
            } else {
                alert("Ошибка от сервера");
                const data = await response.json();
                console.log(data);
            }
        } catch (error) {
            alert("Общая ошибка");
            console.error(error);
        } finally {
            this.preload.style.display = 'none';
        }
    }
}

// Инициализация обработчика формы
const adFormHandler = new AdFormHandler('createAdForm', 'preload');