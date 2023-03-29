'use strict';

const form = document.querySelector('form');

const validateUser = async (event) => {
    event.preventDefault();
    const username = document.querySelector('#floatingInput').value;
    const password = document.querySelector('#floatingPassword').value;   
    try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        };
        const users = await response.json(); 
        const user = users.filter(user => user.user === username && user.password === password);      
        if (user.length > 0) {
          window.location.href = 'admin.html';
        } else {
          alert('Usuário ou Senha incorretos');
        };
    } catch (error) {
        console.error('Error:', error);
    }
};

form.addEventListener('submit', validateUser);