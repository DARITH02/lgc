<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
const getDataUrl = ref();
const getDatacategory = () => {
  let url = "https://la3la3.com/shop-api/home/api/get-category.php";

  axios.get(url).then((ur) => {
    getDataUrl.value = ur.data;
  });
};

onMounted(() => {
  getDatacategory();
});
</script>
<template>
  <section class="container-fluid">
    <div class="category-grid-1x4">
      <div class="items-category" v-for="cat in getDataUrl" :key="cat.id">
        <img :src="cat.img" alt="" />
        <span class="btn-category">
          <button class="btn">{{ cat.name }}</button>
        </span>
      </div>
    </div>
  </section>
</template>
