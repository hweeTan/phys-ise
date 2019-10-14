import { createSelector } from 'reselect';

const selectWindowsDomain = () => (state) => state.get('windows');

const makeSelectWindows = () => createSelector(
  selectWindowsDomain(),
  (substate) => substate.toJS()
);

export default makeSelectWindows;
export {
  selectWindowsDomain,
};
