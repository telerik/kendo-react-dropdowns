import * as React from 'react'

import util from './util'

import styles from 'kendo-theme-default-base/styles/main';

export default function KendoComponent(props) {
    return (
        <div {...props} className={styles.componentClass}>A Kendo UI react component{util()} </div>
    )
}
