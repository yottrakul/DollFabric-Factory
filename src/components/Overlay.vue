<template>
  <div @click.self="closeOverlay" class="overlay">
    <div class="container">
      <img
      :src="imgSrc"
      alt=""
      />
      <span @click="closeOverlay" class="material-symbols-outlined"> close </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['imgSrc'],
  setup(props,context) {
    const closeOverlay = () => {
      context.emit('close');
    }

    return{ closeOverlay }
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  z-index: 10;
}

.container {
  position: relative;
  margin: 5rem auto;
  width: 50%;
  height: 80%;
  border-radius: 10px;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
}

span {
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2.5rem;
  color: #ffff;
}

span:hover {
  color: #FF0000;
  transition: 0.25s;
}
</style>