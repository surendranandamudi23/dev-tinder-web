import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Body from "./Page/Body";
import AuthApp from "./Page/Login";
import { Provider } from "react-redux";
import store from "./store";
import Feed from "./Page/Feed";
import ProfileEditPage from "./Page/ProfileEditPage ";
import ChangePasswordPage from "./Page/ChangePasswordPage";
import ConnectionsPage from "./Page/ConnectionsPage";
import Requests from "./Page/Requests";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route index element={<Feed />} />
              <Route path="/login" element={<AuthApp />} />
              <Route path="/profile" element={<ProfileEditPage />} />
              <Route path="/changepassword" element={<ChangePasswordPage />} />
              <Route path="/connections" element={<ConnectionsPage />} />
              <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
