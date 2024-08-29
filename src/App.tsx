
import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { currencyByRupee } from './constants'; // Constants
import CurrencyButton from './components/CurrencyButton'; // Component
import Snackbar from 'react-native-snackbar'; // Snackbar for notifications

function App(): React.JSX.Element {
  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');

  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: "Enter a value to convert",
        backgroundColor: "#EA7773",
        textColor: "#000000",
      });
    }

    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value;
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)}`;
      setResultValue(result);
      setTargetCurrency(targetValue.name);
    } else {
      return Snackbar.show({
        text: "Not a valid number to convert",
        backgroundColor: "#F4BE2C",
        textColor: "#000000",
      });
    }
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.rupee}>₹</Text>
          <TextInput
            style={styles.inputAmountField}
            maxLength={14}
            value={inputValue}
            clearButtonMode="always" //only for IOS
            onChangeText={setInputValue}
            keyboardType="number-pad"
            placeholder="Enter amount in Rupees"
          />
        </View>

        {resultValue ? (
          <Text style={styles.resultTxt}>{resultValue}</Text>
        ) : null}

        <View style={styles.bottomContainer}>
          <FlatList
            numColumns={3}
            data={currencyByRupee}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.button,
                  targetCurrency === item.name && styles.selected,
                ]}
                onPress={() => buttonPressed(item)} // Corrected the function call
              >
                <CurrencyButton {...item} />
              </Pressable>
            )}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  resultTxt: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '800',
    textAlign: 'center',
    backgroundColor:"#000000",
    marginBottom:40
  },
  rupee: {
    fontSize: 38,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  inputAmountField: {
    height: 40,
    width: 300,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,
    margin: 12,

    height: 60,
    borderRadius: 12,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selected: {
    backgroundColor: '#ffeaa7',
  },
});

export default App;
