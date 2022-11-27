import { projectAuth, projectFirestore } from '@/firebase/config';
import { ref, reactive } from 'vue'

const getRole = () => {
  const userRoles = ref([]);
  const userRole = ref(null);
  const roleAccess = reactive({
    owner: false,
  })
  const error = ref(null);

  const loadUserRoles = async () => {
    try {
      error.value = null;
      const res = await projectFirestore.collection('DAC').get();

      userRoles.value = res.docs.map(doc => {
        return { ...doc.data(), id:doc.id }
      })
    } catch (err) {
      error.value = err.message;
    }
  }

  const loadUser = async (uid) => {
    try {
      error.value = null;
      const res = await projectFirestore.collection('DAC').where("uid", "==", uid).get();
      if(!res.empty) {
        userRole.value = res.docs.map(doc => doc.data());
      } else {
        throw Error('หาข้อมูล uid ไม่เจอ');
      }
    } catch (err) {
      error.value = err.message;
    }
  }

  const getUserRole = async () => {
    try {
      await loadUser(projectAuth.currentUser.uid);
      let user = userRole.value[0];
      if(user.role === 'owner') {
        roleAccess.owner = true;
      }
    } catch (err) {
      error.value = err.message;
    }
    
  }

  return { userRole, userRoles, loadUser, loadUserRoles, getUserRole, roleAccess }
}

export default getRole