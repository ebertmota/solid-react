import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

type Props = {
  Login: React.FC;
  SignUp: React.FC;
};

export const Router: React.FC<Props> = ({ Login, SignUp }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};
