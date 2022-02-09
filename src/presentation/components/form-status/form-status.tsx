import React, { useContext } from 'react';
import Context from '@/presentation/contexts/form/form-context';
import { Spinner } from '../spinner/spinner';
import Styles from './form-status-styles.scss';

export const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(Context);

  return (
    <div className={Styles.errorWrap} data-testid="error-wrap">
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>Error</span>}
    </div>
  );
};
