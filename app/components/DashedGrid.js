export default function DashedGrid() {
  return (
    <>
      {/* Purple corner gradients - separate layer */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.1) 0px, transparent 50%),
            radial-gradient(at 100% 0%, rgba(139, 92, 246, 0.1) 0px, transparent 50%),
            radial-gradient(at 0% 100%, rgba(139, 92, 246, 0.1) 0px, transparent 50%),
            radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.1) 0px, transparent 50%)
          `,
          backgroundSize: "100% 100%",
        }}
      />
      {/* Dashed Grid - separate layer with mask */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #d4d1ce 1px, transparent 1px),
            linear-gradient(to bottom, #d4d1ce 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            )
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />
    </>
  );
}

