import React, { Component } from "react";
import PropTypes from "prop-types";
import { MdSettings, MdUndo, MdDirectionsRun } from "react-icons/lib/md";
import {
  FaFileO,
  FaMousePointer,
  FaPlus,
  FaTimesCircle
} from "react-icons/lib/fa";
import ToolbarButton from "./toolbar-button";
import ToolbarSaveButton from "./toolbar-save-button";
import ToolbarLoadButton from "./toolbar-load-button";
import ToolbarCatalogButton from "./toolbar-catalog-button";
import CatalogItem from "../catalog-view/catalog-item";
import catalog from "../../../demo/src/catalog/mycatalog.js";
import $ from "jquery";
import { defaultPlan, calculatePosition } from "./toolbar-edit-floorplan";

import If from "../../utils/react-if";
import {
  MODE_IDLE,
  MODE_3D_VIEW,
  MODE_3D_FIRST_PERSON,
  MODE_VIEWING_CATALOG,
  MODE_CONFIGURING_PROJECT
} from "../../constants";
import * as SharedStyle from "../../shared-style";

const iconTextStyle = {
  fontSize: "19px",
  textDecoration: "none",
  fontWeight: "bold",
  margin: "0px",
  userSelect: "none"
};

const Icon2D = ({ style }) => <p style={{ ...iconTextStyle, ...style }}>2D</p>;
const Icon3D = ({ style }) => <p style={{ ...iconTextStyle, ...style }}>3D</p>;

const ASIDE_STYLE = {
  backgroundColor: "#fff",
  color: "black",
  padding: "10px 0",
  width: "230px",
  maxWidth: "230px",
  overflowY: "auto"
};

const sortButtonsCb = (a, b) => {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }

  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }

  return a.index - b.index;
};

const mapButtonsCb = (el, ind) => {
  return (
    <If key={ind} condition={el.condition} style={{ position: "relative" }}>
      {el.dom}
    </If>
  );
};

export const hideItemContainer = event => {
  $("#catalog-container>div").fadeOut();
};

