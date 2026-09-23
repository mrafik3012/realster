import { Composition } from "remotion";
import { Hero } from "./Hero";

export const RemotionRoot = () => {
  return (
    <Composition
      id="Hero"
      component={Hero}
      durationInFrames={360}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
