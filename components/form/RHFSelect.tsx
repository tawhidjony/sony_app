import { StyleSheet, Text, View } from "react-native"
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Controller, useFormContext } from "react-hook-form";

type RHFSelectProps = {
    name: string;
    errors?: any
    inputLabel?: string;
    placeholder?: string;
    options: string[];
}

const RHFSelect = ({ name, errors, inputLabel, placeholder, options }: RHFSelectProps) => {
    const { control } = useFormContext();

    return (
        <View style={styles.inputSelectContainer}>
            {inputLabel && <Text style={styles.label}>{inputLabel}</Text>}
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <View style={[
                        styles.inputSelect,
                        errors && errors[name] && styles.errorInput
                    ]}>
                        <Picker
                            selectedValue={value || placeholder}
                            onValueChange={(itemValue) => onChange(itemValue)}
                            style={{ width: '100%', height: '100%' }}
                        >
                            <Picker.Item key={0} label={placeholder} value={''} />
                            {options.map((option, index) => (
                                <Picker.Item key={index + 1} label={option} value={option} />
                            ))}
                        </Picker>
                    </View>
                )}
            />
            {errors && errors[name] && <Text style={styles.errorText}>{errors[name]?.message as string}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    inputSelectContainer: {
        marginBottom: 16,
    },
    inputSelect: {
        width: '100%',
        height: 55,
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 16,
        color: '#1F2937',
        backgroundColor: '#FFFFFF',
    },
    errorInput: {
        borderColor: '#EF4444',
    },
    label: {
        fontSize: 16,
        color: '#4A5568',
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
})

export default RHFSelect;