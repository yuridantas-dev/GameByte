import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardTypeOptions,
  ViewStyle,
} from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

interface InputCustomProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  errorMessage?: string | null;
  icon?: React.ReactNode;
  style?: ViewStyle;
}

export function InputCustom({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = "default",
  autoCapitalize = "none",
  errorMessage,
  icon,
  style,
}: InputCustomProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          !!errorMessage && styles.inputContainerError,
        ]}
      >
        {icon && <View style={styles.leftIconBox}>{icon}</View>}

        <TextInput
          style={styles.textInput}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#7e729a"
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {secureTextEntry && (
          <TouchableOpacity
            style={styles.rightIconBtn}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
          >
            {isPasswordVisible ? (
              <EyeOff size={16} color="#aaa0c2" />
            ) : (
              <Eye size={16} color="#aaa0c2" />
            )}
          </TouchableOpacity>
        )}
      </View>

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 12,
  },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: "#c7bede",
    marginBottom: 6,
    letterSpacing: 0.3,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 48,
  },
  inputContainerFocused: {
    borderColor: "#8b6ff9",
    backgroundColor: "rgba(139, 111, 249, 0.08)",
  },
  inputContainerError: {
    borderColor: "#ef4444",
    backgroundColor: "rgba(239, 68, 68, 0.08)",
  },
  leftIconBox: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  rightIconBtn: {
    padding: 6,
    marginLeft: 4,
  },
  textInput: {
    flex: 1,
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "500",
    height: "100%",
  },
  errorText: {
    fontSize: 10.5,
    fontWeight: "600",
    color: "#f87171",
    marginTop: 4,
    marginLeft: 2,
  },
});
