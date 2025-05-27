// validaciones.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.querySelector('.btn');

    // Función para mostrar errores
    function showError(input, message) {
        removeError(input);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ff6b6b';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '5px';
        input.parentNode.appendChild(errorDiv);
        input.style.borderColor = '#ff6b6b';
    }

    // Función para remover errores
    function removeError(input) {
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        input.style.borderColor = '';
    }

    // Función para mostrar mensaje de éxito
    function showSuccess(input) {
        removeError(input);
        input.style.borderColor = '#51cf66';
    }

    // Validar nombre
    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') {
            showError(nameInput, 'El nombre es obligatorio');
            return false;
        }
        if (name.length < 2) {
            showError(nameInput, 'El nombre debe tener al menos 2 caracteres');
            return false;
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(name)) {
            showError(nameInput, 'El nombre solo puede contener letras y espacios');
            return false;
        }
        showSuccess(nameInput);
        return true;
    }

    // Validar teléfono
    function validatePhone() {
        const phone = phoneInput.value.trim();
        if (phone === '') {
            showError(phoneInput, 'El teléfono es obligatorio');
            return false;
        }
        if (!/^\+?[\d\s\-\(\)]{8,15}$/.test(phone)) {
            showError(phoneInput, 'Ingresa un número de teléfono válido');
            return false;
        }
        showSuccess(phoneInput);
        return true;
    }

    // Validar email
    function validateEmail() {
        const email = emailInput.value.trim();
        if (email === '') {
            showError(emailInput, 'El email es obligatorio');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError(emailInput, 'Ingresa un email válido');
            return false;
        }
        showSuccess(emailInput);
        return true;
    }

    // Validar mensaje
    function validateMessage() {
        const message = messageInput.value.trim();
        if (message === '') {
            showError(messageInput, 'El mensaje es obligatorio');
            return false;
        }
        if (message.length < 10) {
            showError(messageInput, 'El mensaje debe tener al menos 10 caracteres');
            return false;
        }
        if (message.length > 1000) {
            showError(messageInput, 'El mensaje no puede exceder los 1000 caracteres');
            return false;
        }
        showSuccess(messageInput);
        return true;
    }

    // Validación en tiempo real
    nameInput.addEventListener('blur', validateName);
    phoneInput.addEventListener('blur', validatePhone);
    emailInput.addEventListener('blur', validateEmail);
    messageInput.addEventListener('blur', validateMessage);

    // Contador de caracteres para el mensaje
    messageInput.addEventListener('input', function() {
        const charCount = this.value.length;
        let counter = messageInput.parentNode.querySelector('.char-counter');
        
        if (!counter) {
            counter = document.createElement('div');
            counter.className = 'char-counter';
            counter.style.fontSize = '12px';
            counter.style.color = '#666';
            counter.style.textAlign = 'right';
            counter.style.marginTop = '5px';
            messageInput.parentNode.appendChild(counter);
        }
        
        counter.textContent = `${charCount}/1000 caracteres`;
        
        if (charCount > 1000) {
            counter.style.color = '#ff6b6b';
        } else {
            counter.style.color = '#666';
        }
    });

    // Validación al enviar el formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Mostrar indicador de carga
        submitBtn.disabled = true;
        submitBtn.value = 'Enviando...';
        submitBtn.style.opacity = '0.7';

        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (isNameValid && isPhoneValid && isEmailValid && isMessageValid) {
            // Enviar datos via AJAX
            const formData = new FormData();
            formData.append('name', nameInput.value.trim());
            formData.append('phone', phoneInput.value.trim());
            formData.append('email', emailInput.value.trim());
            formData.append('message', messageInput.value.trim());

            fetch('Controller/procesar_contacto.php', {
                method: 'POST',
                body: formData
            })

            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Mostrar mensaje de éxito
                    showSuccessMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.');
                    form.reset();
                    // Limpiar estilos de validación
                    [nameInput, phoneInput, emailInput, messageInput].forEach(input => {
                        input.style.borderColor = '';
                    });
                    // Remover contador de caracteres
                    const counter = messageInput.parentNode.querySelector('.char-counter');
                    if (counter) counter.remove();
                } else {
                    showErrorMessage(data.message || 'Error al enviar el mensaje. Inténtalo de nuevo.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showErrorMessage('Error de conexión. Verifica tu conexión a internet e inténtalo de nuevo.');
            })
            .finally(() => {
                // Restaurar botón
                submitBtn.disabled = false;
                submitBtn.value = 'Enviar';
                submitBtn.style.opacity = '1';
            });
        } else {
            // Restaurar botón si hay errores de validación
            submitBtn.disabled = false;
            submitBtn.value = 'Enviar';
            submitBtn.style.opacity = '1';
            
            // Hacer scroll al primer campo con error
            const firstError = form.querySelector('input[style*="border-color: rgb(255, 107, 107)"], textarea[style*="border-color: rgb(255, 107, 107)"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });

    // Función para mostrar mensaje de éxito
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-notification';
        successDiv.innerHTML = `
            <div style="
                background-color: #51cf66;
                color: white;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
                text-align: center;
                font-weight: bold;
                box-shadow: 0 2px 10px rgba(81, 207, 102, 0.3);
            ">
                ${message}
            </div>
        `;
        
        form.parentNode.insertBefore(successDiv, form);
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Función para mostrar mensaje de error
    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification';
        errorDiv.innerHTML = `
            <div style="
                background-color:rgba(255, 107, 107, 0);
                color: white;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
                text-align: center;
                font-weight: bold;
                box-shadow: 0 2px 10px rgba(255, 107, 107, 0.3);
            ">
                ${message}
            </div>
        `;
        
        form.parentNode.insertBefore(errorDiv, form);
        
        // Remover mensaje después de 5 segundos
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
});