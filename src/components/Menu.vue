<script setup>
import axios from "axios";
import { RouterLink } from "vue-router";
import { onMounted, ref } from "vue";
const getDataUrl = ref();
const getMenu = () => {
  let url = "https://la3la3.com/shop-api/home/api/get-category.php";
  axios.get(url).then((ur) => {
    getDataUrl.value = ur.data;
  });
};

getMenu();
</script>
<template>
  <div class="container-fluid menu-bar">
    <div class="container-width menu">
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li v-for="menu in getDataUrl" :key="menu.id">
          <RouterLink :to="{ name: 'category', params: { id: menu.id } }">{{
            menu.name
          }}</RouterLink>
        </li>
      </ul>
      <ul>
        <li class="phone">
          <a href=""><i class="fa-solid fa-phone"></i>0719880959</a>
        </li>
        <li><i class="fa-solid fa-magnifying-glass"></i></li>
        <li>
          <a href=""><i class="fa-solid fa-cart-plus"></i></a>
        </li>
        <li>
          <a href="">Login</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.phone > a > i {
  margin-right: 3px;
}
</style>
