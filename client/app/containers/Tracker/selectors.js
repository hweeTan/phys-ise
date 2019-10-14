import { createSelector } from 'reselect';

const selectTrackerDomain = () => (state) => state.get('tracker');

const selectFrameRate = () => (state) => state.getIn(['tracker', 'frameRate']);

const selectAnalyzeMode = () => (state) => state.getIn(['tracker', 'analyzeMode']);

const selectStartEnd = () => (state) => ({
  start: state.getIn(['tracker', 'start']),
  end: state.getIn(['tracker', 'end']),
});

const makeSelectTracker = () => createSelector(
  selectTrackerDomain(),
  (substate) => substate.toJS()
);

export default makeSelectTracker;
export {
  selectTrackerDomain,
  selectFrameRate,
  selectStartEnd,
  selectAnalyzeMode,
};
