export const SET_VIEW = "SET_VIEW";
export const SET_SPRING_REF = "SET_SPRING_REF";
export const SET_TRANS_REF = "SET_TRANS_REF";
export const TOGGLE_LOADING = "TOGGLE_LOADING";

export const setView = payload => ({
  type: SET_VIEW,
  payload
});

export const setSpringRef = ref => ({
  type: SET_SPRING_REF,
  ref
});

export const setTransRef = ref => ({
  type: SET_TRANS_REF,
  ref
});

export const toggleLoading = status => ({
  type: TOGGLE_LOADING,
  status
});

export const VIEW_HOME = "VIEW_HOME";
export const VIEW_ABOUT_ME = "VIEW_ABOUT_ME";
export const VIEW_CONTACT = "VIEW_CONTACT";

export const Views = { VIEW_HOME, VIEW_ABOUT_ME, VIEW_CONTACT };
