import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tz: {
          bg:           "#010108",
          surface:      "#030312",
          card:         "#060617",
          cardHover:    "#0A0A21",
          darker:       "#01010A",
          border:       "rgba(255,255,255,0.06)",
          borderBright: "rgba(255,255,255,0.13)",
          // Primary — Electric Orange
          orange:       "#FF4200",
          orangeLight:  "#FF6B3D",
          orangeDark:   "#CC3400",
          // Secondary — Rich Amber / Gold
          amber:        "#FFC000",
          amberLight:   "#FFD54F",
          amberDark:    "#CC9A00",
          // Accent — Electric Purple
          purple:       "#9D4EDD",
          purpleLight:  "#B57BEE",
          // Accent — Cyan (futuristic)
          cyan:         "#00CFFF",
          // Typography
          text:         "#EDECEA",
          muted:        "#7B7A90",
          dim:          "#3E3D55",
          // Utility
          white:        "#FFFFFF",
        },
      },
      fontFamily: {
        sans:    ["var(--font-fredoka)", "system-ui", "sans-serif"],
        display: ["var(--font-baloo)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "10xl": ["10rem",  { lineHeight: "0.88" }],
        "9xl":  ["8rem",   { lineHeight: "0.88" }],
        "8xl":  ["6.5rem", { lineHeight: "0.90" }],
      },
      backgroundImage: {
        "tz-hero":           "radial-gradient(ellipse 80% 60% at 15% 55%, rgba(255,66,0,0.14) 0%, transparent 60%)",
        "tz-hero-right":     "radial-gradient(ellipse 60% 60% at 85% 40%, rgba(157,78,221,0.12) 0%, transparent 60%)",
        "tz-glow-orange":    "radial-gradient(circle, rgba(255,66,0,0.22) 0%, transparent 70%)",
        "tz-glow-amber":     "radial-gradient(circle, rgba(255,192,0,0.16) 0%, transparent 70%)",
        "tz-glow-purple":    "radial-gradient(circle, rgba(157,78,221,0.18) 0%, transparent 70%)",
        "tz-cta":            "linear-gradient(135deg, #7A0000 0%, #CC3400 25%, #FF4200 55%, #FFC000 100%)",
        "tz-card-warm":      "linear-gradient(135deg, rgba(255,66,0,0.06) 0%, rgba(157,78,221,0.04) 100%)",
        "tz-section-dark":   "linear-gradient(180deg, #020210 0%, #050518 50%, #020210 100%)",
      },
      animation: {
        "marquee":        "marquee 32s linear infinite",
        "marquee-rev":    "marqueeRev 36s linear infinite",
        "float":          "float 6s ease-in-out infinite",
        "float-delay":    "float 6s ease-in-out 2s infinite",
        "float-delay2":   "float 6s ease-in-out 4s infinite",
        "pulse-slow":     "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "glow-pulse":     "glowPulse 4s ease-in-out infinite",
        "spin-slow":      "spin 20s linear infinite",
        "gradient-shift": "gradientShift 10s ease infinite",
        "slide-up":       "slideUp 0.65s ease both",
        "fade-in":        "fadeIn 0.8s ease both",
        "scale-in":       "scaleIn 0.55s ease both",
        "shimmer":        "shimmer 2.4s linear infinite",
        "bounce-subtle":  "bounceSubtle 2s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        marqueeRev: {
          from: { transform: "translateX(-50%)" },
          to:   { transform: "translateX(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-18px)" },
        },
        glowPulse: {
          "0%,100%": { opacity: "0.35" },
          "50%":     { opacity: "0.8" },
        },
        gradientShift: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%":     { backgroundPosition: "100% 50%" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(32px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.88)" },
          to:   { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to:   { backgroundPosition: "200% 0" },
        },
        bounceSubtle: {
          "0%,100%": { transform: "translateY(0)" },
          "50%":     { transform: "translateY(-6px)" },
        },
      },
      boxShadow: {
        "orange-glow": "0 0 60px rgba(255,66,0,0.20), 0 0 120px rgba(255,66,0,0.08)",
        "amber-glow":  "0 0 60px rgba(255,192,0,0.18), 0 0 120px rgba(255,192,0,0.07)",
        "purple-glow": "0 0 60px rgba(157,78,221,0.18), 0 0 120px rgba(157,78,221,0.07)",
        "card-lift":   "0 24px 80px rgba(0,0,0,0.7), 0 8px 32px rgba(0,0,0,0.5)",
        "card-hover":  "0 32px 100px rgba(0,0,0,0.8), 0 12px 40px rgba(255,66,0,0.12)",
      },
      transitionDuration: {
        "350": "350ms",
        "400": "400ms",
        "800": "800ms",
      },
      scale: {
        "108": "1.08",
      },
      opacity: {
        "12": "0.12",
        "15": "0.15",
        "35": "0.35",
        "45": "0.45",
        "55": "0.55",
        "65": "0.65",
        "85": "0.85",
      },
    },
  },
  plugins: [],
};

export default config;