export default class Toolbar extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.state.mode !== nextProps.state.mode ||
      this.props.height !== nextProps.height ||
      this.props.width !== nextProps.width ||
      this.props.state.alterate !== nextProps.state.alterate
    );
  }

  componentDidMount() {
    // $('#project-settings>div')
    // const settingsDropdownContainer = $('#settings-dropdown-container')
    const quoteModal = $("#quoteModal");
    const floorPlanModal = $("#floorplanModal");
    const quoteModalClose = $(".quote-modal-close");
    const floorplanModalClose = $(".floorplan-modal-close");
    const categoriesContainer = $("#categories-container");

    const mainWindow = $(window);

    mainWindow.on("contextmenu", event => {
      event.preventDefault();
      this.context.projectActions.unselectAll();
    });

    // Hide Project Settings Initially
    // settingsDropdownContainer.hide()
    // $('#project-settings>div:first-child').on('click', () => {
    //   settingsDropdownContainer.slideToggle()
    // })

    // Modal Close Event Listeners
    quoteModalClose.on("click", e => quoteModal.removeClass("in").slideUp());
    floorplanModalClose.on("click", e =>
      floorPlanModal.removeClass("in").slideUp()
    );

    // Edit FloorPlan Form handling
    floorPlanModal.find("#floorplanForm").on("submit", event => {
      event.preventDefault();
      floorPlanModal.removeClass("in").slideUp();
      const floorWidth = parseInt($("#floorWidth").val());
      const floorHeight = parseInt($("#floorHeight").val());
      const wallHeight = parseInt($("#wallHeight").val());
      calculatePosition(defaultPlan, floorWidth, floorHeight, wallHeight);
      this.context.projectActions.loadProject(defaultPlan);
      categoriesContainer.find(".categories-list").slideDown(350);
    });
  }

  selectWall() {
    const element = catalog.elements.wall;
    this.context.linesActions.selectToolDrawingLine(element.name);
    this.context.projectActions.pushLastSelectedCatalogElementToHistory(
      element
    );
  }

  render() {
    let {
      props: { state, width, height, toolbarButtons, allowProjectFileSupport },
      context: {
        projectActions,
        viewer3DActions,
        linesActions,
        viewer2DActions,
        translator
      }
    } = this;

    let mode = state.get("mode");
    let alterate = state.get("alterate");
    let alterateColor = alterate ? SharedStyle.MATERIAL_COLORS[500].orange : "";

    let sorter = [
      {
        index: 0,
        condition: true,
        dom: (
          <ToolbarButton
            active={[MODE_IDLE].includes(mode)}
            tooltip="2D View"
            onClick={event => {
              hideItemContainer(event);
              return projectActions.setMode(MODE_IDLE);
            }}
          />
        )
      },
      {
        index: 1,
        condition: true,
        dom: (
          <ToolbarButton
            active={[MODE_3D_VIEW].includes(mode)}
            tooltip="3D View"
            onClick={event => {
              hideItemContainer(event);
              return viewer3DActions.selectTool3DView();
            }}
          />
        )
      },
      {
        index: 2,
        condition: true,
        dom: (
          <ToolbarButton
            active={false}
            tooltip="Room Dimensions"
            onClick={event => {
              hideItemContainer(event);
              $("#floorplanModal")
                .addClass("in")
                .show();
            }}
          />
        )
      },
      {
        index: 3,
        condition: true,
        dom: (
          <ToolbarButton
            active={false}
            tooltip="Draw Wall"
            onClick={() => this.selectWall()}
          />
        )
      },
      {
        index: 4,
        condition: true,
        dom: (
          <ToolbarCatalogButton
            active={false}
            tooltip="Add Items"
            onClick={event => event.preventDefault()}
            projectActions={projectActions}
            mode={mode}
          />
        )
      },
      {
        index: 5,
        condition: true,
        dom: (
          <ToolbarButton
            active={false}
            tooltip="Undo Action"
            onClick={event => {
              hideItemContainer(event);
              return projectActions.undo();
            }}
          />
        )
      },
      {
        index: 6,
        condition: true,
        dom: (
          <ToolbarButton
            active={false}
            tooltip="Submit Design For Quote"
            onClick={event => {
              hideItemContainer(event);
              const modal = $("#quoteModal");
              modal.addClass("in");
              modal.show();
            }}
          />
        )
      },
      {
        index: 7,
        condition: true,
        dom: (
          <ToolbarButton
            active={[MODE_3D_FIRST_PERSON].includes(mode)}
            tooltip="3D First Person"
            onClick={event => {
              hideItemContainer(event);
              return viewer3DActions.selectTool3DFirstPerson();
            }}
          >
            <MdDirectionsRun />
          </ToolbarButton>
        )
      }
      // {
      //   index: 1, condition: allowProjectFileSupport,
      //   dom: <div id="project-settings">
      //     <ToolbarButton
      //       active={false}
      //       tooltip='Project'
      //       isDropdown={true}
      //       onClick={hideItemContainer}/>
      //     <div id="settings-dropdown-container">
      //       <ToolbarButton
      //         active={false}
      //         tooltip='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;New project'
      //         onClick={
      //           event => {
      //             hideItemContainer(event)
      //             $('#floorplanModal').addClass('in').show()
      //           }
      //         } >
      //       </ToolbarButton>
      //       <ToolbarSaveButton state={state} />
      //       <ToolbarLoadButton state={state} />
      //     </div>
      //   </div>
      // },
      // {
      //   index: 9, condition: true, dom: <ToolbarButton
      //     active={[MODE_CONFIGURING_PROJECT].includes(mode)}
      //     tooltip='Configure project'
      //     onClick={event => projectActions.openProjectConfigurator()}>
      //     <MdSettings />
      //   </ToolbarButton>
      // },
      // {
      //   index: 3, condition: true,
      //   dom: <ToolbarButton
      //     active={[MODE_VIEWING_CATALOG].includes(mode)}
      //     tooltip={translator.t('Open catalog')}
      //     onClick={event => projectActions.openCatalog()}>
      //     <FaPlus />
      //   </ToolbarButton>
      // },
    ];

    sorter = sorter.concat(
      toolbarButtons.map((Component, key) => {
        return Component.prototype //if is a react component
          ? {
              condition: true,
              dom: React.createElement(Component, { mode, state, key })
            }
          : {
              //else is a sortable toolbar button
              index: Component.index,
              condition: Component.condition,
              dom: React.createElement(Component.dom, { mode, state, key })
            };
      })
    );

    const mainCategories = catalog.categories.root.categories;
    let categorieButtons = [];
    for (let i in mainCategories) {
      let name = mainCategories[i].name;
      let label = mainCategories[i].label;
      let elements = [];
      for (let key in mainCategories[i].elements)
        elements.push(
          <CatalogItem
            key={name + " " + key}
            element={mainCategories[i].elements[key]}
          />
        );

      categorieButtons.push(
        <div
          id={name + "-items"}
          key={`item-container-${i}`}
          style={{ display: "none", position: "relative", marginTop: "15px" }}
        >
          <h3 style={{ textTransform: "capitalize", textAlign: "center" }}>
            {label}
            <span className="items-close-button">
              <FaTimesCircle
                style={{
                  color: "red",
                  position: "absolute",
                  top: "-15px",
                  right: "4px",
                  cursor: "pointer"
                }}
                onClick={event => {
                  $("#catalog-container>div").hide();
                }}
              />
            </span>
          </h3>
          {elements}
        </div>
      );
    }

    return (
      <aside
        style={{ ...ASIDE_STYLE, maxHeight: height }}
        className="toolbar-container"
        id="toolbar-container"
      >
        <img
          src={require("../../../demo/src/assets/myKitchen final-01.png")}
          alt="roomDesigner Logo"
          style={{ padding: "15px", width: "100%" }}
        />
        {sorter.sort(sortButtonsCb).map(mapButtonsCb)}
        {/* <hr/> */}
        <div id="catalog-container" style={{ paddingTop: "15px" }}>
          {categorieButtons}
        </div>
      </aside>
    );
  }
}

Toolbar.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  allowProjectFileSupport: PropTypes.bool.isRequired,
  toolbarButtons: PropTypes.array
};

Toolbar.contextTypes = {
  projectActions: PropTypes.object.isRequired,
  viewer2DActions: PropTypes.object.isRequired,
  viewer3DActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  translator: PropTypes.object.isRequired
};
