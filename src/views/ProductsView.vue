<template>
    <div>
        <HeaderComp>Listado de productos.</HeaderComp>

        <main class="container">

            <div class="py-5 d-flex justify-content-center">
                <div class="mx-1" v-for="category in productStore.categories" :key="category">
                    <input type="checkbox" class="btn-check" :id="`btn-check-${category}`" autocomplete="off" :value="category" v-model="categoriesFilter">
                    <label class="btn btn-outline-primary" :for="`btn-check-${category}`">{{category}}</label>
                </div>
            </div>
            <div>
                <p>Cantidad de productos Existentes: {{ productStore.products.length}}</p>
                <p>Cantidad de productos filtrados: {{ productsFilterByCategory.length }}</p>
            </div>

            <section>
                <div class="row g-3 justify-content-start row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4"
                    v-if="productsFilterByCategory.length > 0">
                    <div class="col" v-for="product in productsFilterByCategory" :key="product.id">
                        <ProductCard :product />

                    </div>
                </div>
                <div v-else>
                    <p>No hay productos para mostrar...</p>
                </div>
            </section>
        </main>
    </div>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import ProductCard from '@/components/ProductCard.vue';

import { useProductsStore } from '@/stores/products.store';
import { ref, onMounted, computed } from 'vue';

document.title = "ShowCase - Products";

const productStore = useProductsStore();

const categoriesFilter = ref([]);


const productsFilterByCategory = computed(() => {

    return productStore.products.filter(p => categoriesFilter.value.includes(p.category));
});


onMounted(async () => {
    await productStore.fetchProducts();

    let categoriesWithProducts = new Set(productStore.products.map(p => p.category));
    
    categoriesFilter.value = [...categoriesWithProducts];

});
</script>

<style scoped></style>