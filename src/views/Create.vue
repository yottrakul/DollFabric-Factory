<template>
  <div>
    <form @submit.prevent="createStock">
      <div class="mb-3">
        <label class="form-label">สี</label>
        <input v-model="color" type="text" class="form-control" />
        <div class="form-text">กรอกสีของผ้า.</div>
      </div>
      <div class="mb-3">
        <label class="form-label">ชนิดผ้า</label>
        <input v-model="nature" type="text" class="form-control" />
        <div class="form-text">กรอกชนิดผ้า.</div>
      </div>
      <div class="mb-3">
        <label class="form-label">จำนวน</label>
        <input v-model="quantity" type="number" class="form-control" />
        <div class="form-text">กรอกจำนวนผ้า.</div>
      </div>
      <button type="submit" class="btn btn-primary">เพิ่มผ้า</button>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { projectFirestore } from '@/firebase/config'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const color = ref("")
    const nature = ref("")
    const quantity = ref(null);
    const router = useRouter();

    const createStock = async () => {
        try {
          const stock = {
            Color: color.value,
            Nature: nature.value,
            Quantity: quantity.value
          }
          const res = await projectFirestore.collection('Fabric_Stock').add(stock);
          router.push('/stock')
        } catch (err) {
          console.log(err)
        }
      }
      return {color, nature, quantity, createStock}
    }
  }
</script>

<style>
</style>