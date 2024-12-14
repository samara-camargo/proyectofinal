
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

- **Frontend**: Angular 
- **Backend**: Firebase (Firestore, Firebase Auth)
- **Estilos**: SCSS

## Requisitos

1. **Node.js** y **npm** deben estar instalados en tu sistema.

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


3. **Iniciar el servidor de desarrollo**:
   ```bash
   ng serve
   ```

   La aplicación estará disponible en `http://localhost:4200`.

## Estructura de Carpetas

- **src/app/pages**: Contiene las páginas principales como `events`, `cart`, `checkout`, `admin`, etc.
- **src/app/components**: Contiene componentes reutilizables como card.
- **src/app/services**: Contiene los servicios para interactuar con Firebase (auth, database).

## Participantes

- **Emily Astor**
- **Samara Camargo**
- **Galilea Cossio** 

