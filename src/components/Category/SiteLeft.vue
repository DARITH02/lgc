<script setup>
import Loading from "../Loading.vue";

import axios from "axios";
import { watchEffect, onMounted, ref, watch } from "vue";
import { useRoute, RouterLink } from "vue-router";

const isLoading = ref(true);
const getDatUrl = ref();
const routeParam = useRoute();
const idParams = ref(0);

const fetchDataUrl = () => {
  isLoading.value = true;
  let url = `https://la3la3.com/shop-api/home/api/get-sub-category.php?cate-id=${idParams.value}`;
  axios.get(url).then((ur) => {
    getDatUrl.value = ur.data;
    isLoading.value = false;
  });
};

const showSubList = (active) => {
  active["active-sub"] = !active["active-sub"];
};
watchEffect(() => {
  idParams.value = routeParam.params.id;
});
watch(idParams, (dis, sen) => {
  if (dis != sen) {
    getDatUrl.value = [];
  }
  fetchDataUrl();
});
onMounted(() => {
  fetchDataUrl();
});
</script>
<template>
  <div class="left-site">
    <Loading v-if="isLoading" />
    <div class="list-site-left" v-for="list in getDatUrl" :key="list.id">
      <div class="list-items-site-left" @click="showSubList(list)">
        <span class="lite-txt">{{ list.name }}</span>
        <span
          ><i
            class="fa"
            :class="{
              'fa-minus': list['active-sub'],
              'fa-plus': list['active-sub'] == false,
            }"
          ></i
        ></span>
      </div>
      <ul class="sub-list-items-site-left" v-if="list['active-sub']">
        <li v-for="sub_list in list.sub" :key="sub_list.id">
          <RouterLink
            :to="{
              name: 'category-sub',
              params: { id: idParams.value, sid: sub_list.id },
            }"
          >
            <span>{{ sub_list.name }}</span>
            <span>{{ sub_list.id }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
