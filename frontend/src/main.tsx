import { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import route from './router/router';
import GlobalStyles from './component/GlobalStyles/GlobalStyles';
import { HappyProvider } from '@ant-design/happy-work-theme';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from './store/userStore';

const clientId = import.meta.env.VITE_GG_CLIENT_ID as string;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={clientId}>
        <HappyProvider>
          <GlobalStyles>
            <RouterProvider router={route} />
          </GlobalStyles>
        </HappyProvider>
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>,
);
