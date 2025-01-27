import React, { Fragment } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type RHFTextInputProps = {
    name: string;
    inputLabel?: string;
    errors?: any;
} & TextInputProps;

const RHFTextInput = ({ name, inputLabel, errors, ...otherProps }: RHFTextInputProps) => {
    const { control } = useFormContext();
    return (
        <View style={styles.inputContainer}>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value }, formState: { errors } }) => {
                    return (
                        <Fragment>
                            {inputLabel && <Text style={{ marginBottom: 5 }}>{inputLabel}</Text>}
                            <TextInput
                                style={[styles.input, errors && errors[name] && styles.errorInput]}
                                keyboardType="ascii-capable"
                                onChangeText={onChange}
                                value={value}
                                {...otherProps}
                            />
                        </Fragment>
                    );
                }}
            />
            {errors && errors[name] && <Text style={styles.errorText}>{errors[name]?.message as string}</Text>}
        </View>
    )
}

export default RHFTextInput

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#1F2937',
        backgroundColor: '#FFFFFF',
        marginBottom: 5
    },
    errorInput: {
        borderColor: '#EF4444',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
})