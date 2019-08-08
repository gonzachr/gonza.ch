export const SET_VIEW = "SET_VIEW";

export const setView = payload => ({
  type: SET_VIEW,
  payload
});

export const VIEW_HOME = "VIEW_HOME";
export const VIEW_ABOUT_ME = "VIEW_ABOUT_ME";
export const VIEW_CONTACT = "VIEW_CONTACT";

export const Views = { VIEW_HOME, VIEW_ABOUT_ME, VIEW_CONTACT };
