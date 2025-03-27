import ReactDOM from "react-dom/client";
import App from "src/App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistor } from "src/redux/store.tsx";
import { PersistGate } from "redux-persist/integration/react";
import "flowbite/dist/flowbite.css";
import {NextUIProvider} from '@nextui-org/react'
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <NextUIProvider>
        <App />
        </NextUIProvider>
      </PersistGate>
    </Provider>
  );
}
