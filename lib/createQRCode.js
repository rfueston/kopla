import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeComponent = ({value}) => {
    return <QRCode value={value}/>;
};

export default QRCodeComponent;