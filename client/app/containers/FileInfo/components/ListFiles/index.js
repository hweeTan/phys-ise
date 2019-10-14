import React from 'react';
import PropTypes from 'prop-types';
import { map, compact } from 'lodash';

import playImg from 'images/icon-play-white.png';
import CloseButton from 'components/CloseButton';

import ListFilesWrapper from './ListFilesWrapper';

function ListFiles({ files, setLink, toggleModalDialog, title }) {
  const renderList = map(compact(files), (filename) => (
    <li key={filename} className="item">
      <a
        href={filename}
        title="file"
        onClick={(e) => {
          e.preventDefault();
          toggleModalDialog('listVideo');
          setLink(filename);
        }}
      >
        <img src={playImg} alt="icon play" />
        {filename.substr(filename.lastIndexOf('/') + 1, filename.length)}
      </a>
    </li>
  ));

  return (
    <ListFilesWrapper>
      <span className="form-title">{title}</span>
      <ul className="list-files">
        {renderList}
      </ul>
      <CloseButton onClick={() => toggleModalDialog('listVideo')} />
    </ListFilesWrapper>
  );
}

ListFiles.propTypes = {
  files: PropTypes.array.isRequired,
  setLink: PropTypes.func.isRequired,
  toggleModalDialog: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default ListFiles;
