import { useState, useEffect, MouseEvent } from 'react';
import PanelSample from './panel/PanelSample';
import '../index.scss';


export default function Interface() {
    const [draggingState, setDragging] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ X: 0, Y: 0 });
    const [offset, setOffset] = useState({ X: 0, Y: 0 });
    const [dTop, setTop] = useState(300);
    const [dRight, setRight] = useState(300);
    const [dBottom, setBottom] = useState(300);
    const [dLeft, setLeft] = useState(300);

    useEffect(() => {
        function handleMouseUp() {
            
            setDragging(false);
            foo()
        }

        function foo() {
            const theFalsery = -1
            if (
                Math.sign(dTop + anchorPoint.Y) === theFalsery ||
                Math.sign(dRight - anchorPoint.X) === theFalsery ||
                Math.sign(dBottom - anchorPoint.Y) === theFalsery ||
                Math.sign(dLeft + anchorPoint.X) === theFalsery
            ) {
                reset()
            }
        }

        function reset() {
            setAnchorPoint({ X: 0, Y: 0 });
            setOffset({ X: 0, Y: 0 });
            console.log("reset");
        }

        function handleWindowMouseMove(e: { clientX: number; clientY: number; }) {
            if (!draggingState) {
                return;
            }

            const newAnchorX = e.clientX - offset.X;
            const newAnchorY = e.clientY - offset.Y;
            setAnchorPoint({ X: newAnchorX, Y: newAnchorY });
        }

        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleWindowMouseMove);

        return () => {
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleWindowMouseMove);
        };
    }, [draggingState, offset]);


    function panelResize(side: string | undefined) {
        const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
            const valueX = e.clientX
            const valueY = e.clientY

            function foo(side: string | undefined) {
                setTop(valueY)
                setRight(valueX)
            }

            switch (side) {
                case "top":
                    setTop(valueY)
                    break
                case "right":
                    setRight(valueX)
                    break
                case "bottom":
                    setBottom(valueY)
                    break
                case "left":
                    setLeft(valueX)
                    break
                case "top-left":
                    foo("top-left")
                    break
                case "top-right":
                    foo("top-right")
                    break
                case "bottom-left":
                    foo("bottom-left")
                    break
                case "bottom-right":
                    foo("bottom-right")
                    break
                default:
                    // none
                    break
            }
        };
        window.addEventListener('mousemove', handleMouseMove);


        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
        window.addEventListener('mouseup', handleMouseUp);
    }


    function handleMouseDown(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, side: string) {

        if (side === 'top') {
            panelResize("top")
        }
        if (side === 'left') {
            panelResize("left")
        }
        if (side === 'right') {
            panelResize("right")
        }
        if (side === 'bottom') {
            panelResize("bottom")
        }
        if (side === 'top-left') {
            panelResize("top-left")
        }
        if (side === 'top-right') {
            panelResize("top-right")
        }
        if (side === 'bottom-left') {
            panelResize("bottom-left")
        }
        if (side === 'bottom-right') {
            panelResize("bottom-right")
        }
        if (side === 'default') {
            setDragging(true);

            const offsetX = e.clientX - anchorPoint.X;
            const offsetY = e.clientY - anchorPoint.Y;
            setOffset({ X: offsetX, Y: offsetY });
        }
    }

    function calculateInset() {
        return {
            top: dTop + anchorPoint.Y,
            right: dRight - anchorPoint.X,
            bottom: dBottom - anchorPoint.Y,
            left: dLeft + anchorPoint.X,
        };
    }

    function calculateElementHeight() {
        const panelHeight = document.getElementById("f")?.offsetHeight

        return {
            height: panelHeight! - 15
        };
    }

    return (
        <div className="interface">
            <div className="i-floatier">
                <div
                    className="f"
                    id='f'
                    style={{
                        top: `${calculateInset().top}px`,
                        right: `${calculateInset().right}px`,
                        bottom: `${calculateInset().bottom}px`,
                        left: `${calculateInset().left}px`,
                    }}
                >
                    <div className="draggable" onMouseDown={(e) => handleMouseDown(e, 'default')}></div>

                    <div className="resizable-top">
                        <div className="handle top-left" onMouseDown={(e) => handleMouseDown(e, 'top-left')}></div>
                        <div className="handle top" onMouseDown={(e) => handleMouseDown(e, 'top')}></div>
                        <div className="handle top-right" onMouseDown={(e) => handleMouseDown(e, 'top-right')}></div>
                    </div>

                    <div className="resizable-mid">
                        <div className="handle left" onMouseDown={(e) => handleMouseDown(e, 'left')}></div>

                        {/* Container Content */}
                        <div
                            className="container"
                            style={{
                                height: `${calculateElementHeight().height}px`,
                            }}
                        >
                            <h1>Hello Floaty</h1>
                            <span>why are bottom and right attributes do not display the right audskdkfjhasldkjh</span>
                        </div>

                        <div className="handle right" onMouseDown={(e) => handleMouseDown(e, 'right')}></div>
                    </div>

                    <div className="resizable-bottom">
                        <div className="handle bottom-left" onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}></div>
                        <div className="handle bottom" onMouseDown={(e) => handleMouseDown(e, 'bottom')}></div>
                        <div className="handle bottom-right" onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}></div>
                    </div>
                </div>
            </div>

            <div className="i-content">
                <div className="d">
                    <PanelSample
                        itemTitle={'Hello Docky'}
                        itemDescription={'Docky Div Sample'}
                    />
                </div>
            </div>
        </div>
    );
};