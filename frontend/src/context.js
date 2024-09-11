import { createContext } from "react";
const UserContext = createContext({ user: undefined, setUser: (user) => {} });
export default UserContext;
