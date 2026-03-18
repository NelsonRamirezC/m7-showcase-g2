<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container">
                <a class="navbar-brand" href="/">ShowCase</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ms-auto me-5">
                        <RouterLink to="/" class="nav-link">Home</RouterLink>
                        <RouterLink to="/about" class="nav-link">Nosotros</RouterLink>
                        <RouterLink to="/products" class="nav-link">Productos</RouterLink>
                        <div class="dropdown-center" v-if="isAdmin">
                            <button class="btn dropdown-toggle px-0" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Admin
                            </button>
                            <ul class="dropdown-menu">
                                <RouterLink to="/admin/products" class="dropdown-item">Productos</RouterLink>
                            </ul>
                        </div>

                        <template v-if="!isAuth">
                            <RouterLink to="/login" class="nav-link">Login</RouterLink>
                            <RouterLink to="/register" class="nav-link">Register</RouterLink>
                        </template>

                        <template v-else>
                            <a class="nav-link" href="#" @click.prevent="onLogout">Logout</a>
                            <RouterLink :to="{name: 'profile', params: {id: userStore.user.uid }}" class="nav-link">Hola, {{ displayName }}</RouterLink>
                        </template>
                    </div>
                </div>
            </div>
        </nav>

    </div>
</template>

<script setup>
import { RouterLink , useRouter } from 'vue-router'
import { computed } from 'vue'
import { useUserStore } from '@/stores/user.store.js'
import { logout } from '@/services/auth.js'

const router = useRouter()
const userStore = useUserStore()

const isAuth = computed(() => userStore.isAuthenticated)
const isAdmin = computed(() => userStore.user?.role === 'admin')

const displayName = computed(() => {
    const u = userStore.user
    if (!u) return ''
    return `${u.firstname || ''} ${u.lastname || ''}`.trim() || u.email
});



async function onLogout() {
    try {
        await logout()
        userStore.clearUser()
        router.push({ name: 'home' })
    } catch (e) {
        console.error(e)
    }
}
</script>


<style scoped>
.router-link-active,
.router-link-exact-active {
    font-weight: 600;
}
</style>