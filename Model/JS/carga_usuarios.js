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