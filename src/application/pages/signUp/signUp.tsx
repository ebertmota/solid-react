import React from 'react';
import {
  Input,
  FormStatus,
  Footer,
  LoginHeader,
} from '@/application/components';
import Context from '@/application/contexts/form/form-context';
import { Link } from 'react-router-dom';
import Styles from './signUp-styles.scss';

export const SignUp: React.FC = () => {
  return (
    <div className={Styles.signUp}>
      <LoginHeader />
      <Context.Provider value={{ state: {} }}>
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
            name="password_confirmation"
            placeholder="Confirme sua senha"
          />
          <button className={Styles.submit} type="submit">
            Entrar
          </button>
          <Link to="/login" className={Styles.link}>
            Voltar para Login
          </Link>
          <FormStatus />
        </form>
        <Footer />
      </Context.Provider>
    </div>
  );
};
