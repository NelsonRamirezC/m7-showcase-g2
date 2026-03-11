<template>
    <div>

        <HeaderComp>Gestión de productos.</HeaderComp>

        <main class="container">

            <section>
                <form @submit.prevent="createOrUpdate" class="row">
                    <div class="mb-2 col-12">
                        <label class="form-label">Nombre</label>
                        <input class="form-control" type="text" v-model="product.name" required>
                    </div>
                    <div class="mb-2 col-12">
                        <label class="form-label">Descripción</label>
                        <textarea class="form-control" v-model="product.description" required></textarea>
                    </div>
                    <div class="mb-2 col-6">
                        <label class="form-label">Precio</label>
                        <input class="form-control" type="number" v-model="product.price" required min="1">
                    </div>
                    <div class="mb-2 col-6">
                        <label class="form-label">Stock</label>
                        <input class="form-control" type="number" v-model="product.stock" required min="0">
                    </div>
                    <div class="mb-2 col-6">
                        <label class="form-label">Imagen</label>
                        <input class="form-control" type="url" v-model="product.image" required>
                    </div>
                    <div class="mb-2 col-6">
                        <label class="form-label">Categoría</label>
                        <select v-model="product.category" required class="form-control">
                            <option value="">Selecione una categoría</option>
                            <option :value="category" v-for="category in productsStore.categories" :key="category">{{
                                category }}</option>
                        </select>
                    </div>
                    <div class="mb-2">
                        <button type="submit" class="btn btn-primary" v-if="!editMode">Crear</button>
                        <button type="submit" class="btn btn-warning" v-if="editMode">Editar</button>
                        <button class="btn btn-secondary ms-2" @click="resetForm">Reset</button>
                    </div>
                </form>
            </section>

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
                                    <button class="btn btn-warning" @click="preEdit(product.id)">Editar</button>
                                    <button class="btn btn-danger ms-1" @click="deleteProduct(product.id, product.name)">Eliminar</button>
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
import { onMounted, ref } from 'vue';

import { useProductsStore } from '@/stores/products.store';

const productsStore = useProductsStore();


const product = ref({
    id: "",
    name: "",
    description: "",
    price: 1,
    stock: 0,
    image: "https://placehold.co/600x400",
    category: ""
});

const editMode = ref(false);


const resetForm = () => {

    product.value = {
        id: "",
        name: "",
        description: "",
        price: 1,
        stock: 0,
        image: "https://placehold.co/600x400",
        category: ""
    }

    editMode.value = false;
};

const preEdit = (id) => {
    editMode.value = true;

    let productFound = productsStore.getProduct(id);
    product.value = {...productFound };
};

const deleteProduct = async (id, name) => {

    let confirmation = confirm("Está seguro que desea eliminar el producto: "+ name);

    if(!confirmation) return false;

    let respuesta = await productsStore.deleteProduct(id);
    
    if(respuesta.error) return alert(respuesta.error);

    alert(respuesta.success);

}

const createProduct = async () => {
    
    let respuesta = await productsStore.createProduct(product.value);
    
    if(respuesta.error) return alert(respuesta.error);

    alert(respuesta.success);
    resetForm();
};

const updateProduct = async () => {
    let respuesta = await productsStore.updateProduct(product.value);
    
    if(respuesta.error) return alert(respuesta.error);

    alert(respuesta.success);
    resetForm();
};


const createOrUpdate = () => {

    if(editMode.value == true){
        updateProduct();
    }else{
        createProduct();
    }
}


onMounted(async () => {
    let respuesta = await productsStore.fetchProducts();

    if (respuesta.error) return alert(respuesta.error);
});

</script>

<style scoped></style>