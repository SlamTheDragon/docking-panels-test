import { useState } from 'react';
import '../index.scss'

export default function InterfaceC() {
    const [dRight, setRight] = useState(300);
    const [dBottom, setBottom] = useState(300);
    const [DimensionX, setDimensionX] = useState(window.innerWidth)
    const [DimensionY, setDimensionY] = useState(window.innerHeight)


    function handleMouseDown(side: string) {
        if (side === "right") {

            const handleMouseMove = (e: MouseEvent) => {

                const invr = e.clientX - DimensionX
                setRight(-invr)
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
            window.addEventListener('mouseup', handleMouseUp);
        }
        if (side === "bottom") {

            const handleMouseMove = (e: MouseEvent) => {

                const invr = e.clientY - DimensionY
                setBottom(-invr)
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
            window.addEventListener('mouseup', handleMouseUp);
        }
    }



    return (
        <div className='f'
            id='f'
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 10,
                paddingRight: 0,
                left: 0,
                right: `${dRight}px`,
                top: 0,
                bottom: `${dBottom}px`
            }}>
            
            {/* <div className='resizable-top'>

            </div> */}

            <div>
                <h1>I was working with a new equation for the right and bottom handles lol</h1>
                <span>and it seems working</span>
            </div>

            <div className='handle' onMouseDown={() => handleMouseDown("right")}></div>
            <div className='handle' onMouseDown={() => handleMouseDown("bottom")}></div>
            {/* <div className='handle' onMouseDown={() => handleMouseDown("bottom")}></div> */}
        </div>
    );
}

// const [ElemX, setElemX] = useState(0)
// setElemX(document.getElementById("f")?.offsetWidth!)
// const [MouseX, setMouseX] = useState(0)
// const [init, setInit] = useState(0)
// const [invr, setInvert] = useState(0)
// const valueX = e.clientX; // also the initial distance