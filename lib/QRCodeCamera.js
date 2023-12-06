import React, {useEffect, useRef, useState} from 'react';
import {QrReader} from 'react-qr-reader';
import styles from "../src/app/pickup_lane/pickup.module.css";

const QRCodeReader = ({onError, onResult}) => {
    return (
        <div className={styles.qrCodeReaderContainer}>
            <QrReader
                className={styles.qrCodeReader}
                delay={300}
                onError={onError}
                onResult={onResult}
                facingMode="environment" // Use the back camera
            />
        </div>
    );
};

const CameraWithQRCodeScanner = ({getParentData}) => {
    const qrCodeRef = useRef('');
    const isWebcamActiveRef = useRef(false);
    const scanOnceRef = useRef(true);
    const [, setButtonState] = useState(false); // This state is used to trigger a re-render

    const handleWebcamError = (error) => {
        console.error('Webcam error:', error);
    };

    const handleQrCodeScan = (data) => {
        if (isWebcamActiveRef.current && data && scanOnceRef.current) {
            qrCodeRef.current = data;
            getParentData(data);
            scanOnceRef.current = false;
            stopWebcam();
        }
    };

    useEffect(() => {
        // Clean up the scanner when the component unmounts
        return () => {
            scanOnceRef.current = true;
        };
    }, [getParentData]);

    const startWebcam = () => {
        isWebcamActiveRef.current = true;
        setButtonState((prevState) => !prevState); // Trigger a re-render
    };

    const stopWebcam = () => {
        if (isWebcamActiveRef.current) {
            isWebcamActiveRef.current = false;
            scanOnceRef.current = true;

            setButtonState((prevState) => !prevState); // Trigger a re-render
        }
    };

    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div key={isWebcamActiveRef.current}>
            {isWebcamActiveRef.current && (
                <>
                    <QRCodeReader onError={handleWebcamError} onResult={handleQrCodeScan}/>

                    <button className={styles.outerButtons} onClick={() => {
                        stopWebcam();
                        reloadPage();
                    }}>Stop Scanning
                    </button>
                </>
            )}
            {!isWebcamActiveRef.current && (
                <button className={styles.outerButtons} onClick={startWebcam}>Scan QR Codes</button>
            )}
        </div>
    );
};

export default CameraWithQRCodeScanner;
