/**
 * Project by Peyt Spencer Dewar
 */

import AsyncStorage from '@react-native-community/async-storage';
import React, {useEffect, useReducer} from 'react';
import {
  Button,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Measurement} from './Measurement';
import {initialScreenState, reducer} from './Reducer';
import {ActionType, Label, Unit} from './Types';

export const STORAGE_KEY = 'converter';

export function App() {
  const [screenState, dispatch] = useReducer(reducer, initialScreenState);
  const {imperialOn, feet, inches, pounds, meters, kilograms} = screenState;

  useEffect(() => {
    async function getConverterState() {
      const state = await AsyncStorage.getItem(STORAGE_KEY);
      if (state) {
        dispatch({type: ActionType.SaveState, payload: JSON.parse(state)});
      }
    }

    getConverterState();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.primaryContainer}>
          <Text style={styles.primaryText}>HW Converter</Text>
          <View style={styles.buttonView}>
            <Pressable
              accessibilityLabel={'Imperial button'}
              onPress={() =>
                dispatch({type: ActionType.SetImperialOn, payload: true})
              }
              style={[
                styles.button,
                {backgroundColor: imperialOn ? 'lightgray' : 'white'},
              ]}>
              <Text
                style={{
                  fontWeight: imperialOn ? '600' : '200',
                  fontSize: 24,
                }}>
                {Unit.imperial}
              </Text>
            </Pressable>
            <Pressable
              accessibilityLabel={'Metric button'}
              onPress={() =>
                dispatch({type: ActionType.SetImperialOn, payload: false})
              }
              style={[
                styles.button,
                {backgroundColor: !imperialOn ? 'lightgray' : 'white'},
              ]}>
              <Text
                style={{
                  fontWeight: !imperialOn ? '600' : '200',
                  fontSize: 24,
                }}>
                {Unit.metric}
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.secondaryContainer}>
          <Text style={styles.secondaryText}>Measurements</Text>
          <View style={styles.quantityView}>
            <Text style={styles.quantityName}>Height</Text>
            <View style={styles.measurementsView}>
              {imperialOn ? (
                <>
                  <Measurement
                    label={Label.feet}
                    value={feet}
                    onChangeValue={val =>
                      dispatch({
                        type: ActionType.ConvertFeetToMeters,
                        payload: Number(val),
                      })
                    }
                  />
                  <Measurement
                    label={Label.inches}
                    value={inches}
                    onChangeValue={val =>
                      dispatch({
                        type: ActionType.ConvertInchesToMeters,
                        payload: Number(val),
                      })
                    }
                  />
                </>
              ) : (
                <Measurement
                  label={Label.meters}
                  value={meters}
                  onChangeValue={val =>
                    dispatch({
                      type: ActionType.ConvertToFeetInches,
                      payload: Number(val),
                    })
                  }
                />
              )}
            </View>
            <Text style={styles.quantityName}>Weight</Text>
            <View style={styles.measurementsView}>
              {imperialOn ? (
                <Measurement
                  label={Label.pounds}
                  value={pounds}
                  onChangeValue={val =>
                    dispatch({
                      type: ActionType.ConvertToKilograms,
                      payload: Number(val),
                    })
                  }
                />
              ) : (
                <Measurement
                  label={Label.kilograms}
                  value={kilograms}
                  onChangeValue={val =>
                    dispatch({
                      type: ActionType.ConvertToPounds,
                      payload: Number(val),
                    })
                  }
                />
              )}
            </View>
          </View>
          <View style={styles.buttonView}>
            <Button
              title={'Save'}
              onPress={() =>
                AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(screenState))
              }
            />
            <Button
              title={'Clear'}
              onPress={() => {
                dispatch({type: ActionType.ClearState});
                AsyncStorage.removeItem(STORAGE_KEY);
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  primaryContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  primaryText: {
    fontSize: 40,
    fontWeight: '600',
  },
  secondaryContainer: {
    paddingHorizontal: 24,
  },
  secondaryText: {
    fontSize: 32,
    fontWeight: '600',
  },
  buttonView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
  button: {
    alignItems: 'center',
    borderRadius: 4,
    elevation: 3,
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
  },
  quantityName: {
    fontSize: 24,
    fontWeight: '200',
  },
  quantityView: {
    marginVertical: 16,
  },
  measurementsView: {
    flexDirection: 'row',
  },
});
