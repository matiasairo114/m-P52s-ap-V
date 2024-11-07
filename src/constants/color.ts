export const COLORS = {
  BLUE: "#222ADD",
  LIGHT_BLUE: "#148EFF",
  TEAL: "#004136",
  GREEN: "#0BC66D",
  LIGHT_YELLOW: "#FFDB5A",
  YELLOW: "#EAFE99",
  ORANGE: "#FFA914",
  LIGHT_RED: "#FF8A7A",
  RED: "#FF4F44",
  DARK_RED: "#CD2A14",
  PURPLE: "#A529D0",
  DARK_BLUE: "#00256E",
  MINT: "#99FEEC",
};

export type ColorType = (typeof COLORS)[keyof typeof COLORS];
