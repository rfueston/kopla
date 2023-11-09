"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthUserContext";
import styles from "./styles.css"; // Import the CSS
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
} from "reactstrap";

export default function PickLane() {

    const gpsMap = async () => {
      //TODO: create update sync for map
    };

    return (



        <div>
            <header>
                <h1>Pickup Lane</h1>
            </header>

            <br></br>
            <br></br>

            <main>

            {/* Zone 1 */}
            <div>
                <h2>ZONE 1</h2>
                <br></br>
                <button>1st
                </button>
                <button>Jane Doe
                </button>
                <button>Black Mazda CX5
                </button>
                <br></br>
                <br></br>

                <button>2nd
                </button>
                <button>John Doe
                </button>
                <button>Blue Ford F150
                </button>
            </div>

            <br></br>
            <br></br>

            {/* Zone 2 */}
            <div>
                <h2>ZONE 2</h2>
                <br></br>
                <button>1st
                </button>
                <button>Jane Doe
                </button>
                <button>Black Mazda CX5
                </button>
                <br></br>
                <br></br>

                <button>2nd
                </button>
                <button>John Doe
                </button>
                <button>Blue Ford F150
                </button>
            </div>

            <br></br>
            <br></br>

            {/* Zone 3 */}
            <div>
                <h2>ZONE 3</h2>
                <br></br>
                <button>1st
                </button>
                <button>Jane Doe
                </button>
                <button>Black Mazda CX5
                </button>
                <br></br>
                <br></br>

                <button>2nd
                </button>
                <button>John Doe
                </button>
                <button>Blue Ford F150
                </button>
            </div>

            <br></br>
            <br></br>

            {/* Zone 4 */}
            <div>
                <h2>ZONE 4</h2>
                <br></br>
                <button>1st
                </button>
                <button>Jane Doe
                </button>
                <button>Black Mazda CX5
                </button>
                <br></br>
                <br></br>

                <button>2nd
                </button>
                <button>John Doe
                </button>
                <button>Blue Ford F150
                </button>
            </div>

            <br></br>
            <br></br>

            {/* Zone 5 */}
            <div>
                <h2>ZONE 5</h2>
                <br></br>
                <button>1st
                </button>
                <button>Jane Doe
                </button>
                <button>Black Mazda CX5
                </button>
                <br></br>
                <br></br>

                <button>2nd
                </button>
                <button>John Doe
                </button>
                <button>Blue Ford F150
                </button>
            </div>

            </main>

        </div>
    );
}