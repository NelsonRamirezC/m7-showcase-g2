<template>
  <div>

    <HeaderComp>Página Home</HeaderComp>


    <main class="container">

      <v-alert v-if="messageAlert.text"
        :text="messageAlert.text"
        :title="messageAlert.title"
        :icon="messageAlert.icon"
        type="success"
        closable
        />


      <ProductList />
    </main>


  </div>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import ProductList from '@/components/ProductList.vue'
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

document.title = "ShowCase - Home";

const messageAlert = ref({
    text:"",
    title: "",
    type: "mdi-check"
});



onMounted(() => {
  messageAlert.value.text = route.query.text;
  messageAlert.value.title = route.query.title;

  if(route.query.icon){
    messageAlert.value.icon = route.query.icon;
  }
})


</script>

<style scoped></style>