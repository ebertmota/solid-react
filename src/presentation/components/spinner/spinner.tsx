/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Styles from './spinner-styles.scss';

type Props = React.HTMLAttributes<HTMLElement>;

export const Spinner: React.FC<Props> = props => {
  return (
    <div
      {...props}
      className={[Styles.spinner, props.className].join(' ')}
      data-testid="spinner"
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};
