import * as Font from "expo-font";
import { createIconSet } from "@expo/vector-icons";
import glyphMap from "./Octicons.json";
import fontFile from "./Octicons.ttf";

export const Octicons = createIconSet(glyphMap, "Octicons", fontFile);
