import { ref } from "vue";
import { projectFirestore } from "../firebase/config";

const getStock = () => {
  const stocks = ref([]);
  const error = ref(null);

  const loadStock = async () => {
    try {
      error.value = null;
      // SELECT * FROM /Fabric_Stock
      const res = await projectFirestore.collection("Stock").get();
      stocks.value = res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id, factory: doc.data().factory.path };
      });
    } catch (err) {
      console.log(err.message);
      error.value = err;
    }
  };

  return { stocks, error, loadStock };
};

export default getStock;
