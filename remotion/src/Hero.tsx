import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const NAVY = "#102A43";
const TEAL = "#1B6D8C";
const MIST = "#F4F1EA";

function fade(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
}

export const Hero = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const kenBurns = interpolate(frame, [0, durationInFrames], [1, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    output: "perceptual-scale",
  });

  const scene = Math.floor(frame / (4 * fps));

  return (
    <AbsoluteFill style={{ backgroundColor: NAVY }}>
      <AbsoluteFill
        style={{
          scale: kenBurns,
        }}
      >
        <Img
          src={staticFile(scene < 1 ? "grove.jpg" : scene < 2 ? "field.jpg" : "hills.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(90deg, rgba(16,42,67,0.88) 0%, rgba(16,42,67,0.45) 55%, rgba(16,42,67,0.2) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          paddingLeft: 120,
          paddingRight: 120,
        }}
      >
        <div
          style={{
            opacity: fade(frame, 8, 28),
            color: TEAL,
            fontSize: 28,
            letterSpacing: 6,
            fontWeight: 600,
            textTransform: "uppercase",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Realster
        </div>
        <div
          style={{
            opacity: fade(frame, 18, 42),
            color: MIST,
            fontSize: 86,
            lineHeight: 1.05,
            fontWeight: 800,
            maxWidth: 1100,
            marginTop: 16,
            fontFamily: "Plus Jakarta Sans, Inter, sans-serif",
          }}
        >
          Land in Coimbatore
        </div>
        <div
          style={{
            opacity: interpolate(
              frame,
              [3 * fps, 3.6 * fps, 8 * fps, 9 * fps],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            color: MIST,
            fontSize: 36,
            marginTop: 28,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Pollachi · Sulur · Annur · Mettupalayam
        </div>
        <div
          style={{
            opacity: interpolate(
              frame,
              [9 * fps, 9.6 * fps, 11.4 * fps, 12 * fps],
              [0, 1, 1, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
            color: MIST,
            fontSize: 36,
            marginTop: 28,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Plots · Farms · Agricultural · Industrial
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
