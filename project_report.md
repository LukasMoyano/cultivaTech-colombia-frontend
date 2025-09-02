# Informe del Proyecto: CultivaTech ColombIA

## 1. Propósito General

CultivaTech ColombIA es una plataforma innovadora diseñada para revolucionar la agricultura colombiana mediante la integración de tecnología avanzada. Su objetivo principal es proporcionar a los agricultores herramientas inteligentes para monitorear, gestionar y optimizar sus cultivos, permitiéndoles tomar decisiones informadas y mejorar la productividad.

## 2. Composición y Arquitectura

El proyecto se compone de dos partes principales que interactúan de forma segura:

### Frontend (Aplicación Web del Cliente)

*   **Tecnología:** Desarrollado con **React** (una librería de JavaScript para construir interfaces de usuario), **Vite** (un entorno de desarrollo rápido) y **Tailwind CSS** (un framework CSS para estilos rápidos y personalizados).
*   **Funcionalidad:** Es la interfaz con la que el usuario interactúa directamente. Muestra datos, permite la gestión de cultivos, acceso a alertas, control de robots y una página de presentación dinámica.
*   **Theming:** Implementa un sistema de temas dual (Modo Día / Modo Noche) con una paleta de colores coherente y tipografía `Audiowide` para títulos y `Inter` para texto general.
*   **Componentes Clave:** `App.jsx`, `Header.jsx`, `Sidebar.jsx`, `LandingPage.jsx`, `IngresoRegistro.jsx`, `Dashboard.jsx`, `Cultivos.jsx`, `DashboardClima.jsx`, `DashboardAlertasYRecomendaciones.jsx`, `useTheme.js`, `useScrollPosition.js`, `ThemeToggleButton.jsx`, y subcomponentes específicos de cada sección.

### Backend (Servidor Proxy Seguro)

*   **Tecnología:** Desarrollado con **Node.js** y **Express.js** (un framework web minimalista). Utiliza `axios` para peticiones HTTP, `cors` para manejar políticas de seguridad y `dotenv` para la gestión segura de variables de entorno.
*   **Funcionalidad:** Actúa como un intermediario seguro entre el frontend y las APIs externas (como la de OpenWeatherMap). Su función principal es proteger las claves de API, asegurando que nunca sean expuestas al lado del cliente (navegador).
*   **Persistencia de Datos (Demo):** Para la gestión de cultivos, utiliza un sistema de persistencia simple basado en archivos JSON (`cultivos.json`) para almacenar y recuperar los datos de los cultivos.
*   **Endpoints Clave:**
    *   `GET /api/clima`: Proxy para obtener datos del clima.
    *   `GET /api/cultivos`: Obtiene la lista de todos los cultivos.
    *   `POST /api/cultivos`: Permite añadir un nuevo cultivo.

## 3. Funcionamiento General

1.  **Acceso Inicial:** Los usuarios llegan a la `LandingPage`, una presentación interactiva que explica las características de la plataforma.
2.  **Autenticación:** Pueden registrarse o iniciar sesión a través de `IngresoRegistro.jsx`.
3.  **Dashboard:** Una vez autenticados, acceden al `Dashboard`, donde ven un resumen de sus datos.
4.  **Interacción con Datos:**
    *   **Clima:** El componente `DashboardClima` solicita datos de clima a la API de OpenWeatherMap, pero lo hace a través del **servidor backend**. El frontend envía la latitud y longitud al backend, y el backend, de forma segura, añade la API Key y hace la petición a OpenWeatherMap. La respuesta se envía de vuelta al frontend.
    *   **Cultivos:** La página `Cultivos.jsx` carga la lista de cultivos existentes haciendo una petición `GET` a `/api/cultivos` en el backend. Cuando un usuario añade un nuevo cultivo, los datos se envían mediante una petición `POST` a `/api/cultivos` en el backend, que los guarda en `cultivos.json`.
5.  **Experiencia de Usuario:** La aplicación ofrece una experiencia visual coherente y dinámica gracias al sistema de temas (Modo Día/Noche) y la tipografía `Audiowide` para títulos, que le da un toque "cyberpunk" y moderno. El encabezado es fijo y legible, y el menú lateral móvil es funcional y estilizado.

---

## 4. Descripción Detallada de Componentes y Funcionalidades

### 4.1. Elementos Globales y de Estructura

#### **4.1.1. Sistema de Temas (`src/index.css`, `tailwind.config.js`)**

