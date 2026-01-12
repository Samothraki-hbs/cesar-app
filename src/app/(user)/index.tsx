// simple porte d'entrée de l'application, qui redirige automatiquement vers /(user)/categories

import { Redirect } from "expo-router";
import React from "react";

export default function TabIndex() {
  return <Redirect href={"/(user)/categories"} />;
}
