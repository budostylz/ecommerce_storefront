import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Import global styles from public folder
import './origin/base/web/css/bootstrap.min.css';
import './origin/base/web/css/font-awesome.min.css';
import './origin/base/web/css/elegant-icons.css';
import './origin/base/web/css/jquery-ui.min.css';
import './origin/base/web/css/magnific-popup.css';
import './origin/base/web/css/owl.carousel.min.css';
import './origin/base/web/css/slicknav.min.css';
import './origin/base/web/css/style.css';


import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
