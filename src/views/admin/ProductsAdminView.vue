<template>
    <div>

        <HeaderComp>Gestión de productos.</HeaderComp>

        <main class="container">

            <section>
                <h2>Listado de productos:</h2>

                <div v-if="productsStore.products.length > 0">
                    <table class="table align-middle">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Imagen</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Categoría</th>
                                <th scope="col">Acciones</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in productsStore.products" :key="product.id">
                                <th scope="row">{{ product.id }}</th>
                                <td>{{ product.name }}</td>
                                <td>
                                    <img :src="product.image" :alt="product.name" width="75">
                                </td>
                                <td>{{ product.price }}</td>
                                <td>{{ product.stock }}</td>
                                <td>{{ product.category }}</td>
                                <td>
                                    <button class="btn btn-warning">Editar</button>
                                    <button class="btn btn-danger ms-1">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-else>
                    <p>No hay productor para mostrar...</p>
                </div>

            </section>

        </main>

    </div>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import { onMounted } from 'vue';

import { useProductsStore } from '@/stores/products.store';

const productsStore = useProductsStore();



onMounted(async () => {
    let respuesta = await productsStore.fetchProducts();

    if (respuesta.error) return alert(respuesta.error);
});

</script>

<style scoped></style>