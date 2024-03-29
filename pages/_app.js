import '../styles/globals.css';
import '../styles/app.css';
import { Provider } from 'react-redux';
import { store } from '../store.js';

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
