import { useState, useEffect, MouseEvent } from 'react';
import PanelSample from './panel/PanelSample';
import '../index.scss';

const InterfaceB = () => {
    const [draggingState, setDragging] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ X: 0, Y: 0 });
    const [offset, setOffset] = useState({ X: 0, Y: 0 });
    const [DimensionX, setDimensionX] = useState(window.innerWidth)
    const [DimensionY, setDimensionY] = useState(window.innerHeight)
    const [dTop, setTop] = useState(100);
    const [dRight, setRight] = useState(700);
    const [dBottom, setBottom] = useState(400);
    const [dLeft, setLeft] = useState(100);

    useEffect(() => {
        function handleMouseUp() {
            setDragging(false);
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

            // FIXME: this thing multoplies crap
            const newAnchorX = e.clientX - offset.X;
            const newAnchorY = e.clientY - offset.Y;
            setAnchorPoint({ X: newAnchorX, Y: newAnchorY });

            // FIXME:
            const element = document.getElementById("f");

            if (element) {
                const styles = window.getComputedStyle(element);
                const top = styles.getPropertyValue("top");
                const right = styles.getPropertyValue("right");
                const bottom = styles.getPropertyValue("bottom");
                const left = styles.getPropertyValue("top");

                console.log(top, right, bottom, left);

                // find the equation to query the new inset values per each
                // setTop(parseInt(top))
                // setRight(parseInt(right))
                // setBottom(parseInt(bottom))
                // setLeft(parseInt(left))
            }
        }

        foo()

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
        }
        if (side === 'left') {
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
        }
        if (side === 'right') {
            const handleMouseMove = (e: { clientX: any; }) => {
                const value = anchorPoint.X - (e.clientX - DimensionX);
                setRight(value);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);
        }
        if (side === 'bottom') {
            const handleMouseMove = (e: { clientY: any; }) => {
                const value = anchorPoint.Y - (e.clientY - DimensionY);
                setBottom(value);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);
        }
        if (side === 'top-left') {
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
        }
        if (side === 'top-right') {
            const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
                const valueX = anchorPoint.X - (e.clientX - DimensionX);
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
        }
        if (side === 'bottom-left') {
            const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
                const valueX = e.clientX - anchorPoint.X;
                const valueY = anchorPoint.Y - (e.clientY - DimensionY);
                setLeft(valueX);
                setBottom(valueY);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);
        }
        if (side === 'bottom-right') {
            const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
                const valueX = anchorPoint.X - (e.clientX - DimensionX)
                const valueY = anchorPoint.Y - (e.clientY - DimensionY)
                setRight(valueX);
                setBottom(valueY);
            };
            window.addEventListener('mousemove', handleMouseMove);

            const handleMouseUp = () => {
                window.removeEventListener('mousemove', handleMouseMove);
                setDragging(false);
            };
            window.addEventListener('mouseup', handleMouseUp);
        }
        if (side === 'default') {
            setDragging(true);

            const offsetX = e.clientX - anchorPoint.X;
            const offsetY = e.clientY - anchorPoint.Y;
            // const offsetX = anchorPoint.X;
            // const offsetY = anchorPoint.Y;
            setOffset({ X: offsetX, Y: offsetY });
        }
    }

    // FIXME: this offsets the pane, we still need to query and apply the new inset values
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
            height: panelHeight! - 17
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
                        left: `${calculateInset().left}px`
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
                                height: `${calculateElementHeight().height}px`
                            }}
                        >
                            <PanelSample itemTitle={'auwg'} itemDescription={'uwuwu'} />
                        </div>

                        <div className="handle right" onMouseDown={(e) => handleMouseDown(e, 'right')}></div>
                    </div>

                    <div className="resizable-bottom">
                        <div className="handle bottom-left" onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}></div>
                        <div className="handle bottom" onMouseDown={(e) => handleMouseDown(e, 'bottom')}></div>
                        <div className="handle bottom-right" onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}></div>
                    </div>
                </div>
                <div
                    className="f"
                    id='f'

                    style={{
                        top: `${dTop}px`,
                        right: `${dRight}px`,
                        bottom: `${dBottom}px`,
                        left: `${dLeft}px`
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
                                height: `${calculateElementHeight().height}px`
                            }}
                        >
                            <PanelSample itemTitle={'auwg'} itemDescription={'uwuwu'} />
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
