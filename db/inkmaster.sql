-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 19-05-2025 a las 22:34:01
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inkmaster`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--

CREATE TABLE `admin` (
  `idAdmin` bigint(20) UNSIGNED NOT NULL,
  `correoAdmin` varchar(30) NOT NULL,
  `contrasenaAdmin` varchar(70) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `admin`
--

INSERT INTO `admin` (`idAdmin`, `correoAdmin`, `contrasenaAdmin`, `created_at`, `updated_at`) VALUES
(1, 'juan@gmail.com', '$2y$10$XDbcDrbmAy3lRdsdnV/1dek9aHR0BU.Kc4nh.9SsFnjNJxi7d0ECq', '2025-04-24 23:11:13', '2025-04-24 23:11:13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cita`
--

CREATE TABLE `cita` (
  `idCita` bigint(20) UNSIGNED NOT NULL,
  `fechaCita` date NOT NULL,
  `horaCita` time NOT NULL,
  `idCliente` bigint(20) UNSIGNED NOT NULL,
  `idEmpleado` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cita`
--

INSERT INTO `cita` (`idCita`, `fechaCita`, `horaCita`, `idCliente`, `idEmpleado`, `created_at`, `updated_at`) VALUES
(1, '2025-04-08', '17:28:00', 1, 1, NULL, NULL),
(2, '2025-06-28', '18:24:00', 1, 1, NULL, NULL),
(3, '2025-04-27', '14:30:00', 2, 4, NULL, NULL),
(4, '2025-05-31', '20:27:00', 2, 3, NULL, NULL),
(5, '2025-04-16', '12:36:00', 3, 2, NULL, NULL),
(6, '2025-05-30', '16:30:00', 3, 3, NULL, NULL),
(7, '2025-04-21', '19:49:00', 4, 3, NULL, NULL),
(8, '2025-04-28', '08:00:00', 4, 2, NULL, NULL),
(10, '2025-04-14', '19:47:00', 6, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idCliente` bigint(20) UNSIGNED NOT NULL,
  `correoCliente` varchar(30) NOT NULL,
  `contrasenaCliente` varchar(70) NOT NULL,
  `nombreCliente` varchar(20) NOT NULL,
  `apellidoCliente` varchar(20) NOT NULL,
  `telefonoCliente` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idCliente`, `correoCliente`, `contrasenaCliente`, `nombreCliente`, `apellidoCliente`, `telefonoCliente`, `created_at`, `updated_at`) VALUES
(1, 'angel@gmail.com', '$2y$10$THf8kYGodCfUqGKAOg3kB.soJ3lqG.gwAJ3oNUdll58DDIDNbJhfG', 'angel', 'hernandez', '3126754897', '2025-04-24 23:22:18', '2025-04-24 23:22:18'),
(2, 'samuel@gmail.com', '$2y$10$ZvIIniYqEHx5YPl6PKO0Ze24MEqTxWH5NWCHyGPcE4Osw2Nrx8lva', 'samuel', 'hernandez', '3126754897', '2025-04-25 00:26:56', '2025-04-25 00:26:56'),
(3, 'camila@gmail.com', '$2y$10$wjdVrpYc4lIpNRn2gs3lcusExYnFAnl8Anc80wn2j.VeevY5ciXWa', 'camila', 'torres', '31269584859', '2025-04-25 00:30:21', '2025-04-25 00:30:21'),
(4, 'andrea@gmail.com', '$2y$10$.xg9hY6ijxCr/kXrKHWP8equh9wwT17n/9GdZ3cnpDsn35DP0UK0K', 'andrea', 'martinez', '3125768356', '2025-04-25 00:48:57', '2025-04-25 00:48:57'),
(6, 'sara@gmail.com', '$2y$10$H8IQjoMwO9BwV1DqY2LAzedW0wmZ216sIVeCvn3APF4deOh3LX8US', 'sara', 'martinez', '31596493', '2025-04-25 01:46:45', '2025-04-25 01:46:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empleado`
--

CREATE TABLE `empleado` (
  `idEmpleado` bigint(20) UNSIGNED NOT NULL,
  `nombreEmpleado` varchar(20) NOT NULL,
  `correoEmpleado` varchar(30) NOT NULL,
  `contrasenaEmpleado` varchar(70) NOT NULL,
  `telefonoEmpleado` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `empleado`
--

INSERT INTO `empleado` (`idEmpleado`, `nombreEmpleado`, `correoEmpleado`, `contrasenaEmpleado`, `telefonoEmpleado`, `created_at`, `updated_at`) VALUES
(1, 'alex', 'alex@gmail.com', '$2y$10$a2DCY2xLpg4jbQkpEkSUiuvNY5oT97Mece.2Ghf1/k0KB4Rsq6Y6G', '31584838495', NULL, NULL),
(2, 'anya', 'anya@gmail.com', '$2y$10$9BSOFCMFxWxDyAXQoxWgJ.j41ENizDMg5Ah1ayrWmUwZEFwHmOxTy', '6593848549', NULL, NULL),
(3, 'miranda', 'miranda@gmail.com', '$2y$10$aseetBaqaDcL58EPLOyvIejz5XhKYxJO9fX0tUbNEPpQL3uRehsYe', '3127948394', NULL, NULL),
(4, 'sebastian', 'sebastian@gmail.com', '$2y$10$iBqi2mw4Uzi5rkLJ8h2KduW6XxdXlHXvakKzd/gQCSn6lJJH.T81.', '3179485938', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2025_04_19_233454_create_admin_table', 1),
(6, '2025_04_20_000321_create_cliente_table', 1),
(7, '2025_04_20_000714_create_empleado_table', 1),
(8, '2025_04_20_000755_create_cita_table', 1),
(9, '2025_04_21_171807_create_perfil_empleado_table', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `perfil_empleado`
--

CREATE TABLE `perfil_empleado` (
  `idPerfil` bigint(20) UNSIGNED NOT NULL,
  `idEmpleado` bigint(20) UNSIGNED NOT NULL,
  `fotoEmpleado` varchar(255) DEFAULT NULL,
  `historiaEmpleado` text DEFAULT NULL,
  `experienciaEmpleado` text DEFAULT NULL,
  `enfoquesEmpleado` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `perfil_empleado`
--

INSERT INTO `perfil_empleado` (`idPerfil`, `idEmpleado`, `fotoEmpleado`, `historiaEmpleado`, `experienciaEmpleado`, `enfoquesEmpleado`, `created_at`, `updated_at`) VALUES
(1, 1, 'assets/images/1_alex.jpg', 'Alex descubrió su vocación artística explorando el grafiti en las calles de Medellín. Fascinado por el impacto visual y la capacidad de transformar espacios, pronto trasladó esa energía al lienzo de la piel. El realismo lo atrapó por el desafío técnico y la capacidad de capturar la esencia de un sujeto, ya sea humano, animal o un objeto con historia. Para él, cada tatuaje es un ejercicio de paciencia y precisión.', 'Con más de 12 años en el oficio, Alex es un veterano del tatuaje. Aprendió junto a maestros del realismo y ha trabajado en estudios de Colombia y brevemente en el extranjero, lo que le dio una perspectiva más amplia. Es conocido por su dominio técnico y su habilidad para crear texturas y profundidades que hacen que sus tatuajes cobren vida. Ha sido invitado a varias convenciones nacionales como exponente del realismo.', 'Su fuerte es el Realismo en Black & Grey. Se especializa en retratos (humanos y animales), motivos de naturaleza, y composiciones surrealistas. Su enfoque es hiperdetallado, buscando la máxima fidelidad y el impacto visual a través del contraste, la luz y la sombra. Dedica mucho tiempo al diseño previo para asegurar un resultado impecable.', NULL, NULL),
(2, 2, 'assets/images/2_anya.jpg', 'Anya descubrió su pasión por el tatuaje recientemente, cautivada por la mezcla única de arte permanente, conexión personal y habilidad manual que define a este oficio. Proveniente de un camino creativo diferente, decidió sumergirse de lleno en el aprendizaje del tatuaje, inspirada por el talento y la atmósfera del estudio. Ve cada diseño y cada sesión como una valiosa oportunidad para aprender, crecer y conectar con las historias de sus clientes.', 'Como la incorporación más reciente a nuestro equipo, Anya se encuentra en la emocionante fase inicial de su carrera como tatuadora. Con dedicación intensiva al dibujo y la práctica en piel, está desarrollando rápidamente sus habilidades bajo la guía y el apoyo del equipo. Su entusiasmo es evidente en cada trazo, y aporta una energía fresca y una gran disposición para absorber conocimiento y perfeccionar su técnica día a día.', 'Actualmente, Anya está explorando diversos estilos y construyendo su propio lenguaje visual. Se siente especialmente cómoda y disfruta trabajando en Fine Line (Línea Fina), diseños minimalistas y pequeños tatuajes ilustrativos en Blackwork. Su enfoque se centra en la limpieza de las líneas, la delicadeza y la atención al detalle, asegurándose de que cada cliente tenga una experiencia positiva y un tatuaje hermoso. Está ansiosa por tomar nuevos retos y colaborar en ideas creativas para seguir ampliando su portafolio.', NULL, NULL),
(3, 3, 'assets/images/3_miranda.jpg', 'Desde niña, Miranda encontró en el arte una forma de canalizar su sensibilidad y visión del mundo. Creció rodeada de la vibrante escena cultural bogotana, lo que alimentó su pasión por el dibujo y la ilustración. El tatuaje la cautivó como una forma de arte íntima y perdurable, una manera de conectar con las historias de las personas y adornar sus cuerpos con significado. Decidió dedicar su talento a este oficio, buscando siempre la belleza en la delicadeza.', 'Con 6 años de experiencia, Miranda inició su camino como aprendiz en un reconocido estudio de Bogotá. Ha dedicado tiempo a perfeccionar su pulso y técnica, participando en seminarios enfocados en línea fina y microrealismo. Su enfoque meticuloso y su trato cercano la han convertido en una artista buscada para piezas sutiles y detalladas.', 'Miranda se especializa en Fine Line (Línea Fina) y Microrealismo en Black & Grey. Su trabajo se caracteriza por la precisión de sus líneas, la suavidad de sus sombras y una atención exquisita al detalle. Disfruta creando diseños botánicos, ilustraciones delicadas, pequeños símbolos cargados de significado y piezas minimalistas que se integran elegantemente a la anatomía.', NULL, NULL),
(4, 4, 'assets/images/4_sebastian.jpg', 'Sebastián creció inmerso en la vibrante escena artística y urbana de Bogotá. Desde joven, el dibujo y el diseño gráfico fueron sus herramientas para interpretar el mundo, fascinado por el poder de la línea y la composición. El tatuaje lo atrajo como la forma definitiva de fusionar arte y persona, un lienzo vivo donde sus ideas podían cobrar un significado más profundo y duradero. Vio en la piel la oportunidad de llevar su estilo gráfico a una dimensión más íntima y personal.', 'Con 7 años dedicados al arte del tatuaje, Sebastián ha cultivado una sólida trayectoria. Comenzó su camino y desde entonces ha trabajado en diversos entornos, perfeccionando su técnica y desarrollando un estilo reconocible. Ha participado en colaboraciones artísticas y busca constantemente evolucionar, experimentando con texturas y trazos para enriquecer su lenguaje visual.', 'Sebastián se especializa en Ilustrativo Black & Grey con una marcada influencia del Sketch Style (estilo boceto) y toques de Surrealismo Gráfico. Su trabajo se distingue por líneas dinámicas, a veces fragmentadas o superpuestas como en un boceto rápido, combinadas con sombras texturizadas (puntillismo, achurado) que dan profundidad sin perder la frescura del dibujo. Disfruta creando composiciones únicas basadas en naturaleza (especialmente animales e insectos), objetos con un giro conceptual, elementos de la cultura pop y figuras surrealistas. Busca un resultado expresivo, con energía y un carácter gráfico distintivo.', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idAdmin`),
  ADD UNIQUE KEY `admin_correoadmin_unique` (`correoAdmin`);

--
-- Indices de la tabla `cita`
--
ALTER TABLE `cita`
  ADD PRIMARY KEY (`idCita`),
  ADD KEY `cita_idcliente_foreign` (`idCliente`),
  ADD KEY `cita_idempleado_foreign` (`idEmpleado`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idCliente`),
  ADD UNIQUE KEY `cliente_correocliente_unique` (`correoCliente`);

--
-- Indices de la tabla `empleado`
--
ALTER TABLE `empleado`
  ADD PRIMARY KEY (`idEmpleado`),
  ADD UNIQUE KEY `empleado_correoempleado_unique` (`correoEmpleado`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indices de la tabla `perfil_empleado`
--
ALTER TABLE `perfil_empleado`
  ADD PRIMARY KEY (`idPerfil`),
  ADD UNIQUE KEY `perfil_empleado_idempleado_unique` (`idEmpleado`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `idAdmin` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `cita`
--
ALTER TABLE `cita`
  MODIFY `idCita` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idCliente` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `empleado`
--
ALTER TABLE `empleado`
  MODIFY `idEmpleado` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `perfil_empleado`
--
ALTER TABLE `perfil_empleado`
  MODIFY `idPerfil` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cita`
--
ALTER TABLE `cita`
  ADD CONSTRAINT `cita_idcliente_foreign` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE CASCADE,
  ADD CONSTRAINT `cita_idempleado_foreign` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`) ON DELETE CASCADE;

--
-- Filtros para la tabla `perfil_empleado`
--
ALTER TABLE `perfil_empleado`
  ADD CONSTRAINT `perfil_empleado_idempleado_foreign` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
