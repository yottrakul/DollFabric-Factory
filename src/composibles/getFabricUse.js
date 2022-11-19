import { projectFirestore } from "@/firebase/config";
import { ref } from "vue"

const getFabricUse = () => {
  const docFabrics = ref({});
  const error = ref(null);
  // เอาตัวเดียว
  const loadUseFabrics = async (idDoll, amount) => {
    try {
      let payload = {
        idDoll: idDoll,
        amount: amount,
        fabrics: []
      };
      const res = await projectFirestore.collection('Doll').doc(idDoll).collection('Fabrics').get();

      payload.fabrics = await Promise.all(res.docs.map(async (doc) => {
        let fabricDetails = {};
        const resStock = await projectFirestore.doc(doc.data().Fabric.path).get();
        fabricDetails = { ...resStock.data(), id: resStock.id, factory: resStock.data().factory.path }
        return { quantity: doc.data().Quantity * amount, fabricDetails: fabricDetails };
      }));

      docFabrics.value = payload;
    } catch (err) {
      console.log(err);
      error.value = err;
    }
  }

  return { docFabrics, error, loadUseFabrics }
}

export default getFabricUse