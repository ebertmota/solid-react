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
import { AddAccount, SaveAccessToken } from '@/domain/usecases';
import { useNavigate, Link } from 'react-router-dom';
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
    isFormInvalid: true,
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
    const { name, email, password, passwordConfirmation } = state;
    const nameError = validation.validate('name', { name });
    const emailError = validation.validate('email', { email });
    const passwordError = validation.validate('password', { password });
    const passwordConfirmationError = validation.validate(
      'passwordConfirmation',
      { passwordConfirmation },
    );

    setState(currentState => ({
      ...currentState,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid:
        !!nameError ||
        !!emailError ||
        !!passwordError ||
        !!passwordConfirmationError,
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.name, state.email, state.password, state.passwordConfirmation]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (state.isLoading || state.isFormInvalid) {
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
          <SubmitButton disabled={state.isFormInvalid} text="Cadastrar" />
          <Link to="/login" data-testid="login" className={Styles.link}>
            Voltar para Login
          </Link>
          <FormStatus />
        </form>
        <Footer />
      </Context.Provider>
    </div>
  );
};
