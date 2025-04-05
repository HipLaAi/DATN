import { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import route from './router/router';
import GlobalStyles from './component/GlobalStyles/GlobalStyles';
import { HappyProvider } from '@ant-design/happy-work-theme';
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "773369221523-4bujhgj3bk7a4loqcg0esca548te61kf.apps.googleusercontent.com"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <HappyProvider>
        <GlobalStyles>
          <RouterProvider router={route} />
        </GlobalStyles>
      </HappyProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
