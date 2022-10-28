import { projectFirestore } from '@/firebase/config';
import {ref} from '@vue/reactivity'


const getDolls = () => {
  const dolls = ref([]);
  const error = ref(null);

  // Function โหลดข้อมูลตุ๊กตา
  const loadDolls = async () => {
    try { 
      // Reset Error
      error.value = null;
      // SELECT * FROM /Suplier
      const res = await projectFirestore.collection('Doll').get();
      // มีแค่ข้อมูลชื่อ และ รูปภาพ ตุ๊กตา

      // Map ค่าลงใน supliers.value
      dolls.value = res.docs.map((doc) => {
        return { ...doc.data(), id:doc.id }
      })


    } catch (err) {
      // จับ Error แล้วส่งค่าผ่าน error
      console.log(err.message);
      error.value = err;
    }
  }

  return {dolls, error, loadDolls}
}

export default getDolls