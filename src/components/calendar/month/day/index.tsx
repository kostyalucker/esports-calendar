import React from 'react';
import styles from './styles.module.scss';


const Day = (props: any) => {
    return (
        <div className={styles.day}>
            {props.children}
        </div>
    )
};

export default Day;