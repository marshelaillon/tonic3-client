import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './state/store';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
// import * as serviceWorker from "./service-worker";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ReCAPTCHA from 'react-google-recaptcha';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import httpApi from 'i18next-http-backend';
import 'flag-icon-css/css/flag-icons.min.css';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(httpApi)
  .init({
    supportedLngs: ['en', 'es', 'pt', 'ru'],
    fallbackLng: 'en',
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'localStorage'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/assets/locales/{{lng}}/translation.json',
    },
  });

const loadingMarkup = (
  <div>
    <h2
      style={{
        color: '#fff',
        marginTop: '1rem',
        marginLeft: '1rem',
      }}
    >
      Loading...
    </h2>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={loadingMarkup}>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </Suspense>
);

serviceWorkerRegistration.register();
// serviceWorkerRegistration.unregister();

// serviceWorkerRegistration.register({
//   onUpdate: async registration => {
//     console.log('Te registraste al service worker');
//     // Detalles en: https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle
//     if (registration && registration.waiting) {
//       await registration.unregister();
//       registration.waiting.postMessage({ type: 'SKIP_WAITING' });
//       // Des-registramos el SW para recargar la página y obtener la nueva versión. Lo cual permite que el navegador descargue lo nuevo y que invalida la cache que tenía previamente.
//       window.location.reload();
//     }
//   },
// });
