import { MouseEvent, SetStateAction, useEffect, useState } from 'react';
import PanelSample from './panel/PanelSample';
import '../index.scss'


export default function Interface() {
    // const [getTop, setTop] = useState(0);
    // const [getLeft, setLeft] = useState(0);
    // const [getRight, setRight] = useState(0);
    // const [getBottom, setBottom] = useState(0);
    // const [getEventState, setEventState] = useState(true)

    // function eventStart() {
    //     if (getEventState) {
    //         document.body.addEventListener('mousemove', mousedrag);
    //         eventStop()
    //     }
    // }

    // function eventStop() {
    //     setEventState(false)
    //     // document.body.removeEventListener('mousemove', mousedrag);
    //     console.log("detatched");
    // }

    // function mousedrag(event: MouseEvent) {
    //     // console.log(event.clientX, event.clientY);
    //     if (event.button !== 0) {            
    //         setTop(event.clientY)
    //         setLeft(event.clientX)
    //         setRight(event.clientX)
    //         setBottom(event.clientY)
    //     }
    //     // console.log(getBottom, getLeft, getTop, getRight);
    // };


    /**
    * my brain is ded
    */

    const [draggingState, setDragging] = useState(false);
    const [getAnchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
    const [getOffset, setOffset] = useState({ x: 0, y: 0 });
    const [getAdjustedOffsetX, setOAdjustedffsetX] = useState({ x: 0 });
    const [getAdjustedOffsetY, setOAdjustedffsetY] = useState({ y: 0 });


    useEffect(() => {
        const handleMouseUp = () => {
            setDragging(false);
        };

        const handleWindowMouseMove = (e: { clientX: number; clientY: number; }) => {
            if (draggingState) {
                const newAnchorX = e.clientX - getOffset.x
                const newAnchorY = e.clientY - getOffset.y
                setAnchorPoint({ x: newAnchorX, y: newAnchorY });
            }
        };

        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleWindowMouseMove);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleWindowMouseMove);
        };
    }, [draggingState, getOffset]);

    const handleMouseDown = (e: { clientX: number; clientY: number; }) => {
        setDragging(true);

        const offsetX = e.clientX - getAnchorPoint.x;
        const offsetY = e.clientY - getAnchorPoint.y;
        setOffset({ x: offsetX, y: offsetY });
    };

    const getInputValueX = (event: { target: { value: any; }; }) => {
        // show the user input value to console
        const userValue = event.target.value;
        setOAdjustedffsetX({ x: userValue })
        console.log(getAdjustedOffsetX);
    };

    const getInputValueY = (event: { target: { value: any; }; }) => {
        // show the user input value to console
        const userValue = event.target.value;
        setOAdjustedffsetY({ y: userValue })
        console.log(getAdjustedOffsetY);
    };



    return (
        // INFO: part 1: Wrapper
        <div className="interface">

            {/* INFO: part 1-A: floating containers*/}
            <div className="i-floatier">

                <div className='f'
                    style={{
                        top: getAnchorPoint.y,
                        left: getAnchorPoint.x,
                        right: -getAnchorPoint.x,
                        bottom: -getAnchorPoint.y
                    }}>
                    <div className='draggable'
                        onMouseDown={handleMouseDown}
                    ></div>
                    {/* Container Content */}
                    <PanelSample itemTitle={'Hello Floaty'} itemDescription={'Floaty Div Sample'} />
                </div>

            </div>

            {/* INFO: part 1-B: docked containers*/}
            <div className="i-content">
                <div className='d'>
                    <PanelSample itemTitle={'Hello Docky'} itemDescription={'Docky Div Sample'} />
                </div>
            </div>
        </div>
    );
}
