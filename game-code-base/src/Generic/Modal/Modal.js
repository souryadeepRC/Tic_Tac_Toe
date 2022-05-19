import { Fragment } from 'react';
import ReactDOM from 'react-dom'
import ModalBackdrop from "./ModalBackdrop";
import ModalOverlay from "./ModalOverlay";

const Modal = (props) => {  
    return (
        <Fragment>
            {ReactDOM.createPortal(<ModalBackdrop onConfirm={() => props.onConfirm()}/>, document.getElementById('modal-backdrop'))}
            {ReactDOM.createPortal(<ModalOverlay Style={props.className} content={props.children} onModalClose={() => props.onModalClose()}/>, document.getElementById('modal-overlay'))}
        </Fragment>
    )
}

export default Modal