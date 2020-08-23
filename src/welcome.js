import React, { useEffect, useState } from "react";

export default function Canvas(props) {
    return (
        <div className="welcome">
            <h1>Welcome!</h1>
            <h3>Click on a furniture photo to select it.</h3>
            <p>
                Drag around, resize, check out colour and pattern combinations!
            </p>

            <button onClick={props.confirm}>Cool, let&apos;s go!</button>
        </div>
    );
}
