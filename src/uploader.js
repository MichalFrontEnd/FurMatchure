import React, { useState } from "react";
import axios from "axios";
import { getPatterns } from "./actions";
import { useDispatch } from "react-redux";

export default function Uploader() {
    const dispatch = useDispatch();
    const [uploadedImg, setUploadedImg] = useState(null);
    const [imgName, setImgName] = useState("");
    const [imgCat, setImgCat] = useState("pattern type");
    const [ulError, setUlError] = useState(false);
    const [modalVis, setModalVis] = useState(false);

    //console.log(" error: ", ulError);
    function photoUpload(e) {
        //console.log("e.target.name: ", );
        const button = e.target.name;

        e.preventDefault();
        let fd = new FormData();

        fd.append("name", imgName);
        fd.append("category", imgCat);
        fd.append("file", uploadedImg);
        axios
            .post(
                `/photoupld/${button}`,
                fd
                //onUploadProgress: ProgressEvent => {console.log("Upload progress: " +Math.round( ProgressEvent.loaded / ProgressEvent.total* 100) +"%")}
            )
            .then(({ data }) => {
                console.log("something: ");
                setModalVis(false);
                console.log("data: ", data);
                console.log("button after then: ", button);
                dispatch(getPatterns());

                if (data.error) {
                    setUlError(true);
                }
            })
            .catch((err) => {
                console.log("error in axios/post photoupload", err);
            });
    }
    console.log("modalVis: ", modalVis);
    function checkUpload() {
        console.log("button clicked, modal should open");
        setModalVis(true);
    }

    return (
        <div className="uploader">
            {ulError && <div>Whoops! Looks like you forgot something...</div>}
            <input
                name="name"
                type="text"
                placeholder="Give it a name"
                onInput={(e) => {
                    setImgName(e.target.value);
                }}
            ></input>
            <label>
                Pattern type:
                <select
                    name="category"
                    onChange={(e) => {
                        setImgCat(e.target.value);
                    }}
                    value={imgCat}
                >
                    <option value="polkadots">Dots</option>
                    <option value="stripes">Stripes</option>
                    <option value="plaid">Plaid</option>
                    <option value="checkers">Checkers/Gingham</option>
                    <option value="floral">Floral</option>
                    <option value="greenery">Greenery</option>
                    <option value="fruit">Fruit/Veggie</option>
                    <option value="geometric">Geometric</option>
                    <option value="vector">Vector Art</option>
                    <option value="damasque">Damasque</option>
                    <option value="abstract">Abstract</option>
                    <option value="other">Other</option>
                </select>
            </label>
            <input
                name="file"
                type="file"
                onChange={(e) => {
                    setUploadedImg(e.target.files[0]);
                }}
                accept="image/*"
            />
            <button onClick={checkUpload}>Upload photo</button>
            <p id="comment">*Must be under 2MB</p>
            {modalVis && (
                <div className="overlay">
                    <div className="modal">
                        <h3>
                            Sorry you didn&apos;t find what you were looking
                            for!
                        </h3>
                        <p>
                            Would You like to help us improve our database, by
                            allowing us to add your photo to it?
                        </p>
                        <button name="regUpload" onClick={photoUpload}>
                            Sure, add it!
                        </button>
                        <button name="tempUpload" onClick={photoUpload}>
                            Please don&apos;t
                        </button>
                        {/*<button onClick={setModalVis(false)}>cancel</button>*/}
                    </div>
                </div>
            )}
        </div>
    );
}
