import { userProfile, userProfileUpdate } from '@/Api/user';
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

const editProfileSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
    avatar: z.string().nullable(),
    gender: z.string().nullable(),
});

type EditProfileSchema = z.infer<typeof editProfileSchema>;

const EditUpdateProfileScreen = () => {
    const { token } = useAuthSession();

    const { data: profileData, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ['profile'],
        queryFn: () => userProfile(token?.current),
    });

    const mutation = useMutation({
        mutationKey: ['profileUpdate', profileData?.user?.id],
        mutationFn: userProfileUpdate,
    });

    const methods = useForm<EditProfileSchema>({
        mode: 'all',
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            name: '',
            avatar: '',
            gender: '',
        },
    });

    const onSubmit = async (formData: EditProfileSchema) => {
        try {
            await mutation.mutateAsync({
                id: profileData?.user?.id,
                body: {
                    name: formData.name,
                    avatar: formData.avatar,
                },
                token: token?.current,
            }).then((res) => {
               if (res) {
                ShowToastWithGravity('Profile updated successfully');
                router.back();
               }
            }).catch((error) => {
                console.error('Error updating profile:', error.response.data);
            });
            
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    useEffect(() => {
        if (profileData) {
            methods.reset(profileData.user);
        }
    }, [profileData]);


    if (isLoading || isFetching) {
        return (
            <View style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.7)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }]}>
                <ActivityIndicator size="large" color={Colors.light.tint} />
            </View>
        )
    }

    if (isError) {
        return <Text>{error?.message || 'An error occurred'}</Text>;
    }

 

   





    return (
        <ScrollView style={styles.container}>
            <FormProvider {...methods}>
                <View style={styles.info}>
                    <RHFImagePicker2
                        name="avatar"
                        inputLabel="Profile Picture"
                        inputTitle="Upload your profile picture"
                        errors={methods.formState.errors}
                    />

                    <RHFTextInput
                        name="name"
                        inputLabel="Name"
                        placeholder="Enter your name"
                        errors={methods.formState.errors}
                    />

                    <RHFSelect
                        name="gender"
                        inputLabel="Gender"
                        placeholder="Select your gender"
                        options={['Male', 'Female', 'Other']}
                        errors={methods.formState.errors}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={methods.handleSubmit(onSubmit)}>
                    {mutation.isPending ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Save Profile</Text>
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

export default EditUpdateProfileScreen;
