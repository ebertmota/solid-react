/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import Context from '@/application/contexts/form/form-context';
import Styles from './input-styles.scss';

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input: React.FC<Props> = props => {
  const { state, setState } = useContext(Context);
  const error = state[`${props.name}Error`];

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
      data-testid={`${props.name}-wrap`}
    >
      <input
        {...props}
        placeholder=" "
        id={props.name}
        title={error}
        data-testid={props.name}
        readOnly
        onFocus={event => {
          event.target.readOnly = false;
        }}
        onChange={handleChange}
      />

      <label
        htmlFor={props.name}
        title={error}
        data-testid={`${props.name}-label`}
      >
        {props.placeholder}
      </label>
    </div>
  );
};
