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