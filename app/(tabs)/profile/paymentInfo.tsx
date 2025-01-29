import { paymentInfo, paymentInfoUpdate } from '@/Api/user';
import RHFDatePicker from '@/components/form/RHFDatePicker';
import RHFImagePicker2 from '@/components/form/RHFImagePicker2';
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

// Schema validation
const paymentInfoSchema = z.object({
  name: z.string()
    .min(3, 'Name must be at least 3 characters')
    .nonempty('Name is required'),
  phone: z.string()
    .regex(/^\d{10,12}$/, 'Phone must be a valid phone number')
    .nonempty('Phone is required'),
  address: z.string()
    .min(5, 'Address must be at least 5 characters')
    .nonempty('Address is required'),
  city: z.string()
    .min(3, 'City must be at least 3 characters')
    .nonempty('City is required'),
  visa_expiry_date: z.date()
    .refine((date) => date instanceof Date && !isNaN(date.getTime()), {
      message: "Invalid date format",
    }),
  bank_name: z.string()
    .min(3, 'Bank Name must be at least 3 characters')
    .nonempty('Bank Name is required'),
  bank_account_number: z.string()
    .regex(/^\d{10,20}$/, 'Invalid bank account number')
    .nonempty('Bank Account Number is required'),
  visa_image: z.string().nonempty('Visa Image is required')
});

type PaymentInfoSchema = z.infer<typeof paymentInfoSchema>;

const PaymentInfoScreen = () => {
  const { token } = useAuthSession();

  // Fetch payment info
  const { data: paymentData, isLoading, isError, refetch,  isFetching } = useQuery({
    queryKey: ['paymentInfo'],
    queryFn: () => paymentInfo(token?.current),
  });

  const paymentInfoData = paymentData?.data?.user_details || {};

  // Update payment info mutation
  const updateMutation = useMutation({
    mutationKey: ['paymentInfoUpdate', paymentData?.data?.id],
    mutationFn: paymentInfoUpdate,
  });

  // Form setup
  const methods = useForm<PaymentInfoSchema>({
    mode: 'onChange',
    resolver: zodResolver(paymentInfoSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      city: "",
      visa_expiry_date: new Date(),
      visa_image: "",
      bank_name: "",
      bank_account_number: "",
    }
  });


  const onSubmit = (formData: PaymentInfoSchema) => {
    updateMutation.mutateAsync({
      id: paymentData.data.id,
      body: formData,
      token: token?.current
    }).then((res) => {
      if(res){
        router.back();
        ShowToastWithGravity('Payment info updated successfully');
      }
    }).catch((error) => {
      console.log(error?.response?.data);
    });
  }; 
  // Set form values when data is loaded
  useEffect(() => {
    if (paymentInfoData && !isLoading) {
      methods.reset({
        name: paymentInfoData?.name || "",
        phone: paymentInfoData?.phone || "",
        address: paymentInfoData?.address || "",
        city: paymentInfoData?.city || "",
        visa_expiry_date: paymentInfoData?.visa_expiry_date ? new Date(paymentInfoData?.visa_expiry_date) : new Date(),
        visa_image: paymentInfoData?.visa_image || "",
        bank_name: paymentInfoData?.bank_name || "",
        bank_account_number: paymentInfoData?.bank_account_number || "",
      });
    }
  }, [paymentInfoData, methods.reset, isLoading]);

  // Enhanced loading and error states
  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
        <Text style={styles.loadingText}>Loading payment information...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          Error loading payment information
        </Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => refetch()}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {isFetching && (
        <Text style={styles.loadingText}>Updating payment information...</Text>
      )}
      <FormProvider {...methods}>
        {updateMutation.isPending && (
          <View style={[styles.centerContainer, { backgroundColor: 'rgba(255,255,255,0.7)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }]}>
            <ActivityIndicator size="large" color={Colors.light.tint} />
          </View>
        )}
        <View style={styles.info}>
          <RHFImagePicker2
            name="visa_image"
            inputLabel="Visa Image"
            inputTitle="Upload your visa image"
            errors={methods.formState.errors}
          />
          <RHFTextInput
            name="name"
            inputLabel="Name"
            placeholder="Enter your name"
            errors={methods.formState.errors}
          />
          <RHFTextInput
            name="phone" 
            inputLabel="Phone"
            placeholder="Enter your phone number"
            errors={methods.formState.errors}
          />
          <RHFTextInput
            name="address"
            inputLabel="Address"
            placeholder="Enter your address"
            errors={methods.formState.errors}
          />
          <RHFTextInput
            name="city"
            inputLabel="City"
            placeholder="Enter your city"
            errors={methods.formState.errors}
          />
          <RHFDatePicker
            name="visa_expiry_date"
            inputLabel="Visa Expiry Date"
            placeholder="Enter your visa expire date"
            errors={methods.formState.errors}
          />
          <RHFTextInput
            name="bank_name"
            inputLabel="Bank Name"
            placeholder="Enter your bank name"
            errors={methods.formState.errors}
          />
          <RHFTextInput
            name="bank_account_number"
            inputLabel="Bank Account Number"
            placeholder="Enter your bank account number"
            errors={methods.formState.errors}
          />
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={methods.handleSubmit(onSubmit)}
          disabled={updateMutation.isPending}
        >
          <Text style={styles.buttonText}>Save Profile</Text>
        </TouchableOpacity>
      </FormProvider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.light.text,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  refreshIndicator: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },

  // ======================
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  info: {
    padding: 20,
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
  }
});

export default PaymentInfoScreen;
