const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.json()); // Чтобы сервер понимал JSON от браузера
app.use(express.static('public')); // Раздаем файлы из папки public

const db = mysql.createConnection({
    host: '172.18.64.1',
    user: 'root',
    password: 'root1234',
    database: 'my_site_db'
});

// Маршрут для ПОЛУЧЕНИЯ темы из базы
app.get('/get-theme', (req, res) => {
    db.query('SELECT setting_value FROM settings WHERE setting_name = "theme"', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ theme: results[0].setting_value });
    });
});

// Маршрут для СОХРАНЕНИЯ темы в базу
app.post('/save-theme', (req, res) => {
    const newTheme = req.body.theme;
    db.query('UPDATE settings SET setting_value = ? WHERE setting_name = "theme"', [newTheme], (err) => {
        if (err) return res.status(500).send(err);
        res.send('Theme saved!');
    });
});

app.listen(3000, () => console.log('Сервер запущен: http://localhost:3000'));