*   **Propósito:** Define la paleta de colores y las tipografías base que se aplican a toda la aplicación, permitiendo un cambio dinámico entre un "Modo Día" y un "Modo Noche".
*   **Funcionamiento:**
    *   `tailwind.config.js`: Configura Tailwind CSS para usar variables CSS para los colores (`--color-primary`, `--color-background`, etc.) y define las familias de fuentes (`font-heading` para títulos, `font-sans` para texto general). También establece bordes rectos por defecto para un aspecto técnico.
    *   `src/index.css`: Importa las fuentes (`Audiowide` para títulos, `Inter` para texto) desde Google Fonts. Define los valores de las variables CSS para cada tema (`:root` para el Modo Día, `[data-theme='night']` para el Modo Noche). Aplica estos estilos base al `body` y a los encabezados (`h1`-`h6`).
*   **Características Visuales:**
    *   **Modo Día:** Predominan tonos cálidos y claros. Un fondo principal beige suave, tarjetas en blanco puro, texto principal en marrón oscuro y acentos vibrantes en rojo y amarillo/naranja. Los bordes son de un beige más oscuro.
    *   **Modo Noche:** Predominan tonos oscuros y fríos. Un fondo principal casi negro, tarjetas en gris oscuro, texto principal en gris claro y acentos brillantes en morado y verde neón. Los bordes son de un gris oscuro.
    *   **Tipografía:** Los títulos y elementos destacados utilizan una fuente geométrica y futurista (`Audiowide`). El texto general utiliza una fuente sans-serif moderna y legible (`Inter`).
    *   **Bordes:** La mayoría de los elementos interactivos y contenedores tienen bordes rectos y definidos, contribuyendo a una estética limpia y técnica.

#### **4.1.2. Gestión de Temas (`src/hooks/useTheme.js`)**

*   **Propósito:** Un "hook" personalizado de React que gestiona el estado del tema actual de la aplicación y lo persiste.
*   **Funcionamiento:**
    *   Al cargar la aplicación, verifica si hay un tema guardado en el almacenamiento local del navegador. Si no, detecta la preferencia de tema del sistema operativo del usuario. Por defecto, inicia en "Modo Día".
    *   Cada vez que el tema cambia, actualiza un atributo `data-theme` en el elemento `<html>` del documento, lo que activa los estilos CSS correspondientes.
    *   Guarda la preferencia del usuario en el almacenamiento local para futuras visitas.
*   **Interacción:** Expone el tema actual y una función `toggleTheme` que los componentes de la interfaz de usuario pueden usar para cambiar entre el Modo Día y el Modo Noche.

#### **4.1.3. Seguimiento de Scroll (`src/hooks/useScrollPosition.js`)**

*   **Propósito:** Un "hook" personalizado de React que rastrea la posición vertical de desplazamiento de la ventana.
*   **Funcionamiento:** Añade un "listener" al evento `scroll` de la ventana y actualiza un estado interno con la posición actual de desplazamiento en píxeles.
*   **Interacción:** Permite que los componentes de la interfaz de usuario (como el encabezado) reaccionen al desplazamiento del usuario, habilitando efectos dinámicos.

#### **4.1.4. Botón de Cambio de Tema (`src/components/ui/ThemeToggleButton.jsx`)**

*   **Propósito:** Proporciona una interfaz de usuario para que el usuario alterne manualmente entre el Modo Día y el Modo Noche.
*   **Funcionamiento:** Utiliza el `useTheme` hook para obtener el tema actual y la función para cambiarlo. Al hacer clic, invoca `toggleTheme`.
*   **Características Visuales:** Un botón con bordes definidos, que utiliza los colores de fondo y texto del tema actual. El texto del botón cambia dinámicamente entre "MODO DÍA" y "MODO NOCHE", utilizando la tipografía de encabezado.

### 4.2. Estructura Principal de la Aplicación

#### **4.2.1. Orquestador de la Aplicación (`src/App.jsx`)**

*   **Propósito:** Es el componente raíz de la aplicación. Se encarga de gestionar el estado global de la página actual, la visibilidad del menú lateral y la autenticación simulada. Actúa como el "cerebro" que decide qué componentes principales se renderizan en cada momento.
*   **Funcionamiento:**
    *   Maneja el estado `currentPage` para controlar la navegación entre la Landing Page, el Dashboard, Ingreso/Registro, etc.
    *   Controla el estado `sidebarOpen` para el menú lateral en dispositivos móviles.
    *   Renderiza condicionalmente el `Header`, `Sidebar`, `MainContent`, `ChatBot` y `Footer` según la página actual y el estado de autenticación.
