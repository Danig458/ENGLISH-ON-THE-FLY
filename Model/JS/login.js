const users = {
    'admin': {
        password: 'password',
        role: 'administrador',
        name: 'Administrador del Sistema',
        id: 1
    },
    'profesor1': {
        password: 'password',
        role: 'profesor',
        name: 'Prof. Juan García',
        id: 2
    },
    'estudiante1': {
        password: 'password',
        role: 'estudiante', 
        name: 'María López',
        id: 4
    }
};

// Configuración de menús por rol
const menusByRole = {
    administrador: [
        { id: 'dashboard', icon: '📊', label: 'Dashboard', section: 'dashboard-section' },
        { id: 'usuarios', icon: '👥', label: 'Usuarios', section: 'usuarios-section' },
        { id: 'cursos', icon: '📚', label: 'Cursos', section: 'cursos-section' },
        { id: 'reportes', icon: '📈', label: 'Reportes', section: 'reportes-section' }
    ],
    profesor: [
        { id: 'dashboard', icon: '📊', label: 'Dashboard', section: 'dashboard-section' },
        { id: 'cursos', icon: '📚', label: 'Mis Cursos', section: 'cursos-section' },
        { id: 'calificaciones', icon: '📋', label: 'Calificaciones', section: 'calificaciones-section' },
        { id: 'tareas', icon: '📄', label: 'Tareas', section: 'tareas-section' }
    ],
    estudiante: [
        { id: 'dashboard', icon: '📊', label: 'Dashboard', section: 'dashboard-section' },
        { id: 'mis-cursos', icon: '📖', label: 'Mis Cursos', section: 'mis-cursos-section' },
        { id: 'calificaciones', icon: '📋', label: 'Mis Notas', section: 'calificaciones-section' },
        { id: 'tareas', icon: '📄', label: 'Tareas', section: 'tareas-section' },
        { id: 'progreso', icon: '📊', label: 'Mi Progreso', section: 'progreso-section' }
    ]
};

// Estadísticas por rol
const statsByRole = {
    administrador: [
        { number: '156', label: 'Total Usuarios' },
        { number: '24', label: 'Cursos Activos' },
        { number: '1,200', label: 'Estudiantes' },
        { number: '45', label: 'Profesores' }
    ],
    profesor: [
        { number: '8', label: 'Mis Cursos' },
        { number: '180', label: 'Estudiantes' },
        { number: '45', label: 'Exámenes Creados' },
        { number: '89%', label: 'Tasa de Aprobación' }
    ],
    estudiante: [
        { number: '6', label: 'Cursos Inscritos' },
        { number: '85%', label: 'Progreso General' },
        { number: '12', label: 'Exámenes Completados' },
        { number: 'B+', label: 'Promedio General' }
    ]
};

// Variables globales
let currentUser = null;
let allUsers = [];
let allCourses = [];
let allGrades = [];
let allTasks = [];
let allStudents = [];

