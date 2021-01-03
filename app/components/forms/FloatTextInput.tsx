import React, { Component } from 'react';
import { View } from 'react-native';
import FloatLabelTextInput from 'react-native-floating-label-text-input';


function FloatTextInput(props) {
    return (
      <View>
        <FloatLabelTextInput
          placeholder={props.placeholder}
          onFocus={props.onfocus}
          onBlur={props.onblur}
          secureTextEntry={props.secureTextEntry}
          onChangeTextValue={props.onChangeTextValue}
        />
      </View>
    );
}
export default FloatTextInput