*   **Interacción:** Pasa funciones de navegación (`handleNav`) y estados (`isAuthenticated`, `sidebarOpen`) a sus componentes hijos para que puedan interactuar con la lógica central de la aplicación.
*   **Características Visuales:** Define la estructura básica de la página (encabezado, contenido principal, pie de página, chatbot flotante).

#### **4.2.2. Barra de Navegación Superior (`src/components/Header.jsx`)**

*   **Propósito:** Proporciona la navegación principal de la aplicación, el logo de la marca y el botón de cambio de tema. Es visible en todas las páginas.
*   **Funcionamiento:**
    *   Muestra el logo/título de la aplicación, que actúa como un botón para navegar al Dashboard (si está autenticado) o a la Landing Page (si no lo está).
    *   Renderiza los ítems de navegación principales (Panel, Cultivos, Alertas, Robot, Presentación) si el usuario está autenticado.
    *   Incluye el `ThemeToggleButton` para cambiar entre Modo Día y Modo Noche.
    *   Muestra un botón de menú para dispositivos móviles que controla la visibilidad del `Sidebar`.
*   **Interacción:** Utiliza `onNav` para cambiar la página actual y `onMobileMenuClick` para controlar el menú lateral.
*   **Características Visuales:**
    *   Fondo sólido que se adapta al tema (Modo Día/Noche), con una sutil sombra y un borde inferior.
    *   El logo y los textos de navegación utilizan la tipografía de encabezado (`Audiowide`) y los colores del tema.
    *   Los ítems de navegación activos se resaltan con el color primario del tema.

#### **4.2.3. Menú de Navegación Lateral (`src/components/Sidebar.jsx`)**

*   **Propósito:** Proporciona una navegación lateral desplegable, principalmente para dispositivos móviles y tabletas, que permite acceder a las diferentes secciones de la aplicación.
*   **Funcionamiento:**
    *   Se despliega desde la izquierda de la pantalla al hacer clic en el botón de menú del `Header`.
    *   Muestra una lista de ítems de navegación que, al ser seleccionados, cambian la página actual y cierran el menú.
    *   Incluye un encabezado propio con el logo y un botón para cerrarlo.
    *   Tiene un "overlay" semitransparente que cubre el resto de la pantalla cuando está abierto, para enfocar la atención en el menú.
*   **Interacción:** Utiliza `onNav` para la navegación y `setSidebarOpen` para controlar su visibilidad.
*   **Características Visuales:**
    *   Fondo sólido que se adapta al tema (Modo Día/Noche), con un borde derecho.
    *   Los textos de los ítems de navegación y el título del sidebar utilizan la tipografía de encabezado (`Audiowide`) y los colores del tema.
    *   Los ítems activos se resaltan con el color primario del tema.
    *   Transiciones suaves al abrir y cerrar.

### 4.3. Páginas y Funcionalidades Principales

#### **4.3.1. Página de Presentación (`src/components/LandingPage.jsx`)**

*   **Propósito:** Es la primera página que ven los usuarios. Actúa como una presentación interactiva de la plataforma CultivaTech ColombIA, destacando sus beneficios, tecnologías y funcionamiento.
*   **Funcionamiento:**
    *   Implementa un sistema de "slides" o diapositivas que el usuario puede navegar secuencialmente.
    *   Cada slide es un componente separado (`WelcomeSlide`, `ProblemSolutionSlide`, etc.) que encapsula su propio contenido y diseño.
    *   Muestra una barra de progreso visual que indica el avance a través de las diapositivas.
    *   Permite navegar entre slides con botones "Anterior" y "Siguiente", o ir directamente al registro/inicio de sesión.
*   **Interacción:** Utiliza `setCurrentPage` para la navegación a otras secciones de la aplicación.
*   **Características Visuales:**
    *   Fondo y contenedores que se adaptan al tema (Modo Día/Noche).
    *   Títulos de los slides y de la página principal con la tipografía de encabezado (`Audiowide`).
    *   Los slides internos están diseñados con un estilo limpio y técnico, utilizando los colores del tema para resaltar información y crear contraste.
    *   La barra de progreso utiliza el color primario del tema.

#### **4.3.1.1. Slides de la Landing Page (`src/components/landing/slides/*.jsx`)**

