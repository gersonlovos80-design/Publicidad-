const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        // --- CATÁLOGO ENFOCADO EN GALLINAS (INVENTADO) ---
        // Debes tener estas imágenes PNG transparentes en la carpeta
        const productos = ref([
            { 
                nombre: 'Gallina India Entera (LAVADA)', 
                descripcion: 'Fresca, limpia y lista para cocinar.',
                precio: 14.50, 
                unidad: 'unidad',
                imagen: 'gallina-lavada.png', // <--- CAMBIA ESTO
                cantidad: 0 
            },
            { 
                nombre: 'Gallina India Entera (VIVA)', 
                descripcion: 'Seleccionada directamente del corral.',
                precio: 11.00, 
                unidad: 'unidad',
                imagen: 'gallina-viva.png', // <--- CAMBIA ESTO
                cantidad: 0 
            },
            { 
                nombre: 'Pechuga Especial (LAVADA)', 
                descripcion: 'Corte premium, sin hueso.',
                precio: 5.25, 
                unidad: 'libra',
                imagen: 'pechuga.png', // <--- CAMBIA ESTO
                cantidad: 0 
            },
            { 
                nombre: 'Menudencia de Gallina', 
                descripcion: 'Ideal para sopas y guisos.',
                precio: 2.50, 
                unidad: 'libra',
                imagen: 'menudencia.png', // <--- CAMBIA ESTO
                cantidad: 0 
            }
        ]);

        // Cálculo del total dinámico
        const total = computed(() => {
            return productos.value.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
        });

        // Función para sumar o restar cantidades
        const modificar = (index, valor) => {
            const nuevaCantidad = productos.value[index].cantidad + valor;
            if (nuevaCantidad >= 0) {
                productos.value[index].cantidad = nuevaCantidad;
            }
        };

        // Función para enviar a WhatsApp
        const hacerPedido = () => {
            let mensaje = "¡Hola Granja Rosita! 🐔 Quisiera hacer el siguiente pedido de gallinas:\n\n";
            let hayPedido = false;

            productos.value.forEach(p => {
                if(p.cantidad > 0) {
                    hayPedido = true;
                    mensaje += `- ${p.cantidad}x ${p.nombre} (Total: $${(p.precio * p.cantidad).toFixed(2)})\n`;
                }
            });

            if(!hayPedido) return; // Evita enviar mensajes vacíos

            mensaje += `\n*Total estimado: $${total.value.toFixed(2)}*`;
            
            // --- CAMBIA ESTE NÚMERO POR EL REAL (FORMATO INTERNACIONAL) ---
            const telefono = "50370000000"; 
            const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');
        };

        return { productos, total, modificar, hacerPedido };
    }
}).mount('#app');