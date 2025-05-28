function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (validateCredentials(username, password)) {
        currentUser = {...users[username], username: username};
        showSuccessMessage('¡Inicio de sesión exitoso!');
        
        setTimeout(() => {
            showDashboard();
        }, 1000);
    } else {
        showErrorMessage('Usuario o contraseña incorrectos');
    }
}

function validateCredentials(username, password) {
    return users[username] && users[username].password === password;
}

function logout() {
    currentUser = null;
    loginContainer.style.display = 'block';
    dashboard.style.display = 'none';
    
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    
    errorMessage.style.display = 'none';
    successMessage.style.display = 'none';
    
    showSuccessMessage('Sesión cerrada correctamente');
}