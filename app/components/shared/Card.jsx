"use client";

import Styles from "./Card.module.css";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";


function Card({ imagen, caption, title }) {
    const [show, setShown] = useState(false);

    const props3 = useSpring({
        transform: show ? "scale(1.03)" : "scale(1)",
    });
    return (
        <animated.div
            className={Styles.card}
            style={props3}
            onMouseEnter={() => setShown(true)}
            onMouseLeave={() => setShown(false)}
        >
            <img src={imagen} className="w-full h-full object-cover  " alt="" />
            <div className="absolute bottom-20 right-[4rem] rounded-3xl p-3 bg-[#FFFFFF78]">
                <ul className="pl-3">
                    <li className="text-sm">{caption}</li>
                </ul>
                <p className="text-sm text-white pl-3">{title}</p>
            </div>
        </animated.div>
    );
}

export default Card;
