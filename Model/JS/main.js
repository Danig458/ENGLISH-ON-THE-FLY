document.addEventListener('DOMContentLoaded', () => {
    generateDashboardStats();
    generateDashboardContent();

    if (currentUser.role === 'administrador') {
        loadUsers();
        loadCourses();
        loadGrades();
    }

    if (currentUser.role === 'profesor') {
        loadTeacherData();
        loadGrades();
    }

    if (currentUser.role === 'estudiante') {
        loadGrades();
    }

    const userForm = document.getElementById('userForm');
    if (userForm) userForm.addEventListener('submit', handleUserSubmit);

    const courseForm = document.getElementById('courseForm');
    if (courseForm) courseForm.addEventListener('submit', handleCourseSubmit);
});


