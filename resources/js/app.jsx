require('./bootstrap');

import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"

import { Router } from './components/Router';
import { AuthProvider } from './hooks/AuthContext'

import { Hoge } from './Hoge';

const queryClient = new QueryClient()

const App = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Router/>
      </QueryClientProvider>
      <Hoge/>
    </AuthProvider>
  );
};

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}