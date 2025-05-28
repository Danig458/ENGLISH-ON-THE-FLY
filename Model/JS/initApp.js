document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    
    loginForm = document.getElementById('loginFormElement');
    loginContainer = document.getElementById('loginForm');
    dashboard = document.getElementById('dashboard');
    errorMessage = document.getElementById('errorMessage');
    successMessage = document.getElementById('successMessage');

    loginForm.addEventListener('submit', handleLogin);
    document.getElementById('userForm').addEventListener('submit', handleUserSubmit);
    document.getElementById('courseForm').addEventListener('submit', handleCourseSubmit);
    document.getElementById('gradeForm').addEventListener('submit', handleGradeSubmit);
    document.getElementById('taskForm').addEventListener('submit', handleTaskSubmit);
});

