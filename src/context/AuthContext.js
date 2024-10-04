import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserOrganisations } from '../helpers/organisationsHelper';

const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));
  const [organisations, setOrganisations] = useState([]);
  const [currentOrgId, setCurrentOrgId] = useState(JSON.parse(sessionStorage.getItem('currentOrgId')));

  const login = (data) => {
    const userData = {
      userId: data.user.userid,
      userName: data.user.username,
      mobileno: data.user.mobileno,
      email: data.user.email,
    };
    setUser(userData);
    setCurrentOrgId(data.organisations[0]?.organisationid);

    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  useEffect(() => {
    if (!currentOrgId) {
      setCurrentOrgId(organisations[0]?.organisationid);
    }
  }, [organisations]);

  useEffect(() => {
    (async () => {
      if (!user?.userId) return;
      const { data, error } = await getUserOrganisations(user.userId);
      if (!error) setOrganisations(data);
    })();
  }, [user?.userId]);

  useEffect(() => {
    if (!currentOrgId) return;
    sessionStorage.setItem('currentOrgId', JSON.stringify(currentOrgId));
  }, [currentOrgId]);

  const isLoggedIn = () => {
    if (user.userId) {
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <AuthContext.Provider
      value={{ user, login, isLoggedIn, logout, organisations, setOrganisations, setCurrentOrgId, currentOrgId }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };

const useAuthContext = () => useContext(AuthContext);

export default useAuthContext;
