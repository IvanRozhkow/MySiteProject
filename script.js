console.log("Мост между JS и HTML работает!");

function sayHello() {
    alert("Привет! Ты нажал на кнопку. Это начало твоей логики на JS!");
}

const btn = document.getElementById('theme-toggle');

btn.addEventListener('click', () => {
    // Добавляем или убираем класс dark-mode у тега body
    document.body.classList.toggle('dark-mode');
    
    // Меняем текст на кнопке
    if (document.body.classList.contains('dark-mode')) {
        btn.textContent = 'Светлая тема';
    } else {
        btn.textContent = 'Темная тема';
    }
});