import React, { createContext, useState } from "react";
import Cookies from "js-cookie";
import { api } from "../utils/apiHelper";

const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [authUser, setAuthUser] = useState(() => {
    const cookie = Cookies.get('authenticatedUser');
    return cookie ? JSON.parse(cookie) : null;
  });

  const signIn = async (credentials) => {
    try {
      const response = await api("/users", 'GET', null, credentials);

      if (response.status === 200) {
        const user = await response.json();
        user.password = credentials.password;

        setAuthUser(user);

        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        console.log(`${user.emailAddress} is now successfully signed in`);
        return user;
      } else if (response.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error("Unexpected error");
      }
    } catch (error) {
      console.error("Error signing in:", error);
      return null;
    }
  };

  const signOut = () => {
    setAuthUser(null);
    Cookies.remove("authenticatedUser");
  };

  return (
    <UserContext.Provider value={{ authUser, actions: { signIn, signOut } }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;