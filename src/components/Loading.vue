<template>
  <section class="container-fluid loading">
    <img src="../assets//loading.gif" alt="" />
  </section>
</template>
<style scoped>
.loading {
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  position: fixed;
}
.loading > img {
  width: 25%;
  height: 25%;
  object-fit: contain;
}
</style>
