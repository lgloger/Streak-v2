import React, { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";

const DeleteAccountModal = ({ visible, onClose, onDelete, email }) => {
  const [password, setPassword] = useState("");

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Enter Password to delete your Account
          </Text>
          <View style={styles.inputContainer}>
            <Image
              source={require("../assets/icons/password.png")}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              placeholderTextColor="#000000"
              selectionColor="#FFFFFF"
              cursorColor="#000000"
              caretHidden={false}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => {
                onDelete(password);
                onClose();
              }}
              activeOpacity={0.6}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={onClose}
              activeOpacity={0.6}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(232, 232, 232)",
  },

  modalContent: {
    width: "100%",
    backgroundColor: "#E8E8E8",
    borderRadius: 25,
    padding: 20,
    alignItems: "center",
    gap: 15,
  },

  modalTitle: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#000000",
    includeFontPadding: false,
    textAlign: "center",
    marginBottom: 45,
  },

  inputContainer: {
    height: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 30,
    paddingHorizontal: 15,
    gap: 10,
  },

  inputIcon: {
    height: 24,
    width: 24,
  },

  input: {
    flex: 1,
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#000000",
    includeFontPadding: false,
  },

  buttonContainer: {
    height: 60,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  continueButton: {
    height: "100%",
    width: "48%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    marginTop: 5,
  },

  buttonText: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: "#000000",
    includeFontPadding: false,
  },
});

export default DeleteAccountModal;
