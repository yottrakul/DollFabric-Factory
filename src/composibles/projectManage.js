import { projectFirestore } from "@/firebase/config"

const projectDelete = async (collection, docId) => {
  try {
    await projectFirestore.collection(collection).doc(docId).delete()
  } catch (error) {
    console.log(error)
  }
}

const projectUpdate = async (collection, docId, data) => {
  try {
    await projectFirestore.collection(collection).doc(docId).update(data)
  } catch (error) {
    console.log(error)
  }
}



export { projectDelete, projectUpdate }