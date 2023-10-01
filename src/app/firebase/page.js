"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDoc, querySnapshot, onSnapshot, query, deleteDoc, doc } from 'firebase/firestore';
import {db} from '../firebase';

export default function FireBase() {
    const [items, setItems] = useState( [
        // { childName: 'test child', parentName: 'test parent'}
    ])
    const [newItem, setNewItem] = useState({childName: '', parentName: ''})

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
                    <ul>
                        {items.map((item, id) => (
                            <li
                                key={id}
                                className='my-4 w-full flex justify-between bg-slate-950'
                            >
                                <div className='p-4 w-full flex justify-between'>
                                    <span className='capitalize'>{item.childName}</span>
                                    <span>{item.parentName}</span>
                                </div>
                                <button
                                    onClick={() => deleteItem(item.id)}
                                    className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16'
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