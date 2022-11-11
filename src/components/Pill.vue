<template>
  <div
    class="
      bg-white
      rounded-full
      w-full
      inline-flex
      justify-between
      overflow-hidden
      h-12
      mb-2
      
    "
  >
    <div class="detail flex-auto w-64 self-center pl-4 flex justify-between flex-wrap">
      <span>{{name}}<span class="text-xs">({{idStock}})</span></span>
      <span class="pr-4">{{amount}} หลา</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['name', 'amount', 'idStock'],
  setup() {

  }
};
</script>

<style>
</style>