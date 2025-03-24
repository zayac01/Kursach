document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/auth.html';
      return;
    }
  
    const headers = { Authorization: `Bearer ${token}` };
  
    // Получение данных профиля
    fetch('http://localhost:5500/profile', { headers })
    .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка сервера: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        if (!data || !data.name) {
          throw new Error('Данные профиля не получены');
        }
        console.log('Данные профиля:', data);
        document.getElementById('profile-info').innerHTML = `Имя: ${data.name}<br>Email: ${data.email}`;
      })
      .catch(error => console.error('Ошибка загрузки профиля:', error));
  
    // Переключение вкладок
    const tabs = document.querySelectorAll('.tabs button');
    const contents = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        contents.forEach(content => content.classList.remove('active'));
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const tabContent = document.getElementById(tab.dataset.tab);
        tabContent.classList.add('active');
  
        if (tab.dataset.tab === 'ads') loadAds();
        if (tab.dataset.tab === 'articles') loadArticles();
        if (tab.dataset.tab === 'edit') loadEditForm();
      });
    });
  
    // Загрузка объявлений
    function loadAds() {
      fetch('http://localhost:5500/profile/ads', { headers })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка сервера: ' + response.status);
        }
        return response.json();
      })
        .then(ads => {
          const adsDiv = document.getElementById('ads');
          adsDiv.innerHTML = '<h2>Ваши объявления</h2>' + ads.map(ad => `<p>${ad.brand} ${ad.model} (${ad.year})</p>`).join('');
        })
        .catch(error => console.error('Ошибка загрузки объявлений:', error));
    }
  
    // Загрузка статей
    function loadArticles() {
      fetch('http://localhost:5500/profile/articles', { headers })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка сервера: ' + response.status);
        }
        return response.json();
      })
        .then(articles => {
          const articlesDiv = document.getElementById('articles');
          articlesDiv.innerHTML = '<h2>Ваши статьи</h2>' + (articles.length ? articles.map(article => `<p>${article.title}</p>`).join('') : '<p>Статей пока нет</p>');
        })
        .catch(error => console.error('Ошибка загрузки статей:', error));
    }
  
    // Загрузка формы редактирования
    function loadEditForm() {
      fetch('http://localhost:5500/profile', { headers })

        .then(response => {
            if (!response.ok) {
              throw new Error('Ошибка сервера: ' + response.status);
            }
            return response.json();
          })
        .then(data => {
          document.querySelector('input[name="name"]').value = data.name;
          document.querySelector('input[name="email"]').value = data.email;
        });
    }
  
    // Обработка формы редактирования
    document.getElementById('edit-profile-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
      };
  
      fetch('http://localhost:5500/profile/update', {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка сервера: ' + response.status);
        }
        return response.json();
      })
        .then(response => response.json())
        .then(updated => {
          document.getElementById('profile-info').innerHTML = `Имя: ${updated.name}<br>Email: ${updated.email}`;
          alert('Профиль обновлен');
        })
        .catch(error => console.error('Ошибка обновления профиля:', error));
    });
  
    // Открываем первую вкладку по умолчанию
    tabs[0].click();
  });