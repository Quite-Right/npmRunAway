import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import ModalCustom from '../modalCustom/modalCustom';
import Hyperlink from 'react-native-hyperlink';
import { VTBblue } from "../../constants";

export interface IAlertModalProptypes {
  text: string;
  onPress: () => void;
  buttonText?: string;
  link?: string;
}

const AlertModal = ({text, buttonText, onPress}: IAlertModalProptypes) => {
  return (
    <ModalCustom>
      <View style={styles.alert}>
        <Hyperlink linkDefault={true} linkStyle={{color: VTBblue}}>
          <Text style={styles.alertText}>{text}</Text>
        </Hyperlink>
        <Button title={buttonText || 'Ок'} onPress={onPress} />
      </View>
    </ModalCustom>
  );
};

const styles = StyleSheet.create({
  alert: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '90%',
  },
  alertText: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
  },
  textContainer: {
    flexWrap: 'wrap',
    display: 'flex',
    flexDirection: 'row',
  },
});

export default AlertModal;
