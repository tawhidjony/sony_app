import { userPasswordChange, userProfile, userProfileUpdate } from '@/Api/user';
import RHFImagePicker2 from '@/components/form/RHFImagePicker2';
import RHFSelect from '@/components/form/RHFSelect';
import RHFTextInput from '@/components/form/RHFTextInput';
import { ShowToastWithGravity } from '@/components/utils/HotToastNotification';
import { Colors } from '@/constants/Colors';
import { useAuthSession } from '@/providers/AuthProvider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

const passwordChangeSchema = z.object({
    currentPassword: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password must not exceed 50 characters'),
    newPassword: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(50, 'Password must not exceed 50 characters'),
        // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type PasswordChangeSchema = z.infer<typeof passwordChangeSchema>;

const PasswordChangeScreen = () => {
    const { token } = useAuthSession();

    const mutation = useMutation({
       mutationKey:["Password-Change"],
       mutationFn:userPasswordChange
    });

    const methods = useForm<PasswordChangeSchema>({
        mode: 'all',
        resolver: zodResolver(passwordChangeSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (formData: PasswordChangeSchema) => {
        try {
            let customFormData = {
                id:2,
                token:token?.current,
                body:{
                    current_password:formData?.currentPassword,
                    password:formData?.newPassword,
                    password_confirmation:formData?.confirmPassword,
                }

            }
            await mutation.mutateAsync(customFormData).then((res)=>{
                if (res?.status === 200) {
                    ShowToastWithGravity(res?.data?.message)
                    router.back()
                }
            }).catch((error)=>{
                console.log(error);
                
            })
        } catch (error) {
            console.error('Error updating password:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <FormProvider {...methods}>
                <View style={styles.info}>
                    <RHFTextInput
                        name="currentPassword"
                        inputLabel="Current Password"
                        placeholder="Enter your current password"
                        errors={methods.formState.errors}
                        secureTextEntry
                    />

                    <RHFTextInput
                        name="newPassword"
                        inputLabel="New Password"
                        placeholder="Enter your new password"
                        errors={methods.formState.errors}
                        secureTextEntry
                    />

                    <RHFTextInput
                        name="confirmPassword"
                        inputLabel="Confirm New Password"
                        placeholder="Confirm your new password"
                        errors={methods.formState.errors}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={methods.handleSubmit(onSubmit)}>
                    {mutation.isPending ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Change Password</Text>
                    )}
                </TouchableOpacity>
            </FormProvider>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: Colors.light.tint,
        padding: 20,
        alignItems: 'center',
        height: 200,
        borderBottomRightRadius: 60,
        borderBottomLeftRadius: 60,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    username: {
        color: '#fff',
        fontSize: 22,
    },
    info: {
        padding: 20,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    infoText: {
        marginLeft: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: Colors.light.tint,
        padding: 15,
        alignItems: 'center',
        margin: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default PasswordChangeScreen;
