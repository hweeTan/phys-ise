import { createSelector } from 'reselect';

const selectFileInfoDomain = () => (state) => state.get('fileInfo');

const makeSelectFileInfo = () => createSelector(
  selectFileInfoDomain(),
  (substate) => substate.toJS()
);

export default makeSelectFileInfo;
export {
  selectFileInfoDomain,
};
