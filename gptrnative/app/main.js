import React from 'react';
import Head from 'expo-router/head';
import {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Pressable, Image,
SafeAreaView, Alert} from "react-native"
import loadingGif from '../assets/loading.gif'

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
})


const main = () => {
    const [code, setCode] = useState('');
    const [age, setAge] = useState(30);
    const [priceMin, setPriceMin] = useState(25);
    const [priceMax, setPriceMax] = useState(100);
    const [hobbies, setHobbies] = useState('');
    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState('');

    const API_URL = "https://openaitest-theta.vercel.app/api"

    const onTryAgain = () => {
      setResult('');
    };

    const onSubmit = async () => {
        if (loading) {
          return;
        }
        setLoading(true);
        setResult('')
        try {
          const response = await fetch(`${API_URL}/generate-gifts`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ code }),
          });
          const data = await response.json();
          setResult(data.result);
        } catch (e) {
          Alert.alert("Couldn't generate ideas", e.message);
        } finally {
          setLoading(false);
        }
    };

    if (loading) {
        return (
          <View style={styles.loadingContainer}>
            <Text style={styles.title}>Analyzing the solution 🎁 💡</Text>
            
          </View>
        );
    }

    if (result) {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>
            Results:💡
          </Text>
          <Text style={styles.result}>{result}</Text>
          <Pressable onPress={onTryAgain} style={styles.button}>
            <Text style={styles.buttonText}>Try again</Text>
          </Pressable>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
        <Text style={styles.label}>For who is the gift?</Text>

            <Text style={styles.label}>Code</Text>
            <TextInput
            placeholder="Code"
            style={styles.input}
            value={code}
            onChangeText={setCode}
            />
             <Pressable onPress={onSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Generate gift ideas</Text>
            </Pressable>
            </View>
      </SafeAreaView>
    );
};

export default main;