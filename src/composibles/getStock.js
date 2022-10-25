import { ref } from 'vue'
import {projectFirestore} from '../firebase/config'

const getStock = () => {
  const stocks = ref([]);
  const error = ref(null);

  // แทนชื่อโรงงานแทน ID
  const getDocFromPath = async (path) => {
    const res = await projectFirestore.doc(path).get();
    // {Name: 'ดอลลี่', Address: 'อ.เมือง จ.สกลนคร', Tel: '027677589'}
    return res.data();
    // ดอลลี่
  }

  const loadStock = async () => {
    try { 
      // error.value = null;
      // SELECT * FROM /Fabric_Stock
      const res = await projectFirestore.collection('Stock').get();
      // const result = await getFactoryName("8LdXbOBwCBWjJlOKP7Fk")



      stocks.value = res.docs.map((doc) => {
        // console.log(doc.data().factory.path)


        // //คำสังเอา Path Factory จาก Stock
        // let resfactoryPath = await projectFirestore.collection('Stock').doc(doc.id).get();
        // let factoryPath = resfactoryPath.data().factory.path

        // console.log(factoryPath)
        // // Factory/8LdXbOBwCBWjJlOKP7Fk

        // // คำสั่งหา Document จาก Path
        // let factoryName = await projectFirestore.doc(factoryPath).get();
        // console.log(factoryName.data().Name)
        // // const result = await getFactoryName(doc.id)
        // console.log(doc.data().factory.path)

        return { ...doc.data(), id:doc.id, factory: doc.data().factory.path}
      })

      // console.log(stocks.value)

    } catch (err) {
      console.log(err.message);
      error.value = err;
    }
  }

  return {stocks, error, loadStock}
}

export default getStock
