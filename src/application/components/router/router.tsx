import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignUp } from '@/application/pages';

type Props = {
  Login: React.FC;
};

export const Router: React.FC<Props> = ({ Login }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};
