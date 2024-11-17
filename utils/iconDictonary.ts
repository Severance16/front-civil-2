type iconType =
  | "home-outline"
  | "school-outline"
  | "city-variant-outline"
  | "store-outline"
  | "office-building-outline"
  | "road-variant"
  | "water-outline"
  | undefined;

  type TResidencial = "home-outline"

type typeDictionary = {
    Residencial: "home-outline",
    Institucional: "school-outline",
    Urbana: "city-variant-outline",
    Comercial: "store-outline",
    Industrial: "office-building-outline",
    Vial: "road-variant",
    Hidrahulica: "water-outline",
}

const workTypeDictonary: typeDictionary = {
  Residencial: "home-outline",
  Institucional: "school-outline",
  Urbana: "city-variant-outline",
  Comercial: "store-outline",
  Industrial: "office-building-outline",
  Vial: "road-variant",
  Hidrahulica: "water-outline",
};

export const IconDictonary = (workType: "Residencial" | "Institucional" | "Urbana" | "Comercial" | "Industrial" | "Vial" | "Hidrahulica"): iconType => {
    const icon: iconType = workTypeDictonary[workType]
  return icon;
};
