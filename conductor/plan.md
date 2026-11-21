# Plan de Reestructuración Visual y Migración Backend

## 1. Contexto y Objetivos
- **Frontend**: Reorganizar la estructura de archivos del proyecto React hacia una arquitectura modular basada en "features". Aplicar un rediseño visual ("Cyberpunk Andino") basado en nuevos mockups.
- **Backend & Base de Datos**: Preparar y trasladar el backend (Node.js) y su base de datos al nuevo Host de producción.
- **Documentación**: Editar el `README.md` principal para reflejar los cambios estructurales, el nuevo host y el rediseño.

## 2. Impacto en la Programación Interna (Frontend)
Aunque la lógica no cambia, **la estructura de directorios sí modifica las importaciones**.
Al mover un archivo, todas las referencias a ese archivo deben actualizarse para que React lo encuentre.

**Estrategia de refactorización (Cero roturas)**:
1. Crear la nueva estructura de carpetas.
2. Mover los componentes uno por uno.
3. Actualizar inmediatamente las rutas de `import`.
4. Ejecutar el build (`npm run build`) para asegurar que no hay enlaces rotos antes de hacer `git commit`.

## 3. Fases de Ejecución

### Fase 1: Reorganización del Frontend
- Mover páginas principales a `src/pages/`.
- Agrupar características dentro de `src/features/`.
- Mover componentes globales a `src/components/shared/`.
- Actualizar TODAS las importaciones.
- **Commit**: `refactor: reorganización de arquitectura Nexus 2026`

### Fase 2: Implementación de la Nueva Visualidad
- Comparar el diseño actual con los **nuevos mockups**.
- Integrar la nueva paleta y estilos en `src/styles/cyberpunk-andino/`.
- Actualizar la lógica para que los componentes adopten las nuevas variables CSS.
- **Commit**: `feat(ui): aplicación de estilos Cyberpunk Andino`

### Fase 3: Migración del Backend al Nuevo Host
El backend actual usa archivos JSON locales.
- **Configuración de Host**: Configurar `.env.production` con las credenciales del nuevo Host y de la Base de Datos.
- **Migración de Datos**: Preparar script para migrar datos (JSON) a la Base de Datos del host (e.g., PostgreSQL).
- **CORS**: Configurar `allowedOrigins` en `backend/server.js`.
- **Despliegue**: Subir el backend por FTP/SSH al nuevo Host y configurarlo. Actualizar `src/api.js` en el frontend.
- **Commit**: `chore(deploy): migración de backend y db a nuevo host de producción`

### Fase 4: Edición de Documentación Existente
- Editaremos el archivo raíz `README.md` (sección "Estado Técnico de la Sesión") documentando la nueva arquitectura, los estilos y la configuración del nuevo host.

## 4. Validación y Pruebas
- Probar peticiones al backend localmente y luego al de producción.
- Validar el diseño visual con los mockups.
- Commit y Push finales a GitHub.