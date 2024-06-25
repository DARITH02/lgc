<script setup>
import Loading from "../Loading.vue";
const isLoading = ref(true);
import axios from "axios";
import { onMounted, ref, watch, watchEffect } from "vue";
import { useRoute } from "vue-router";
const getDataUrl = ref([]);
const s = ref(0);
const e = ref(4);
const RoutId = useRoute();
const idParams = ref();
const subIdParam = ref(0);
const isShowDetail = ref(false);
const isShowHideIcon = ref(false);
const dataDetail = ref();
const copyDataDetail = ref();
const getData = () => {
  isLoading.value = true;
  if (subIdParam.value == 0) {
    var url = `https://la3la3.com/shop-api/home/api/get-product.php?cate-id=${idParams.value}&s=${s.value}&e=${e.value}`;
  } else {
    var url = `https://la3la3.com/shop-api/home/api/get-product.php?sub-cate-id2=${subIdParam.value}&s=${s.value}&e=${e.value}`;
  }
  axios.get(url).then((ur) => {
    ur.data.forEach((el) => {
      getDataUrl.value.push(el);
      console.log(getDataUrl.value);
    });
    isLoading.value = false;
  });
};
onMounted(() => {
  getData();
});

watchEffect(() => {
  subIdParam.value = 0;
  if (RoutId.params.sid) {
    subIdParam.value = RoutId.params.sid;
  }
  idParams.value = RoutId.params.id;
  console.log(subIdParam.value);
});
watch(
  [idParams, subIdParam],
  ([detionation, subDetion], [seding, subSending]) => {
    console.log("id", idParams.value);
    console.log("subid ", subIdParam.value);
    console.log("seding", seding);
    console.log("detionation", detionation);
    if (detionation != seding) {
      getDataUrl.value = [];
      s.value = 0;
    }
    if (subSending != subDetion) {
      getDataUrl.value = [];
      s.value = 0;
    }
    getData();
  }
);

// watch(idParams, (detionation, seding) => {
//   console.log("id", idParams);
//   console.log("seding", seding);
//   console.log("detionation", detionation);
//   if (detionation != seding) {
//     getDataUrl.value = [];
//   }
//   getData();
// });

const moreData = () => {
  s.value += e.value;
  getData();
  console.log(s.value);
};

const showDetailItems = (item) => {
  isShowHideIcon.value = true;
  dataDetail.value = item;
  console.log(dataDetail.value);
};
const closeDetail = () => {
  isShowHideIcon.value = !isShowHideIcon.value;
  if (isShowHideIcon.value == false) {
    dataDetail.value.img = copyDataDetail.value;
  }
};
const ShowSubImg = (imgMain, subImg) => {
  copyDataDetail.value = imgMain.img;
  imgMain.img = subImg;
};
</script>

