import { useContext } from 'react';
import AuthContext from '../contexts/jwt-auth-context';

export const AuthConsumer = AuthContext.Consumer;

const useAuth = () => useContext(AuthContext);

export default useAuth;
