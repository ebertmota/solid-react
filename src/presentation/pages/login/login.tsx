import React, { useEffect, useState } from 'react';
import {
  Input,
  FormStatus,
  Footer,
  LoginHeader,
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols';
import Styles from './login-styles.scss';

type LoginProps = {
  validation: Validation;
};

export const Login: React.FC<LoginProps> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    defaultError: '',
  });

  useEffect(() => {
    validation.validate({
      email: state.email,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.email]);

  useEffect(() => {
    validation.validate({
      password: state.password,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.password]);

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="submit"
            disabled
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <span className={Styles.link}>Crie sua conta</span>
          <FormStatus />
        </form>
        <Footer />
      </Context.Provider>
    </div>
  );
};
