<template>
    <div>
        <div class="card mx-auto">
            <img :src="product.image" class="card-img-top" :alt="product.name">
            <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text">{{ product.description }}</p>
                <p class="card-text">Precio: {{ product.price }}</p>
                <p class="card-text">Categoría: {{ product.category }}</p>
            </div>
        </div>

    </div>
</template>

<script setup>
defineProps(['product']);

</script>

<style scoped>

.card {
    aspect-ratio: 3/2 !important;
}

</style>