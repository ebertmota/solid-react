import React, { useEffect, useState } from 'react';
import {
  Input,
  FormStatus,
  Footer,
  LoginHeader,
  SubmitButton,
} from '@/application/components';
import Context from '@/application/contexts/form/form-context';
import { Validation } from '@/application/protocols';
import { Authentication, SaveAccessToken } from '@/domain/usecases';
import { Link, useNavigate } from 'react-router-dom';
import { UnexpectedError } from '@/domain/errors';
import Styles from './login-styles.scss';

type LoginProps = {
  validation: Validation;
  authentication: Authentication;
  saveAccessToken: SaveAccessToken;
};

export const Login: React.FC<LoginProps> = ({
  validation,
  authentication,
  saveAccessToken,
}) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    defaultError: '',
  });

  useEffect(() => {
    const { email, password } = state;
    const emailError = validation.validate('email', { email });
    const passwordError = validation.validate('password', { password });

    setState(currentState => ({
      ...currentState,
      emailError,
      passwordError,
      isFormInvalid: !!emailError || !!passwordError,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.email, state.password]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    try {
      if (state.isLoading || state.isFormInvalid) {
        return;
      }
      setState(currentState => ({ ...currentState, isLoading: true }));
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      });

      if (!account?.accessToken) {
        throw new UnexpectedError();
      }

      await saveAccessToken.save({
        accessToken: account.accessToken,
      });
      navigate('/', {
        replace: true,
      });
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
          <SubmitButton disabled={state.isFormInvalid} text="Entrar" />
          <Link to="/signup" data-testid="signup" className={Styles.link}>
            Crie sua conta
          </Link>
          <FormStatus />
        </form>
        <Footer />
      </Context.Provider>
    </div>
  );
};