// Datos simulados
function initializeData() {
    // Usuarios
    allUsers = [
        { id: 1, username: 'admin', nombre: 'Administrador', email: 'admin@instituto.com', rol: 'administrador', activo: 1 },
        { id: 2, username: 'profesor1', nombre: 'Prof. Juan García', email: 'juan@instituto.com', rol: 'profesor', activo: 1 },
        { id: 3, username: 'profesor2', nombre: 'Prof. Ana Smith', email: 'ana@instituto.com', rol: 'profesor', activo: 1 },
        { id: 4, username: 'estudiante1', nombre: 'María López', email: 'maria@email.com', rol: 'estudiante', activo: 1 },
        { id: 5, username: 'estudiante2', nombre: 'Carlos Rodríguez', email: 'carlos@email.com', rol: 'estudiante', activo: 1 },
        { id: 6, username: 'estudiante3', nombre: 'Ana Martínez', email: 'ana.martinez@email.com', rol: 'estudiante', activo: 1 },
        { id: 7, username: 'estudiante4', nombre: 'Pedro Sánchez', email: 'pedro@email.com', rol: 'estudiante', activo: 1 }
    ];

    // Estudiantes para facilitar acceso
    allStudents = allUsers.filter(u => u.rol === 'estudiante');

    // Cursos
    allCourses = [
        {
            id: 1,
            name: 'English Grammar Basics',
            code: 'ENG101',
            description: 'Fundamentos de gramática inglesa para principiantes',
            level: 'Beginner',
            duration: 12,
            teacher: 'Prof. Juan García',
            teacherId: 2,
            students: [4, 5, 6],
            createdDate: '2024-01-15'
        },
        {
            id: 2,
            name: 'Conversation Practice',
            code: 'ENG201',
            description: 'Práctica de conversación en inglés nivel intermedio',
            level: 'Intermediate',
            duration: 8,
            teacher: 'Prof. Juan García',
            teacherId: 2,
            students: [4, 7],
            createdDate: '2024-02-01'
        },
        {
            id: 3,
            name: 'Business English',
            code: 'ENG301',
            description: 'Inglés profesional para negocios',
            level: 'Advanced',
            duration: 16,
            teacher: 'Prof. Ana Smith',
            teacherId: 3,
            students: [5, 6],
            createdDate: '2024-01-20'
        }
    ];

    // Calificaciones
    allGrades = [
        {
            id: 1,
            studentId: 4,
            studentName: 'María López',
            courseId: 1,
            courseName: 'English Grammar Basics',
            activity: 'Examen Unidad 1',
            score: 85,
            date: '2024-03-15',
            comments: 'Buen trabajo en general, mejorar tiempos verbales'
        },
        {
            id: 2,
            studentId: 5,
            studentName: 'Carlos Rodríguez',
            courseId: 1,
            courseName: 'English Grammar Basics',
            activity: 'Examen Unidad 1',
            score: 92,
            date: '2024-03-15',
            comments: 'Excelente comprensión de los conceptos'
        },
        {
            id: 3,
            studentId: 4,
            studentName: 'María López',
            courseId: 2,
            courseName: 'Conversation Practice',
            activity: 'Presentación Oral',
            score: 78,
            date: '2024-03-20',
            comments: 'Buena fluidez, trabajar en pronunciación'
        },
        {
            id: 4,
            studentId: 6,
            studentName: 'Ana Martínez',
            courseId: 1,
            courseName: 'English Grammar Basics',
            activity: 'Quiz Vocabulary',
            score: 95,
            date: '2024-03-22',
            comments: 'Excelente manejo del vocabulario'
        }
    ];

    // Tareas
    allTasks = [
        {
            id: 1,
            title: 'Grammar Exercise - Present Perfect',
            courseId: 1,
            courseName: 'English Grammar Basics',
            description: 'Complete exercises 1-15 from workbook page 45',
            dueDate: '2024-05-30T23:59',
            type: 'homework',
            status: 'active',
            createdDate: '2024-05-20',
            submissions: [
                { studentId: 4, studentName: 'María López', status: 'entregada', submittedDate: '2024-05-25' },
                { studentId: 5, studentName: 'Carlos Rodríguez', status: 'pendiente' },
                { studentId: 6, studentName: 'Ana Martínez', status: 'entregada', submittedDate: '2024-05-24' }
            ]
        },
        {
            id: 2,
            title: 'Conversation Video Recording',
            courseId: 2,
            courseName: 'Conversation Practice',
            description: 'Record a 3-minute video talking about your weekend plans',
            dueDate: '2024-06-01T18:00',
            type: 'project',
            status: 'active',
            createdDate: '2024-05-22',
            submissions: [
                { studentId: 4, studentName: 'María López', status: 'pendiente' },
                { studentId: 7, studentName: 'Pedro Sánchez', status: 'entregada', submittedDate: '2024-05-26' }
            ]
        },
        {
            id: 3,
            title: 'Mid-term Exam',
            courseId: 1,
            courseName: 'English Grammar Basics',
            description: 'Comprehensive exam covering units 1-4',
            dueDate: '2024-06-05T10:00',
            type: 'exam',
            status: 'active',
            createdDate: '2024-05-15',
            submissions: []
        }
    ];
}

