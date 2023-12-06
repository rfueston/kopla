"use client";
import {useState, useEffect} from 'react';
import styles from './styles.css'; // Import the CSS
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
import {GoogleMap, Circle, LoadScript} from "@react-google-maps/api";
import React from 'react';
import {db} from "../firebase";
import Navbar from "../components/navigation/navbar/Navbar";

const autoGrabAddress = async () => {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        const docRef = doc(db, 'geomap', 'location');
        await setDoc(docRef, {
            lat: lat,
            lng: lng,
        });

        alert('Location data saved successfully.');
        window.location.reload();
    } catch (error) {
        console.error('GPS tracking error:', error);
    }
};

const gpsMap = ({children}) => {
    const [map, setMap] = useState(null);
    const mapContainerStyle = {
        width: '80%',
        height: '600px',
    };

    const [center, setCenter] = useState({lat: 0, lng: 0});

    useEffect(() => {
        const  fetchGPSData = async () => {
            try {
                const docRef = doc(db, 'geomap', 'location');
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const {lat, lng} = docSnap.data();
                    setCenter({lat, lng});
                }
            } catch (error) {
                console.error('Error reading data from Firestore:', error);
            }
        };

        fetchGPSData();
    }, []);

    const options = {
        disableDefaultUI: true,
        zoomControl: true,
    };

    const onMapLoad = (map) => {
        setMap(map);
    };

    const geofenceOptions = {
        strokeColor: '#808080',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#808080',
        fillOpacity: 0.35,
        map,
        center,
        radius: 500,
    };

    return (
        <LoadScript googleMapsApiKey="AIzaSyCRN2X5-zJ-gedD8XrJ8pzFSGHOpYsbyF0">
            <Navbar/> {}
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={15}
                options={options}
                onLoad={onMapLoad}
            >
                {map && <Circle {...geofenceOptions} />}
                {children}
            </GoogleMap>
            <div>
                <h2>To automatically grab updated geolocation hit "Get New Address and Save"</h2>
                <button className={styles.outerButtons} onClick={() => autoGrabAddress()}>
                    Get New Address and Save
                </button>
            </div>
        </LoadScript>
    );
};

export default gpsMap;
