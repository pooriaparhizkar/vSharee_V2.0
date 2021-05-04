import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vsharee from './vsharee/vsharee.index';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import 'utilities/styles/index.scss';
function App() {
    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });
    return (
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <Vsharee />
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </ThemeProvider>
        </Provider>
    );
}

export default App;
