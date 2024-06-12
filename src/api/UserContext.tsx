import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserContextProps {
  userId: number | null;
  role: string | null;
  setUserId: (userId: number | null) => void;
  setRole: (role: string | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);
export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userId, setUserIdState] = useState<number | null>(null);
  const [role, setRoleState] = useState<string | null>(null);

  const setUserId = (newUserId: number | null) => {
    setUserIdState(newUserId);
  };

  const setRole = (newRole: string | null) => {
    setRoleState(newRole);
  };

  return (
    <UserContext.Provider value={{ userId, role, setUserId, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
