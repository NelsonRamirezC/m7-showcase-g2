<template>
    <div>
        <div class="py-5 d-flex justify-content-center">
            <div class="mx-1" v-for="category in productStore.categories" :key="category">
                <input type="checkbox" class="btn-check" :id="`btn-check-${category}`" autocomplete="off"
                    :value="category" v-model="categoriesFilter">
                <label class="btn btn-outline-primary" :for="`btn-check-${category}`">{{ category }}</label>
            </div>
        </div>
        <div>
            <p>Cantidad de productos Existentes: {{ productStore.products.length }}</p>
            <p>Cantidad de productos filtrados: {{ productsFilterByCategory.length }}</p>
        </div>
        <div class="d-flex py-3">
            <label class="form-label">Filtrar por nombre o descripción</label>
            <input type="text" class="form-control" v-model="searchNameOrDescription">
        </div>

        <div class="py-3">
            <p>Filtrar por rango de precio</p>
            <div class="row">
                <div class="col-3">
                    <div class="input-group">
                        <div class="input-group-text">Precio MIN</div>
                        <input type="number" class="form-control" v-model="min" min="1">
                    </div>
                </div>
                <div class="col-3">
                    <div class="input-group">
                        <div class="input-group-text">Precio MAX</div>
                        <input type="number" class="form-control" v-model="max" max="9999999">
                    </div>
                </div>
            </div>
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
    </div>
</template>

<script setup>
import ProductCard from '@/components/ProductCard.vue';

import { useProductsStore } from '@/stores/products.store';
import { ref, onMounted, computed } from 'vue';

const productStore = useProductsStore();

const categoriesFilter = ref([]);
const searchNameOrDescription = ref("");

const min = ref(1);
const max = ref(9999999);


const productsFilterByCategory = computed(() => {
    let productosFilter = productStore.products.filter(p => categoriesFilter.value.includes(p.category));

    if (searchNameOrDescription.value) {
        let query = searchNameOrDescription.value.toLowerCase();
        productosFilter = productosFilter.filter(p => p.description.toLowerCase().includes(query) || p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
    }

    productosFilter = productosFilter.filter(p => p.price >= min.value && p.price <= max.value);

    return productosFilter;
});


onMounted(async () => {
    await productStore.fetchProducts();

    let categoriesWithProducts = new Set(productStore.products.map(p => p.category));

    categoriesFilter.value = [...categoriesWithProducts];

});
</script>

<style scoped></style>