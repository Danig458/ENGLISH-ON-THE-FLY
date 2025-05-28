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
