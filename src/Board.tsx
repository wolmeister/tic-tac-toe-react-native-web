import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BoardItem from './BoardItem';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  caption: {
    fontSize: 40,
    color: '#d4e0c0',
    marginBottom: 15,
  },
  subcaption: {
    fontSize: 20,
    color: '#d4e0c0',
    marginBottom: 50,
  },
  board: {
    marginBottom: 50,
  },
  row: {
    flexDirection: 'row',
  },
});

const winConditions = [
  // by row
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // by column
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // by diagonal
  [0, 4, 8],
  [2, 4, 6],
];

enum GameState {
  O_TURN,
  X_TURN,
  O_WIN,
  X_WIN,
  TIE,
}

function Board() {
  const [gameState, setGameState] = useState(GameState.O_TURN);
  const [caption, setCaption] = useState('');
  const [subcaption, setSubcaption] = useState('\u200b');
  const [selecteds, setSelecteds] = useState<(null | 'X' | 'O')[]>(
    Array.from({ length: 9 }).map(() => null)
  );

  useEffect(() => {
    for (const winCondition of winConditions) {
      const value = winCondition
        .map((index) => selecteds[index])
        .filter((selected) => !!selected);

      if (value.length === 3) {
        if (value.every((selected) => value[0] === selected)) {
          setGameState(value[0] === 'O' ? GameState.O_WIN : GameState.X_WIN);
          return;
        }
      }
    }

    if (selecteds.filter((selected) => !!selected).length === 9) {
      setGameState(GameState.TIE);
    }
  }, [selecteds]);

  useEffect(() => {
    switch (gameState) {
      case GameState.O_TURN:
        setCaption('Your turn, player O!');
        setSubcaption('\u200b');
        break;
      case GameState.X_TURN:
        setCaption('Your turn, player X!');
        setSubcaption('\u200b');
        break;
      case GameState.O_WIN:
        setCaption('Player O wins!');
        setSubcaption('Click on the board to start again');
        break;
      case GameState.X_WIN:
        setCaption('Player X wins!');
        setSubcaption('Click on the board to start again');
        break;
      case GameState.TIE:
        setCaption('Tie!');
        setSubcaption('Click on the board to start again');
        break;
    }
  }, [gameState]);

  function onPressItem(index: number) {
    if (
      gameState === GameState.O_WIN ||
      gameState === GameState.X_WIN ||
      gameState === GameState.TIE
    ) {
      setSelecteds(Array.from({ length: 9 }).map(() => null));
      setGameState(GameState.O_TURN);
      return;
    }

    if (selecteds[index]) {
      return;
    }

    const symbol = gameState === GameState.O_TURN ? 'O' : 'X';
    const newSelecteds = [...selecteds];
    newSelecteds[index] = symbol;
    setSelecteds(newSelecteds);
    setGameState(gameState === GameState.O_TURN ? GameState.X_TURN : GameState.O_TURN);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.caption}>{caption}</Text>
      <Text style={styles.subcaption}>{subcaption}</Text>
      <View style={styles.board}>
        <View style={styles.row}>
          <BoardItem
            row={0}
            col={0}
            selected={selecteds[0]}
            onPress={() => {
              onPressItem(0);
            }}
          />
          <BoardItem
            row={0}
            col={1}
            selected={selecteds[1]}
            onPress={() => {
              onPressItem(1);
            }}
          />
          <BoardItem
            row={0}
            col={2}
            selected={selecteds[2]}
            onPress={() => {
              onPressItem(2);
            }}
          />
        </View>
        <View style={styles.row}>
          <BoardItem
            row={1}
            col={0}
            selected={selecteds[3]}
            onPress={() => {
              onPressItem(3);
            }}
          />
          <BoardItem
            row={1}
            col={1}
            selected={selecteds[4]}
            onPress={() => {
              onPressItem(4);
            }}
          />
          <BoardItem
            row={1}
            col={2}
            selected={selecteds[5]}
            onPress={() => {
              onPressItem(5);
            }}
          />
        </View>
        <View style={styles.row}>
          <BoardItem
            row={2}
            col={0}
            selected={selecteds[6]}
            onPress={() => {
              onPressItem(6);
            }}
          />
          <BoardItem
            row={2}
            col={1}
            selected={selecteds[7]}
            onPress={() => {
              onPressItem(7);
            }}
          />
          <BoardItem
            row={2}
            col={2}
            selected={selecteds[8]}
            onPress={() => {
              onPressItem(8);
            }}
          />
        </View>
      </View>
    </View>
  );
}

export default Board;
