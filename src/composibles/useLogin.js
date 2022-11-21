import { projectAuth } from "@/firebase/config";
import { ref } from "vue"

const error = ref(null);

const login = async (email, password) => {
  error.value = null;
  try {
    const res = await projectAuth.signInWithEmailAndPassword(email, password);
    error.value = null;
    return res;
  } catch (err) {
    console.log(err.message)
    error.value = 'ไม่สามารถเข้าสู่ระบบได้: อีเมล์/รหัสผ่าน ไม่ถูกต้องกรุณาลองอีกครั้ง'
  }
}

const useLogin = () => {
  return { error , login }
}

export default useLogin