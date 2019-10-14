import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { putFile, getData } from 'utils/helpers';
import store from 'store';
import PopUpModal from 'components/PopUpModal';
import CreateFile from 'components/CreateFile';
import { resetToolbox } from 'containers/Toolbox/actions';
import { resetTracker, changeVideo } from 'containers/Tracker/actions';
import { resetWindows } from 'containers/Windows/actions';
import { setLoading } from 'containers/HomePage/actions';

import ListFiles from './components/ListFiles';
import makeSelectFileInfo from './selectors';
import { toggleModal, setFileInfo } from './actions';

export class FileInfo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  onSubmit = (e) => {
    this.props.setLoadingBlock();
    const createFileData = new FormData(e.target);
    const data = {
      filename: createFileData.get('mssv') + createFileData.get('filename'),
      data: store.getState().toJS(),
    };
    const { openFile, saveFile } = this.props.FileInfo;

    if (openFile) {
      getData({ filename: data.filename }, this.handleDataSuccess, this.handleDataError);
    }

    if (saveFile) {
      putFile(data, this.handleFileSuccess);
    }
  }

  handleDataError = () => {
    alert('Lỗi khi mở file'); // eslint-disable-line
    this.props.setLoadingBlock();
    this.props.toggleModalDialog('openFile');
  }

  handleDataSuccess = (data) => {
    this.props.resetState(data);
    this.props.toggleModalDialog('openFile');
    this.props.setLoadingBlock();
  }

  handleFileSuccess = (filename) => {
    this.props.setFile(filename);
    this.props.toggleModalDialog('saveFile');
    this.props.setLoadingBlock();
  }

  render() {
    const { openFile, saveFile, listVideo, listFile } = this.props.FileInfo;
    const { toggleModalDialog, changeLinkVideo } = this.props;

    return (
      <div>
        <PopUpModal
          isOpen={openFile}
          contentLabel="open file"
        >
          <CreateFile
            title="Mở bài"
            submit={this.onSubmit}
            close={() => toggleModalDialog('openFile')}
          />
        </PopUpModal>
        <PopUpModal
          isOpen={saveFile}
          contentLabel="save file"
        >
          <CreateFile
            title="Lưu bài"
            submit={this.onSubmit}
            close={() => toggleModalDialog('saveFile')}
          />
        </PopUpModal>
        <PopUpModal
          isOpen={listVideo}
          contentLabel="video list"
        >
          <ListFiles
            title="Chọn video"
            files={listFile}
            setLink={changeLinkVideo}
            toggleModalDialog={toggleModalDialog}
          />
        </PopUpModal>
      </div>
    );
  }
}

FileInfo.propTypes = {
  toggleModalDialog: PropTypes.func.isRequired,
  setLoadingBlock: PropTypes.func.isRequired,
  changeLinkVideo: PropTypes.func.isRequired,
  setFile: PropTypes.func.isRequired,
  resetState: PropTypes.func.isRequired,
  FileInfo: PropTypes.shape({
    openFile: PropTypes.bool,
    saveFile: PropTypes.bool,
    listVideo: PropTypes.bool,
    filename: PropTypes.string,
    listFile: PropTypes.array,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  FileInfo: makeSelectFileInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    toggleModalDialog: (modal) => dispatch(toggleModal(modal)),
    setFile: (filename) => dispatch(setFileInfo(filename)),
    changeLinkVideo: (link) => dispatch(changeVideo(link)),
    setLoadingBlock: () => dispatch(setLoading()),
    resetState: (state) => {
      dispatch(resetToolbox(state.toolbox));
      dispatch(resetTracker(state.tracker));
      dispatch(resetWindows(state.windows));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileInfo);
