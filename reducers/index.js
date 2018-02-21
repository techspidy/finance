import { combineReducers } from 'redux';
import userReducer from './User';
import createInvoiceReducer from './CreateInvoiceRed';
import invoiceReducer from './InvoiceReducer';
import rolesReducer from './Roles';
import UserRegistration from './UserRegistration';

const rootReducer = combineReducers({
	userReducer,
	createInvoiceReducer,
	invoiceReducer,
	rolesReducer,
    userRegisterReducer: UserRegistration,
});

export default rootReducer;