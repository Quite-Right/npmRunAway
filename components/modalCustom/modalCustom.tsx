import React, {Dispatch, ReactNode, SetStateAction} from 'react';
import {View, Modal, StyleSheet} from 'react-native';

interface Props {
  onRequestClose?: Dispatch<SetStateAction<any>>;
  children: ReactNode;
  buttonText?: string;
  animationType?: 'none' | 'slide' | 'fade' | undefined;
  modalStyle?: any;
  backgroundColor?: string;
}

const ModalCustom = ({
  animationType = 'slide',
  children,
  backgroundColor = 'rgba(52, 52, 52, 0.8)',
}: Props) => {
  return (
    <Modal visible={true} transparent={true} animationType={animationType}>
      <View style={[styles.modal, {backgroundColor: backgroundColor}]}>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalCustom;
