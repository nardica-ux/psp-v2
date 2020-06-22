import React, { createContext } from "react";
import { connect } from "react-redux";

const activeTab = {
  0: 1,
  1: 1,
  2: 1,
};
const storeTabState = createContext(activeTab);

export default storeTabState;
