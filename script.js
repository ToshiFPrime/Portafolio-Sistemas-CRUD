// ==========================================
// 1. MODO OSCURO (Global para ambas páginas)
// ==========================================
const btnToggle = document.getElementById('toggle-mode');
// Al cargar la página, verificamos si el modo oscuro estaba activo en LocalStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    btnToggle.textContent = 'Activar Modo Claro';
}

btnToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    btnToggle.textContent = isDark ? 'Activar Modo Claro' : 'Activar Modo Oscuro';
    // Guardamos la preferencia para que no se pierda al cambiar de página
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ==========================================
// 2. LÓGICA DE INDEX.HTML (Formulario de Contacto)
// ==========================================
const formContacto = document.getElementById('contactForm');
if (formContacto) { // Solo se ejecuta si estamos en index.html
    const errorContacto = document.getElementById('error-contacto');

    formContacto.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        if (!nombre || !correo || !mensaje) {
            errorContacto.style.display = 'block';
        } else {
            errorContacto.style.display = 'none';
            alert("✅ Mensaje enviado con éxito.");
            formContacto.reset();
        }
    });
}

// ==========================================
// 3. LÓGICA DE ADMIN.HTML (CRUD - Actividad 2)
// ==========================================
const formCrud = document.getElementById('crudForm');
if (formCrud) { // Solo se ejecuta si estamos en admin.html
    let baseDeDatosMemoria = []; 
    let idGenerador = 1;
    const errorCrud = document.getElementById('error-crud');
    const tableBody = document.getElementById('tableBody');

    // CREATE: Agregar un registro
    formCrud.addEventListener('submit', (e) => {
        e.preventDefault(); // Requisito PDF: Evita recarga para validar sin enviar

        const cliente = document.getElementById('crud-cliente').value.trim();
        const costo = document.getElementById('crud-costo').value.trim();
        const fecha = document.getElementById('crud-fecha').value;
        const servicio = document.getElementById('crud-servicio').value;
        const urgente = document.getElementById('crud-urgente').checked;

        // Validación exigida por la rúbrica
        if (!cliente || !costo || !fecha || !servicio) {
            errorCrud.style.display = 'block';
            return; 
        }

        errorCrud.style.display = 'none';

        const nuevoRegistro = {
            id: idGenerador++, 
            cliente: cliente,
            costo: parseFloat(costo).toFixed(2), 
            fecha: fecha,
            servicio: servicio,
            urgente: urgente ? 'Sí 🔴' : 'No 🟢'
        };

        baseDeDatosMemoria.push(nuevoRegistro);
        formCrud.reset(); 
        leerRegistros(); 
    });

    // READ: Renderizar la tabla
    function leerRegistros() {
        tableBody.innerHTML = ''; 

        baseDeDatosMemoria.forEach(registro => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${registro.cliente}</td>
                <td>$${registro.costo}</td>
                <td>${registro.fecha}</td>
                <td>${registro.servicio}</td>
                <td>${registro.urgente}</td>
                <td><button class="btn-eliminar" onclick="borrarRegistro(${registro.id})">Eliminar</button></td>
            `;
            tableBody.appendChild(fila);
        });
    }

    // DELETE: Eliminar un registro (Requiere exponer función al objeto window)
    window.borrarRegistro = function(id) {
        baseDeDatosMemoria = baseDeDatosMemoria.filter(registro => registro.id !== id);
        leerRegistros(); 
    };
}