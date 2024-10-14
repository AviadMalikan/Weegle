import { useEffect, useState } from "react"

export function LongTxt({ txt, parentRef, isMoreShort }) {
    const [length, setLength] = useState(0);

    // Function to adjust the length based on screen size
    function adjustTextLength() {
        if (parentRef.current) {
            const parentWidth = parentRef.current.offsetWidth;
            const screenWidth = window.innerWidth
            const dividing = isMoreShort ? 10 : 4
            if (screenWidth < 620) setLength((parentWidth / dividing) + 10)
            else if (screenWidth < 1000) setLength((parentWidth / (dividing * 2)) )
            else setLength((parentWidth / (dividing * 3)) + 15)
        }
    }

    useEffect(() => {
        adjustTextLength(); // Initial call to set length based on parent element size
        // Observe for changes in the parent element's size
        const resizeObserver = new ResizeObserver(adjustTextLength);
        if (parentRef.current) {
            resizeObserver.observe(parentRef.current);
        }

        // Cleanup observer on component unmount
        return () => {
            if (parentRef.current) {
                resizeObserver.unobserve(parentRef.current);
            }
        };
    }, [parentRef, window.innerWidth]);

    function getTxtToShow(txt, length) {
        return (txt.length < length) ? txt : txt.substring(0, length + 1) + '...';
    }

    return (<span>{getTxtToShow(txt, length)}</span>)
}