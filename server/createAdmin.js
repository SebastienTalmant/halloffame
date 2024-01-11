const bcrypt = require('bcrypt');
const mysql = require('mysql2');
require('dotenv').config();


const saltRounds = 10;
const plainPassword = '123';

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});


connection.connect();

bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword) {
    if(err) {
        console.error('Erreur lors du hashage du mot de passe:', err);
        return;
    }
    const user = {
        email: 'stalmant@yahoo.com',
        password: hashedPassword,
        role: 'admin'
    };

    connection.query('INSERT INTO Users SET ?', user, (error, results) => {
        if(error) {
            console.error('Erreur lors de l’insertion:', error);
            return;
        }
        console.log('Admin inséré avec succès avec l’ID:', results.insertId);
        connection.end();
    });
});
