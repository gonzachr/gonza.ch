import { SET_VIEW, TOGGLE_VIEW, Views } from "./actions";

const { VIEW_HOME } = Views;

const currentView = (state = VIEW_HOME, action) => {
  switch (action.type) {
    case SET_VIEW:
      const { currentView, newView } = action.payload;
      const newState = currentView === newView ? VIEW_HOME : newView;
      return newState;

    default:
      return state;
  }
};

export default currentView;
