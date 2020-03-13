import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import ToolbarButton from './toolbar-button';
import * as SharedStyle from '../../shared-style';
import catalog from '../../../demo/src/catalog/mycatalog.js';
import CatalogItemButton from '../catalog-view/catalog-item-button';
import {
  MODE_IDLE,
  MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON,
  MODE_VIEWING_CATALOG,
  MODE_CONFIGURING_PROJECT
} from '../../constants';

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
  // textTransform: 'capitalize',
};

const printHello = () => {
  console.log('Hello')
}


export default class ToolbarCatalogButton extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = { active: false };
  }

  // componentDidMount() {
  //   $('#categories-container').on('click', () => {
  //     $('.categories-list').slideToggle()
  //   })
  // }

  render() {
    let { state, props } = this;
    let color = props.active || state.active ? SharedStyle.COLORS.white : 'rgb(28, 166, 252)';
    const mainCategories = catalog.categories.root.categories;
    let categorieButtons = [
      // <CatalogItemButton
      //   element={catalog.elements.wall}
      //   key='another_random_string'
      // />
    ]
    for (let i in mainCategories) {
      let name = mainCategories[i].name
      let label = mainCategories[i].label
      categorieButtons.push(
        <ToolbarButton
        active={false}
        tooltip={'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + label}
        onClick={
          event => {
            $('#catalog-container>div').slideUp()
            $(`#catalog-container div#${name}-items`).slideDown()
          }
        }
          key={i}/>
      )

    }
    // categorieButtons.push(
    //   <ToolbarButton
    //     active={[MODE_VIEWING_CATALOG].includes(props.mode)}
    //     tooltip='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;All Products'
    //     onClick={event => props.projectActions.openCatalog()}
    //     key='random_id'/>)

    return (
      <div id='categories-container'>
        <ToolbarButton
          onClick={() => {}}
          active={false}
          tooltip='Add Items'
          isDropdown={false}
        />
        <div className="categories-list">
          {categorieButtons}
        </div>
      </div>
    )
  }
}

ToolbarCatalogButton.propTypes = {
  active: PropTypes.bool.isRequired,
  tooltip: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  projectActions: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired
};
