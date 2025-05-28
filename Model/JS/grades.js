function loadGrades() {
    let gradesToShow = [];

    if (currentUser.role === 'profesor') {
        const teacherCourses = allCourses.filter(c => c.teacherId === currentUser.id);
        const teacherCourseIds = teacherCourses.map(c => c.id);
        gradesToShow = allGrades.filter(g => teacherCourseIds.includes(g.courseId));

        updateGradeModalOptions();
    } else if (currentUser.role === 'estudiante') {
        gradesToShow = allGrades.filter(g => g.studentId === currentUser.id);

        document.getElementById('gradesActions').style.display = 'none';

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

    studentSelect.innerHTML = '<option value="">Seleccionar estudiante</option>';
    courseSelect.innerHTML = '<option value="">Seleccionar curso</option>';

    allStudents.forEach(student => {
        const option = document.createElement('option');
        option.value = student.id;
        option.textContent = student.nombre;
        studentSelect.appendChild(option);
    });
}
