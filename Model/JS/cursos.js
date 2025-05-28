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