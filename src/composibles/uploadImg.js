import { projectStorage } from "@/firebase/config";
import { ref } from "vue";

const uploadImg = () => {

  const fr = new FileReader();
  let seletedFile = null;
  const refSelect = ref(null);

  const upload = async (dir,name) => {
    const storageRef = projectStorage.ref();
    const imageRef = storageRef.child(`${dir}/${name}.jpg`);
    try {
      // upload รูป
      // เช็คว่ามีการเลือกไฟล์หรือไม่
      if(!seletedFile){
        return new Error("No file selected");
      }
      await imageRef.putString(fr.result, "data_url");
      // รอลิงค์รูป
      const url = await storageRef.child(`${dir}/${name}.jpg`).getDownloadURL();
      // ส่งลิงค์ออกไป url
      return url;
      // console.log("Uploaded");
    } catch (error) {
      console.log(error);
    }
  };

  const onFileSelected = (event) => {
    // เก็บข้อมูล File เพื่อนำไป Preview ใน Card
    // console.log(event.target.files[0])
    seletedFile = event.target.files[0];
    refSelect.value = event.target.files[0];
    // fr.onload = () => {
    // // เก็บใน imageFabric
    // }
    fr.readAsDataURL(seletedFile);
    console.log(refSelect.value)
  };

  return {fr, upload, onFileSelected, seletedFile, refSelect}
}

export default uploadImg