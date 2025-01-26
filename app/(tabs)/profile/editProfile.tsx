import { profile, profileUpdate } from '@/Api/homeApi';
import { userProfile } from '@/Api/profile';
import RHFDatePicker from '@/components/form/RHFDatePicker';
import RHFImagePicker from '@/components/form/RHFImagePicker';
import RHFTextInput from '@/components/form/RHFTextInput';
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
    name: z
        .string({ required_error: 'Name is required', invalid_type_error: 'Name must be a string' })
        .min(3, { message: 'Name must be at least 3 characters' }),
    
    avatar: z.string().nullable (),
});

type EditProfileSchema = z.infer<typeof editProfileSchema>;


const ProfileScreen = () => {

    const { token } = useAuthSession();

    const { data: profileData, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['profile'],
        queryFn: () => userProfile(token?.current)
    })

    const mutation = useMutation({
        mutationKey: ['profileUpdate'],
        mutationFn: profileUpdate
    })
    

    const methods = useForm<EditProfileSchema>({
        mode: 'all',
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            name:'',
            avatar: '',
        },
    });
    const onSubmit = (formData: EditProfileSchema) => {
        mutation.mutateAsync({
            id: profileData?.data?.id,
            body: {
                name: formData.name,
                avatar: formData.avatar
            },
            token: token?.current
        }).then(() => {
            console.log('Profile updated successfully');
            router.back();
        }).catch((error) => {
            console.error('Error updating profile:', error);
        })
    }


    useEffect(() => {
        methods.reset({
            name: profileData?.data?.name,
            avatar: profileData?.data?.avatar,
        });
    }, [profileData]);
   

    return (
        <ScrollView style={styles.container}>
            <FormProvider {...methods} >
                <View style={styles.info}>
                    <RHFImagePicker 
                        name="avatar"
                        inputLabel='Profile Picture'
                        placeholder='Enter your name'
                        errors={methods.formState.errors}

                    />
                    <RHFTextInput 
                        name="name"
                        inputLabel='Name'
                        placeholder='Enter your name'
                        errors={methods.formState.errors}

                    />

                </View>
                <TouchableOpacity style={styles.button} onPress={methods.handleSubmit(onSubmit)} >
                    {mutation.isPending ?
                        <ActivityIndicator size="small" color="#fff" animating={mutation.isPending} hidesWhenStopped />:
                        <Text style={styles.buttonText}>Save Profile</Text>
                    }
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

export default ProfileScreen;
