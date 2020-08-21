import React, { useState } from "react";
import axios from "axios";

export default function Uploader(props) {
    const [uploadedImg, setUploadedImg] = useState(null);

    function photoUpload(e) {
        e.preventDefault();
        let fd = new FormData();

        fd.append("file", uploadedImg);
        axios
            .post(
                "/photoupld",
                fd
                //onUploadProgress: ProgressEvent => {console.log("Upload progress: " +Math.round( ProgressEvent.loaded / ProgressEvent.total* 100) +"%")}
            )
            .then(({ data }) => {
                console.log("data in photoupld", data);
                props.getUploadedImage(data);
                //this.props.imageUpdate(data.data);
            })
            .catch((err) => {
                console.log("error in axios/post photoupload", err);
            });
    }

    console.log("uploadedImg: ", uploadedImg);
    return (
        <div className="uploader">
            <input
                name="file"
                type="file"
                onChange={(e) => {
                    setUploadedImg(e.target.files[0]);
                }}
                accept="image/*"
            />

            <button onClick={photoUpload}>Upload photo</button>
            <span>*Must be under 2MB</span>
        </div>
    );
}
