interface Props {
  border?: number;
  color?: string;
}

export const HorizontalBar = (props: Props) => {
  const { border = 1, color = "#E6E6E6" } = props;

  return (
    <label
      style={{ width: "100%", border: `${border}px solid ${color}` }}
    ></label>
  );
};
