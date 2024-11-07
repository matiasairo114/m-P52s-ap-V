import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { COLORS, ColorType } from "../constants/color";
import { IconKind } from "../constants/icons";

interface PersonaState {
  name: string;
  avatar: IconKind | null;
  background: ColorType;
}

const initialState: PersonaState = {
  name: "New Persona",
  avatar: IconKind.WOMAN_WITH_LONG_CURLY_HAIR,
  background: COLORS.YELLOW,
};

const personaSlice = createSlice({
  name: "persona",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setAvatar: (state, action: PayloadAction<IconKind | null>) => {
      state.avatar = action.payload;
    },
    setBackground: (state, action: PayloadAction<string>) => {
      state.background = action.payload;
    },
  },
  selectors: {
    selectName: (state) => state.name,
    selectAvatar: (state) => state.avatar,
    selectBackground: (state) => state.background,
  },
});

export const { setName, setAvatar, setBackground } = personaSlice.actions;
export const { selectName, selectAvatar, selectBackground } =
  personaSlice.selectors;
export default personaSlice.reducer;