*   **Propósito:** Cada uno de estos componentes representa una sección específica de contenido dentro de la `LandingPage`, permitiendo una organización modular y una fácil actualización.
*   **Funcionamiento:** Son componentes "dumb" (presentacionales) que solo se encargan de renderizar su contenido. Reciben datos o funciones de navegación como `props` si es necesario.
*   **Características Visuales (Comunes):**
    *   Todos utilizan los colores de fondo, texto, acento y bordes del tema activo.
    *   Los títulos dentro de cada slide usan la tipografía de encabezado (`Audiowide`).
    *   Los elementos como tarjetas, listas y botones están estilizados para mantener la coherencia con la estética general de la aplicación (bordes rectos, sombras sutiles, colores temáticos).

#### **4.3.2. Formularios de Ingreso y Registro (`src/components/IngresoRegistro.jsx`)**

*   **Propósito:** Permite a los usuarios existentes iniciar sesión y a los nuevos usuarios crear una cuenta en la plataforma.
*   **Funcionamiento:**
    *   Alterna entre la vista de "Ingresar" y "Crear Cuenta" mediante un estado interno.
    *   Contiene campos de formulario para credenciales (correo, contraseña) y datos de registro (tipo/número de documento, celular).
    *   Simula el proceso de autenticación/registro con alertas básicas.
*   **Interacción:** Utiliza `setCurrentPage` para navegar al Dashboard una vez que el ingreso/registro es "exitoso".
*   **Características Visuales:**
    *   El formulario principal está contenido en una tarjeta con fondo, borde y sombra temáticos.
    *   Los títulos de los formularios utilizan la tipografía de encabezado (`Audiowide`).
    *   Los campos de entrada (inputs) y los botones están estilizados con bordes definidos y colores del tema, asegurando legibilidad y coherencia.

#### **4.3.3. Panel Principal (`src/components/Dashboard.jsx`)**

*   **Propósito:** Es el centro de control principal para los usuarios autenticados, ofreciendo un resumen ejecutivo del estado de sus cultivos y acceso rápido a funcionalidades clave.
*   **Funcionamiento:**
    *   Actúa como un contenedor para varias secciones informativas (clima, estado de cultivos, alertas, robot, acceso rápido).
    *   Utiliza una estructura semántica (`<h1>`, `<main>`, `<section>`, `<h2>`) para mejorar el SEO y la accesibilidad.
*   **Interacción:** Pasa la función `setCurrentPage` a sus componentes hijos para permitir la navegación a otras secciones de la aplicación.
*   **Características Visuales:**
    *   El título principal "PANEL PRINCIPAL" es el `<h1>` de la página, con la tipografía de encabezado y un subrayado decorativo.
    *   Cada sección (ej. "Estado General", "Robot CultivaTech") es una tarjeta con fondo, borde y sombra temáticos, y un título `<h2>` con la tipografía de encabezado.
    *   Los botones y textos dentro de las secciones están completamente tematizados.

#### **4.3.3.1. Panel de Clima (`src/components/Dashboardd_2panels/_dashboard_Clima.jsx`)**

*   **Propósito:** Muestra información meteorológica relevante para la ubicación actual del usuario.
*   **Funcionamiento:**
    *   Detecta la geolocalización del usuario.
    *   Realiza una petición a la API del clima a través del **servidor backend** (para proteger la API Key).
    *   Muestra la temperatura, descripción del clima, humedad, viento y temperaturas máximas/mínimas.
    *   Incluye un botón para actualizar la ubicación.
*   **Interacción:** Se comunica con el backend para obtener datos del clima.
*   **Características Visuales:**
    *   Contenido dentro de una tarjeta con fondo, borde y sombra temáticos.
    *   La temperatura principal se muestra de forma destacada con la tipografía de encabezado y el color primario del tema.
    *   Los textos y botones están completamente tematizados.

#### **4.3.3.2. Panel de Alertas y Recomendaciones (`src/components/Dashboardd_2panels/_dashboard_alertasyrecomendaciones.jsx`)**

*   **Propósito:** Muestra alertas y recomendaciones generadas por IA relacionadas con los cultivos, rotando la información periódicamente.
*   **Funcionamiento:**
    *   Genera alertas aleatorias basadas en un conjunto predefinido de datos.
    *   Las alertas se actualizan automáticamente cada 10 segundos.
    *   Muestra el cultivo actual que está siendo monitoreado.
*   **Interacción:** Permite navegar a la página de "Alertas" para ver el historial completo.
*   **Características Visuales:**
    *   Contenido dentro de una tarjeta con fondo, borde y sombra temáticos.
    *   Las alertas individuales tienen un estilo que varía según su tipo (crítica, advertencia, recomendación), utilizando los colores primario y secundario del tema para indicar su severidad.
    *   Los títulos y textos están tematizados.

