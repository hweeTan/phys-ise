import { createSelector } from 'reselect';

const selectHomePage = () => (state) => state.get('homePage');

const makeSelectObjectsHomePage = () => createSelector(
  selectHomePage(),
  (substate) => substate.toJS()
);

export default makeSelectObjectsHomePage;
