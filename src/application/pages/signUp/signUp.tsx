import React, { useEffect, useState } from 'react';
import {
  Input,
  FormStatus,
  Footer,
  LoginHeader,
} from '@/application/components';
import Context from '@/application/contexts/form/form-context';
import { Validation } from '@/application/protocols';
import { AddAccount, SaveAccessToken } from '@/domain/usecases';
import { useNavigate } from 'react-router-dom';
import Styles from './signUp-styles.scss';

type SignUpProps = {
  validation: Validation;
  addAccount: AddAccount;
  saveAccessToken: SaveAccessToken;
};

export const SignUp: React.FC<SignUpProps> = ({
  validation,
  addAccount,
  saveAccessToken,
}) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    isLoading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    defaultError: '',
  });

  useEffect(() => {
    setState(currentState => ({
      ...currentState,
      nameError: validation.validate('name', state.nameError),
      emailError: validation.validate('email', state.emailError),
      passwordError: validation.validate('password', state.passwordError),
      passwordConfirmationError: validation.validate(
        'passwordConfirmation',
        state.passwordConfirmationError,
      ),
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.name, state.email, state.password, state.passwordConfirmation]);

  const buttonIsDisabled = Boolean(
    state.nameError ||
      state.emailError ||
      state.passwordError ||
      state.passwordConfirmationError,
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      state.isLoading ||
      state.nameError ||
      state.emailError ||
      state.passwordError ||
      state.passwordConfirmationError
    ) {
      return;
    }

    setState(currentState => ({
      ...currentState,
      isLoading: true,
    }));

    try {
      const { email, name, password } = state;
      const { accessToken } = await addAccount.add({
        email,
        name,
        password,
        password_confirmation: password,
      });

      await saveAccessToken.save({ accessToken });
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
    <div className={Styles.signUp}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form
          data-testid="form"
          className={Styles.form}
          onSubmit={handleSubmit}
        >
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
            disabled={buttonIsDisabled}
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
