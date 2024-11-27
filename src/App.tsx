import React from "react";
import { AppRouter } from "./routes/Router";
import { ProfileProvider } from "./context/ProfileContext";

const App: React.FC = () => (
  <ProfileProvider>
    <AppRouter />
  </ProfileProvider>
);

export default App;
