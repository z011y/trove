import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

type TroveIconProps = {
  active: boolean;
  theme: string;
};

const TroveIcon = ({ active, theme }: TroveIconProps) => {
  const light = {
    fill: "#CEEBCF",
    outline: "#1B311E",
  };

  const dark = {
    fill: "#245530",
    outline: "#E5FBEB",
  };

  return (
    <Svg width={24} height={24} fill="none">
      <Path
        d="M16 22H8l-4-4V6l4-4h8l4 4v12l-4 4Z"
        fill={!active ? "none" : theme === "light" ? light.fill : dark.fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.293 1.293A1 1 0 0 1 8 1h8a1 1 0 0 1 .707.293l4 4A1 1 0 0 1 21 6v12a1 1 0 0 1-.293.707l-4 4A1 1 0 0 1 16 23H8a1 1 0 0 1-.707-.293l-4-4A1 1 0 0 1 3 18V6a1 1 0 0 1 .293-.707l4-4Zm.433 2.395L5.688 5.726l2.115 1.057.98-.98-1.057-2.115ZM10.414 7 9 8.414v7.172L10.414 17h3.172L15 15.586V8.414L13.586 7h-3.172Zm4.803-1.197.98.98 2.115-1.057-2.038-2.038-1.057 2.115ZM14.382 3H9.618l1 2h2.764l1-2ZM19 7.618l-2 1v6.764l2 1V7.618Zm-.688 10.656-2.114-1.057-.981.98 1.057 2.115 2.038-2.038ZM14.382 21l-1-2h-2.764l-1 2h4.764Zm-6.656-.688-2.038-2.038 2.115-1.057.98.98-1.057 2.115ZM7 15.382V8.618l-2-1v8.764l2-1Z"
        fill={theme === "light" ? light.outline : dark.outline}
      />
    </Svg>
  );
};

export default TroveIcon;
