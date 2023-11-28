"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDoc, querySnapshot, onSnapshot, query, where, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {db} from '../firebase';
import checkAuth from '../../../lib/cookieAuth';
import styles from "./admin.module.css";

export default function FireBase() {
    useEffect(() => {
        checkAuth();
    }, []);

    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ childName: '', parentName: '', parentEmail: '' });
    const [showInputFields, setShowInputFields] = useState(false);

    function handleSearchButtonClick() {
         // Read items from DB
        try{
            if(newItem.parentEmail !== ''){
            const q = query(collection(db, 'Pairs'), where('parentEmail', '==', newItem.parentEmail));
            
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let itemsArr = []
                
                // Clear existing data
                
               

                querySnapshot.forEach((doc) => {
                    itemsArr.push({...doc.data(), id: doc.id})
                })
                setItems(itemsArr)
            })
            setShowInputFields(true);
            
        } else {
            alert("Please enter an email address");
        }
        } catch (e){
            console.error(e);
    }
    }

    var updateDocId = '';

    function createNewInputFields(id) {
        var row = document.getElementById(`row-${id}`);
        var initialButton = document.getElementById(`button-${id}`);
        
        if (initialButton) {
            initialButton.style.visibility = "hidden";
        }
    
        if (!row) {
            console.error(`Error: Row element with id 'row-${id}' not found`);
            return;
        }
    
        updateDocId = id;
        
        // Loop through each cell in the row and replace text with input fields
        for (let i = 0; i < row.cells.length; i++) {
            var cell = row.cells[i];
            if (!cell.querySelector('button')) {
                var inputElem = document.createElement("input");
    
                Object.assign(inputElem, {
                    className: 'col-span-3 p-3 border ml-8 text-black',
                    type: 'text',
                    value: cell.textContent,
                });
    
                cell.innerHTML = '';
                cell.appendChild(inputElem);
            }
        }
    
        // Add an "Update" button to the last cell
        var updateButton = document.createElement("button");
        Object.assign(updateButton, {
            className: styles.buttonUpdate,
            type: 'button',
            textContent: '✓'
        });
    
        updateButton.onclick = async function () {
            const updatedChildName = row.cells[0].querySelector('input').value.trim();
            const updatedParentName = row.cells[1].querySelector('input').value.trim();
            const updatedParentEmail = row.cells[2].querySelector('input').value.trim();
        
            // Check if both fields are not empty before updating
            if (updatedChildName && updatedParentName && updatedParentEmail) {
                try {
                    await updateItem(updateDocId, updatedChildName, updatedParentName, updatedParentEmail);
        
                    // Reset input fields after updating
                    for (let i = 0; i < row.cells.length; i++) {
                        const cell = row.cells[i];
                        if (!cell.querySelector('button')) {
                            const inputElement = cell.querySelector('input');
                            if (inputElement) {
                                cell.innerHTML = inputElement.value.trim();
                            }
                        }
                    }
        
                    // Toggle buttons back
                    row.cells[3].innerHTML = '';
                    row.cells[3].appendChild(createInitialButton(id));
                    row.cells[3].appendChild(deleteButton);
                } catch (error) {
                    // Handle the error
                    console.error('Error updating item:', error);
                }
            } else {
                // Handle empty fields error
                console.error('Error: Fields cannot be empty.');
            }
        };
    
        // Add a "Delete" button to the last cell
        var deleteButton = document.createElement("button");
        Object.assign(deleteButton, {
            className: styles.buttonDelete,
            type: 'button',
            textContent: 'X'
        });
    
        deleteButton.onclick = function () {
            deleteItem(updateDocId);
        };
        row.cells[3].innerHTML = '';
        row.cells[3].appendChild(updateButton);
    }
    
    function createInitialButton(id) {
        var initialButton = document.createElement("button");
        Object.assign(initialButton, {
            className: styles.buttonUpdate,
            type: 'button',
            textContent: 'Update',
            id: `button-${id}`,
            onclick: () => createNewInputFields(id)
        });
    
        return initialButton;
    }
    

    
    // Add item to database
    const addItem = async (e) => {
        e.preventDefault();
        if (newItem.childName !== '' && newItem.parentName !== '' && newItem.parentEmail !== '') {
            await addDoc(collection(db, 'Pairs'), {
                childName: newItem.childName.trim(),
                parentName: newItem.parentName.trim(),
                parentEmail: newItem.parentEmail.trim(),
            });
            setNewItem({ childName: '', parentName: '', parentEmail: '' });
        }
    }

    // Update Item in DB
    const updateItem = async (id, childName, parentName, parentEmail) => {
        try {
            // Attempt to update the document
            await updateDoc(doc(db, 'Pairs', id), {
                childName: childName,
                parentName: parentName,
                parentEmail: parentEmail,
            });
    
        } catch (error) {
            console.error('Error updating document:', error);
            throw error; // Propagate the error to handle it in the caller
        }
    };
    

    // Delete items from DB
    const deleteItem = async (id) => {
        await deleteDoc(doc(db, 'Pairs', id));
    }

    return (
        <div className={styles.tableContainer}>
            <style jsx global>{`
        
        h1 {
            background-color: #007bff;
            text-align: center;
            color: white;
          }
          header {
            background-color: #007bff;
            color: white;
            text-align: center;
            padding: 20px 0;
          }
          
          main {
            max-width: fit-content;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            color: grey;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          
          label {
            display: inline-block;
            width: 140px;
            text-align: right;
            padding: 15px;
          }

          button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
          }
            
            `}
            </style>
            <main>
                <div>
                    <h1>Admin Page</h1>
                    <div>
                    <div className={styles.inputField} style={{ display: showInputFields ? 'block' : 'none' }}>
                        <input
                            value={newItem.childName}
                            onChange={(e) => setNewItem({ ...newItem, childName: e.target.value })}
                            type='text'
                            placeholder='Enter Child Name'
                        />
                    </div>
                    <div className={styles.inputField} style={{ display: showInputFields ? 'block' : 'none' }}>
                        <input
                            value={newItem.parentName}
                            onChange={(e) => setNewItem({ ...newItem, parentName: e.target.value })}
                            type='text'
                            placeholder='Enter Parent Name'
                        />
                    </div>
                    <div className={styles.inputField}>
                        <input
                            value={newItem.parentEmail}
                            onChange={(e) => setNewItem({ ...newItem, parentEmail: e.target.value })}
                            type='email'
                            placeholder='Enter Parent Email'
                        />

                         <button onClick={handleSearchButtonClick}>Search</button>
                    </div>
                        <div>
                        <button
                                style={{ display: showInputFields ? 'block' : 'none' }}
                                onClick={addItem}
                                className='text-white bg-slate-600 hover:bg-slate-900 p-3 text-xl'
                                type='submit'>
                            Add
                            </button>
                        </div>

                        <table className={styles.dataTable} style={{ display: showInputFields ? 'table' : 'none' }}>
                <thead>
                    <tr>
                        <th>Child Name</th>
                        <th>Parent Name</th>
                        <th>Parent Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    {items.map((item) => (
        <tr key={item.id} id={`row-${item.id}`}>
            <td>{item.childName}</td>
            <td>{item.parentName}</td>
            <td>{item.parentEmail}</td>
            <td>
                <button id={`button-${item.id}`} className={styles.buttonUpdate} onClick={() => createNewInputFields(item.id)}>
                    Update
                </button>
                <button className={styles.buttonDelete} onClick={() => deleteItem(item.id)}>
                    X
                </button>
            </td>
        </tr>
    ))}
</tbody>
            </table>
                    </div>
                </div>
            </main>
        </div>
    )
}