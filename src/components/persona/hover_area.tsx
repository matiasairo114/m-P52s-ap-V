import { useCallback, useEffect, useRef, useState } from "react";
import { Popover } from "../popover";
import { AddMenu } from "./add_menu";
import { Layout, Position } from "../../constants/popover";

interface Props {
  isDragging: boolean;
  addTextCard: () => void;
  addImageCard: () => void;
}

export const HoverArea = (props: Props) => {
  const { isDragging, addTextCard, addImageCard } = props;

  const hoverRef = useRef<HTMLDivElement | null>(null);
  const isHoveringPopoverRef = useRef(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  const handleShowMenu = () => {
    if (!isDragging) {
      setShowMenu(true);
    }
  };

  const handleHideMenu = useCallback(() => {
    if (showSubMenu) {
      return;
    }

    setTimeout(() => {
      if (!isHoveringPopoverRef.current) {
        setShowMenu(false);
      }
    }, 0);
  }, [showSubMenu]);

  const handleHideMenuForce = () => {
    isHoveringPopoverRef.current = false;
    setShowMenu(false);
    setShowSubMenu(false);
  };

  const handlePopoverEnter = () => {
    isHoveringPopoverRef.current = true;
  };

  const handlePopoverLeave = () => {
    isHoveringPopoverRef.current = false;
    handleHideMenu();
  };

  const handleAddTextCard = () => {
    addTextCard();
    handleHideMenuForce();
  };

  const handleAddImageCard = () => {
    addImageCard();
    handleHideMenuForce();
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleHideMenuForce();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (!showSubMenu) {
      handleHideMenu();
    }
  }, [showSubMenu, handleHideMenu]);

  return (
    <>
      <div
        ref={hoverRef}
        className="hover-area no-drag"
        onMouseEnter={handleShowMenu}
        onMouseLeave={handleHideMenu}
      />
      {showMenu && (
        <Popover
          anchorRef={hoverRef}
          open={showMenu}
          onClose={handleHideMenu}
          position={Position.HIT}
          onMouseEnter={handlePopoverEnter}
          onMouseLeave={handlePopoverLeave}
          layout={Layout.EMPTY}
          closeOnClickOutside
        >
          <AddMenu
            parentRef={hoverRef}
            showSubMenu={showSubMenu}
            setShowSubMenu={setShowSubMenu}
            addTextCard={handleAddTextCard}
            addImageCard={handleAddImageCard}
          />
        </Popover>
      )}
    </>
  );
};
