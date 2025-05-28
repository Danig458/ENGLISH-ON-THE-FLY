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
