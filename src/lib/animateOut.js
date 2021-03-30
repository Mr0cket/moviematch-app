import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export default async function animateOut(index, gesture, set) {
  // swipe triggered, animate card out in the direction specified
  const sign = Math.sign(gesture.vx);
  const finalX = (width + 250) * sign;
  set((i) =>
    i === index
      ? {
          x: finalX,
          opacity: 0,
        }
      : null
  );
}
