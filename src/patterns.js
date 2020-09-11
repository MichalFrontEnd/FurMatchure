import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatterns } from "./actions";

export default function Patterns(props) {
    const [menuDis, setMenuDis] = useState("all");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPatterns());
    }, []);
    const patterns = useSelector((state) => state.patterns);

    const polkadots = useSelector(
        (state) =>
            state.patterns &&
            state.patterns.filter(
                (category) => category.category == "polkadots"
            )
    );

    function pickMenu(e) {
        setMenuDis(e.target.id);
    }

    return (
        <Fragment>
            <ul onClick={pickMenu}>
                <li id="all">Show all |</li>
                <li id="polkadots"> Polkadots |</li>
                <li id="checkers"> Checkers |</li>
                <li id="floral"> Floral |</li>
                <li id="abstract"> Abstract |</li>
            </ul>
            {menuDis == "all" && (
                <div className="pattern_menu">
                    {patterns &&
                        patterns.map((pattern, i) => {
                            return (
                                <div className="item" key={i}>
                                    <img
                                        className="item_img"
                                        src={pattern.path}
                                        name={pattern.name}
                                        id={pattern.id}
                                        onClick={props.pickPattern}
                                    />
                                </div>
                            );
                        })}
                </div>
            )}
            {menuDis == "polkadots" && (
                <div className="pattern_menu">
                    {polkadots &&
                        polkadots.map((pattern, i) => {
                            return (
                                <div className="item" key={i}>
                                    <img
                                        className="item_img"
                                        src={pattern.path}
                                        name={pattern.name}
                                        id={pattern.id}
                                        onClick={props.pickPattern}
                                    />
                                </div>
                            );
                        })}
                </div>
            )}
        </Fragment>
    );
}
