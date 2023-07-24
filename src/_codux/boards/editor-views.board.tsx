import { createBoard } from '@wixc3/react-board';
import InterfaceB from '../../components/interfaceb';

export default createBoard({
    name: 'EditorViews',
    Board: () => <InterfaceB/>
});
