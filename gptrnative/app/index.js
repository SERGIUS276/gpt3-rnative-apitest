import React from 'react';
import Head from 'expo-router/head';
import {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Pressable, Image,
SafeAreaView, Alert} from "react-native"
import {Link, useRouter} from 'expo-router'
import { KeyboardAvoidingView } from 'react-native';
import {app, auth} from "../firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";



const index = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter();

    const handleSignUp = () => {
        const auth = getAuth();
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                router.push("/main");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    } 

    const handleSignIn = () => {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            router.push("/main");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        });
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView style={styles.loadingContainer}>
                <View>
                    <TextInput
                        placeholder='Email'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Password'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>
                <Text
                    style={styles.linkText}
                    onPress={
                        handleSignIn
                    }
                >
                    Log In
                </Text>
                <Text
                    style={styles.linkText}
                    onPress={
                        handleSignUp
                    }
                >
                    Register
                </Text>
            </KeyboardAvoidingView>
      </SafeAreaView>
    );
};

export default index;

const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      backgroundColor: "#fff",
      justifyContent: "center",
      padding: 10,
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
    },
    input: {
        fontSize: 16,
      
        borderColor: "#353740;",
        borderWidth: 1,
        borderRadius: 4,
      
        padding: 16,
        marginTop: 6,
        marginBottom: 12,
    },
    label: {
    fontSize: 16,
    color: "gray",
    },
    selectorContainer: {
        flexDirection: "row",
    },
    selector: {
    flex: 1,
    textAlign: "center",
    backgroundColor: "gainsboro",
    margin: 5,
    padding: 16,
    borderRadius: 5,
    overflow: "hidden",
    },
    button: {
    marginTop: "auto",
    backgroundColor: "#10a37f",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 6,
    },
    buttonText: {
    color: "white",
    fontWeight: "bold",
    },
    loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 10,
    },
    loading: {
      width: "100%",
    },
    linkText: {
        fontWeight: "bold",
        fontSize: 20,
        padding: 10,
    }
})