import Image from "next/image";

// Reusable minimal phone bezel wrapping a real screenshot. Thin, dark,
// single speaker slit, no brand logos. No vertical hardcoding.
export default function PhoneFrame({
  src,
  alt,
  width = 390,
  height = 844,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 320,
        marginInline: "auto",
        padding: 10,
        borderRadius: 44,
        background: "#0C0C0C",
        border: "1px solid var(--dd-border-strong, rgba(255,255,255,0.16))",
        boxShadow: "0 50px 100px -45px rgba(0,0,0,0.7)",
        position: "relative",
      }}
    >
      {/* Speaker slit */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          width: 54,
          height: 5,
          borderRadius: 999,
          background: "rgba(255,255,255,0.14)",
          zIndex: 2,
        }}
      />
      <div
        style={{
          borderRadius: 35,
          overflow: "hidden",
          background: "#000",
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading="lazy"
          sizes="320px"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </div>
  );
}
