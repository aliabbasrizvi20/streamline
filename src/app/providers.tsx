"use client";

import { Provider } from "react-redux";

import { store } from "./redux/store";

import PersistFavorites
  from "./providers/PersistFavorites";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <PersistFavorites />
      {children}
    </Provider>
  );
}