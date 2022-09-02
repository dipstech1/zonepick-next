import React from "react";

const GlobalContext = React.createContext({
  data: [],
  update: (data) => {},
});

export default GlobalContext;
