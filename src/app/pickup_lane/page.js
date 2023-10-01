"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './styles.css'; // Import the CSS

export default function PickLane() {

    const gpsMap = async () => {
      //TODO: create update sync for map
    };

    return (
        <div>
            <header>
                <h1>GPS</h1>
            </header>
            <main>
              <div>
                  <iframe src="https://storage.googleapis.com/maps-solutions-2b0hyqvmmu/commutes/dk82/commutes.html"
                          width="100%" height="100%"
                          style="border:0;"
                          loading="lazy">
                  </iframe>
              </div>
            </main>
        </div>
    );
}