import { Text, TextProps } from "./Themed";

export function BoldText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "epilogue-bold" }]} />
  );
}
