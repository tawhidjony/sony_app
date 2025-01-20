import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Badge = ({ text, backgroundColor = '#f1c40f', textColor = '#fff', size = 'small' }:any) => {
  const badgeStyle = [
    styles.badge,
    { backgroundColor },
    size === 'small' && styles.small,
    size === 'medium' && styles.medium,
    size === 'large' && styles.large,
  ];

  const textStyle = [
    styles.text,
    { color: textColor },
    size === 'small' && styles.textSmall,
    size === 'medium' && styles.textMedium,
    size === 'large' && styles.textLarge,
  ];

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  large: {
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  text: {
    fontWeight: 'bold',
  },
  textSmall: {
    fontSize: 10,
  },
  textMedium: {
    fontSize: 14,
  },
  textLarge: {
    fontSize: 16,
  },
});

export default Badge;
