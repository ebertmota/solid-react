import React, { useState } from 'react';
import {
  Input,
  FormStatus,
  Footer,
  LoginHeader,
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import Styles from './login-styles.scss';

export const Login: React.FC = () => {
  const [state] = useState({
    isLoading: false,
  });

  const [errors] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    default: '',
  });

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, errors }}>
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
