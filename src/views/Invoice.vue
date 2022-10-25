<template>
  <h2>:: Invoice ::</h2>
  <div>
    <form @submit.prevent="createInvoice">
      <div class="mb-3">
        <label class="form-label">ผ้าที่สั่งเพิ่ม</label>
        <select v-model="selFab" class="form-select">
          <option v-for="fabric in fabricAll" :key="fabric.id" :value="fabric.id">{{fabric.Color}}</option>
          <!-- <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option> -->
        </select>
        <div class="form-text">เลือกสีของผ้าที่นำเข้า Stock.</div>
      </div>
      <div class="mb-3">
        <label class="form-label">โรงงาน</label>
        <select v-model="selFac" class="form-select">
          <option v-for="factory in factoryAll" :key="factory.id" :value="factory.id">{{factory.Name}}</option>
          <!-- <option selected>Open this select menu</option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option> -->
        </select>
        <div class="form-text">กรอกชนิดผ้า.</div>
      </div>
      <div class="mb-3">
        <label class="form-label">จำนวน</label>
        <input v-model="quantity" type="number" class="form-control" />
        <div class="form-text">กรอกจำนวนผ้า.</div>
      </div>
      <button type="submit" class="btn btn-primary">เพิ่มใบเสร็จ</button>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { projectFirestore } from '@/firebase/config';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const fabricAll = ref('');
    const factoryAll = ref('');
    const quantity = ref(0);
    const selFab = ref(null)
    const selFac = ref(null)
    const router = useRouter();


    // เอาโรงงานทั้งหมด
    const loadFactory = async () => {
      try {
        const res = await projectFirestore.collection('Factory').get()

        factoryAll.value = res.docs.map(doc => {
          return {...doc.data(), id: doc.id }
        })
      } catch (error){
        console.log(error)
      }
    }

    loadFactory();
    

    //เอาผ้าทั้งหมด
      const loadFabric = async () => {
      try {
        const res = await projectFirestore.collection("Fabric_Stock").get()

        fabricAll.value = res.docs.map(doc => {
          return {...doc.data(), id: doc.id }
        })
      } catch (error){
        console.log(error)
      }
    }

    loadFabric();


    //นำค่าในใบเสร็จอัปขึ้น firebase
     
     const createInvoice = async () => {
      //ส่วนของ Fabric_order

      const fabricOrder = {
        ID_Fabric: `/Fabric_Stock/${selFab.value}`,
        ID_Factory: `/Factory/${selFac.value}`,
        Quantity: quantity.value
      }
      try {
        const res = await projectFirestore.collection('Fabric_Order').add(fabricOrder);
        router.push('/stock')
      } catch (err) {
        console.log(err)
      }

     }

    return {factoryAll, quantity, fabricAll, selFac, selFab, createInvoice}
  }
};
</script>

<style>
</style>