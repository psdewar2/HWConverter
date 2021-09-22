import React from 'react';
import {act, fireEvent, render} from '@testing-library/react-native';
import {App, STORAGE_KEY} from '../App';
import {Label, Unit} from '../Types';
import {inToM, kgToLb, lbToKg, mToFtIn} from '../calculations';
import AsyncStorage from '@react-native-community/async-storage';
import {initialScreenState} from '../Reducer';

describe('App', () => {
  // Arrange
  const component = <App />;

  it('renders without crashing', async () => {
    // Act
    const rendererJson = render(component).toJSON();
    // Assert
    expect(rendererJson).toMatchSnapshot();
  });

  it('displays imperial units', () => {
    // Arrange
    const {getByText, queryByText} = render(component);
    // Act
    fireEvent.press(getByText(Unit.imperial));
    // Assert
    expect(getByText(Label.feet)).toBeTruthy();
    expect(queryByText(Label.meters)).toBeNull();
  });

  it('displays metric units', () => {
    // Arrange
    const {getByText, queryByText} = render(component);
    // Act
    fireEvent.press(getByText(Unit.metric));
    // Assert
    expect(getByText(Label.kilograms)).toBeTruthy();
    expect(queryByText(Label.pounds)).toBeNull();
  });

  it('converts feet to meters', () => {
    // Arrange
    const feet = 6;
    const {getByDisplayValue, getByText, getAllByPlaceholderText} =
      render(component);
    // Act
    fireEvent.changeText(getAllByPlaceholderText('0')[0], feet);
    fireEvent.press(getByText(Unit.metric));
    // Assert
    expect(getByDisplayValue(inToM(feet * 12).toString())).toBeTruthy();
  });

  it('converts inches to meters', () => {
    // Arrange
    const inches = 6;
    const {getByDisplayValue, getByText, getAllByPlaceholderText} =
      render(component);
    // Act
    fireEvent.changeText(getAllByPlaceholderText('0')[1], inches);
    fireEvent.press(getByText(Unit.metric));
    // Assert
    expect(getByDisplayValue(inToM(inches).toString())).toBeTruthy();
  });

  it('converts pounds to kilograms', () => {
    // Arrange
    const pounds = 100;
    const {getByDisplayValue, getByText, getAllByPlaceholderText} =
      render(component);
    // Act
    fireEvent.changeText(getAllByPlaceholderText('0')[2], pounds);
    fireEvent.press(getByText(Unit.metric));
    // Assert
    expect(getByDisplayValue(lbToKg(pounds).toString())).toBeTruthy();
  });

  it('converts meters to feet-inches', () => {
    // Arrange
    const meters = 1.5;
    const {getByDisplayValue, getByText, getAllByPlaceholderText} =
      render(component);
    // Act
    fireEvent.press(getByText(Unit.metric));
    fireEvent.changeText(getAllByPlaceholderText('0')[0], meters);
    fireEvent.press(getByText(Unit.imperial));
    // Assert
    const [feet, inches] = mToFtIn(meters);
    expect(getByDisplayValue(feet.toString())).toBeTruthy();
    expect(getByDisplayValue(inches.toString())).toBeTruthy();
  });

  it('converts kilograms to pounds', () => {
    // Arrange
    const kilograms = 100;
    const {getByDisplayValue, getByText, getAllByPlaceholderText} =
      render(component);
    // Act
    fireEvent.press(getByText(Unit.metric));
    fireEvent.changeText(getAllByPlaceholderText('0')[1], kilograms);
    fireEvent.press(getByText(Unit.imperial));
    // Assert
    expect(getByDisplayValue(kgToLb(kilograms).toString())).toBeTruthy();
  });

  it('saves data to local storage', () => {
    // Arrange
    const feet = 5;
    const {getAllByPlaceholderText, getByText} = render(component);
    // Act
    fireEvent.changeText(getAllByPlaceholderText('0')[0], feet);
    fireEvent.press(getByText('Save'));
    // Assert
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      JSON.stringify({
        ...initialScreenState,
        feet,
        meters: inToM(feet * 12),
      }),
    );
  });

  it('clears data from screen and local storage', async () => {
    // Arrange
    const pounds = 100;
    const {getAllByPlaceholderText, getByText} = render(component);
    // Act, Assert
    fireEvent.changeText(getAllByPlaceholderText('0')[2], pounds);
    await act(async () => await fireEvent.press(getByText('Save')));
    await act(async () => await fireEvent.press(getByText('Clear')));
    // Assert
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEY);
  });
});
