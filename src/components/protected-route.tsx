import { Navigate, useLocation } from "react-router-dom";
import { home } from "../utils/constants";
import { useAppSelector } from "../services";
import { FC } from "react";

interface IProtectedProps {
  onlyUnAuth: boolean;
  component: JSX.Element
}

const Protected: FC<IProtectedProps> = ({ onlyUnAuth = false, component }: IProtectedProps) => {
  const isAuthChecked = useAppSelector((state) => state.rootReducer.userReducer.isAuthChecked);
  const user = useAppSelector((state) => state.rootReducer.userReducer.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: home } };
    return <Navigate to={from} />
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (<>{component}</>);
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: IProtectedProps) => (
  <Protected onlyUnAuth={true} component={component} />
);