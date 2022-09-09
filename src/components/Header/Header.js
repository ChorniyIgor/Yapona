import React from "react";
import imgSrc from '../../assets/sushi.jpg';
import styles from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton/HeaderCartButton";

const Header = (props) => {
    return <React.Fragment>
        <header className={styles.header}>
            <h1>Yapona Food</h1>
            <HeaderCartButton showModal={props.showModal}/>
        </header>
        <div className={styles['main-image']}>
            <img src={imgSrc} alt="Yapona shop header"/>
        </div>
    </React.Fragment>
}

export default Header;