<template>
  <nav class="category-grid">
    <Loading v-if="isLoading" />
    <section class="grid-1x3" v-else>
      <div
        class="items items-position items-height"
        v-for="item in getDataUrl"
        :key="item.id"
        @click="showDetailItems(item)"
      >
        <span class="stock-container">
          <span>10$</span>
          <span>FB</span>
        </span>
        <img :src="item.img" alt="" />
        <span class="des-item">
          <p>{{ item.name }}</p>
        </span>
        <ul class="price-item">
          <li>$ {{ item.price_dis }}</li>
          <li>$ {{ item.price }}</li>
        </ul>
        <article class="sub-img">
          <img
            v-for="(sub_img, i) in item.imgList"
            :key="i"
            :src="sub_img"
            alt=""
          />
        </article>
        <div class="btn-container">
          <button class="btn">ADD TO CART</button>
        </div>
      </div>
    </section>
    <div class="more-item">
      <button class="btn" @click="moreData">More Items</button>
    </div>
    <div class="container-width show-detail" v-if="isShowHideIcon">
      <span class="clos-icon" @click="closeDetail"
        ><i class="fa-solid fa-xmark"></i
      ></span>
      <div class="detail-item">
        <div class="img-detail">
          <img :src="dataDetail.img" alt="" />

          <div class="sub-img-detail">
            <div
              v-for="(subImg, i) in dataDetail.imgList"
              :key="i"
              @click="ShowSubImg(dataDetail, subImg)"
            >
              <img :src="subImg" alt="" />
            </div>
          </div>
        </div>
        <div class="detail-des">
          <span class="name-item">{{ dataDetail.name }}</span>
          <span class="cost-detail">
            <h2>$ {{ dataDetail.price }}</h2>
            <h3>$ {{ dataDetail.dis }}</h3>
          </span>
          <ul>
            <li v-html="dataDetail.des"></li>
            <li>ID : {{ dataDetail.id }}</li>
            <li>
              Sub Category 1&2 : {{ dataDetail.sub_cate_id
              }}{{ dataDetail.sub_cate_id2 }}
            </li>
          </ul>
          <div class="btn-container-detail">
            <span class="price-final">$ {{ dataDetail.price_dis }}</span>
            <button class="btn btn-add-cart">
              <i class="fa-solid fa-cart-plus"></i>
            </button>
            <button class="btn btn-buy">
              <i class="fa-solid fa-cart-shopping"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.show-detail {
  z-index: 300;
  width: 100%;
  position: fixed;
  background-color: #eee;
  height: 500px;
  top: 20%;
  left: 20%;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  overflow: hidden;
}
.detail-item {
  display: flex;
  gap: 5px;
  height: 100%;
  padding: 20px;
}
.img-detail {
  width: 50%;
  height: 100%;
}
.img-detail > img {
  width: 100%;
  height: 80%;
  object-fit: cover;
}
.detail-des {
  width: 50%;

  height: 100%;
  padding: 15px;
  overflow: scroll;
}
.detail-des > ul > li {
  font-size: 1.5rem;
  margin-top: 3px;

  display: block;
}
.detail-des > ul > li:first-child {
  margin-top: -12px;
}
.clos-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  padding: 5px;
  background-color: rgba(128, 128, 128, 0.562);

  width: 20px;
  height: 20px;
}
.clos-icon > i {
  font-size: 1.5rem;
  color: whitesmoke;
}
.clos-icon:hover {
  background-color: gray;
  cursor: pointer;
}
.cost-detail {
  display: flex;
  gap: 25px;
}
.cost-detail > h3 {
  position: relative;
  color: red;
}
.cost-detail > h3::after {
  position: absolute;
  display: block;
  content: "";
  top: 50%;
  left: -5%;
  width: 120%;
  height: 2px;
  background-color: red;
}
.cost-detail > h2 {
  color: green;
}
.name-item {
  display: block;
  padding: 5px 0;
  padding-top: 0;
  font-size: 1.8rem;
  color: black;
  font-weight: bold;
}
.btn-container-detail {
  width: 100%;

  padding: 20px 10px;
}
.btn-add-cart {
  background-color: #6d00d3;
  padding: 7px 20px;
  margin-right: 30px;
}
.btn-add-cart > i {
  color: whitesmoke;
  font-size: 1.5rem;
}
.btn-buy {
  background-color: #008e00;
  padding: 7px 20px;
}
.btn-buy > i {
  color: whitesmoke;
  font-size: 1.5rem;
}
.btn-add-cart:hover,
.btn-buy:hover {
  transition: all 0.5s ease-in;
  transform: scale(0.99);
  cursor: pointer;
}
.price-final {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: green;
  margin-left: 25px;
  padding: 10px 0;
}
.sub-img-detail {
  width: 100%;
  display: flex;
  gap: 10px;
  padding: 5px;
  height: 20%;

  flex-wrap: nowrap;
  justify-content: center;
}
.sub-img-detail > div {
  width: 15%;
  height: 100%;
  transition: all 0.3s ease-in;
}
.sub-img-detail > div:hover {
  transform: scale(0.99);
  cursor: pointer;
}
.sub-img-detail > div > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
