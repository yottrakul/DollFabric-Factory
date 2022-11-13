import { projectFirestore } from "@/firebase/config";
import { ref } from "vue";

const getDollOrder = () => {
  const dollOrders = ref([]);
  const error = ref(null);

  // Function โหลดข้อมูลตุ๊กตา
  const loadOrders = async () => {
    try { 
      // Reset Error
      error.value = null;
      // SELECT * FROM /Suplier
      const res = await projectFirestore.collection('Doll_order').get();
      // มีแค่ข้อมูลชื่อ และ รูปภาพ ตุ๊กตา

      // Map ค่าลงใน supliers.value
      dollOrders.value = res.docs.map((doc) => {
        return { ...doc.data(), id:doc.id, doll: doc.data().doll.path }
      })


    } catch (err) {
      // จับ Error แล้วส่งค่าผ่าน error
      console.log(err.message);
      error.value = err;
    }
  }

  return {dollOrders, error, loadOrders}
}

export default getDollOrder