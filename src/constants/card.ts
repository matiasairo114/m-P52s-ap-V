export enum CardKind {
  IMAGE_CARD = "IMAGE_CARD",
  TEXT_CARD = "TEXT_CARD",
}

export type CardType = {
  id: number;
  type: CardKind;
};
