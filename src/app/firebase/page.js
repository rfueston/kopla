"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDoc, querySnapshot, onSnapshot, query, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {db} from '../firebase';

export default function FireBase() {
    const [items, setItems] = useState( [
        // { childName: 'test child', parentName: 'test parent'}
    ])
    const [newItem, setNewItem] = useState({childName: '', parentName: ''})

    var updateDocId = ''

    function createNewInputFields(id) {
        var childContainer = document.getElementById('ulist');
        var parentContainer = document.getElementById('ulist');
        var liButton = document.getElementById('ulist');
    
        updateDocId = id;
        console.log(updateDocId);
    
        var newChildElem = document.createElement("input");
        var newParentElem = document.createElement("input");
        var updateButton = document.createElement("button");
    
        Object.assign(newChildElem, {
            className: 'col-span-3 p-3 border ml-8 text-black',
            type: 'text',
            placeholder: 'New Child Name'
        });
    
        Object.assign(newParentElem, {
            className: 'col-span-3 p-3 border ml-8 text-black',
            type: 'text',
            placeholder: 'New Parent Name'
        });
    
        Object.assign(updateButton, {
            className: 'text-white bg-slate-600 hover:bg-slate-900 p-3 text-xl ml-8',
            type: 'submit',
            textContent: '✓'
        });
    
        updateButton.onclick = function() {
            const updatedChildName = newChildElem.value.trim();
            const updatedParentName = newParentElem.value.trim();
    
            // Check if both fields are not empty before updating
            if (updatedChildName && updatedParentName) {
                updateItem(updateDocId, updatedChildName, updatedParentName);
                // Reset input fields after updating
                newChildElem.value = '';
                newParentElem.value = '';
            } else {
                // Handle empty fields error
                console.log('Error: Fields cannot be empty.');
            }
        };
    
        childContainer.appendChild(newChildElem);
        parentContainer.appendChild(newParentElem);
        liButton.appendChild(updateButton);
    }
    

    
    // Add item to database
    const addItem = async (e) => {
        e.preventDefault();
        if (newItem.childName !== '' && newItem.parentName !== '') {
            //setItems([...items, newItem])
            await addDoc(collection(db, 'Pairs'), {
                childName: newItem.childName.trim(),
                parentName: newItem.parentName.trim(),
            });
            setNewItem({childName: '', parentName: ''});
        }
    }


    // Read items from DB
    useEffect(() => {
        const q = query(collection(db, 'Pairs'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let itemsArr = []

            querySnapshot.forEach((doc) => {
                itemsArr.push({...doc.data(), id: doc.id})
            })
            setItems(itemsArr)
        })
    },[])

    // Update Item in DB
    const updateItem = async (id, childName, parentName) => {
        try {
            // Attempt to update the document
            await updateDoc(doc(db, 'Pairs', id), {
                childName: childName,
                parentName: parentName,
            });
    
            console.log("Document updated successfully");
        } catch (error) {
            console.error("Error updating document:", error);
        }
    };
    

    // Delete items from DB
    const deleteItem = async (id) => {
        await deleteDoc(doc(db, 'Pairs', id));
    }

    return (
        <main className='flex min-h-screen flex-col items-center justify-between sm:p-24 p-4'>
            <div className='z-10 w-full max-w-5xl items-center justify-between font-mono text-sm'>
                <h1 className='text-4xl p-4 text-center'>Firestore Data</h1>
                <div className='bg-slate-800 p-4 rounded-lg'>
                    <form className='grid grid-cols-6 items-center text-black'>
                        <input
                            value={newItem.childName}
                            onChange={(e) => setNewItem({ ...newItem, childName: e.target.value })}
                            className='col-span-3 p-3 border'
                            type='text'
                            placeholder='Enter Child Name'
                        />
                        <input
                            value={newItem.parentName}
                            onChange={(e) => setNewItem({ ...newItem, parentName: e.target.value})}
                            className='col-span-2 p-3 border mx-3'
                            type='text'
                            placeholder='Enter Parent Name'
                        />
                        <button
                            onClick={addItem}
                            className='text-white bg-slate-600 hover:bg-slate-900 p-3 text-xl'
                            type='submit'
                        >
                          Add
                        </button>
                    </form>
                    <ul id='ulist'>
                        {items.map((item, id) => (
                            <li
                                id='list-item'
                                key={id}
                                className='my-4 w-full flex justify-between bg-slate-950'
                            >
                                <div className='p-4 w-full flex justify-between'>
                                    <span id='span-child' className='capitalize'>{item.childName}</span>
                                    <span id='span-parent' className='capitalize'>{item.parentName}</span>
                                </div>
                                <button 
                                    onClick={() => createNewInputFields(item.id)}
                                    className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-800 w-20'
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => deleteItem(item.id)}
                                    className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-800 w-20'
                                >
                                    X
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    )
}