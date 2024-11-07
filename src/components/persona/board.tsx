import "./_persona.scss";
import "../editable_card/index";
import { EditableCard } from "../editable_card/index";
import { useEffect, useRef, useState } from "react";
import dragula from "dragula";
import "dragula/dist/dragula.css";
import { VerticalBar } from "../vertical_bar";
import { ImageCard } from "../image_card";
import { PersonaNameCard } from "./persona_name_card";
import { initContent } from "./init_card_content";
import { HoverArea } from "./hover_area";
import { CardKind, CardType } from "../../constants/card";

interface Props {
  isEditable?: boolean;
}

export const Board = (props: Props) => {
  const { isEditable } = props;
  const [leftCards, setLeftCards] = useState<CardType[]>([]);
  const [rightCards, setRightCards] = useState<CardType[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const drakeRef = useRef<dragula.Drake | null>(null);
  const deleteAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const left = document.getElementById("left");
    const right = document.getElementById("right");

    if (left && right && deleteAreaRef.current) {
      drakeRef.current = dragula([left, right, deleteAreaRef.current], {
        moves: (el) => {
          return el ? !el.classList.contains("no-drag") : false;
        },
        accepts: (el, target, source, sibling) => {
          if (target?.classList.contains("delete-area")) {
            setIsDeleting(true);
            return true;
          } else {
            setIsDeleting(false);
          }
          if (!sibling || sibling.classList.contains("popover-empty"))
            return false;
          return true;
        },
      });

      drakeRef.current.on("drag", (el) => {
        setIsDragging(true);
      });

      drakeRef.current.on("drop", (el, target) => {
        setIsDragging(false);
      });

      drakeRef.current.on("cancel", () => {
        setIsDragging(false);
      });

      return () => {
        drakeRef.current?.destroy();
      };
    }
  }, []);

  const renderCards = (cards: CardType[]) => {
    const renderCard = (card: CardType) => {
      switch (card.type) {
        case CardKind.IMAGE_CARD:
          return (
            <ImageCard key={card.id} id={card.id} type={CardKind.IMAGE_CARD} />
          );
        case CardKind.TEXT_CARD:
          return (
            <EditableCard
              key={card.id}
              id={card.id}
              type={CardKind.TEXT_CARD}
              roomName={`quill-demo-room-${card.id}`}
              isEditable={isEditable}
              openEdit
            />
          );
      }
    };
    return <>{cards.map((card) => renderCard(card))}</>;
  };

  const addLeftTextCard = () => {
    setLeftCards([...leftCards, { id: Date.now(), type: CardKind.TEXT_CARD }]);
  };

  const addLeftImageCard = () => {
    setLeftCards([...leftCards, { id: Date.now(), type: CardKind.IMAGE_CARD }]);
  };

  const addRightTextCard = () => {
    setRightCards([
      ...rightCards,
      { id: Date.now(), type: CardKind.TEXT_CARD },
    ]);
  };

  const addRightImageCard = () => {
    setRightCards([
      ...rightCards,
      { id: Date.now(), type: CardKind.IMAGE_CARD },
    ]);
  };

  return (
    <div className="board">
      <div
        ref={deleteAreaRef}
        className="delete-area container"
        style={{
          ...(isDragging ? { display: "flex" } : { display: "none" }),
          ...(isDeleting
            ? { backgroundColor: "#ff0000bb" }
            : { backgroundColor: "#ff000088" }),
        }}
      >
        <div className="empty-area"></div>
      </div>
      <div id="left" className="container">
        <ImageCard id={1001} type={CardKind.IMAGE_CARD} />
        {renderCards(leftCards)}
        <HoverArea
          isDragging={isDragging}
          addTextCard={addLeftTextCard}
          addImageCard={addLeftImageCard}
        />
      </div>
      <VerticalBar />
      <div id="right" className="container">
        <PersonaNameCard />
        <EditableCard
          id={1002}
          type={CardKind.TEXT_CARD}
          roomName="quill-demo-room-1"
          isEditable={isEditable}
          initialContent={initContent}
          openEdit={false}
        />
        {renderCards(rightCards)}
        <HoverArea
          isDragging={isDragging}
          addTextCard={addRightTextCard}
          addImageCard={addRightImageCard}
        />
      </div>
    </div>
  );
};
