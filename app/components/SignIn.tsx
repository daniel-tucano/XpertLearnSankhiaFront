import React from 'react';
import {Formik, useFormik} from 'formik';
import { Button, TextInput, View } from 'react-native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import FloatTextInput from './forms/FloatTextInput';

function SignIn(props) {
    const initialValues = {
           Nome:'',
           Sobrenome:'',
           "Nome de Usuário":'',
           "Data de Nascimento":new Date,
           Email:'',
           Senha:'',
           "Confirmar Senha":""
       }
    return (
        <Formik initialValues={initialValues} 
        onSubmit={values=>console.log(values) }>
            {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
                <FloatTextInput
                onChangeTextValue={handleChange('Nome')}
                onBlur={handleBlur('Nome')}
                value={values.Nome}
                />
                <FloatTextInput
                onChangeTextValue={handleChange('Sobrenome')}
                onBlur={handleBlur('Sobrenome')}
                value={values.Sobrenome}
                />
                <FloatTextInput
                onChangeTextValue={handleChange('Email')}
                onBlur={handleBlur('Email')}
                value={values.Email}
                />
            </View>
            )}
        </Formik>
    );
}

export default SignIn;