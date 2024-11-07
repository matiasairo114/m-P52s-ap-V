import { IconKind } from "../../constants/icons";
import { ReactComponent as bold_man_with_beard } from "../../assets/icons/persona_icons/bold_man_with_beard.svg";
import { ReactComponent as man_with_beard_and_glasses } from "../../assets/icons/persona_icons/man_with_beard_and_glasses.svg";
import { ReactComponent as man_with_glasses } from "../../assets/icons/persona_icons/man_with_glasses.svg";
import { ReactComponent as man_with_long_hair } from "../../assets/icons/persona_icons/man_with_long_hair.svg";
import { ReactComponent as man_with_short_hair } from "../../assets/icons/persona_icons/man_with_short_hair.svg";
import { ReactComponent as man_with_short_hair2 } from "../../assets/icons/persona_icons/man_with_short_hair2.svg";
import { ReactComponent as woman_with_glasses_and_long_hair } from "../../assets/icons/persona_icons/woman_with_glasses_and_long_hair.svg";
import { ReactComponent as woman_with_habib } from "../../assets/icons/persona_icons/woman_with_habib.svg";
import { ReactComponent as woman_with_long_curly_hair } from "../../assets/icons/persona_icons/woman_with_long_curly_hair.svg";
import { ReactComponent as woman_with_long_hair_to_one_side } from "../../assets/icons/persona_icons/woman_with_long_hair_to_one_side.svg";
import { ReactComponent as woman_with_long_hair } from "../../assets/icons/persona_icons/woman_with_long_hair.svg";
import { ReactComponent as woman_with_short_hair } from "../../assets/icons/persona_icons/woman_with_short_hair.svg";
import { ReactComponent as woman_with_tied_hair } from "../../assets/icons/persona_icons/woman_with_tied_hair.svg";
import { ReactComponent as edit } from "../../assets/icons/edit.svg";
import { ReactComponent as empty } from "../../assets/icons/empty.svg";
import { ReactComponent as close } from "../../assets/icons/close.svg";
import { ReactComponent as check } from "../../assets/icons/check.svg";
import { ReactComponent as broken_image } from "../../assets/icons/broken_image.svg";
import { ReactComponent as expand_more } from "../../assets/icons/expand_more.svg";
import { ReactComponent as text_fields } from "../../assets/icons/text_fields.svg";
import { ReactComponent as text_icon } from "../../assets/icons/text_icon.svg";
import { ReactComponent as image_icon } from "../../assets/icons/image_icon.svg";

const IconComponents = {
  bold_man_with_beard,
  man_with_beard_and_glasses,
  man_with_glasses,
  man_with_long_hair,
  man_with_short_hair,
  man_with_short_hair2,
  woman_with_glasses_and_long_hair,
  woman_with_habib,
  woman_with_long_curly_hair,
  woman_with_long_hair_to_one_side,
  woman_with_long_hair,
  woman_with_short_hair,
  woman_with_tied_hair,
  edit,
  empty,
  close,
  check,
  broken_image,
  expand_more,
  text_fields,
  text_icon,
  image_icon,
};

interface Props {
  className?: string;
  name: IconKind;
  size?: number;
  onClick?: () => void;
}

export const Icon = (props: Props) => {
  const { className, name, size = 24, onClick } = props;
  const IconComponent = IconComponents[name];

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      style={{ width: size, height: size }}
      className={className}
      onClick={onClick}
    />
  );
};
