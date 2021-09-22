// Converter interfaces
export enum Unit {
  imperial = 'imperial',
  metric = 'metric',
}

export enum Label {
  // height
  meters = 'm',
  feet = 'ft',
  inches = 'in',
  // weight
  kilograms = 'kg',
  pounds = 'lbs',
}

export type ImperialMeasurements = {
  feet: number;
  inches: number;
  pounds: number;
};

export type MetricMeasurements = {
  meters: number;
  kilograms: number;
};

// Reducer
export type ScreenState = {
  imperialOn: boolean; // if false, metric is on
} & ImperialMeasurements &
  MetricMeasurements;

export enum ActionType {
  ConvertToFeetInches = 'CONVERT_TO_FT_IN',
  ConvertFeetToMeters = 'CONVERT_FT_TO_M',
  ConvertInchesToMeters = 'CONVERT_IN_TO_M',
  ConvertToKilograms = 'CONVERT_TO_KG',
  ConvertToPounds = 'CONVERT_TO_LB',
  ClearState = 'CLEAR_STATE',
  SetImperialOn = 'SET_IMPERIAL_ON',
  SaveState = 'SAVE_STATE',
}

export type ScreenAction =
  | {type: ActionType.ClearState}
  | {type: ActionType.SetImperialOn; payload: boolean}
  | {type: ActionType.SaveState; payload: ScreenState}
  | {
      type:
        | ActionType.ConvertToFeetInches
        | ActionType.ConvertFeetToMeters
        | ActionType.ConvertInchesToMeters
        | ActionType.ConvertToKilograms
        | ActionType.ConvertToPounds;
      payload: number;
    };
