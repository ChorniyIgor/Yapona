import React from "react";
import ReactDom from "react-dom";
import styles from "./Modal.module.css"

const Popap = (props) => {
    return <div className={styles.modal}>
        <div className={styles.content}>
         {props.children}
        </div>
        
    </div>
}

const Overlay = (props) => {
    return <div className={styles.backdrop} onClick={props.hideModal}/>
}

const Modal = (props) => {
    return <React.Fragment>
        {ReactDom.createPortal(<Overlay hideModal={props.hideModal} />, document.getElementById('overlay'))}
        {ReactDom.createPortal(<Popap > {props.children}</Popap>, document.getElementById('popap'))}
    </React.Fragment>
}

export default Modal;