import { combineReducers } from "redux";
import {
  SET_VIEW,
  Views,
  SET_SPRING_REF,
  SET_TRANS_REF,
  TOGGLE_LOADING
} from "./actions";
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

const currentRef = (state = {}, action) => {
  switch (action.type) {
    case SET_SPRING_REF:
      return { ...state, springRef: action.ref };
    case SET_TRANS_REF:
      return { ...state, transRef: action.ref };
    default:
      return state;
  }
};

const loadingStatus = (state = true, action) => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return !state;

    default:
      return state;
  }
};

export default combineReducers({
  currentView,
  currentRef,
  loadingStatus
});
