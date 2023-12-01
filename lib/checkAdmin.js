import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../src/app/firebase";

const checkAdminStatus = () => {
  return new Promise((resolve) => {
    const auth = getAuth();
    var isAdmin = false;

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "User", user.uid);

        try {
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            isAdmin = userDoc.data().isAdmin || false;
          } else {
            isAdmin = false;
          }
        } catch (error) {
          console.error("Error fetching user document:", error);
        }
      }

      resolve(isAdmin);
    });
  });
};

export default checkAdminStatus;