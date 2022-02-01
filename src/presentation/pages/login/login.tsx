import React from 'react';
import Styles from './login-styles.scss';
import {
  Input,
  FormStatus,
  Footer,
  LoginHeader,
} from '@/presentation/components';

export const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />

      <form className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button className={Styles.submit} type="submit">
          Entrar
        </button>
        <span className={Styles.link}>Crie sua conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  );
};
