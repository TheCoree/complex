import localFont from "next/font/local"

export const golos = localFont({
  src: [
    {
      path: "./fonts/Golos-Black.woff2",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-golos",
  display: "swap",
})

export const travels = localFont({
  src: [
    {
      path: "./fonts/TT Travels Trial Bold.otf",
      weight: "600",
      style: "normal"
    },
  ],
  variable: "--font-travels",
  display: "swap"
})

export const paplane = localFont({
  src: [
    {
      path: "./fonts/TT_Paplane_Trial_Regular.ttf",
      weight: "600",
      style: "normal"
    },
  ],
  variable: "--font-paplane",
  display: "swap"
})

export const livret = localFont({
  src: [
    {
      path: "./fonts/TT Livret Text Trial Italic.woff2",
      weight: "400",
      style: "italic"
    },
  ],
  variable: "--font-livret",
  display: "swap",
  fallback: ['system-ui', 'sans-serif'],  // Добавьте для быстрого fallback
  preload: false  // Попробуйте отключить preload, иногда помогает с кэшем
})