// Elementos del DOM
let loginForm, loginContainer, dashboard, errorMessage, successMessage;

// Inicialización
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

// ===== FUNCIONES DE AUTENTICACIÓN =====

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

// ===== FUNCIONES DE INTERFAZ =====

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

function generateNavigationMenu() {
    const navigationMenu = document.getElementById('navigationMenu');
    const menuItems = menusByRole[currentUser.role] || [];
    
    navigationMenu.innerHTML = '';
    
    menuItems.forEach((item, index) => {
        const menuItem = document.createElement('div');
        menuItem.className = `menu-item ${index === 0 ? 'active' : ''}`;
        menuItem.innerHTML = `
            <span class="menu-icon">${item.icon}</span>
            ${item.label}
        `;
        
        menuItem.addEventListener('click', () => {
            document.querySelectorAll('.menu-item').forEach(item => {
                item.classList.remove('active');
            });
            
            menuItem.classList.add('active');
            showSection(item.section);
        });
        
        navigationMenu.appendChild(menuItem);
    });
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Cargar datos específicos de la sección
        if (sectionId === 'cursos-section') {
            loadCourses();
        } else if (sectionId === 'calificaciones-section') {
            loadGrades();
        } else if (sectionId === 'tareas-section') {
            loadTasks();
        }
    }
}

function generateDashboardStats() {
    const statsGrid = document.getElementById('statsGrid');
    const stats = statsByRole[currentUser.role] || [];
    
    statsGrid.innerHTML = '';
    
    stats.forEach(stat => {
        const statCard = document.createElement('div');
        statCard.className = 'stat-card';
        statCard.innerHTML = `
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
        `;
        statsGrid.appendChild(statCard);
    });
}

function generateDashboardContent() {
    const dashboardContent = document.getElementById('dashboardContent');
    
    let content = '';
    
    switch(currentUser.role) {
        case 'administrador':
            content = `
                <h3>Panel de Administración</h3>
                <p>Bienvenido al sistema de gestión educativa. Desde aquí puedes administrar usuarios, cursos y generar reportes.</p>
                <div style="margin-top: 20px;">
                    <h4>Acciones Rápidas:</h4>
                    <div style="display: flex; gap: 10px; margin-top: 15px;">
                        <button onclick="openUserModal()" class="btn btn-primary">+ Nuevo Usuario</button>
                        <button onclick="openCourseModal()" class="btn btn-success">+ Nuevo Curso</button>
                        <button onclick="showSection('reportes-section')" class="btn btn-warning">Ver Reportes</button>
                    </div>
                </div>
            `;
            break;
            
        case 'profesor':
            const teacherCourses = allCourses.filter(c => c.teacherId === currentUser.id);
            const totalStudents = teacherCourses.reduce((acc, course) => acc + course.students.length, 0);
            const pendingTasks = allTasks.filter(t => t.status === 'active').length;
            
            content = `
                <h3>Panel del Profesor</h3>
                <p>Bienvenido, ${currentUser.name}. Gestiona tus cursos y revisa el progreso de tus estudiantes.</p>
                <div style="margin-top: 20px;">
                    <h4>Resumen de Actividades:</h4>
                    <ul style="margin-top: 10px;">
                        <li>${teacherCourses.length} cursos activos</li>
                        <li>${totalStudents} estudiantes en total</li>
                        <li>${pendingTasks} tareas activas</li>
                        <li>${allGrades.length} calificaciones registradas</li>
                    </ul>
                    <div style="display: flex; gap: 10px; margin-top: 15px;">
                        <button onclick="showSection('cursos-section')" class="btn btn-primary">Ver Mis Cursos</button>
                        <button onclick="showSection('tareas-section')" class="btn btn-success">Gestionar Tareas</button>
                        <button onclick="showSection('calificaciones-section')" class="btn btn-warning">Ver Calificaciones</button>
                    </div>
                </div>
            `;
            break;
            
        case 'estudiante':
            const studentCourses = allCourses.filter(c => c.students.includes(currentUser.id));
            const studentGrades = allGrades.filter(g => g.studentId === currentUser.id);
            const avgGrade = studentGrades.length > 0 ? 
                (studentGrades.reduce((acc, g) => acc + g.score, 0) / studentGrades.length).toFixed(1) : 0;
                
            content = `
                <h3>Panel del Estudiante</h3>
                <p>¡Hola ${currentUser.name}! Continúa con tu aprendizaje y revisa tus próximas actividades.</p>
                <div style="margin-top: 20px;">
                    <h4>Tu Progreso:</h4>
                    <ul style="margin-top: 10px;">
                        <li>${studentCourses.length} cursos inscritos</li>
                        <li>Promedio general: ${avgGrade}</li>
                        <li>${studentGrades.length} calificaciones recibidas</li>
                    </ul>
                </div>
            `;
            break;
    }
    
    dashboardContent.innerHTML = content;
}

