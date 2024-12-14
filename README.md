```markdown
# Proyecto de Gestión de Eventos y Tienda de Entradas

Este es un proyecto web para la gestión de eventos y la compra de entradas, utilizando **Angular** para la parte frontend y **Firebase** para la autenticación de usuarios y almacenamiento de datos.

## Descripción

La aplicación permite a los usuarios:
- Ver eventos disponibles.
- Filtrar eventos por categoría, ciudad y fecha.
- Ver los detalles de un evento y añadirlo al carrito de compras.
- Realizar una compra y ver un historial de compras.

Para los administradores, la aplicación ofrece:
- Un panel de administración donde pueden crear, editar, eliminar y gestionar eventos.
- Marcar eventos como destacados y agregar descuentos.

## Funcionalidades

### Usuario

- **Ver eventos**: Los usuarios pueden ver todos los eventos disponibles con detalles como título, descripción, precio, ubicación y fecha.
- **Filtrar eventos**: Los usuarios pueden filtrar los eventos por categoría, ciudad y fecha.
- **Ver detalles del evento**: Los usuarios pueden ver detalles completos de los eventos, añadirlos a su carrito de compras y proceder al pago.
- **Carrito de compras**: Los usuarios pueden gestionar los productos en su carrito, ver el total y proceder al pago.
- **Historial de compras**: Los usuarios pueden ver el historial de compras realizadas.

### Administrador

- **Panel de administración**: Los administradores pueden crear, leer, actualizar y eliminar eventos.
- **Marcar como destacado**: Los administradores pueden marcar eventos como destacados.
- **Agregar descuentos**: Los administradores pueden asignar descuentos a eventos.

## Tecnologías Usadas

- **Frontend**: Angular 17
- **Backend**: Firebase (Firestore, Firebase Auth)
- **Estilos**: SCSS

## Requisitos

1. **Node.js** y **npm** deben estar instalados en tu sistema.
2. Una cuenta de **Firebase** para conectar tu aplicación a la base de datos de Firestore.

## Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar Firebase**:
   - Crea un proyecto en [Firebase](https://firebase.google.com/).
   - Obtén las credenciales de Firebase (API keys) y agrégalas al archivo `src/environments/environment.ts`:

   ```typescript
   export const environment = {
     production: false,
     firebaseConfig: {
       apiKey: "tu-api-key",
       authDomain: "tu-auth-domain",
       projectId: "tu-project-id",
       storageBucket: "tu-storage-bucket",
       messagingSenderId: "tu-sender-id",
       appId: "tu-app-id",
       measurementId: "tu-measurement-id"
     }
   };
   ```

4. **Iniciar el servidor de desarrollo**:
   ```bash
   ng serve
   ```

   La aplicación estará disponible en `http://localhost:4200`.

## Estructura de Carpetas

- **src/app/pages**: Contiene las páginas principales como `events`, `cart`, `checkout`, `admin`, etc.
- **src/app/components**: Contiene componentes reutilizables como botones, tarjetas, etc.
- **src/app/services**: Contiene los servicios para interactuar con Firebase (auth, database, etc.).
- **src/environments**: Contiene la configuración de Firebase para distintos entornos.

## Contribuciones

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork de este repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva-funcionalidad`).
3. Haz tus cambios y realiza commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Envía un pull request a la rama `main`.

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarnos:

- **Correo electrónico**: contacto@tudominio.com
- **GitHub**: [@tu-usuario](https://github.com/tu-usuario)

```

### Explicación:

- **Descripción del proyecto**: En la sección "Descripción", explicamos las funcionalidades de la aplicación tanto para el usuario como para el administrador.
- **Tecnologías**: Aquí se listan las herramientas y tecnologías usadas (Angular, Firebase, SCSS).
- **Requisitos**: Instrucciones para configurar Firebase y las dependencias necesarias.
- **Estructura de Carpetas**: Se menciona cómo está organizada la aplicación en cuanto a las páginas y componentes.
- **Contribuciones**: Detalles sobre cómo los demás pueden contribuir al proyecto.
- **Licencia y Contacto**: Información sobre la licencia y cómo contactar al equipo.

Puedes personalizar este `README.md` según los detalles y necesidades de tu proyecto.
