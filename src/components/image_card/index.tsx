import "./_image_card.scss";
import { useRef, useState } from "react";
import { CardKind } from "../../constants/card";
import { Icon } from "../icon";
import { IconKind } from "../../constants/icons";

interface Props {
  id?: number;
  type?: CardKind;
}

export const ImageCard = (props: Props) => {
  const { id, type } = props;

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCardClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      data-id={id}
      data-type={type}
      className="image-card"
      onClick={handleCardClick}
      style={imageSrc ? { minHeight: 100 } : { minHeight: 200 }}
    >
      {imageSrc ? (
        <img src={imageSrc} alt="Uploaded" className="uploaded-image" />
      ) : (
        <div className="choose-image">
          <Icon name={IconKind.BROKEN_IMAGE} size={20} />
          <span className="label">{"Choose an image"}</span>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>
  );
};
