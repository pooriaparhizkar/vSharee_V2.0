import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'utilities/styles/index.scss';
import Vsharee from './vsharee/vsharee.index';
function App() {
    return (
        <Provider store={store}>
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
        </Provider>
    );
}

export default App;
