import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';

// @TODO: Cursor: pointer ?
const styles = StyleSheet.create({
  item: {
    borderColor: '#488d91',
    borderStyle: 'solid',
    width: 75,
    height: 75,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#d4e0c0',
    fontSize: 23,
    fontFamily: 'sans-serif',
  },
  'item-0_0': {},
  'item-0_1': {
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  'item-0_2': {},
  'item-1_0': {
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  'item-1_1': {
    borderWidth: 2,
  },
  'item-1_2': {
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  'item-2_0': {},
  'item-2_1': {
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },
  'item-2_2': {},
});

type BoardItemProps = {
  row: 0 | 1 | 2;
  col: 0 | 1 | 2;
  selected: 'X' | 'O' | null;
  onPress(): void;
};

function getStyle(row: 0 | 1 | 2, col: 0 | 1 | 2) {
  const key = `item-${row}_${col}`;
  return (styles as any)[key];
}

function BoardItem({ row, col, selected, onPress }: BoardItemProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.item, getStyle(row, col)]}>
        {selected && (
          <Text style={styles.text} selectable={false}>
            {selected}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default BoardItem;
