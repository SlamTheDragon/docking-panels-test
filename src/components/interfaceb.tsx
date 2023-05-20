import { useState, useEffect, MouseEvent } from 'react';
import PanelSample from './panel/PanelSample';
import '../index.scss';

const InterfaceB = () => {
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


    function handleMouseDown(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, side: string) {

        if (side === 'top') {
            const handleMouseMove = (e: { clientY: any; }) => {
                const value = e.clientY - anchorPoint.Y;
                setTop(value);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);

        } else if (side === 'left') {
            const handleMouseMove = (e: { clientX: any; }) => {
                const value = e.clientX - anchorPoint.X;
                setLeft(value);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);

        } else if (side === 'right') {
            const handleMouseMove = (e: { clientX: any; }) => {
                const value = anchorPoint.X - e.clientX;
                setRight((value));
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);

        } else if (side === 'bottom') {
            const handleMouseMove = (e: { clientY: any; }) => {
                const value = anchorPoint.Y - e.clientY;
                setBottom(value);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);

        } else if (side === 'top-left') {
            const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
                const valueX = e.clientY - anchorPoint.Y;
                const valueY = e.clientX - anchorPoint.X;
                setTop(valueX);
                setLeft(valueY);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);

        } else if (side === 'top-right') {
            const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
                const valueX = anchorPoint.X - e.clientX;
                const valueY = e.clientY - anchorPoint.Y;
                setRight(valueX);
                setTop(valueY);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);

        } else if (side === 'bottom-left') {
            const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
                const valueX = e.clientX - anchorPoint.X;
                const valueY = anchorPoint.Y - e.clientY;
                setLeft(valueX);
                setBottom(valueY);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);

        } else if (side === 'bottom-right') {
            const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
                const valueX = anchorPoint.X - e.clientX
                const valueY = anchorPoint.Y - e.clientY
                setRight(valueX);
                setBottom(valueY);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);

        } else if (side === 'default') {
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

    function calculateScreen() {
        return {
            height:
                Math.max(
                    document.body.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.clientHeight,
                    document.documentElement.scrollHeight,
                    document.documentElement.offsetHeight
                ) - 15 - (calculateInset().top + calculateInset().bottom),
        };
    }

    return (
        <div className="interface">
            <div className="i-floatier">
                <div
                    className="f"
                    style={{
                        // width: `${calculateInset().lef}px - `,
                        // height: ``,
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
                                height: `${calculateScreen().height}px`,
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

export default InterfaceB;
