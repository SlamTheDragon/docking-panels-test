interface Items {
    itemTitle: string
    itemDescription: string
}


export default function PanelSample(props: Items) {
    return (
        <>
        <div className="panel">
            
            <div className="p-handle"></div>

            <h1>{props.itemTitle}</h1>
            {props.itemDescription}
        </div>
        </>
    );
}