// ===== GESTIÓN DE USUARIOS (ADMIN) =====

function loadUsers() {
    displayUsers();
}

function displayUsers() {
    const tbody = document.querySelector('#usersTable tbody');
    tbody.innerHTML = '';
    
    allUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.username}</td>
            <td>${user.nombre}</td>
            <td>${user.email}</td>
            <td>
                <span class="role-badge role-${user.rol}">${user.rol.toUpperCase()}</span>
            </td>
            <td>
                <span class="status-badge ${user.activo ? 'status-entregada' : 'status-pendiente'}">
                    ${user.activo ? 'Activo' : 'Inactivo'}
                </span>
            </td>
            <td>
                <button onclick="editUser(${user.id})" class="btn btn-warning" style="margin-right: 5px;">Editar</button>
                <button onclick="deleteUser(${user.id})" class="btn btn-danger">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function openUserModal(userId = null) {
    const modal = document.getElementById('userModal');
    const modalTitle = document.getElementById('modalTitle');
    const form = document.getElementById('userForm');
    
    form.reset();
    
    if (userId) {
        const user = allUsers.find(u => u.id === userId);
        if (user) {
            modalTitle.textContent = 'Editar Usuario';
            document.getElementById('userId').value = user.id;
            document.getElementById('modalUsername').value = user.username;
            document.getElementById('modalNombre').value = user.nombre;
            document.getElementById('modalEmail').value = user.email;
            document.getElementById('modalRol').value = user.rol;
            document.getElementById('modalPassword').required = false;
        }
    } else {
        modalTitle.textContent = 'Nuevo Usuario';
        document.getElementById('modalPassword').required = true;
    }
    
    modal.style.display = 'block';
}

function closeUserModal() {
    document.getElementById('userModal').style.display = 'none';
}

function editUser(userId) {
    openUserModal(userId);
}

function deleteUser(userId) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        allUsers = allUsers.filter(user => user.id !== userId);
        displayUsers();
        showSuccessMessage('Usuario eliminado exitosamente');
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
}

function handleUserSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    const userId = userData.userId;
    
    if (userId) {
        // Editar usuario existente
        const userIndex = allUsers.findIndex(u => u.id == userId);
        if (userIndex !== -1) {
            allUsers[userIndex] = {
                ...allUsers[userIndex],
                username: userData.username,
                nombre: userData.nombre,
                email: userData.email,
                rol: userData.rol
            };
            showSuccessMessage('Usuario actualizado exitosamente');

            if (users[userData.username]) {
                users[userData.username].name = userData.nombre;
                users[userData.username].role = userData.rol;
            }
        }
    } else {
        // Crear nuevo usuario
        const newId = allUsers.length ? Math.max(...allUsers.map(u => u.id)) + 1 : 1;
        const newUser = {
            id: newId,
            username: userData.username,
            nombre: userData.nombre,
            email: userData.email,
            rol: userData.rol,
            activo: 1
        };

        allUsers.push(newUser);
        users[newUser.username] = {
            password: userData.password,
            role: userData.rol,
            name: userData.nombre,
            id: newUser.id
        };

        showSuccessMessage('Usuario creado exitosamente');
    }
        
    displayUsers();
    closeUserModal();
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

