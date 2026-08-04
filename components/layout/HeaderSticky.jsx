"use client";

import { useEffect, useState } from "react";

export default function HeaderSticky({

    top,

    header,

    navbar,

}) {

    const [sticky, setSticky] = useState(false);


       useEffect(() => {

    function onScroll() {

        const y = window.scrollY;

        setSticky((actual) => {

            if (!actual && y > 140) return true;

            if (actual && y < 80) return false;

            return actual;

        });

    }

    

        window.addEventListener("scroll", onScroll);

        return () =>
            window.removeEventListener("scroll", onScroll);

    }, []);

    return (

        <>

            <div
                className={`
                    overflow-hidden
                    transition-all
                    duration-300
                    ${
                        sticky
                            ? "max-h-0 opacity-0"
                            : "max-h-[300px] opacity-100"
                    }
                `}
            >

                {top}

                {header}

            </div>

            <div
    className={`
        sticky
        top-0
        z-[9999]
        transition-shadow
        duration-300
        ${sticky ? "shadow-2xl" : ""}
    `}
>

                {navbar}

            </div>

         

        </>

    );

}