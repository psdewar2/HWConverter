import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import {Label} from './Types';

export type MeasurementProps = {
  label: Label;
  value: number;
  onChangeValue: TextInputProps['onChangeText'];
};

export function Measurement({label, value, onChangeValue}: MeasurementProps) {
  return (
    <View style={styles.measurementView}>
      <TextInput
        defaultValue={value > 0 ? value.toString() : undefined}
        onChangeText={onChangeValue}
        keyboardType={'decimal-pad'}
        maxLength={10}
        placeholder={'0'}
        style={styles.measurementInput}
      />
      <Text style={styles.measurementText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  measurementView: {
    margin: 8,
    flexShrink: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
  },
  measurementInput: {
    fontSize: 64,
  },
  measurementText: {
    fontSize: 48,
    fontWeight: '300',
    marginLeft: 8,
  },
});
