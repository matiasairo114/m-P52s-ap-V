import "./_quick_edit.scss";
import { ChangeEvent } from "react";
import AvatarIcon from "../avatar_icon";
import { IconKind } from "../../constants/icons";

interface Props {
  avatar: IconKind | null;
  color: string;
  personaName: string;
  setPersonaName: (name: string) => void;
  nameError: boolean;
  setNameError: (v: boolean) => void;
}

export const Profile = (props: Props) => {
  const {
    avatar,
    color,
    personaName,
    setPersonaName,
    nameError,
    setNameError,
  } = props;

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPersonaName(e.target.value);
  };

  const handleFocus = () => {
    setNameError(false);
  };

  const handleBlur = () => {
    if (!personaName) {
      setNameError(true);
    }
  };

  return (
    <div className="profile">
      <AvatarIcon name={avatar} background={color} size={80} />
      <span className="label">{"Name"}</span>
      <div className="name-input">
        <input
          type="text"
          value={personaName}
          onChange={handleNameChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={
            nameError ? { borderColor: "#ff4f44" } : { borderColor: "#e6e6e6" }
          }
        />
        {nameError && (
          <span className="error">
            {"Please enter a name for the persona."}
          </span>
        )}
      </div>
    </div>
  );
};
