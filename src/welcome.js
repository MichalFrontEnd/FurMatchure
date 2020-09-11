import React from "react";

export default function Canvas(props) {
    return (
        <div className="welcome">
            <div className="welcome_text">
                <h1>Welcome!</h1>
                <h2>Click on a furniture piece to select it.</h2>
                <p>
                    Drag it around, resize it, check out colour and pattern
                    combinations!
                </p>

                <button onClick={props.confirm}>Cool, let&apos;s go!</button>
            </div>
        </div>
    );
}
