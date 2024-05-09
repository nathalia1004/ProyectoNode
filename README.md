# ProyectoNode
- Nombre: Nathalia Estefanía Cóndor Flores
- Correo: natis.nti@gmail.com

# Proyecto de Autenticación y Gestión de Usuarios

Este proyecto proporciona una API para la autenticación de usuarios, gestión de sesiones y operaciones CRUD básicas para usuarios en una base de datos MongoDB. Utiliza Node.js con Express como framework web y Mongoose como ODM para interactuar con la base de datos MongoDB.

## Estructura del Proyecto

El proyecto está estructurado en varias carpetas y archivos:

- **controller**: Contiene los controladores para manejar la lógica.
- **db**: Contiene el archivo para la conexión a la base de datos MongoDB.
- **helpers**: Contiene utilidades y funciones auxiliares.
- **middleware**: Contiene los middlewares, en este caso, el middleware para verificar tokens JWT.
- **models**: Define los esquemas de los modelos de datos MongoDB.
- **routes**: Contiene las definiciones de las rutas de la API.
- **services**: Contiene lógica de servicio para tareas específicas.

## Uso de la API

La API está disponible en la siguiente URL:

- Local: `http://localhost:3010/`

La API proporciona endpoints para la autenticación de usuarios, gestión de sesiones y operaciones CRUD básicas para usuarios. A continuación, se muestran las principales rutas disponibles:

**Autenticación**:
- POST /api/auth/login: Iniciar sesión con credenciales de usuario.
- POST /api/auth/logout: Cerrar sesión.
**Usuarios**:
- GET /api/users: Obtener todos los usuarios.
- POST /api/users: Crear un nuevo usuario.
- PUT /api/users/:id: Actualizar un usuario existente.
- DELETE /api/users/:id: Eliminar un usuario.
**Sesiones**:
- GET /api/session/currentUser: Obtener información del usuario que ha iniciado sesión.


