// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './redux/store.ts';
import ProviderContext from './Context/Provider.tsx';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ProviderContext>
      <App />
    </ProviderContext>
  </Provider>
)
