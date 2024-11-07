import "./_create-persona.scss";
import AvatarIcon from "../../components/avatar_icon";
import { useRef, useState } from "react";
import { Popover } from "../../components/popover";
import { QuickEdit } from "../../components/quick_edit";
import { useSelector } from "react-redux";
import {
  selectAvatar,
  selectBackground,
  selectName,
} from "../../config/personaSlice";
import { Icon } from "../../components/icon";
import { IconKind } from "../../constants/icons";

export const Header = () => {
  const icon = useSelector(selectAvatar);
  const name = useSelector(selectName);
  const background = useSelector(selectBackground);

  const headerRef = useRef<HTMLDivElement>(null);
  const [showEdit, setShowEdit] = useState(false);

  const handleEditClick = () => {
    setShowEdit(true);
  };

  const handleEditClose = () => {
    setShowEdit(false);
  };

  return (
    <>
      <div ref={headerRef} className="header">
        <AvatarIcon name={icon} size={42} background={background} />
        <span className="name">{name}</span>
        <Icon
          name={IconKind.EDIT}
          size={16}
          className="edit"
          onClick={handleEditClick}
        />
      </div>
      <Popover anchorRef={headerRef} open={showEdit} onClose={handleEditClose}>
        <QuickEdit />
      </Popover>
    </>
  );
};
