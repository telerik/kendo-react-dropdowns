import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Popup from '@telerik/kendo-react-popup';
import { List } from './main';

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
        this.refs.element.style.height = height;
    }

    onMouseDown = (event) => {
        event.preventDefault();
    }

    renderChildren() {
        return React.Children.map(this.props.children, function(child) {
            let node;
            if (child && child.type === List) {
                node = React.cloneElement(child, {
                    ref: "List"
                });
            } else {
                node = child;
            }
            return node;
        });
    }

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
            show: this.props.show,
            ref: "Popup"
        };

        return (
            <Popup {...popupProps} >
                <div className={containerClasses} onMouseDown={this.onMouseDown} ref="element" style={style}>
                    {this.renderChildren()}
                </div>
            </Popup>

        );
    }
}
