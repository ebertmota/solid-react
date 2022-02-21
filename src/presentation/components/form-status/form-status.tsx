import React, { useContext } from 'react';
import Context from '@/presentation/contexts/form/form-context';
import { Spinner } from '../spinner/spinner';
import Styles from './form-status-styles.scss';

export const FormStatus: React.FC = () => {
  const { state, errors } = useContext(Context);

  return (
    <div className={Styles.errorWrap} data-testid="error-wrap">
      {state.isLoading && <Spinner className={Styles.spinner} />}
      {errors.default && <span className={Styles.error}>{errors.default}</span>}
    </div>
  );
};
