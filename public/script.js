console.log("Мост между JS и HTML работает!");

function sayHello() {
    alert("Привет! Ты нажал на кнопку. Это начало твоей логики на JS!");
}

const btn = document.getElementById('theme-toggle');

// 1. ФУНКЦИЯ ЗАГРУЗКИ: Спрашиваем у сервера при открытии страницы
window.onload = async () => {
    try {
        const response = await fetch('/get-theme');
        const data = await response.json();
        
        if (data.theme === 'dark') {
            document.body.classList.add('dark-mode');
            btn.textContent = 'Светлая тема';
        } else {
            document.body.classList.remove('dark-mode');
            btn.textContent = 'Темная тема';
        }
        console.log("Тема загружена из базы:", data.theme);
    } catch (err) {
        console.error("Не удалось загрузить тему:", err);
    }
};

// 2. ФУНКЦИЯ КЛИКА: Меняем тему и отправляем на сервер
btn.addEventListener('click', async () => {
    // Переключаем класс визуально
    document.body.classList.toggle('dark-mode');
    
    // Определяем, какая тема сейчас стала
    const isDark = document.body.classList.contains('dark-mode');
    const themeName = isDark ? 'dark' : 'light';
    
    // Меняем текст кнопки
    btn.textContent = isDark ? 'Светлая тема' : 'Темная тема';

    // ОТПРАВЛЯЕМ НА СЕРВЕР (чтобы MySQL запомнил выбор)
    try {
        await fetch('/save-theme', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ theme: themeName })
        });
        console.log('Выбор сохранен в MySQL!');
    } catch (err) {
        console.error("Ошибка сохранения:", err);
    }
});