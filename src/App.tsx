import { useEffect } from "react";
import "./App.scss";

import HomePage from "./Pages/Home";
import { auth, userDb } from "./Firebase/firebase";
import { setUser } from "./Redux/User/actions";
import { setAllUsers } from "./Redux/AllUsers/actions";
import { useAppDispatch } from "./Redux/hooks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(state => {
      if (state) {
        localStorage.setItem(
          "chatUser",
          JSON.stringify({
            displayName: state.displayName,
            email: state.email,
            photoURL: state.photoURL,
            uid: state.uid,
          })
        );

        dispatch(
          setUser({
            uid: state.uid,
            name: state.displayName,
            email: state.email,
            photo: state.photoURL,
          })
        );
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
  }, [dispatch]);

  return (
    <div className='App'>
      <HomePage />
    </div>
  );
}

export default App;
