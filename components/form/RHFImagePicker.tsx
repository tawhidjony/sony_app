import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { Fragment, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Image, Pressable, StyleSheet, Text, TextInputProps, View } from 'react-native';

type RHFTextInputProps = {
    name: string;
    inputLabel?: string;
    errors?: any
} & TextInputProps;

const RHFImagePicker = ({ name, errors, inputLabel }: RHFTextInputProps) => {
    const { control } = useFormContext();
    const [image, setImage] = useState<string | null>("https://placehold.co/250x150");

    const pickAsyncImage = async (onChange: (uri: string) => void) => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri); // For UI display
            onChange(uri); // Update form state
        }
    };

    return (
        <View style={styles.inputContainer}>
            {inputLabel && <Text style={styles.label}>{inputLabel}</Text>}
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, ref } }) => (
                    <Fragment>
                        <Pressable onPress={() => pickAsyncImage(onChange)} style={styles.dateInputWrapper}>
                            <FontAwesome name="file-picture-o" size={24} color="black" style={styles.dateIcon} />
                            <Text style={[styles.input, errors && errors[name] && styles.errorInput]}>
                                {image ? 'Change image' : 'Choose image'}
                            </Text>
                        </Pressable>

                        <View style={styles.visaImageContainer}>
                            <Image source={{ uri: image?.toString() }} style={styles.avatar} />
                        </View>
                        {errors && errors[name] && <Text style={styles.errorText}>{errors[name]?.message as string}</Text>}
                    </Fragment>
                )}
            />
        </View>
    );
};

export default RHFImagePicker;

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        color: '#374151',
        marginBottom: 4,
    },
    visaImageContainer: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 16,
        padding: 5,
        margin: 16,
    },
    avatar: {
        width: '100%',
        height: 100,
        marginBottom: 10,
    },
    inputContainer: {
        marginBottom: 15,
    },
    dateInputWrapper: {
        position: 'relative',
    },
    dateIcon: {
        zIndex: 100,
        position: 'absolute',
        top: '50%',
        right: 16,
        transform: [{ translateY: -12 }],
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
        marginBottom: 5,
        textAlignVertical: 'center',
    },
    errorInput: {
        borderColor: '#EF4444',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 4,
    },
});
