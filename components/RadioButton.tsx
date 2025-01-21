import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RadioButton({ label, selectedOption, onPress }:any) {
    return (
        <TouchableOpacity style={styles.radioContainer} onPress={onPress} >
            <View style={[ styles.outerCircle, selectedOption === label && styles.outerCircleSelected, ]} >
            {   selectedOption === label && <View style={styles.innerCircle} />}
            </View>
            <Text style={styles.radioText}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
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
});
