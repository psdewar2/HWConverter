import {inToM, kgToLb, lbToKg, mToFtIn} from './calculations';
import {ActionType, ScreenAction, ScreenState} from './Types';

export const initialScreenState: ScreenState = {
  imperialOn: true,
  feet: 0,
  inches: 0,
  pounds: 0,
  meters: 0,
  kilograms: 0,
};

export function reducer(state: ScreenState, action: ScreenAction) {
  switch (action.type) {
    case ActionType.ClearState:
      return initialScreenState;
    case ActionType.SaveState:
      return action.payload;
    case ActionType.SetImperialOn:
      return {
        ...state,
        imperialOn: action.payload,
      };
    case ActionType.ConvertToFeetInches: {
      const meters = action.payload;
      const [feet, inches] = mToFtIn(meters);
      return {
        ...state,
        feet,
        inches,
        meters,
      };
    }
    case ActionType.ConvertToKilograms: {
      const pounds = action.payload;
      const kilograms = lbToKg(pounds);
      return {...state, pounds, kilograms};
    }
    case ActionType.ConvertFeetToMeters: {
      const feet = action.payload;
      const meters = inToM(feet * 12 + state.inches);
      return {
        ...state,
        feet,
        meters,
      };
    }
    case ActionType.ConvertInchesToMeters: {
      const inches = action.payload;
      const meters = inToM(state.feet * 12 + inches);
      return {
        ...state,
        inches,
        meters,
      };
    }
    case ActionType.ConvertToPounds: {
      const kilograms = action.payload;
      const pounds = kgToLb(kilograms);
      return {
        ...state,
        pounds,
        kilograms,
      };
    }
  }
}
