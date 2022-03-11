import React, { useContext } from 'react';
import Context from '@/application/contexts/form/form-context';
import { Spinner } from '@/application/components/spinner/spinner';
import Styles from './form-status-styles.scss';

export const FormStatus: React.FC = () => {
  const { state } = useContext(Context);
  const { isLoading, defaultError } = state;

  return (
    <div className={Styles.errorWrap} data-testid="error-wrap">
      {isLoading && <Spinner className={Styles.spinner} />}
      {defaultError && (
        <span data-testid="default-error" className={Styles.error}>
          {defaultError}
        </span>
      )}
    </div>
  );
};
