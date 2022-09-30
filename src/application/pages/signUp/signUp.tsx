import React, { useEffect, useState } from 'react';
import {
  Input,
  FormStatus,
  Footer,
  LoginHeader,
} from '@/application/components';
import Context from '@/application/contexts/form/form-context';
import { Validation } from '@/application/protocols';
import Styles from './signUp-styles.scss';

type LoginProps = {
  validation: Validation;
};

export const SignUp: React.FC<LoginProps> = ({ validation }) => {
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: 'Campo obrigatório',
    defaultError: '',
  });

  useEffect(() => {
    setState(currentState => ({
      ...currentState,
      nameError: validation.validate('name', state.nameError),
      emailError: validation.validate('email', state.emailError),
      passwordError: validation.validate('password', state.passwordError),
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.name, state.email, state.password]);

  return (
    <div className={Styles.signUp}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form className={Styles.form}>
          <h2>Criar conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
          <Input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirme sua senha"
          />
          <button
            data-testid="submit"
            disabled
            className={Styles.submit}
            type="submit"
          >
            Entrar
          </button>
          <span className={Styles.link}>Voltar para Login</span>
          <FormStatus />
        </form>
        <Footer />
      </Context.Provider>
    </div>
  );
};
