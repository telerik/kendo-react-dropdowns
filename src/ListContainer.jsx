import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Popup from '@telerik/kendo-react-popup';

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

    setHeight(height) {
        this.refs.wrapper.style.height = height;
    }

    onMouseDown = (event) => {
        event.preventDefault();
    };

    render() {
        const containerClasses = classNames({
            'k-list-container': true,
            'k-popup': true,
            'k-group': true,
            'k-reset': true
        });

        const style = { ...this.props.style };

        const popupProps = {
            anchor: this.props.anchor,
            show: this.props.show
        };

        return (
            <Popup {...popupProps} >
                <div className={containerClasses} onMouseDown={this.onMouseDown} ref="wrapper" style={style}>
                    {this.props.children}
                </div>
            </Popup>

        );
    }
}
