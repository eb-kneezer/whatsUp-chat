import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import "./App.scss";
import * as ROUTES from "./Constants/routes";

import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import { auth, userDb } from "./Firebase/firebase";
import { setUser } from "./Redux/User/actions";
import { setAllUsers } from "./Redux/AllUsers/actions";
import { useAppDispatch } from "./Redux/hooks";

function App() {
  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
    auth.onAuthStateChanged(state => {
      if (state) {
        localStorage.setItem("chatUser", JSON.stringify(state));

        dispatch(
          setUser({
            uid: state.uid,
            name: state.displayName,
            email: state.email,
            photo: state.photoURL,
          })
        );
        history.push("/home");
      } else {
        localStorage.removeItem("chatUser");
        dispatch(
          setUser({
            uid: "",
            name: "",
            email: "",
            photo: "",
          })
        );
      }
    });

    userDb.ref("users").on("value", snap => {
      const usersObj = snap.val();
      const usersList =
        usersObj &&
        Object.keys(usersObj).map(key => ({
          ...usersObj[key],
        }));
      dispatch(setAllUsers(usersList));
    });
  }, [dispatch, history]);

  return (
    <div className='App'>
      <Switch>
        <Route path={ROUTES.LOGIN} component={LoginPage} exact />
        <IconContext.Provider value={{ className: "react-icons" }}>
          <Route path={ROUTES.HOME} component={HomePage} exact />
        </IconContext.Provider>
      </Switch>
    </div>
  );
}

export default App;
