import { supabase } from "@/lib/supabase";
import Button from "@components/Button";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false); //empêcher que l'utilisateur clique intempestivement sur le bouton

  async function signInWithEmail() {
    setLoading(true);
    // fonction Supabase toute prête pour me permettre de me connecter avec mon passeport
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors("");
    if (!email) {
      setErrors("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrors("Please enter a valid email address");
      return false;
    }
    if (!password) {
      setErrors("Password is required");
      return false;
    }
    if (password.length < 6) {
      // Optionnel : check de longueur
      setErrors("Password must be at least 6 characters");
      return false;
    }
    setErrors("");
    return true;
  };
  const onSubmit = () => {
    if (!validateInput()) {
      return;
    }
    console.warn(
      "L'utilisateur s'est connecté avec le profil",
      email,
      "et le mot de passe",
      password
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
        style={styles.input}
      />
      <Text style={styles.text}>Mot de passe</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
      />
      {errors ? <Text style={styles.error}>{errors}</Text> : null}

      <Button
        text={loading ? "Connexion en cours..." : "Connexion"}
        onPress={signInWithEmail}
        disabled={loading}
      />
      <Link href={"/sign-up"} asChild>
        <Text style={styles.link}>S'inscrire</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 10,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#2C3E50",
  },
  text: {
    color: "#2C3E50",
  },

  link: {
    color: "#003153",
    textAlign: "center",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
    fontWeight: 500,
  },
});
