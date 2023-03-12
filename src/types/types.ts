export type Message = string;

export type Type = string;

export type RenderElementsProps = {
  className?: string;
  id?: string;
  onChange?: () => void;
  onClick?: () => void;
  placeholder?: string;
  src?: string;
  style?: { [key: string]: string };
};
