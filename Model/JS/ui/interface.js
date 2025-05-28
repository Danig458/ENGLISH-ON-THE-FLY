function showErrorMessage(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
    
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

function showSuccessMessage(message) {
    successMessage.textContent = message;
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
}

function showDashboard() {
    loginContainer.style.display = 'none';
    dashboard.style.display = 'block';
    
    document.getElementById('welcomeMessage').textContent = `¡Hola, ${currentUser.name}!`;
    document.getElementById('userRole').textContent = `${currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}`;
    
    const roleBadge = document.getElementById('roleBadge');
    roleBadge.textContent = currentUser.role.toUpperCase();
    roleBadge.className = `role-badge role-${currentUser.role}`;
    
    generateNavigationMenu();
    generateDashboardStats();
    generateDashboardContent();
    
    // Cargar datos específicos según el rol
    if (currentUser.role === 'administrador') {
        loadUsers();
    } else if (currentUser.role === 'profesor') {
        loadTeacherData();
    } else if (currentUser.role === 'estudiante') {
        loadStudentData();
    }
}