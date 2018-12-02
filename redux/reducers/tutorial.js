import { PURGE } from 'redux-persist';

export const SHOW_TUTORIAL = 'tutorial/SHOW';

const initialState = {
  tutorial: {
    appIntro: false,
    homeIntro: false,
    searchIntro: false,
    completedIntro: false,
    taskOverviewIntro: false,
    taskRecodingIntro: false,
    remindersIntro: false,
    firstTaskCompletedIntro: false,
    rateApp: false,
    settingsIntro: false // TODO talk about FAQ/Help section. Maybe put (?) icon in top right of home for help page?
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_TUTORIAL:
      const newState = { ...state };
      newState.tutorial[action.payload.tutorialType] = true;
      return newState;
    case PURGE:
      return initialState;
    default:
      return state;
  }
}

export function showTutorial(tutorial) {
  return {
    type: SHOW_TUTORIAL,
    payload: {
      tutorialType: tutorial.type
    }
  };
}
