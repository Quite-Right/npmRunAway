import React, {ReactNode} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import ModalCustom from '../modalCustom/modalCustom';
import Hyperlink from 'react-native-hyperlink';
import RegularCard from '../regularCard/regularCard';
import { fields, VTBblue } from "../../constants";

export interface IAlertModalProptypes {
  id: number;
  text: string;
  children?: ReactNode | ReactNode[];
  buttonText?: string;
  onClose?: () => void;
}

const CardModal = ({
  id,
  text,
  children,
  buttonText,
  onClose,
}: IAlertModalProptypes) => {
  const cardData: any = fields.find(field => id === field.id);
  return (
    <ModalCustom>
      <View style={styles.alert}>
        <RegularCard
          id={id}
          {...cardData}
          rotationType={undefined}
          big={true}
        />
        <Hyperlink linkDefault={true} linkStyle={{color: VTBblue}}>
          <Text style={styles.alertText}>{text}</Text>
        </Hyperlink>
        {children}
        {onClose && <Button title={buttonText || 'Ок'} onPress={onClose} />}
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: {
    marginTop: 8,
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

export default CardModal;
