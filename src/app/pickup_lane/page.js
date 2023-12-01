"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthUserContext";
import styles from "./styles.css"; // Import the CSS
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

export default function PickLane() {
  useEffect(() => {
    checkAuth();
  }, []);

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [, setFormattedDate] = useState();

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

  function removeItem() {
    const updatedItems = [...filteredItems];
    if (updatedItems.length !== 0) {
      var topInQueue = updatedItems.splice(0, 1); // Use splice to remove the item
      console.log("Removed: ", topInQueue);
      setFilteredItems(updatedItems); // Update the state with the modified array
      return topInQueue;
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

  const addToQueue = async (queueParentId, queueStudentIdsArray) => {
    try {
      const queuCollectionRef = collection(db, "queue");
      const newDocumentRef = await queuCollectionRef.add({
        parentId: queueParentId,
        student_id: queueStudentIdsArray,
        queu_timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      console.log("Added parent to queue with ID:", newDocumentRef.id);
    } catch (error) {
      console.error("Error adding parent to queue:", error);
    }
  };
  const handleDismissButtonClick = (zoneId) => {
    console.log(`Button clicked with zone: ${zoneId}`);
    var nextItem = removeItem();
    var docRef = doc(db, "zone", zoneId);
    if (nextItem !== "") {
      console.log(`nextItem: ${nextItem[0].parentId}`);
      console.log(`parentId: ${nextItem[0].parentId}`);
      console.log(`studentId: ${nextItem[0].student_id}`);

      const docSnap = getDoc(docRef);

      // Access the data using .data() method
      // updateDismissedStudents(docSnap);
      var newData = {
        parentId: nextItem[0].parentId,
        studentId: nextItem[0].student_id,
      };
      setDoc(docRef, newData, { merge: true });
      removeDocumentFromFirestore("queue", nextItem[0].id);
    } else {
      var newData = {
        parentId: "",
        studentId: "",
      };
      setDoc(docRef, newData, { merge: true });
    }
  };

  return (
    <div className="main">
      <header>
        <h1>Pickup Lane</h1>
      </header>
      <div className="zones-section">
        <main className="main-content">
          {/* Zone 1 */}
          <section className="zone-section">
            <div class="fill-div">
              <h2>ZONE 1</h2>
              <br></br>
              <h4>Parent: {data1.parentId}</h4>
              <h4>Student: {data1.studentId}</h4>
              <div className="fill-div-center">
                <button onClick={() => handleDismissButtonClick("1")}>
                  Dismiss
                </button>
              </div>
            </div>
            <br></br>
            <br></br>
          </section>
          {/* Zone 2 */}
          <section className="zone-section">
            <div class="fill-div">
              <h2>ZONE 2</h2>
              <br></br>
              <h4>Parent: {data2.parentId}</h4>
              <h4>Student: {data2.studentId}</h4>
              <div className="fill-div-center">
                <button onClick={() => handleDismissButtonClick("2")}>
                  Dismiss
                </button>
              </div>
            </div>

            <br></br>
            <br></br>
          </section>

          {/* Zone 3 */}
          <section className="zone-section">
            <div class="fill-div">
              <h2>ZONE 3</h2>
              <br></br>
              <h4>Parent: {data3.parentId}</h4>
              <h4>Student: {data3.studentId}</h4>
              <div className="fill-div-center">
                <button onClick={() => handleDismissButtonClick("3")}>
                  Dismiss
                </button>
              </div>
            </div>

            <br></br>
            <br></br>
          </section>
          {/* Zone 4 */}
          <section className="zone-section">
            <div class="fill-div">
              <h2>ZONE 4</h2>
              <br></br>
              <h4>Parent: {data4.parentId}</h4>
              <h4>Student: {data4.studentId}</h4>
              <div className="fill-div-center">
                <button onClick={() => handleDismissButtonClick("4")}>
                  Dismiss
                </button>
              </div>
            </div>

            <br></br>
            <br></br>
          </section>

          {/* Zone 5 */}
          <section className="zone-section">
            <div class="fill-div">
              <h2>ZONE 5</h2>
              <br></br>
              <h4>Parent: {data5.parentId}</h4>
              <h4>Student: {data5.studentId}</h4>
              <div className="fill-div-center">
                <button onClick={() => handleDismissButtonClick("5")}>
                  Dismiss
                </button>
              </div>
            </div>

            <br></br>
            <br></br>
          </section>
        </main>
      </div>
      <div>
        <h1>Queue of Parents for Today </h1>
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index}>
              {" "}
              <div className="queue-fields">
                {" "}
                {index + 1}. Parent Name: {item.parentId}, Child Name(s):{" "}
                {item.student_id.join(", ")}
              </div>{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
