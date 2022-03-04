import React, { useEffect, useState } from 'react';
import {
  Input,
  FormStatus,
  Footer,
  LoginHeader,
} from '@/presentation/components';
import Context from '@/presentation/contexts/form/form-context';
import { Validation } from '@/presentation/protocols';
import { Authentication } from '@/domain/usecases';
import Styles from './login-styles.scss';

type LoginProps = {
  validation: Validation;
  authentication: Authentication;
};

export const Login: React.FC<LoginProps> = ({ validation, authentication }) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    defaultError: '',
  });

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.email, state.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.emailError || state.passwordError) {
        return;
      }
      setState(currentState => ({ ...currentState, isLoading: true }));
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });

      localStorage.setItem('accessToken', account.accessToken);
    } catch (error) {
      setState(currentState => ({
        ...currentState,
        isLoading: false,
        defaultError: error.message,
      }));
    }
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <button
            data-testid="submit"
            disabled={Boolean(state.emailError || state.passwordError)}
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
