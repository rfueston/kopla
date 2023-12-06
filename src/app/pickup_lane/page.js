"use client";
import React, { useEffect, useState, useRef } from "react";
import CameraWithQRCodeScanner from "../../../lib/QRCodeCamera";
import QRCodeComponent from "../../../lib/createQRCode";
import styles from "./pickup.module.css";
import checkAuth from "../../../lib/cookieAuth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import SettingsController from "../settings/settingsController";

export default function PickLane() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: false,
    isParent: false,
  });
  const [userDoc, setUserDoc] = useState(null);
  const [zoneAmount, setZoneAmount] = useState(0);
  const [zoneData, setZoneData] = useState({});
  const zoneRefArray = useRef([]);

  useEffect(() => {
    checkAuth();

    SettingsController.getUserDocument()
      .then((userDoc) => {
        setUserDoc(userDoc);
        setProfileData({
          firstName: userDoc.firstName || "",
          lastName: userDoc.lastName || "",
          email: userDoc.email || "",
          isAdmin: userDoc.isAdmin || false,
          isParent: userDoc.isParent || false,
        });
      })
      .catch((error) => {
        console.error("Error fetching user document:", error);
      });
  }, []);

  useEffect(() => {
    const fetchSystemSettings = async () => {
      const systemDocRef = doc(db, "System", "SystemSetting");

      try {
        const docSnapshot = await getDoc(systemDocRef);

        if (docSnapshot.exists()) {
          // Document exists, use the data
          const data = docSnapshot.data();
          setZoneAmount(data.zoneAmount || 3);
        } else {
          // Document doesn't exist, use the default value
          setZoneAmount(3);
        }
      } catch (error) {
        console.error("Error fetching system settings:", error);
      }
    };

    fetchSystemSettings();
  }, []);

  const [filteredItems, setFilteredItems] = useState([]);
  const [parentsAssignedZoneNumber, setParentsAssignedZoneNumber] = useState();
  const [, setFormattedDate] = useState();
  var [selectedCount, setSelectedCount] = useState();

  const [checkboxStates, setCheckboxStates] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [selectedRadioOption, setSelectedRadioOption] = useState();
  const gpsMap = async () => {
    const zoneCollection = collection(db, "zone");
    const zoneDocs = await getDocs(zoneCollection);
    const queueCollection = collection(db, "queue");
    const queueDocs = await getDocs(queueCollection);
  };
  gpsMap();

  useEffect(() => {
    const zoneDataInitialState = Array.from(
      { length: zoneAmount },
      (_, index) => ({ parentId: "", studentId: "" })
    );

    const unsubscribes = [];

    for (let zoneNumber = 1; zoneNumber <= zoneAmount; zoneNumber++) {
      const unsubscribe = onSnapshot(
        doc(db, "zone", zoneNumber.toString()),
        (doc) => {
          const newData = { ...zoneData, [zoneNumber]: doc.data() };
          setZoneData((prevData) => ({ ...prevData, ...newData }));
        }
      );

      unsubscribes.push(unsubscribe);
    }

    const itemsRef = collection(db, "queue");
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const midnightTimestamp = Timestamp.fromDate(currentDate);

    const timestampQuery = query(
      itemsRef,
      where("queu_timestamp", ">=", midnightTimestamp),
      orderBy("queu_timestamp")
    );

    const unsubscribe = onSnapshot(timestampQuery, (snapshot) => {
      const filteredData = [];
      snapshot.forEach((doc) => {
        filteredData.push({ id: doc.id, ...doc.data() });
        filteredData.sort((a, b) => a.queu_timestamp - b.queu_timestamp);
      });
      setFilteredItems(filteredData);
    });

    var zonesRef = collection(db, "zone");
    const assignedZoneQuery = query(
      zonesRef,
      where("parent_email_id", "==", profileData.email)
    );
    // console.log("Logged in parent email id: ", profileData.email);
    const parentZoneSubscription = onSnapshot(assignedZoneQuery, (snapshot) => {
      var assignedZone = "Waiting assignment";
      snapshot.forEach((doc) => {
        if (doc.id !== null || doc.id.trim !== "") {
          //   console.log("Parents zone data is not null", doc.data());
          assignedZone = doc.id;
        }
        // console.log("Parents zone data: ", doc.id);
      });
      setParentsAssignedZoneNumber(assignedZone);
    });
    unsubscribes.push(parentZoneSubscription);
    // Clean up subscriptions
    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe());
      unsubscribe();
    };
  }, [zoneAmount, zoneData]);

  function setSelectedRadioOptionFunction(value) {
    setSelectedRadioOption(value);
    // location.reload();
  }

  function removeItem() {
    const updatedItems = [...filteredItems];
    if (updatedItems.length !== 0) {
      if (selectedRadioOption && selectedRadioOption.trim() != "") {
        var selectedItemInQueue = updatedItems.filter(
          (obj) => obj.parent_email_id === selectedRadioOption
        );
        setSelectedRadioOptionFunction("");
        return selectedItemInQueue;
      } else {
        var topInQueue = updatedItems.splice(0, 1); // Use splice to remove the item
        setFilteredItems(updatedItems); // Update the state with the modified array
        return topInQueue;
      }
    } else {
      return "";
    }
  }

  const removeDocumentFromFirestore = async (collectionName, documentId) => {
    const documentRef = doc(db, collectionName, documentId);

    try {
      const collectionRef = collection(db, collectionName);

      // Use getDocs to get a QuerySnapshot
      const querySnapshot = await getDocs(collectionRef);

      // Check the size of the QuerySnapshot
      if (querySnapshot.size !== 0) {
        await deleteDoc(documentRef);
      }
    } catch (error) {
      throw new Error("Failed to remove document: " + error.message);
    }
  };

  const getParentData = async (data) => {
    if (data && data.text !== "") {
      const collectionRef = collection(db, "Pairs");
      const q = query(collectionRef, where("parentEmail", "==", data.text));
      const snapshot = await getDocs(q);
      const documents = snapshot.docs.map((doc) => doc.data());

      const queueStudentIdsArray = documents.map((child) => child.childName);

      addToQueue(documents[0].parentName, queueStudentIdsArray, data.text);
    }
  };

  const addToQueue = async (
    queueParentId,
    queueStudentIdsArray,
    parentEmail
  ) => {
    try {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const midnightTimestamp = Timestamp.fromDate(currentDate);

      const queuCollectionRef = collection(db, "queue");
      const newDocumentRef = await addDoc(queuCollectionRef, {
        parentId: queueParentId,
        parent_email_id: parentEmail,
        student_id: queueStudentIdsArray,
        queu_timestamp: midnightTimestamp,
      });

      window.location.reload();
    } catch (error) {
      console.error("Error adding parent to queue:", error);
    }
  };
  const assignParentFromQueueOrDismissFromZone = async (zoneId, action) => {
    const zoneIdString = zoneId.toString();

    var docRef = doc(db, "zone", zoneIdString);
    const docSnapshot = await getDoc(docRef);
    const zoneDoc = docSnapshot.data();
    const isZoneEmpty = [
      zoneDoc["parentId"],
      Array.isArray(zoneDoc["studentId"]) &&
      zoneDoc["studentId"].every(
        (str) => typeof str === "string" && str.trim() === ""
      )
        ? ""
        : "non-empty",
      zoneDoc["parent_email_id"],
    ].every((str) => typeof str === "string" && str.trim() === "");

    if (action === "ASSIGN") {
      if (!isZoneEmpty) {
        alert("Please dismiss current parent to assign new parent");
      } else {
        var nextItem = removeItem();
        if (nextItem !== "") {
          // Access the data using .data() method
          // updateDismissedStudents(docSnap);
          var newData = {
            parentId: nextItem[0].parentId,
            studentId: nextItem[0].student_id,
            parent_email_id: nextItem[0].parent_email_id,
          };
          setDoc(docRef, newData, { merge: true });
          removeDocumentFromFirestore("queue", nextItem[0].id);
        } else {
          //   var newData = {
          //     parentId: "",
          //     studentId: "",
          //     parent_email_id: "",
          //   }
          //   setDoc(docRef, newData, { merge: true });
          alert("Queue is empty, no parent to assign");
        }
      }
    } else if (action === "DISMISS") {
      if (isZoneEmpty) {
        alert("Zone is unassigned, no parent to dismiss");
      } else {
        var newData = {
          parentId: "",
          studentId: [""],
          parent_email_id: "",
        };
        setDoc(docRef, newData, { merge: true });
      }
    }
  };

  const assignParentToZoneFromQueue = (zoneId) => {
    assignParentFromQueueOrDismissFromZone(zoneId, "ASSIGN");
  };

  const dismissParentFromZone = (zoneId) => {
    assignParentFromQueueOrDismissFromZone(zoneId, "DISMISS");
  };
  const handlePushBackIntoQueue = async (zoneId) => {
    var reduced_top_timestamp;
    if (filteredItems.length > 0) {
      const top_timestamp = filteredItems[0].queu_timestamp;
      const dateObject = top_timestamp.toDate();

      // Reduce time by milliseconds
      dateObject.setMilliseconds(dateObject.getMilliseconds() - 2);
      reduced_top_timestamp = Timestamp.fromDate(dateObject);
    } else {
      reduced_top_timestamp = Timestamp.fromDate(new Date());
    }

    const zoneIdString = zoneId.toString();

    var swapZoneRef = doc(db, "zone", zoneIdString);
    const swapZoneDocSnapshot = await getDoc(swapZoneRef);
    const swapZoneDoc = swapZoneDocSnapshot.data();

    const isZoneEmpty = [
      swapZoneDoc["parentId"],
      Array.isArray(swapZoneDoc["studentId"])
        ? swapZoneDoc["studentId"].every((str) =>
            typeof str === "string" ? str.trim() === "" : true
          )
        : true, // If studentId is not an array, consider it as empty
      swapZoneDoc["parent_email_id"],
    ].every((str) => (typeof str === "string" ? str.trim() === "" : true));

    if (!isZoneEmpty) {
      const queuCollectionRef = collection(db, "queue");
      const backToQueueData = {
        parentId: swapZoneDoc["parentId"],
        student_id: swapZoneDoc["studentId"],
        parent_email_id: swapZoneDoc["parent_email_id"],
        queu_timestamp: reduced_top_timestamp,
      };
      await addDoc(queuCollectionRef, backToQueueData);
      var emptyData = {
        parentId: "",
        studentId: [""],
        parent_email_id: "",
      };
      setDoc(swapZoneRef, emptyData, { merge: true });
      setSelectedRadioOptionFunction("");
    } else {
      alert("No parent in zone to push into queue");

      setTimeout(function () {
        window.close();
      }, 2000);
    }
  };

  const handleZoneSwap = async () => {
    if (checkboxStates.filter((value) => value).length < 2) {
      alert("Please select two zones to swap.");
    } else {
      const selected_zones_to_swap = checkboxStates
        .map((value, index) => (value ? index : null))
        .filter((index) => index !== null);

      var docRefLeftZone = doc(
        db,
        "zone",
        selected_zones_to_swap[0].toString()
      );
      const leftDocSnapshot = await getDoc(docRefLeftZone);
      const leftDoc = leftDocSnapshot.data();

      var docRefRightZone = doc(
        db,
        "zone",
        selected_zones_to_swap[1].toString()
      );
      const rightDocSnapshot = await getDoc(docRefRightZone);
      const rightDoc = rightDocSnapshot.data();

      await setDoc(docRefLeftZone, rightDoc, { merge: true });
      await setDoc(docRefRightZone, leftDoc, { merge: true });

      // Reset checkbox states
      setCheckboxStates((prevStates) => prevStates.map(() => false));
    }
  };

  const resetCheckboxStates = () => {
    setCheckboxStates((prevStates) => prevStates.map(() => false));
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
  };
  const handleRadioChange = (event) => {
    setSelectedRadioOption(event.target.value);
  };

  const zones = Array.from({ length: zoneAmount }, (_, index) => index + 1);

  return (
    <div>
      <style jsx global>
        {`
          h1 {
            background-color: white;
            text-align: center;
            color: black;
            font-family: "Courier New", Courier, monospace;
            font-size: 300%;
          }

          h2 {
            background-color: #f5c74d;
            text-align: center;
            height: 20%;
            //padding: auto;
            color: black;
            font-family: "Courier New", Courier, monospace;
            font-size: xx-large;
          }

          header {
            background-color: white;
            color: black;
            text-align: center;
          }

          body {
            background-color: white;
          }

          li {
            list-style-type: none;
          }
        `}
      </style>

      <div className={styles.main}>
        <header>
          <h1>Dashboard</h1>
        </header>

        {!profileData.isParent && (
          <div className={styles.zonesSection}>
            <main className={styles.mainContent}>
              {zones.map((zoneNumber, index) => (
                <section className={styles.zoneSection} key={zoneNumber}>
                  <div className={styles.fillDiv}>
                    <div>
                      <button
                        className={styles.buttons}
                        onClick={() => handlePushBackIntoQueue(zoneNumber)}
                      >
                        Put parent back into Queue
                      </button>
                    </div>
                    <h2>ZONE {zoneNumber}</h2>
                    <br></br>
                    <h4>Parent: {zoneData[zoneNumber]?.parentId || ""}</h4>
                    <h4>
                      Student:{" "}
                      {Array.isArray(zoneData[zoneNumber]?.studentId)
                        ? zoneData[zoneNumber]?.studentId.join(", ")
                        : ""}
                    </h4>
                    <div className={styles.fillDivCenter}>
                      <button
                        className={styles.buttons}
                        onClick={() => assignParentToZoneFromQueue(zoneNumber)}
                      >
                        Assign
                      </button>
                      <button
                        className={styles.buttons}
                        onClick={() => dismissParentFromZone(zoneNumber)}
                      >
                        Dismiss
                      </button>
                      {
                        <label key={zoneNumber}>
                          <input
                            type="checkbox"
                            checked={checkboxStates[zoneNumber]}
                            onChange={() => handleCheckboxChange(zoneNumber)}
                            disabled={
                              checkboxStates.filter((value) => value).length >=
                                2 && !checkboxStates[zoneNumber]
                            }
                          />
                          Swap Zone
                        </label>
                      }
                    </div>
                  </div>
                  <br></br>
                  <br></br>
                </section>
              ))}
            </main>
          </div>
        )}

        {!profileData.isParent && (
          <div>
            <button
              className={styles.outerButtons}
              onClick={() => handleZoneSwap()}
            >
              Swap Zones
            </button>
          </div>
        )}

        {!profileData.isParent && (
          <div>
            <h1>Queue of Parents for Today </h1>
            <ol>
              {filteredItems.map((item, index) => (
                <li key={index}>
                  {" "}
                  <div className={styles.queueFields}>
                    {" "}
                    <div className={styles.queueFields}>
                      <input
                        type="radio"
                        value={item.parent_email_id}
                        checked={selectedRadioOption === item.parent_email_id}
                        onChange={handleRadioChange}
                      />
                      Parent Name: {item.parentId}, Child Name(s):{" "}
                      {item.student_id.join(", ")}
                    </div>{" "}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {profileData.isParent && (
          <div>
            <h2>You are in Zone: </h2>

            {/*//check for what zone they are in. add logic*/}
            <h1>{parentsAssignedZoneNumber}</h1>
            <h2>You position in Queue: </h2>

            {/*//check for what zone they are in. add logic*/}
            <h1>0</h1>
          </div>
        )}

        {profileData.isParent && (
          <div>
            <h2>Please Select "On My Way" Before Leaving</h2>

            <center>
              <button
                className={styles.outerButtons}
                onClick={() => handleZoneSwap()}
              >
                On My Way
              </button>
            </center>
          </div>
        )}

        {profileData.isParent && (
          <div>
            <h2>If you are not given a Zone Please Select "I'm Here!"</h2>

            <center>
              <button
                className={styles.outerButtons}
                onClick={() => handleZoneSwap()}
              >
                I'm Here!
              </button>
            </center>
          </div>
        )}

        <div className={styles.qrCodeContainer}>
          {profileData.isParent && (
            <div>
              <h2>Show Staff QR Code to Join the Queue If Still Not in One</h2>

              <QRCodeComponent value={profileData.email} />
            </div>
          )}

          {!profileData.isParent && (
            <div>
              <CameraWithQRCodeScanner getParentData={getParentData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
