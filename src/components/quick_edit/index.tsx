import { useDispatch, useSelector } from "react-redux";
import { ColorPicker } from "./color_picker";
import { ImagePicker } from "./image_picker";
import {
  selectAvatar,
  selectBackground,
  selectName,
  setAvatar,
  setBackground,
  setName,
} from "../../config/personaSlice";
import { useState } from "react";
import { HorizontalBar } from "../horizontal_bar";
import { Profile } from "./profile";
import { Header } from "./header";
import { Footer } from "./footer";
import { IconKind } from "../../constants/icons";

interface Props {
  onClose?: () => void;
}

export const QuickEdit = (props: Props) => {
  const { onClose } = props;

  const avatar = useSelector(selectAvatar);
  const background = useSelector(selectBackground);
  const name = useSelector(selectName);

  const [personaName, setPersonaName] = useState(name);
  const [image, setImage] = useState<IconKind | null>(avatar);
  const [color, setColor] = useState(background);
  const [nameError, setNameError] = useState(false);

  const dispath = useDispatch();

  const handleSave = () => {
    if (!personaName) {
      return;
    }

    dispath(setAvatar(image));
    dispath(setBackground(color));
    dispath(setName(personaName));

    onClose && onClose();
  };

  return (
    <div className="quick-edit">
      <Header onClose={onClose} />
      <Profile
        avatar={image}
        color={color}
        personaName={personaName}
        setPersonaName={setPersonaName}
        nameError={nameError}
        setNameError={setNameError}
      />
      <ImagePicker image={image} setImage={setImage} />
      <ColorPicker color={color} setColor={setColor} />
      <HorizontalBar />
      <Footer nameError={nameError} onClose={onClose} handleSave={handleSave} />
    </div>
  );
};
