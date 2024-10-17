import { getSlice } from "config/utility/redux.utility";
import { types } from "./root.action";

const userLoginDetailsSlice = getSlice(types.USER_LOGIN_DETAILS);
const getAdminDetailsSlice = getSlice(types.GET_ADMIN_DETAILS);
const checkAdminSlice = getSlice(types.CHECK_ADMIN);
const addAdminSlice = getSlice(types.ADD_ADMIN);

export { userLoginDetailsSlice, getAdminDetailsSlice, checkAdminSlice, addAdminSlice };
