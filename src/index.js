import './scss/index.scss';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PreviewProvider, SliderProvider } from './providers';
import { store } from './store';
import { App } from './App';

const $root = document.querySelector('#root');
const root = createRoot($root);

root.render(
  <Provider store={store}>
    <PreviewProvider>
      <SliderProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SliderProvider>
    </PreviewProvider>
  </Provider>
);
