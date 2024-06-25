<script setup>
import Footer from "./components/Footer.vue";
import Menu from "./components/Menu.vue";
</script>
<template>
  <section>
    <Menu />
    <RouterView />
    <Footer />
  </section>
</template>
