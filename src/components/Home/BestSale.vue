<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
const getDataUrl = ref([]);
const startItem = ref(0);
const endItem = ref(5);
const isLoading = ref(true);
console.log(endItem.value);
import Loading from "@/components/Loading.vue";
const getProductBestSale = () => {
  isLoading.value = true;
  let url = `https://la3la3.com/shop-api/home/api/get-product.php?s=${startItem.value}&e=${endItem.value}`;
  axios.get(url).then((ur) => {
    ur.data.forEach((el) => {
      getDataUrl.value.push(el);
    });

    isLoading.value = false;
  });
};
onMounted(() => {
  getProductBestSale();
});
const moreItems = () => {
  startItem.value += endItem.value;
  getProductBestSale();
};

const subBorder = (oldImg, newImg) => {
  oldImg.img = newImg;
};
</script>

<template>
  <section>
    <article class="container-width best-sale">
      <span class="txt-top-best-sale">
        <h2>BEST SALLER</h2>
        <h4>TOP PRODUCT OF THIS WEEK</h4>
      </span>

      <div class="grid-1x4">
        <Loading v-if="isLoading" />
        <div
          v-else
          class="items items-best-sale"
          v-for="product in getDataUrl"
          :key="product.id"
        >
          <div class="pice-item-best-sale-top">
            <span class="instock">Instock</span>
            <h1>Hi</h1>
          </div>
          <img :src="product.img" alt="" />
          <div class="txt-items-bast-sale">
            <span class="txt-best-sale">
              <h4>{{ product.name }}</h4>
              <p>Original</p>
              <ul class="price">
                <li>$ {{ product.dis }}</li>
                <li>$ {{ product.price }}</li>
              </ul>
            </span>
            <div class="sub-img-best-sale">
              <div
                class="sub-img-best"
                :class="{ 'active-border': product.img == subImg }"
                @click="subBorder(product, subImg)"
                v-for="(subImg, i) in product.imgList"
                :key="i"
              >
                <img :src="subImg" alt="" />
              </div>
            </div>
            <button class="btn btn-best-sale">ADD TO CART</button>
          </div>
        </div>
      </div>
      <div class="more-items" @click="moreItems">
        <span>More <i class="fa-solid fa-circle-chevron-down"></i></span>
      </div>
    </article>
  </section>
</template>
<style scoped>
.more-items {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0;
}
.more-items > span {
  color: whitesmoke;
  border-radius: 10px;
  padding: 5px 15px;
  background-color: #cb5838;
  font-size: 2rem;
  transition: all 0.2s ease-in-out;
}
.more-items > span:hover {
  color: white;
  transform: scale(1.02);
  background-color: #cb5838c1;
  cursor: pointer;
}
</style>
