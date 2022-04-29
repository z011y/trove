import { useEffect, useState } from "react";
import { View, Image, ActivityIndicator } from "react-native";

type ScaledImageProps = {
  uri: string;
  width?: number;
  height?: number;
  style?: object;
};

const ScaledImage = ({ uri, width, height, style }: ScaledImageProps) => {
  const [computedWidth, setComputedWidth] = useState();
  const [computedHeight, setComputedHeight] = useState();

  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    Image.getSize(
      uri,
      (imageWidth, imageHeight) => {
        if (width && !height) {
          setComputedWidth(width);
          setComputedHeight(imageHeight * (width / imageWidth));
        } else if (!width && height) {
          setComputedWidth(imageWidth * (height / imageHeight));
          setComputedHeight(height);
        } else {
          setComputedWidth(imageWidth);
          setComputedHeight(imageHeight);
        }
        setImageLoading(false);
      },
      (error) => {
        console.log("ScaledImage,Image.getSize failed with error: ", error);
      }
    );

    return () => {
      setImageLoading(true);
    };
  }, [uri, width, height]);

  return computedHeight ? (
    <View
      style={{
        height: computedHeight,
        width: computedWidth,
        backgroundColor: "transparent",
        overflow: "hidden",
      }}
    >
      <Image
        source={{ uri: uri }}
        style={{
          height: computedHeight,
          width: computedWidth,
          ...style,
        }}
      />
    </View>
  ) : imageLoading ? (
    <ActivityIndicator size="small" />
  ) : null;
};

export default ScaledImage;
