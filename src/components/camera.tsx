import React, { useEffect, useState } from 'react';
import Webcam from "react-webcam";
import Fab from '@mui/material/Fab';
import CameraIcon from '@mui/icons-material/Camera';
import ReplayIcon from '@mui/icons-material/Replay';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { eatitDB } from '../DB/DB';
import { getIngredientsFromImage } from '../services/vision-api-service';

export const WebcamCapture = () => {
    const webcamRef = React.useRef<any>(null);
    const [image, setImage] = useState('');

    const videoConstraints = {
        facingMode: "environment"
    };

    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current?.getScreenshot?.();
            setImage(imageSrc);
        },

        [webcamRef]
    );

    const submitHandler = async () => {
        // eatitDB.setAppPropVal("image", image);
        const { ingredients } = await getIngredientsFromImage(image);
        console.log(ingredients);
        await eatitDB.setAppPropVal("tags", ingredients ?? []);
        setTimeout(() => {
            window.location.assign("/ingredients");
        },1000);
    }

    const retake = () => {
        setImage('');
    }

    return (
        <div className="webcam-container" style={{ position: "unset" }}>
            {image === '' ? <div className="cam-con">
                <Webcam
                    audio={false}
                    height="100%"
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width="100%"
                    videoConstraints={videoConstraints}
                />
                <Fab className="cam-button"
                    onClick={(e) => { e.preventDefault(); capture(); }}> <CameraIcon />
                </Fab>
            </div> : <>
                <img className="image-result" src={image} />
                <Fab className="cam-button"
                    onClick={retake}>
                    <ReplayIcon /></Fab>
                <Fab className="cam-button" onClick={submitHandler}>
                    <NavigateNextIcon /></Fab>
            </>}
        </div>
    );
}
