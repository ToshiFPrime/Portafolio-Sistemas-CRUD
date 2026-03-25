-- =============================================
-- ARQUITECTURA DE BASE DE DATOS - ACTIVIDAD 2
-- Alumno: Ivan Toshiaky
-- =============================================

CREATE DATABASE GestionPortafolio;
USE GestionPortafolio;

-- Creación de la tabla que refleja exactamente los inputs del formulario HTML
CREATE TABLE TrabajosCRUD (
    id_trabajo INT AUTO_INCREMENT PRIMARY KEY,
    cliente_nombre VARCHAR(150) NOT NULL,    -- Corresponde al input type="text"
    costo_servicio DECIMAL(10,2) NOT NULL,   -- Corresponde al input type="number"
    fecha_ingreso DATE NOT NULL,             -- Corresponde al input type="date"
    categoria_servicio VARCHAR(80) NOT NULL, -- Corresponde al select
    es_urgente BIT NOT NULL                  -- Corresponde al checkbox (1=True, 0=False)
);

-- =============================================
-- OPERACIONES CRUD (Para demostrar en exposición)
-- =============================================

-- 1. CREATE (Inserción de datos simulando el formulario)
INSERT INTO TrabajosCRUD (cliente_nombre, costo_servicio, fecha_ingreso, categoria_servicio, es_urgente)
VALUES ('Laboratorio Sistemas', 450.00, '2026-03-28', 'Configuración Router', 1);

INSERT INTO TrabajosCRUD (cliente_nombre, costo_servicio, fecha_ingreso, categoria_servicio, es_urgente)
VALUES ('Carlos A.', 120.00, '2026-04-02', 'Reparación Mandos PS5', 0);

-- 2. READ & CONSULTAS DE BÚSQUEDA (Exigidas por la rúbrica)
-- Búsqueda General: Ver todos los registros
SELECT * FROM TrabajosCRUD;

-- Búsqueda Específica: Buscar solo trabajos de una categoría específica ordenados por fecha
SELECT cliente_nombre, fecha_ingreso, costo_servicio 
FROM TrabajosCRUD 
WHERE categoria_servicio = 'Reparación Mandos PS5'
ORDER BY fecha_ingreso DESC;

-- 3. UPDATE (Actualización de un registro)
-- Ejemplo: Modificamos el costo del trabajo ID 1
UPDATE TrabajosCRUD
SET costo_servicio = 500.00
WHERE id_trabajo = 1;

-- 4. DELETE (Eliminación de un registro)
DELETE FROM TrabajosCRUD
WHERE id_trabajo = 2;