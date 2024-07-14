/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: ["14px", "1.5em"],
      sm: ["15px", "1.5em"],
      base: ["16px", "1.6em"],
      lg: ["17px", "1.6em"],
      xl: ["21px", "1.5em"],
      "2xl": ["29px", "1.3em"],
      "3xl": ["39px", "1.3em"],
    },
    extend: {
      colors: {
        primary: "#202221",
        secondary: "#20222180",
        border: "#d9d9d9",
        "secondary-background": "#f7f7f7",
        accent: "rgb(255, 204, 0)",
        "accent-darker": "rgb(241, 188, 0)",
      },
      transitionTimingFunction: {
        "velocity": "cubic-bezier(.04,1,.11,.97)"
      },
      boxShadow: {
        realistic:
          "rgba(0, 0, 0, 0.067) 0px 0.602187px 0.602187px -1.25px, rgba(0, 0, 0, 0.06) 0px 2.28853px 2.28853px -2.5px, rgba(0, 0, 0, 0.024) 0px 10px 10px -3.75px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
};

