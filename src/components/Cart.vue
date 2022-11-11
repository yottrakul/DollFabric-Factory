<template>
  <Item :amount="item.quantity" :name="item.name" @deleted="handleDelete(item)" v-for="item in mergeCart" :key="item.id"/>
  <span class="text-red-500">{{mergeCart}}</span>
  <span class="text-yellow-500">{{itemsRef}}</span>
  <span class="text-purple-600">{{items}}</span>
</template>

<script>
import { computed, ref } from '@vue/runtime-core';
import Item from '../components/ItemInCart.vue'
export default {
  props: ['items'],
  components: {
    Item
  },
  setup(props, context) {
    // ItemsRef
    const itemsRef = ref(props.items);
    // รวมที่ซ้ำ
    const mergeCart = computed(() => {
      // Set ของ id
      let result = [];
      let idSet = new Set();
      itemsRef.value.forEach((item) => {
        idSet.add(item.id);
      })
      // console.log(idSet);

      idSet.forEach((idFabric) => {
        let tempAmount = 0;
        let nameDoll = "";
        // บวกจำนวน ที่ id เหมือนกัน
        itemsRef.value.forEach((item) => {
          if(item.id === idFabric) {
            tempAmount += item.quantity;
            if(nameDoll === "") {
                nameDoll = item.name;
            }
          }
        })
        result.push({id: idFabric, name: nameDoll, quantity: tempAmount})
      })
      return result;
    })

    // HandleDelete
    const handleDelete = (data) => {
      context.emit('cartDelete', data.id)
      // let newItem = itemsRef.value.filter((item) => {
      //   return item.id !== data.id
      // })
      // itemsRef.value = newItem;
    }

    return {handleDelete, mergeCart, itemsRef}
  }
};
</script>

<style>
</style>