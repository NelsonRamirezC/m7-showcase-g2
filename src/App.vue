<template>

  <NavbarComp />

  <div class="py-3">
    <RouterView />
  </div>

</template>


<script setup>
import { RouterView } from 'vue-router';
import NavbarComp from './components/NavbarComp.vue';

</script>

<style scoped></style>