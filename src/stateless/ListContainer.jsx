import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Popup from '@telerik/kendo-react-popup';
import styles from '@telerik/kendo-theme-default/styles/dropdowns/main';

export default class ListContainer extends React.Component {

    static propTypes = {
        anchor: PropTypes.object, // eslint-disable-line
        children: PropTypes.node,
        show: PropTypes.bool,
        style: PropTypes.object // eslint-disable-line
    };

    constructor(props) {
        super(props);
    }

    onMouseDown = (event) => {
        event.preventDefault();
    }

    render() {
        const containerClasses = classNames({
            [styles['list-container']]: true,
            [styles.reset]: true
        });

        const popupProps = {
            anchor: this.props.anchor,
            show: this.props.show
        };

        return (
            <Popup {...popupProps} >
                <div className={containerClasses} onMouseDown={this.onMouseDown} ref="element" >
                    {this.props.children}
                </div>
            </Popup>

        );
    }
}
