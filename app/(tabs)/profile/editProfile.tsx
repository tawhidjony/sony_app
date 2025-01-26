import { profile, profileUpdate } from '@/Api/homeApi';
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
    phone: z
        .string({ required_error: 'Phone is required', invalid_type_error: 'Phone must be a string' })
        .regex(/^\d{10,12}$/, { message: 'Phone must be a valid phone number' }),
    address: z
        .string({ required_error: 'Address is required', invalid_type_error: 'Address must be a string' })
        .min(5, { message: 'Address must be at least 5 characters' }),
    city: z
        .string({ required_error: 'City is required', invalid_type_error: 'City must be a string' })
        .min(3, { message: 'City must be at least 3 characters' }),
    visa_expiry_date: z
        .date({ required_error: 'Visa Expiry Date is required', invalid_type_error: 'Visa Expiry Date must be a date' })
        .refine((val) => val instanceof Date && !isNaN(val.getTime()), { message: 'Visa Expiry Date must be a valid date' }),
    bank_name: z
        .string({ required_error: 'Bank Name is required', invalid_type_error: 'Bank Name must be a string' })
        .min(3, { message: 'Bank Name must be at least 3 characters' }),
    bank_account_number: z
        .string({ required_error: 'Bank Account Number is required', invalid_type_error: 'Bank Account Number must be a string' })
        .regex(/^\d{10,20}$/, { message: 'Bank Account Number must be a valid bank account number' }),
    visa_image: z.string({ required_error: 'Visa Image is required', invalid_type_error: 'Visa Image must be a string' }).url({ message: 'Visa Image must be a valid URL' }),
});

type EditProfileSchema = z.infer<typeof editProfileSchema>;


const ProfileScreen = () => {

    const { token } = useAuthSession();

    const { data } = useQuery({
        queryKey: ['profile'],
        queryFn: () => profile(token?.current)
    })
    const mutation = useMutation({
        mutationKey: ['profileUpdate'],
        mutationFn: profileUpdate
    })
    
    const { name, email } = data?.user_details || {};

    const methods = useForm<EditProfileSchema>({
        mode: 'all',
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            name:'',
            phone:'',
            address: '',
            city: '',
            visa_expiry_date: new Date(),
            visa_image: '',
            bank_name: '',
            bank_account_number: '',
        },
    });
    const onSubmit = (formData: EditProfileSchema) => {
        mutation.mutateAsync({
            id: data?.data?.id,
            body: {
                name: formData.name,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                visa_expiry_date: formData.visa_expiry_date,
                visa_image: formData.visa_image,
                bank_name: formData.bank_name,
                bank_account_number: formData.bank_account_number,
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
            name: data?.data?.user_details?.name,
            phone: data?.data?.user_details?.phone,
            address: data?.data?.user_details?.address,
            city: data?.data?.user_details?.city,
            visa_expiry_date: new Date(),
            visa_image: data?.data?.user_details?.visa_image,
            bank_name: data?.data?.user_details?.bank_name,
            bank_account_number: data?.data?.user_details?.bank_account_number,
        });
    }, [data]);
   

    return (
        <ScrollView style={styles.container}>
            <FormProvider {...methods} >
                <View style={styles.info}>
                    <RHFImagePicker 
                        name="visa_image"
                        inputLabel='Name'
                        placeholder='Enter your name'
                        errors={methods.formState.errors}

                    />
                    <RHFTextInput 
                        name="name"
                        inputLabel='Name'
                        placeholder='Enter your name'
                        errors={methods.formState.errors}

                    />
                    <RHFTextInput 
                        name="phone" 
                        inputLabel='Phone'
                        placeholder='Enter your phone number'
                        errors={methods.formState.errors}
                    />
                    <RHFTextInput 
                        name="address" 
                        inputLabel='Address'
                        placeholder='Enter your address'
                        errors={methods.formState.errors}
                    />
                    <RHFTextInput 
                        name="city" 
                        inputLabel='City'
                        placeholder='Enter your city'
                        errors={methods.formState.errors}
                    />
                    <RHFDatePicker 
                        name="visa_expiry_date" 
                        inputLabel='Visa Expiry Date'
                        placeholder='Enter your visa expire date'
                        errors={methods.formState.errors}
                    />
                    <RHFTextInput 
                        name="bank_name" 
                        inputLabel='Bank Name'
                        placeholder='Enter your bank name'
                        errors={methods.formState.errors}
                    />
                    <RHFTextInput 
                        name="bank_account_number" 
                        inputLabel='Bank Account Number'
                        placeholder='Enter your bank account number'
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
