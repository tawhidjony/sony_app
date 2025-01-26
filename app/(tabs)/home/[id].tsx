import { ImageUrl } from "@/Api/apiClient";
import { eventBooking, eventDetail } from "@/Api/homeApi";
import { ShowToastWithGravity } from "@/components/utils/HotToastNotification";
import RNActivityIndicator from "@/components/utils/RNActivityIndicatior";
import { Colors } from "@/constants/Colors";
import { useAuthSession } from "@/providers/AuthProvider";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import moment from "moment";
import React, { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { z } from 'zod';

const scheduleSchema = z.object({
  schedule: z.number({ required_error: 'Schedule is required', invalid_type_error: 'Schedule is required' }).min(1, { message: 'Schedule is required' }),
});

type ScheduleType = z.infer<typeof scheduleSchema>;


export default function ProductDetailScreen() {
  const queryClient = useQueryClient();
  console.log(queryClient);
  
  const params = useSearchParams();
  const id = params.get('id');
  const { token } = useAuthSession();

  const { data, isLoading, error, isFetchedAfterMount } = useQuery({
    queryKey: ['eventDetail', id],
    queryFn: () => eventDetail(token?.current, id),
  });

  const mutation = useMutation({
    mutationFn: eventBooking,
    mutationKey: ["eventBooking"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BookingList"] });
    }

  });

  const { control, handleSubmit, formState: { errors } } = useForm<ScheduleType>({
    resolver: zodResolver(scheduleSchema),
  });



  const onSubmit = (data: ScheduleType) => {
    const dataModify = {
      token: token?.current,
      body: {
        event_id: id,
        schedule_id: data.schedule
      }
    }
    mutation.mutateAsync(dataModify).then(() => {
      router.push('/booking')
    }).catch((error) => {
      if (error) {
        ShowToastWithGravity(error.response.data.message || 'Something went wrong');
      }
    });
  };

  if (isLoading) return <RNActivityIndicator />

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <AntDesign name="left" size={24} color="white" />
          </TouchableOpacity>
          <Image
            source={{
              uri: ImageUrl + data?.banner,
            }}
            style={styles.productImage}
            resizeMode="cover"
          />
        </View>

        {/* Content */}
        <ScrollView contentContainerStyle={{paddingBottom: 80}} style={styles.content}>
          <Text style={styles.title}>{data?.name}</Text>

          {/* Product Details */}
          <Text style={styles.productDetailsTitle}>Job Details:</Text>
          <Text style={styles.productDetails}>
            {data?.description}
          </Text>

          <View style={styles.radioButtonContainer}>
            <Text style={styles.radioTitle}>Select Schedule:</Text>
            {data?.schedules.map((option: any) => {
              return (
                <Controller
                  control={control}
                  name="schedule"
                  key={option.id}
                  render={({ field: { onChange, value } }) => {
                    return (<View>
                      <TouchableOpacity
                        key={option.id}
                        style={styles.radioContainer}
                        onPress={() => {
                          onChange(option.id);
                        }}
                      >
                        <View style={[styles.outerCircle, value === option.id && styles.outerCircleSelected]} >
                          {value === option.id && <View style={styles.innerCircle} />}
                        </View>
                        <Text style={styles.radioText}>{moment(option.start_time, "HH:mm:ss").format('hh:mm A')} - {moment(option.end_time, "HH:mm:ss").format('hh:mm A')}</Text>
                      </TouchableOpacity>
                      {errors.schedule && <Text style={styles.errorText}>{errors.schedule.message}</Text>}
                    </View>)
                  }}
                />
              );
            })}
          </View>
        </ScrollView>

        {/* Add to Cart Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
            {mutation.isPending ?
              <ActivityIndicator size="small" color="#fff" animating={mutation.isPending} hidesWhenStopped /> : (
                <Fragment>
                  <MaterialIcons name="event" size={18} color="white" />
                  <Text style={styles.buttonText}>Book Now</Text>
                </Fragment>)
            }
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: Colors.light.tint,
    padding: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  productImage: {
    width: "100%",
    height: 250,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },

  productDetailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 16,
  },
  productDetails: {
    fontSize: 14,
    color: "#777",
    lineHeight: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  radioButtonContainer: {
    marginTop: 16,
  },
  radioTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
    marginTop: 10,
  },
  outerCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  outerCircleSelected: {
    borderColor: "#007bff",
  },
  innerCircle: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#007bff",
  },
  radioText: {
    fontSize: 18,
    color: "#000",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
});
