import { projectFirestore } from "@/firebase/config"

const projectDelete = async (collection, docId) => {
  try {
    await projectFirestore.collection(collection).doc(docId).delete()
  } catch (error) {
    console.log(error)
  }
}

export {projectDelete}