<template>
    <div>
        <HeaderComp>Perfil usuario</HeaderComp>

        <main class="container">
            <p>Nombre usuario: {{displayName}} </p>
            <p>Email: {{ userStore.user.email }}</p>
            <p>Tipo de usuario: {{ userStore.user.role }}</p>
        </main>
    </div>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import { useUserStore } from '@/stores/user.store.js'
import { computed } from 'vue';
const userStore = useUserStore()


const displayName = computed(() => {
    const u = userStore.user
    if (!u) return ''
    return `${u.firstname || ''} ${u.lastname || ''}`.trim() || u.email
});


</script>

<style scoped>

</style>