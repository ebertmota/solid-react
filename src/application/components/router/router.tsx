import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

type Props = {
  Login: React.FC;
};

export const Router: React.FC<Props> = ({ Login }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};
