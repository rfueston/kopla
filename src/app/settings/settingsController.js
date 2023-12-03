import {auth, db, changeEmail} from '../firebase';
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {verifyBeforeUpdateEmail, updatePassword} from 'firebase/auth'

class SettingsController {
    getUserDocument() {
        return new Promise((resolve, reject) => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        console.log('Controller User', user);
                        const docRef = doc(db, 'User', user.uid); // Assuming 'users' is your collection name
                        const userDoc = await getDoc(docRef);

                        console.log("document: ", userDoc.data());

                        if (userDoc.exists) {
                            resolve(userDoc.data());
                        } else {
                            reject('Error fetching user document: ${error.message}')
                        }

                        //resolve(docRef);
                    } catch (error) {
                        //reject(`Error creating document reference: ${error.message}`);
                    }
                } else {
                    //reject('No user signed in.');
                }
            });
        });
    }

    updateUserDocument(userData) {
        return new Promise((resolve, reject) => {
            auth.onAuthStateChanged(async (user) => {
                if (user) {
                    try {
                        console.log("NEW MESSAGE: ", user.uid);
                        //const userDocRef = db.collection('users').doc(user.uid);
                        updateDoc(doc(db, "User", user.uid), {
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            email: userData.email
                        });

                        console.log("********AFTER AWAIT*********");

                        resolve('User document updated successfully.');
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
                            console.log("Email Updated");
                        }).catch((error) => {
                            console.log(error);
                        })
                        //await auth.currentUser.updateEmail(newEmail);
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