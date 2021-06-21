import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import {
  setAuthenticationFailed,
  setFetchingEnd,
  setFetchingStart,
  setUserData,
} from "../store/user";

const useAuth = () => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      dispatch(setFetchingStart());

      await fetch(`${import.meta.env.VITE_API_URL}/session`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
        .then((response) => {
          if (response.status >= 200 && response.status <= 299) {
            return response.json();
          } else {
            throw Error(response.statusText);
          }
        })
        .then((data) => {
          dispatch(setUserData(data));
        })
        .catch((error) => {
          dispatch(setAuthenticationFailed());
          console.log(error);
        })
        .finally(() => {
          dispatch(setFetchingEnd());
        });
    };

    fetchUser();
  }, []);

  return { isAuthenticated, isLoading };
};

export default useAuth;
