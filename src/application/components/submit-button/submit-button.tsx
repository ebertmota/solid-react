import React from 'react';

type SubmitButtonProps = {
  text: string;
} & React.HTMLProps<HTMLButtonElement>;

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  text,
  ...htmlButtonProps
}) => {
  return (
    <button data-testid="submit" {...htmlButtonProps} type="submit">
      {text}
    </button>
  );
};
