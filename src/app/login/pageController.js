"use client";
import {doc, getDoc} from "firebase/firestore";
import {db} from "../firebase";

class loginController {
    constructor() {
        this.isAdmin = false;
    }

    getAdminStatus() {
        return this.isAdmin;
        //make call to firebase with userUID to grab admin status (isAdmin)
    }

    async setAdminStatus(userUID) {
        //grab global variable
        const userRef = doc(db, "User", userUID);
        const userDoc = await getDoc(userRef).catch((error) => {
            console.error("Error fetching user document:", error);
        });

        if (userDoc.exists()) {
            this.isAdmin = userDoc.data().isAdmin || false; // Set isAdmin based on user document in Firestore
        } else {
            this.isAdmin = false; // User document not found, consider them not an admin
        }
    }
}

const loginCtrl = new loginController();
export default loginCtrl;
