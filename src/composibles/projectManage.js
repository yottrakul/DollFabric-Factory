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

const projectSet = async (collection, docId, data) => {
  try {
    const res = await projectFirestore.collection(collection).doc(docId).set(data,{ merge: true })
    return res;
  } catch (error) {
    console.log(error)
  }
}

const projectUpdateInside = async (collection, collection2, docId, docId2, data) => {
  try {
    const res = await projectFirestore.collection(collection).doc(docId).collection(collection2).doc(docId2).update(data);
    return res;
  } catch (error) {
    console.log(error);
  }
}

const projectAdd = async (collection, data) => {
  try {
    const res = await projectFirestore.collection(collection).add(data);
    return res;
  } catch (error) {
    console.log(error);
  }
}

const projectAddInside = async (collection, docId, collection2, data) => {
  try {
    const res = await projectFirestore.collection(collection).doc(docId).collection(collection2).add(data);
    return res;
  } catch (error) {
    console.log(error);
  }
}



export { projectDelete, projectUpdate, projectUpdateInside, projectAdd, projectAddInside, projectSet }