#### **4.3.4. Gestión de Cultivos (`src/components/Cultivos.jsx`)**

*   **Propósito:** Permite a los usuarios gestionar y monitorear sus cultivos, ver detalles específicos de cada uno y añadir nuevos cultivos.
*   **Funcionamiento:**
    *   Actúa como un orquestador para tres vistas principales:
        *   **Modo Resumen:** Utilizado en el Dashboard, muestra tarjetas compactas de cultivos.
        *   **Vista Detalle:** Muestra información exhaustiva de un cultivo seleccionado (humedad, temperatura, detecciones IA).
        *   **Vista de Lista y Formulario:** La vista principal de la página "Cultivos", donde se listan todos los cultivos y se puede añadir uno nuevo.
    *   **Persistencia:** Carga los cultivos desde el backend al iniciar y envía los nuevos cultivos al backend para su almacenamiento.
*   **Interacción:** Permite seleccionar un cultivo para ver su detalle, añadir nuevos cultivos y navegar a otras páginas.
*   **Características Visuales:**
    *   Todos los elementos (títulos, botones, tarjetas, formularios, inputs) están completamente tematizados con los colores y tipografías del proyecto.
    *   Las tarjetas de cultivo son visualmente atractivas y muestran información clave de un vistazo.

#### **4.3.4.1. Tarjeta Resumida de Cultivo (`src/components/cultivos/CultivoSummaryCard.jsx`)**

*   **Propósito:** Muestra una vista compacta de un cultivo, ideal para listados o resúmenes (como en el Dashboard).
*   **Funcionamiento:** Recibe un objeto `cultivo` y una función `onSeleccionar` como `props`.
*   **Características Visuales:** Una tarjeta pequeña con imagen, nombre, estado, y métricas clave. Totalmente tematizada.

#### **4.3.4.2. Vista Detallada de Cultivo (`src/components/cultivos/CultivoDetailView.jsx`)**

*   **Propósito:** Presenta toda la información disponible sobre un cultivo específico.
*   **Funcionamiento:** Recibe el objeto `cultivo` detallado y funciones para volver a la lista o navegar a otras páginas.
*   **Características Visuales:** Una vista expandida con secciones para gráficos (placeholders), detecciones de IA y botones de acción. Totalmente tematizada.

#### **4.3.4.3. Formulario de Cultivo (`src/components/cultivos/CultivoForm.jsx`)**

*   **Propósito:** Permite al usuario introducir los datos de un nuevo cultivo.
*   **Funcionamiento:** Recibe el estado del formulario y la función de envío como `props`.
*   **Características Visuales:** Un formulario limpio y tematizado, con campos de entrada y un botón de guardar.

#### **4.3.4.4. Lista de Cultivos (`src/components/cultivos/CultivoList.jsx`)**

*   **Propósito:** Muestra una cuadrícula de tarjetas de cultivos, cada una de las cuales se puede hacer clic para ver los detalles.
*   **Funcionamiento:** Recibe un array de `cultivos` y la función `setDetalle` como `props`.
*   **Características Visuales:** Una cuadrícula responsiva de tarjetas de cultivo, cada una tematizada y con efectos de interacción.

### 4.4. Backend y Gestión de Datos

#### **4.4.1. Servidor Backend (`backend/server.js`)**

*   **Propósito:** Actúa como el cerebro de la aplicación, manejando la lógica de negocio, la comunicación segura con APIs externas y la persistencia de datos.
*   **Funcionamiento:**
    *   **Proxy de Clima:** Recibe peticiones del frontend para datos del clima, añade de forma segura la API Key (almacenada en `backend/.env`) y reenvía la petición a OpenWeatherMap. La respuesta se devuelve al frontend.
    *   **API de Cultivos:**
        *   `GET /api/cultivos`: Lee y devuelve la lista de cultivos desde `backend/data/cultivos.json`.
        *   `POST /api/cultivos`: Recibe los datos de un nuevo cultivo del frontend, lo añade a la lista existente y lo guarda en `backend/data/cultivos.json`.
    *   **Seguridad:** Utiliza `dotenv` para cargar variables de entorno y `cors` para permitir peticiones desde el frontend.
*   **Interacción:** Es el único punto de contacto entre el frontend y las APIs externas/datos persistentes, garantizando la seguridad de la API Key.
