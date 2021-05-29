import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/globals.css";
import { Provider as AuthProvider } from "next-auth/client";
import StorageService from "../services/StorageService";
import { hydrate } from "../slices/basketSlice";
import AOS from "aos";
import "aos/dist/aos.css";
import useDarkMode from "../hooks/useDarkMode";


store.subscribe(() => {
  StorageService.set("basket", JSON.stringify(store.getState().basket));
});

let basket = StorageService.get("basket");
basket = basket ? JSON.parse(basket) : { items: [] };
store.dispatch(hydrate(basket));

if (typeof window === "object") {
  AOS.init();
}

const MyApp = ({ Component, pageProps }) => {
  useDarkMode();


  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
};

export default MyApp;
