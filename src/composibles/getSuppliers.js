import { ref } from 'vue'
import {projectFirestore} from '../firebase/config'

const getSupliers = () => {
  const supliers = ref([]);
  const error = ref(null);

  const loadSupliers = async () => {
    try { 
      error.value = null;
      // SELECT * FROM /Suplier
      const res = await projectFirestore.collection('Supplier').get();

      // Map ค่าลงใน supliers.value
      supliers.value = res.docs.map((doc) => {
        return { ...doc.data(), id:doc.id }
      })


    } catch (err) {
      console.log(err.message);
      error.value = err;
    }
  }

  return {supliers, error, loadSupliers}
}

export default getSupliers
