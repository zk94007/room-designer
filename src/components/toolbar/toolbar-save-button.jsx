import React from 'react';
import PropTypes from 'prop-types';
import IconSave from 'react-icons/lib/fa/floppy-o';
import ToolbarButton from './toolbar-button';
import {browserDownload}  from '../../utils/browser';
import { Project } from '../../class/export';
import { hideItemContainer } from './toolbar.jsx';

export default function ToolbarSaveButton({state}, {translator}) {

  let saveProjectToFile = e => {
    e.preventDefault();
    hideItemContainer(e);
    state = Project.unselectAll( state ).updatedState;
    browserDownload(state.get('scene').toJS());
  };

  return (
    <ToolbarButton
      active={false}
      tooltip='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Save project'
      onClick={saveProjectToFile}>
      <IconSave />
    </ToolbarButton>
  );
}

ToolbarSaveButton.propTypes = {
  state: PropTypes.object.isRequired,
};

ToolbarSaveButton.contextTypes = {
  translator: PropTypes.object.isRequired,
};