// ===== GESTIÓN DE CURSOS =====

function loadTeacherData() {
    loadCourses();
    loadGrades();
    loadTasks();
}

function loadCourses() {
    const container = document.getElementById('coursesContainer');
    let coursesToShow = [];
    
    if (currentUser.role === 'profesor') {
        coursesToShow = allCourses.filter(c => c.teacherId === currentUser.id);
    } else if (currentUser.role === 'administrador') {
        coursesToShow = allCourses;
    }
    
    container.innerHTML = '';
    
    coursesToShow.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.className = 'course-card';
        courseCard.innerHTML = `
            <div class="course-header">
                <div class="course-title">${course.name}</div>
                <div class="course-code">${course.code}</div>
            </div>
            <p style="color: #666; margin-bottom: 15px;">${course.description}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span><strong>Nivel:</strong> ${course.level}</span>
                <span><strong>Duración:</strong> ${course.duration} semanas</span>
            </div>
            <div class="course-stats">
                <div class="course-stat">
                    <div class="course-stat-number">${course.students.length}</div>
                    <div class="course-stat-label">Estudiantes</div>
                </div>
                <div class="course-stat">
                    <div class="course-stat-number">${allTasks.filter(t => t.courseId === course.id).length}</div>
                    <div class="course-stat-label">Tareas</div>
                </div>
                <div class="course-stat">
                    <div class="course-stat-number">${allGrades.filter(g => g.courseId === course.id).length}</div>
                    <div class="course-stat-label">Calificaciones</div>
                </div>
            </div>
            <div style="margin-top: 15px; display: flex; gap: 10px;">
                <button onclick="editCourse(${course.id})" class="btn btn-warning">Editar</button>
                <button onclick="deleteCourse(${course.id})" class="btn btn-danger">Eliminar</button>
                <button onclick="viewCourseDetails(${course.id})" class="btn btn-primary">Ver Detalles</button>
            </div>
        `;
        container.appendChild(courseCard);
    });
}

function openCourseModal(courseId = null) {
    const modal = document.getElementById('courseModal');
    const modalTitle = document.getElementById('modalCourseTitle');
    const form = document.getElementById('courseForm');
    
    form.reset();
    
    if (courseId) {
        const course = allCourses.find(c => c.id === courseId);
        if (course) {
            modalTitle.textContent = 'Editar Curso';
            document.getElementById('courseId').value = course.id;
            document.getElementById('courseName').value = course.name;
            document.getElementById('courseCode').value = course.code;
            document.getElementById('courseDescription').value = course.description;
            document.getElementById('courseLevel').value = course.level;
            document.getElementById('courseDuration').value = course.duration;
        }
    } else {
        modalTitle.textContent = 'Nuevo Curso';
    }
    
    modal.style.display = 'block';
}

function closeCourseModal() {
    document.getElementById('courseModal').style.display = 'none';
}

function editCourse(courseId) {
    openCourseModal(courseId);
}

function deleteCourse(courseId) {
    if (confirm('¿Estás seguro de que deseas eliminar este curso?')) {
        allCourses = allCourses.filter(course => course.id !== courseId);
        loadCourses();
        showSuccessMessage('Curso eliminado exitosamente');
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    }
}

function viewCourseDetails(courseId) {
    const course = allCourses.find(c => c.id === courseId);
    if (course) {
        const students = course.students.map(sId => {
            const student = allUsers.find(u => u.id === sId);
            return student ? student.nombre : 'Estudiante no encontrado';
        }).join(', ');
        
        alert(`Detalles del Curso: ${course.name}\n\nCódigo: ${course.code}\nNivel: ${course.level}\nDuración: ${course.duration} semanas\nEstudiantes inscritos: ${students || 'Ninguno'}`);
    }
}

function handleCourseSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const courseData = Object.fromEntries(formData);
    const courseId = courseData.courseId;
    
    if (courseId) {
        // Editar curso existente
        const courseIndex = allCourses.findIndex(c => c.id == courseId);
        if (courseIndex !== -1) {
            allCourses[courseIndex] = {
                ...allCourses[courseIndex],
                name: courseData.courseName,
                code: courseData.courseCode,
                description: courseData.courseDescription,
                level: courseData.courseLevel,
                duration: parseInt(courseData.courseDuration)
            };
            showSuccessMessage('Curso actualizado exitosamente');
        }
    } else {
        // Crear nuevo curso
        const newId = allCourses.length ? Math.max(...allCourses.map(c => c.id)) + 1 : 1;
        const newCourse = {
            id: newId,
            name: courseData.courseName,
            code: courseData.courseCode,
            description: courseData.courseDescription,
            level: courseData.courseLevel,
            duration: parseInt(courseData.courseDuration),
            teacher: currentUser.name,
            teacherId: currentUser.id,
            students: [],
            createdDate: new Date().toISOString().split('T')[0]
        };

        allCourses.push(newCourse);
        showSuccessMessage('Curso creado exitosamente');
    }
    
    loadCourses();
    closeCourseModal();
    
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
}

// ===== GESTIÓN DE CALIFICACIONES =====

function loadGrades() {
    let gradesToShow = [];
    
    if (currentUser.role === 'profesor') {
        const teacherCourses = allCourses.filter(c => c.teacherId === currentUser.id);
        const teacherCourseIds = teacherCourses.map(c => c.id);
        gradesToShow = allGrades.filter(g => teacherCourseIds.includes(g.courseId));
        
        // Actualizar opciones del modal
        updateGradeModalOptions();
    } else if (currentUser.role === 'estudiante') {
        gradesToShow = allGrades.filter(g => g.studentId === currentUser.id);
        
        // Ocultar acciones para estudiantes
        document.getElementById('gradesActions').style.display = 'none';
        
        // Cambiar headers de la tabla
        const headerRow = document.getElementById('gradesTableHeader');
        headerRow.innerHTML = `
            <th>Curso</th>
            <th>Actividad</th>
            <th>Calificación</th>
            <th>Fecha</th>
            <th>Comentarios</th>
        `;
    } else {
        gradesToShow = allGrades;
    }
    
    displayGrades(gradesToShow);
}

function displayGrades(grades) {
    const tbody = document.querySelector('#gradesTable tbody');
    tbody.innerHTML = '';
    
    grades.forEach(grade => {
        const row = document.createElement('tr');
        
        if (currentUser.role === 'estudiante') {
            row.innerHTML = `
                <td>${grade.courseName}</td>
                <td>${grade.activity}</td>
                <td><strong style="color: ${getGradeColor(grade.score)}">${grade.score}%</strong></td>
                <td>${new Date(grade.date).toLocaleDateString()}</td>
                <td>${grade.comments || 'Sin comentarios'}</td>
            `;
        } else {
            row.innerHTML = `
                <td>${grade.studentName}</td>
                <td>${grade.courseName}</td>
                <td>${grade.activity}</td>
                <td><strong style="color: ${getGradeColor(grade.score)}">${grade.score}%</strong></td>
                <td>${new Date(grade.date).toLocaleDateString()}</td>
                <td>
                    <button onclick="editGrade(${grade.id})" class="btn btn-warning" style="margin-right: 5px;">Editar</button>
                    <button onclick="deleteGrade(${grade.id})" class="btn btn-danger">Eliminar</button>
                </td>
            `;
        }
        
        tbody.appendChild(row);
    });
}

function getGradeColor(score) {
    if (score >= 90) return '#28a745';
    if (score >= 80) return '#ffc107';
    if (score >= 70) return '#fd7e14';
    return '#dc3545';
}

function updateGradeModalOptions() {
    const studentSelect = document.getElementById('gradeStudent');
    const courseSelect = document.getElementById('gradeCourse');
    
    // Limpiar opciones
    studentSelect.innerHTML = '<option value="">Seleccionar estudiante</option>';
    courseSelect.innerHTML = '<option value="">Seleccionar curso</option>';
    
    // Agregar estudiantes
    allStudents.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = student.nombre;
        studentSelect.appendChild(option);
})};

