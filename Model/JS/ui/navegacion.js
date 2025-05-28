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
