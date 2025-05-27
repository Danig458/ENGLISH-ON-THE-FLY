<?php
// procesar_contacto.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuración del correo
$EMAIL_DESTINO = 'tu-email@dominio.com'; // Cambia por tu email
$NOMBRE_EMPRESA = 'Tu Empresa'; // Cambia por el nombre de tu empresa
$ASUNTO_CLIENTE = 'Gracias por contactarnos';
$ASUNTO_EMPRESA = 'Nuevo mensaje de contacto desde el sitio web';

// Función para limpiar y validar datos
function limpiar_datos($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

// Función para validar email
function validar_email($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

// Función para validar teléfono
function validar_telefono($telefono) {
    return preg_match('/^\+?[\d\s\-\(\)]{8,15}$/', $telefono);
}

// Función para enviar email
function enviar_email($para, $asunto, $mensaje, $headers) {
    return mail($para, $asunto, $mensaje, $headers);
}

try {
    // Verificar que sea una petición POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Método no permitido');
    }

    // Obtener y limpiar datos del formulario
    $nombre = limpiar_datos($_POST['name'] ?? '');
    $telefono = limpiar_datos($_POST['phone'] ?? '');
    $email = limpiar_datos($_POST['email'] ?? '');
    $mensaje = limpiar_datos($_POST['message'] ?? '');

    // Validaciones del servidor
    $errores = [];

    if (empty($nombre)) {
        $errores[] = 'El nombre es obligatorio';
    } elseif (strlen($nombre) < 2) {
        $errores[] = 'El nombre debe tener al menos 2 caracteres';
    } elseif (!preg_match('/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/', $nombre)) {
        $errores[] = 'El nombre solo puede contener letras y espacios';
    }

    if (empty($telefono)) {
        $errores[] = 'El teléfono es obligatorio';
    } elseif (!validar_telefono($telefono)) {
        $errores[] = 'El formato del teléfono no es válido';
    }

    if (empty($email)) {
        $errores[] = 'El email es obligatorio';
    } elseif (!validar_email($email)) {
        $errores[] = 'El formato del email no es válido';
    }

    if (empty($mensaje)) {
        $errores[] = 'El mensaje es obligatorio';
    } elseif (strlen($mensaje) < 10) {
        $errores[] = 'El mensaje debe tener al menos 10 caracteres';
    } elseif (strlen($mensaje) > 1000) {
        $errores[] = 'El mensaje no puede exceder los 1000 caracteres';
    }

    // Si hay errores, devolver respuesta de error
    if (!empty($errores)) {
        echo json_encode([
            'success' => false,
            'message' => implode(', ', $errores)
        ]);
        exit;
    }

    // Preparar email para la empresa
    $mensaje_empresa = "
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>Nuevo mensaje de contacto</title>
    </head>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
        <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
            <h2 style='color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;'>
                Nuevo mensaje de contacto
            </h2>
            
            <div style='background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;'>
                <h3 style='color: #2980b9; margin-top: 0;'>Información del cliente:</h3>
                
                <table style='width: 100%; border-collapse: collapse;'>
                    <tr>
                        <td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;'>Nombre:</td>
                        <td style='padding: 8px; border-bottom: 1px solid #ddd;'>" . htmlspecialchars($nombre) . "</td>
                    </tr>
                    <tr>
                        <td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;'>Teléfono:</td>
                        <td style='padding: 8px; border-bottom: 1px solid #ddd;'>" . htmlspecialchars($telefono) . "</td>
                    </tr>
                    <tr>
                        <td style='padding: 8px; font-weight: bold; border-bottom: 1px solid #ddd;'>Email:</td>
                        <td style='padding: 8px; border-bottom: 1px solid #ddd;'>" . htmlspecialchars($email) . "</td>
                    </tr>
                </table>
            </div>
            
            <div style='background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;'>
                <h3 style='color: #2980b9; margin-top: 0;'>Mensaje:</h3>
                <p style='background-color: #f8f9fa; padding: 15px; border-left: 4px solid #3498db; margin: 0;'>
                    " . nl2br(htmlspecialchars($mensaje)) . "
                </p>
            </div>
            
            <div style='margin-top: 20px; padding: 15px; background-color: #e8f5e8; border-radius: 5px;'>
                <p style='margin: 0; font-size: 12px; color: #666;'>
                    <strong>Fecha:</strong> " . date('d/m/Y H:i:s') . "<br>
                    <strong>IP:</strong> " . ($_SERVER['REMOTE_ADDR'] ?? 'No disponible') . "
                </p>
            </div>
        </div>
    </body>
    </html>
    ";

    // Headers para email de la empresa
    $headers_empresa = "MIME-Version: 1.0\r\n";
    $headers_empresa .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers_empresa .= "From: " . $email . "\r\n";
    $headers_empresa .= "Reply-To: " . $email . "\r\n";
    $headers_empresa .= "X-Mailer: PHP/" . phpversion();

    // Preparar email de confirmación para el cliente
    $mensaje_cliente = "
    <html>
    <head>
        <meta charset='UTF-8'>
        <title>Confirmación de mensaje</title>
    </head>
    <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
        <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
            <div style='text-align: center; margin-bottom: 30px;'>
                <h1 style='color: #2c3e50;'>¡Gracias por contactarnos!</h1>
            </div>
            
            <div style='background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin: 20px 0;'>
                <p style='margin-top: 0;'><strong>Hola " . htmlspecialchars($nombre) . ",</strong></p>
                
                <p>Hemos recibido tu mensaje y queremos agradecerte por contactarnos. Tu consulta es muy importante para nosotros.</p>
                
                <div style='background-color: #fff; padding: 15px; border-left: 4px solid #3498db; margin: 20px 0;'>
                    <h3 style='color: #2980b9; margin-top: 0;'>Resumen de tu mensaje:</h3>
                    <p style='margin-bottom: 0;'><em>" . nl2br(htmlspecialchars($mensaje)) . "</em></p>
                </div>
                
                <p><strong>¿Qué sigue ahora?</strong></p>
                <ul style='padding-left: 20px;'>
                    <li>Nuestro equipo revisará tu mensaje en las próximas 24 horas</li>
                    <li>Te contactaremos a través del email o teléfono que nos proporcionaste</li>
                    <li>Si tu consulta es urgente, puedes llamarnos directamente</li>
                </ul>
            </div>
            
            <div style='background-color: #3498db; color: white; padding: 20px; border-radius: 5px; text-align: center;'>
                <h3 style='margin-top: 0;'>Información de contacto:</h3>
                <p style='margin: 5px 0;'><strong>Email:</strong> " . htmlspecialchars($EMAIL_DESTINO) . "</p>
                <p style='margin: 5px 0;'><strong>Teléfono:</strong> +1234567890</p>
                <p style='margin-bottom: 0;'><strong>Horario:</strong> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
            </div>
            
            <div style='margin-top: 20px; text-align: center; font-size: 12px; color: #666;'>
                <p>Este es un mensaje automático, por favor no respondas a este email.</p>
                <p>© " . date('Y') . " " . htmlspecialchars($NOMBRE_EMPRESA) . ". Todos los derechos reservados.</p>
            </div>
        </div>
    </body>
    </html>
    ";

    // Headers para email del cliente
    $headers_cliente = "MIME-Version: 1.0\r\n";
    $headers_cliente .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers_cliente .= "From: " . $EMAIL_DESTINO . "\r\n";
    $headers_cliente .= "Reply-To: " . $EMAIL_DESTINO . "\r\n";
    $headers_cliente .= "X-Mailer: PHP/" . phpversion();

    // Enviar emails
    $email_empresa_enviado = enviar_email($EMAIL_DESTINO, $ASUNTO_EMPRESA, $mensaje_empresa, $headers_empresa);
    $email_cliente_enviado = enviar_email($email, $ASUNTO_CLIENTE, $mensaje_cliente, $headers_cliente);

    // Verificar si se enviaron los emails
    if ($email_empresa_enviado && $email_cliente_enviado) {
        // Opcional: Guardar en base de datos
        // guardar_en_bd($nombre, $telefono, $email, $mensaje);
        
        echo json_encode([
            'success' => true,
            'message' => 'Mensaje enviado correctamente. Te contactaremos pronto.'
        ]);
    } else {
        throw new Exception('Error al enviar el email. Inténtalo de nuevo más tarde.');
    }

} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

// Función opcional para guardar en base de datos
function guardar_en_bd($nombre, $telefono, $email, $mensaje) {
    /*
    // Configuración de la base de datos
    $host = 'localhost';
    $dbname = 'tu_base_de_datos';
    $username = 'tu_usuario';
    $password = 'tu_password';
    
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $sql = "INSERT INTO contactos (nombre, telefono, email, mensaje, fecha_creacion) VALUES (?, ?, ?, ?, NOW())";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$nombre, $telefono, $email, $mensaje]);
        
        return true;
    } catch (PDOException $e) {
        error_log("Error de base de datos: " . $e->getMessage());
        return false;
    }
    */
}
?>