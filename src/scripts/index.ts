import Component from '../components/panel/PanelSample'

// function MyComponent(): JSX.Element {

// }


const Items = {
    itemTitle: "e",
    itemDescription: "e"
}

export const components = [
    {
        name: "MyComponent1",
        path: Component(Items),
    },
    {
        name: "MyComponent2",
        path: Component(Items),
    },
    {
        name: "MyComponent3",
        path: Component(Items),
    },
];