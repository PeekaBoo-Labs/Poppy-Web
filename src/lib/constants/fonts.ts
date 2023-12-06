import localFont from 'next/font/local'

export const font = localFont({
  src: [
    {
      path: "../../../public/fonts/open-runde-woff2/OpenRunde-Regular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../../../public/fonts/open-runde-woff2/OpenRunde-Bold.woff2",
      weight: "700",
      style: "normal"
    },
    {
      path: "../../../public/fonts/open-runde-woff2/OpenRunde-Medium.woff2",
      weight: "500",
      style: "normal"
    },
    {
      path: "../../../public/fonts/open-runde-woff2/OpenRunde-Semibold.woff2",
      weight: "600",
      style: "normal"
    }
  ]
})
