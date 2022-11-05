import { projectFirestore } from "@/firebase/config"

const projectDelete = async (collection, docId) => {
  try {
    const res = await projectFirestore.collection(collection).doc(docId).delete();
    return res;
  } catch (error) {
    console.log(error)
  }
}

const projectUpdate = async (collection, docId, data) => {
  try {
    const res = await projectFirestore.collection(collection).doc(docId).update(data)
    return res;
  } catch (error) {
    console.log(error)
  }
}



export { projectDelete, projectUpdate }