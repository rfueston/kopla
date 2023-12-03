"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthUserContext";
import CameraWithQRCodeScanner from "../../../lib/QRCodeCamera";
import QRCodeComponent from "../../../lib/createQRCode";
import styles from "./pickup.module.css"; // Import the CSS
import checkAuth from "../../../lib/cookieAuth";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  Timestamp,
  setDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import SettingsController from "../settings/settingsController";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  formattedDate,
} from "reactstrap";
import { isAppPageRouteDefinition } from "next/dist/server/future/route-definitions/app-page-route-definition";

export default function PickLane() {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isAdmin: false,
    isParent: false,
  });
  const [userDoc, setUserDoc] = useState(null);

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

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [, setFormattedDate] = useState();
  var [selectedCount, setSelectedCount] = useState();
  const [zone_number] = useState(["0", "1", "2", "3", "4", "5"]);
  const [checkboxStates, setCheckboxStates] = useState([
    false, //0
    false, //1
    false, //2
    false, //3
    false, //4
    false, //5
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
    const unsub1 = onSnapshot(doc(db, "zone", "1"), (doc) => {
      console.log("Current data 1: ", doc.data());
      setData1(doc.data());
    });
    const unsub2 = onSnapshot(doc(db, "zone", "2"), (doc) => {
      console.log("Current data 2: ", doc.data());
      setData2(doc.data());
    });
    const unsub3 = onSnapshot(doc(db, "zone", "3"), (doc) => {
      console.log("Current data 3: ", doc.data());
      setData3(doc.data());
    });
    const unsub4 = onSnapshot(doc(db, "zone", "4"), (doc) => {
      console.log("Current data 4: ", doc.data());
      setData4(doc.data());
    });
    const unsub5 = onSnapshot(doc(db, "zone", "5"), (doc) => {
      console.log("Current data 5: ", doc.data());
      setData5(doc.data());
    });

    const itemsRef = collection(db, "queue");
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    currentDate.setHours(0, 0, 0, 0);
    const midnightTimestamp = Timestamp.fromDate(currentDate);

    console.log(midnightTimestamp);

    const timestampQuery = query(
      itemsRef,
      where("queu_timestamp", "<=", midnightTimestamp), // change to >= timestamp as we only need parents checked in today
      orderBy("queu_timestamp")
    );

    const unsubscribe = onSnapshot(timestampQuery, (snapshot) => {
      const filteredData = [];
      snapshot.forEach((doc) => {
        filteredData.push({ id: doc.id, ...doc.data() });
        filteredData.sort((a, b) => a.queu_timestamp - b.queu_timestamp);
      });
      setFilteredItems(filteredData);
      console.log("Filtered data: ", filteredItems);
    });

    return () => {
      unsub1();
      unsub2();
      unsub3();
      unsub4();
      unsub5();
      unsubscribe();
    };
  }, []);
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
        console.log("Removed: ", topInQueue);
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
  const handleDismissButtonClick = (zoneId) => {
    // console.log(`Button clicked with zone: ${zoneId}`);
    var nextItem = removeItem();
    var docRef = doc(db, "zone", zoneId);
    if (nextItem !== "") {
      console.log(`nextItem: ${nextItem[0].parentId}`);
      console.log(`parentId: ${nextItem[0].parentId}`);
      console.log(`studentId: ${nextItem[0].student_id}`);

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
      var newData = {
        parentId: "",
        studentId: "",
        parent_email_id: "",
      };
      setDoc(docRef, newData, { merge: true });
    }
  };
  const handlePushBackIntoQueue = async (zoneId) => {
    // console.log(`Button clicked with zone: ${zoneId}`);
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

    // console.log("Top of the queue timestamp:", top_timestamp);
    // console.log("Reduced Top of the queue timestamp:", reduced_top_timestamp);

    var swapZoneRef = doc(db, "zone", zoneId.toString());
    const swapZoneDocSnapshot = await getDoc(swapZoneRef);
    const swapZoneDoc = swapZoneDocSnapshot.data();
    // console.log("Left data: ", leftDoc);
    // console.log(
    //   "Doc from zone : ",
    //   swapZoneDoc["parentId"],
    //   swapZoneDoc["studentId"],
    //   swapZoneDoc["parent_email_id"]
    // );
    const isZoneEmpty = [
      swapZoneDoc["parentId"],
      swapZoneDoc["studentId"],
      swapZoneDoc["parent_email_id"],
    ].every((str) => str.trim() === "");
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
        studentId: "",
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
      // console.log("State before filter: ", checkboxStates);
      const selected_zones_to_swap = checkboxStates
        .map((value, index) => (value ? index : null))
        .filter((index) => index !== null);
      // console.log("Zones being swapped: ", selected_zones_to_swap);

      var docRefLeftZone = doc(
        db,
        "zone",
        selected_zones_to_swap[0].toString()
      );
      const leftDocSnapshot = await getDoc(docRefLeftZone);
      const leftDoc = leftDocSnapshot.data();
      // console.log("Left data: ", leftDoc);

      var docRefRightZone = doc(
        db,
        "zone",
        selected_zones_to_swap[1].toString()
      );
      const rightDocSnapshot = await getDoc(docRefRightZone);
      const rightDoc = rightDocSnapshot.data();
      // console.log("Right data: ", rightDoc);

      setDoc(docRefLeftZone, rightDoc, { merge: true });
      setDoc(docRefRightZone, leftDoc, { merge: true });
    }
  };

  const handleCheckboxChange = (index) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
    //console.log("check_box states: ", newCheckboxStates);
  };
  const handleRadioChange = (event) => {
    setSelectedRadioOption(event.target.value);
    console.log("Current selected option : ", selectedRadioOption);
    // location.reload();
  };
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
            padding: auto;
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
        <div className={styles.zonesSection}>
          <main className={styles.mainContent}>
            {/* Zone 1 */}
            <section className={styles.zoneSection}>
              <div class={styles.fillDiv}>
                <div>
                  <button
                    className={styles.buttons}
                    onClick={() => handlePushBackIntoQueue(zone_number[1])}
                  >
                    Put parent back into Queue
                  </button>
                </div>
                <h2>ZONE {zone_number[1]}</h2>
                <br></br>
                <h4>Parent: {data1.parentId}</h4>
                <h4>Student: {data1.studentId}</h4>
                <div className={styles.fillDivCenter}>
                  <button
                    className={styles.buttons}
                    onClick={() => handleDismissButtonClick(zone_number[1])}
                  >
                    Assign
                  </button>
                  {
                    <label key={zone_number[1]}>
                      <input
                        type="checkbox"
                        checked={checkboxStates[zone_number[1]]}
                        onChange={() => handleCheckboxChange(zone_number[1])}
                        disabled={
                          checkboxStates.filter((value) => value).length >= 2 &&
                          !checkboxStates[zone_number[1]]
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
            {/* Zone 2 */}
            <section className={styles.zoneSection}>
              <div className={styles.fillDiv}>
                <div>
                  <button
                    className={styles.buttons}
                    onClick={() => handlePushBackIntoQueue(zone_number[2])}
                  >
                    Put parent back into Queue
                  </button>
                </div>
                <h2>ZONE {zone_number[2]}</h2>
                <br></br>
                <h4>Parent: {data2.parentId}</h4>
                <h4>Student: {data2.studentId}</h4>
                <div className={styles.fillDivCenter}>
                  <button
                    className={styles.buttons}
                    onClick={() => handleDismissButtonClick(zone_number[2])}
                  >
                    Assign
                  </button>
                  {
                    <label key={zone_number[2]}>
                      <input
                        type="checkbox"
                        checked={checkboxStates[zone_number[2]]}
                        onChange={() => handleCheckboxChange(zone_number[2])}
                        disabled={
                          checkboxStates.filter((value) => value).length >= 2 &&
                          !checkboxStates[zone_number[2]]
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
            {/* Zone 3 */}
            <section className={styles.zoneSection}>
              <div className={styles.fillDiv}>
                <div>
                  <button
                    className={styles.buttons}
                    onClick={() => handlePushBackIntoQueue(zone_number[3])}
                  >
                    Put parent back into Queue
                  </button>
                </div>
                <h2>ZONE {zone_number[3]}</h2>
                <br></br>
                <h4>Parent: {data3.parentId}</h4>
                <h4>Student: {data3.studentId}</h4>
                <div className={styles.fillDivCenter}>
                  <button
                    className={styles.buttons}
                    onClick={() => handleDismissButtonClick(zone_number[3])}
                  >
                    Assign
                  </button>
                  {
                    <label key={zone_number[3]}>
                      <input
                        type="checkbox"
                        checked={checkboxStates[zone_number[3]]}
                        onChange={() => handleCheckboxChange(zone_number[3])}
                        disabled={
                          checkboxStates.filter((value) => value).length >= 2 &&
                          !checkboxStates[zone_number[3]]
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
            {/* Zone 4 */}
            <section className={styles.zoneSection}>
              <div className={styles.fillDiv}>
                <div>
                  <button
                    className={styles.buttons}
                    onClick={() => handlePushBackIntoQueue(zone_number[4])}
                  >
                    Put parent back into Queue
                  </button>
                </div>
                <h2>ZONE {zone_number[4]}</h2>
                <br></br>
                <h4>Parent: {data4.parentId}</h4>
                <h4>Student: {data4.studentId}</h4>
                <div className={styles.fillDivCenter}>
                  <button
                    className={styles.buttons}
                    onClick={() => handleDismissButtonClick(zone_number[4])}
                  >
                    Assign
                  </button>
                  {
                    <label key={zone_number[4]}>
                      <input
                        type="checkbox"
                        checked={checkboxStates[zone_number[4]]}
                        onChange={() => handleCheckboxChange(zone_number[4])}
                        disabled={
                          checkboxStates.filter((value) => value).length >= 2 &&
                          !checkboxStates[zone_number[4]]
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

            {/* Zone 5 */}
            <section className={styles.zoneSection}>
              <div className={styles.fillDiv}>
                <div>
                  <button
                    className={styles.buttons}
                    onClick={() => handlePushBackIntoQueue(zone_number[5])}
                  >
                    Put parent back into Queue
                  </button>
                </div>
                <h2>ZONE {zone_number[5]}</h2>
                <br></br>
                <h4>Parent: {data5.parentId}</h4>
                <h4>Student: {data5.studentId}</h4>
                <div className={styles.fillDivCenter}>
                  <button
                    className={styles.buttons}
                    onClick={() => handleDismissButtonClick(zone_number[5])}
                  >
                    Assign
                  </button>
                  {
                    <label key={zone_number[5]}>
                      <input
                        type="checkbox"
                        checked={checkboxStates[zone_number[5]]}
                        onChange={() => handleCheckboxChange(zone_number[5])}
                        disabled={
                          checkboxStates.filter((value) => value).length >= 2 &&
                          !checkboxStates[zone_number[5]]
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
          </main>
        </div>
        <div className={styles.fillDivCenter}>
          <button className={styles.buttons} onClick={() => handleZoneSwap()}>
            Swap Zones
          </button>
        </div>
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

          <div className={styles.qrCodeContainer}>
            {profileData.isParent && (
              <div>
                <h2>Show Staff QR Code to Join the Queue</h2>

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
    </div>
  );
}
