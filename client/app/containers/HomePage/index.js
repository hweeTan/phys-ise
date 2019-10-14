/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { getVideos, uploadVideo } from 'utils/helpers';
import Header from 'components/Header';
import Tracker from 'containers/Tracker';
import Toolbox from 'containers/Toolbox';
import Windows from 'containers/Windows';
import { changeTool } from 'containers/Toolbox/actions';
import makeSelectToolbox, { selectCurrentTool } from 'containers/Toolbox/selectors';
import FileInfo from 'containers/FileInfo';
import { toggleModal, listFile } from 'containers/FileInfo/actions';
import makeSelectFileInfo from 'containers/FileInfo/selectors';
import { changeVideo } from 'containers/Tracker/actions';
import Overlay from 'components/Overlay';

import HomePageWrapper from './styled-components/HomePageWrapper';
import makeSelectObjectsHomePage from './selectors';
import { uploadSuccess, uploadFail, setLoading } from './actions';

export class HomePage extends React.PureComponent {
  upVideo = (e) => {
    this.props.toggleLoading();
    uploadVideo(e, (data) => {
      this.props.toggleLoading();
      this.props.changeVideoLink(data.url);
    });
  }

  fetchVideos = () => {
    getVideos((data) => {
      this.props.setListFile(data);
      this.props.toggleModalDialog('listVideo');
    });
  }

  render() {
    const {
      changeCurrentTool,
      currentTool,
      Toolbox: toolboxSettings,
      toggleModalDialog,
    } = this.props;

    const { hasLoading } = this.props.HomePage;

    return (
      <HomePageWrapper>
        <Header
          toolbox={toolboxSettings}
          changeTool={changeCurrentTool}
          currentTool={currentTool}
          uploadVideo={this.upVideo}
          openVideo={this.fetchVideos}
          toggleModal={toggleModalDialog}
        />
        <div className="wrapper">
          <div className="tracker-screen">
            <Toolbox />
            <Tracker />
          </div>
          <Windows />
        </div>
        <FileInfo />
        { hasLoading && <Overlay />}
      </HomePageWrapper>
    );
  }
}

HomePage.propTypes = {
  HomePage: PropTypes.object.isRequired,
  toggleModalDialog: PropTypes.func.isRequired,
  setListFile: PropTypes.func.isRequired,
  toggleLoading: PropTypes.func.isRequired,
  changeVideoLink: PropTypes.func.isRequired,
  changeCurrentTool: PropTypes.func.isRequired,
  currentTool: PropTypes.string.isRequired,
  Toolbox: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  HomePage: makeSelectObjectsHomePage(),
  currentTool: selectCurrentTool(),
  Toolbox: makeSelectToolbox(),
  FileInfo: makeSelectFileInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeCurrentTool: (name) => dispatch(changeTool(name)),
    uploadSuccessFile: (url) => dispatch(uploadSuccess(url)),
    uploadFailFile: (error) => dispatch(uploadFail(error)),
    toggleModalDialog: (name) => dispatch(toggleModal(name)),
    setListFile: (files) => dispatch(listFile(files)),
    changeVideoLink: (link) => dispatch(changeVideo(link)),
    toggleLoading: () => dispatch(setLoading()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
