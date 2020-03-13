import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import {FaCaretRight} from 'react-icons/lib/fa';

//http://www.cssportal.com/css-tooltip-generator/

const STYLE = {
  width: '100%',
  height: '30px',
  display: 'flex',
  alignItems: 'left',
  justifyContent: 'left',
  marginBottom: '5px',
  fontSize: '14px',
  position: 'relative',
  cursor: 'pointer',
  paddingLeft: '10px',
  paddingTop: '7px',
  textTransform: 'capitalize',
};

const STYLE_TOOLTIP = {
  position: 'absolute',
  width: '140px',
  color: SharedStyle.COLORS.white,
  background: SharedStyle.COLORS.black,
  height: '30px',
  lineHeight: '30px',
  textAlign: 'center',
  visibility: 'visible',
  borderRadius: '6px',
  opacity: '0.8',
  left: '100%',
  top: '50%',
  marginTop: '-15px',
  marginLeft: '15px',
  zIndex: '999',
  fontSize: '12px'
};

const STYLE_TOOLTIP_PIN = {
  position: 'absolute',
  top: '50%',
  right: '100%',
  marginTop: '-8px',
  width: '0',
  height: '0',
  borderRight: '8px solid #000000',
  borderTop: '8px solid transparent',
  borderBottom: '8px solid transparent'
};

export default class ToolbarButton extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { active: false };
  }

  render() {
    let { state, props } = this;
    let color = props.active || state.active ? SharedStyle.COLORS.white : 'rgb(28, 166, 252)';
    let className = props.active ? 'toolbar-btn is-active' : 'toolbar-btn';

    return (
      <div
      // style={{
      //   ...STYLE,
      //   backgroundColor: props.active || state.active ? 'rgb(40,41,45)' : SharedStyle.COLORS.white
      // }}
        // onMouseOver={event => this.setState({ active: true })}
        // onMouseOut={event => this.setState({ active: false })}
        className={className}
        onClick={props.onClick}
        >
        <div
          // style={{ color }}
          dangerouslySetInnerHTML={{ __html: props.tooltip }}>
        </div>
        {
          props.isDropdown ?
          <div style={{position: 'absolute', right: '5px', top: '5px'}}>
            <FaCaretRight />
          </div> : null
        }

        {
          state.active ?
          <div style={STYLE_TOOLTIP}>
            <span style={STYLE_TOOLTIP_PIN} />
            {props.tooltip}
          </div>
          : null
        }

      </div>
    )
  }
}

ToolbarButton.propTypes = {
  active: PropTypes.bool.isRequired,
  tooltip: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isDropdown: PropTypes.bool,
};
