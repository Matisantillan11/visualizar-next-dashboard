export const getReverseAnimationsSelected = (value: string[]) => {
  if (value.every((v) => v === "ALL")) {
    return "Todas las animaciones";
  }

  if (value.every((v) => v === "MAIN")) {
    return "Solo caracteres principales";
  }

  if (value.every((v) => v === "EXTRA")) {
    return "Solo datos curiosos";
  }

  return "No hay animaciones seleccionadas";
};
