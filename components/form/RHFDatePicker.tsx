import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, { Fragment } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Platform, Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type RHFTextInputProps = {
    name: string;
    inputLabel?: string;
    errors?: any;
} & TextInputProps;

const RHFDatePicker = ({name, inputLabel, errors, ...otherProps}: RHFTextInputProps) => {
    const {control, getValues} = useFormContext();
    const [showDatePicker, setShowDatePicker] = React.useState(false);

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    }   

    return (
        <View style={styles.inputContainer}>
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => {

                    const formattedDate = moment(value, "DD-MM-YYYY").toISOString();
                    const dateFormated = moment(formattedDate).format("DD-MM-YYYY")
                    
                    return (
                        <Fragment>
                            <Text style={{marginBottom: 5}}>{inputLabel}</Text>
                            <Pressable onPress={toggleDatePicker} style={styles.dateInputWrapper}>
                                <MaterialIcons name="date-range" size={24} color="black" style={styles.dateIcon} />
                                <TextInput
                                    value={dateFormated}
                                    style={[styles.input, errors && errors[name] && styles.errorInput]}
                                    keyboardType="ascii-capable"
                                    {...otherProps}
                                    editable={false}
                                />
                            </Pressable>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode="date"
                                    display="spinner"
                                    onChange={(event, selectedDate) => {
                                        if (event.type === 'set') {
                                            onChange(selectedDate);
                                            if(Platform.OS === 'android') {
                                                toggleDatePicker();
                                            }
                                        }else{
                                            toggleDatePicker();
                                        }
                                    }}
                                />
                            )}
                            {errors && errors[name] && <Text style={{ color: 'red' }}>{errors[name].message}</Text>}
                        </Fragment>
                    );}}
            
            />
        </View>
    )
}

export default RHFDatePicker

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 15,
    },
    dateInputWrapper:{
        position: 'relative',
    },
    dateIcon: {
        zIndex: 100,
        position: 'absolute',
        top: '50%',
        right: 0,
        transform: [{translateY: '-50%'}, {translateX: '-50%'}]
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
        marginBottom:5
    },
        errorInput: {
        borderColor: '#EF4444',
    },
})