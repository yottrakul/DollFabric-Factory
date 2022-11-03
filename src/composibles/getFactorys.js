import { projectFirestore } from "@/firebase/config";
import { ref } from "vue"

const getFactorys = () => {
  const factorys = ref([]);
  const error = ref(null);

  const loadFactory = async () => {
    try {
      error.value = null;
      const res = await projectFirestore.collection('Factory').get();
      
      factorys.value = res.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      })
    } catch (err) {
      console.log(err.message)
      error.value = err.message
    }
  }

  return { factorys, error, loadFactory}

}

export default getFactorys