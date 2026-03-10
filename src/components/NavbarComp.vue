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
                        <div class="dropdown-center">
                            <button class="btn dropdown-toggle px-0" type="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Admin
                            </button>
                            <ul class="dropdown-menu">
                                <RouterLink to="/admin/products" class="dropdown-item">Productos</RouterLink>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

    </div>
</template>

<script setup>

</script>

<style scoped></style>