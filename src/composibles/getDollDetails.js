import { projectFirestore } from '@/firebase/config';
import {ref} from '@vue/reactivity'

const getDollDetails = () => {
  const dollDetails = ref([]);
  const error = ref(null);

  //Function โหลดข้อมูลรายละเอียดชิ้นส่วนตุ๊กตา
  const loadDetails = async (docId) => {
    try {
      const res = await projectFirestore.collection('Doll').doc(docId).collection('Fabrics').get();

      // Map ค่าลงใน dollDetails.value
      dollDetails.value = res.docs.map(doc => {
        return { ...doc.data(), id: doc.id, Fabric: doc.data().Fabric.id  }
      })

      console.log(dollDetails.value)
    } catch (err) {
      console.log(err);
      error.value = err;
    }
  }
  return { dollDetails, error, loadDetails }
}

export default getDollDetails