const { createApp, ref, computed } = Vue;

createApp({
    setup() {
        // Lista de productos inicial (puedes inventar más)
        const productos = ref([
            { nombre: 'Cartón de Huevos (30 un.)', precio: 4.50, cantidad: 0 },
            { nombre: 'Medio Cartón (15 un.)', precio: 2.35, cantidad: 0 },
            { nombre: 'Gallina India (unidad)', precio: 12.00, cantidad: 0 },
            { nombre: 'Mano de Maíz', precio: 1.50, cantidad: 0 }
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
            let mensaje = "¡Hola Granja Rosita! 🐣 Quisiera hacer el siguiente pedido:\n\n";
            
            productos.value.forEach(p => {
                if(p.cantidad > 0) {
                    mensaje += `- ${p.cantidad}x ${p.nombre} ($${(p.precio * p.cantidad).toFixed(2)})\n`;
                }
            });

            mensaje += `\n*Total estimado: $${total.value.toFixed(2)}*`;
            
            // Reemplaza el número de abajo por el de tu chica (formato internacional sin el +)
            const telefono = "50370000000"; 
            const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
            window.open(url, '_blank');
        };

        return { productos, total, modificar, hacerPedido };
    }
}).mount('#app');