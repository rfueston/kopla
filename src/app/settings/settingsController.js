import {auth, db} from '../firebase';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {updatePassword, verifyBeforeUpdateEmail} from 'firebase/auth'

class SettingsController {
    getUserDocument() {
        return new Promise((resolve, reject) => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        const docRef = doc(db, 'User', user.uid); // Assuming 'users' is your collection name
                        const userDoc = await getDoc(docRef);


                        if (userDoc.exists) {
                            resolve(userDoc.data());
                        } else {
                            reject('Error fetching user document: ${error.message}')
                        }

                    } catch (error) {
                        console.error(error);
                    }
                } 
            });
        });
    }

    updateUserDocument(userData) {
        return new Promise((resolve, reject) => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        updateDoc(doc(db, "User", user.uid), {
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            email: userData.email
                        });

                    } catch (error) {
                        reject(`Error updating user document: ${error.message}`);
                    }
                } else {
                    reject('No user signed in.');
                }
            });
        });
    }

    updatePassword(newPassword) {
        return new Promise((resolve, reject) => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        await updatePassword(auth.currentUser, newPassword);
                        resolve('Password updated successfully.');
                    } catch (error) {
                        reject(`Error updating password: ${error.message}`);
                    }
                } else {
                    reject('No user signed in.');
                }
            });
        });
    }

    updateEmail(newEmail) {
        return new Promise((resolve, reject) => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        await verifyBeforeUpdateEmail(auth.currentUser, newEmail).then(() => {
                        }).catch((error) => {
                            console.error(error);
                        })
                        resolve('Email updated successfully.');
                    } catch (error) {
                        reject(`Error updating email: ${error.message}`);
                    }
                } else {
                    reject('No user signed in.');
                }
            });
        });
    }


}

export default new SettingsController();