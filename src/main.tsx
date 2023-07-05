import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './providers/auth/AuthContext';
import { ContactProvider } from './providers/contact/ContactContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
         <AuthProvider>
            <ContactProvider>
                <App />
            </ContactProvider> 
         </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


