import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Controller, useFormContext } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';


type RHFTextInputProps = {
    name: string;
    inputLabel?: string;
    inputTitle?: string;
    errors?: any
};

const RHFImagePicker2 = ({ name, errors, inputLabel, inputTitle = 'Upload your files here' }: RHFTextInputProps) => {
    const { control } = useFormContext();
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async (onChange: (uri: string) => void) => {
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
            base64: true
        });

        if (!result.canceled) {
            const base64Image = `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`;
            setImage(result.assets[0].uri); // Keep URI for preview
            onChange(base64Image); // Pass base64 string to form
        }
    };

    return (
        <View style={styles.container}>
            {inputLabel && <Text style={styles.label}>{inputLabel}</Text>}
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => {
                    return (
                        <Pressable onPress={() => pickImage(onChange)} style={[styles.uploadBox, errors && errors[name] && styles.uploadBoxError]}>
                            {image ? (
                                <Image source={{ uri: image }} style={styles.imagePreview} />
                            ) : (
                                <View style={styles.placeholder}>
                                    <Text style={styles.icon}><Feather name="upload-cloud" size={35} color="black" /></Text>
                                    <Text style={styles.text}>{inputTitle}</Text>
                                    <Text style={styles.browse}>Browse</Text>
                                </View>
                            )}
                        </Pressable>
                    )
                }}
            />
            {errors && errors[name] && <Text style={styles.errorText}>{errors[name]?.message as string}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        color: '#4A5568',
        marginBottom: 10,
    },
    uploadBox: {
        width: Dimensions.get('window').width * 0.9,
        height: 150,
        borderWidth: 2,
        borderColor: '#A0AEC0',
        borderStyle: 'dashed',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E2E8F0',
    },
    uploadBoxError: {
        width: Dimensions.get('window').width * 0.9,
        height: 150,
        borderWidth: 2,
        borderColor: '#EF4444',
        borderStyle: 'dashed',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E2E8F0',
    },
    placeholder: {
        alignItems: 'center',
    },
    icon: {
        fontSize: 40,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        color: '#4A5568',
    },
    browse: {
        fontSize: 16,
        color: '#3182CE',
        textDecorationLine: 'underline',
    },
    imagePreview: {
        width: '95%',
        height: '90%',
        borderRadius: 10,
        objectFit: 'cover',
    },
    errorText: {
        color: '#EF4444',
        fontSize: 12,
        marginTop: 4,
    },
});

export default RHFImagePicker2;