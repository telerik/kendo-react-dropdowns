import * as React from 'react'

import util from './util'

// import styles from '@telerik/kendo-button-theme/styles/button';

export default function KendoComponent(props) {
    return (
        <div {...props}>A Kendo UI react component{util()} </div>
    )
}
