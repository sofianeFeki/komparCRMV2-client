import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { currentUser } from '../functions/user';
import { auth } from '../services/firebase';

const UserProvider = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
            const idTokenResult = await user.getIdTokenResult();
            console.log(idTokenResult)
            currentUser(idTokenResult.token)
              .then((res) => {
                console.log('rsssss', res.data)

                dispatch({
                  type: 'LOGGED_IN_USER',
                  payload: {
                    email: res.data.email,
                    name : res.data.name,
                    token: idTokenResult.token,
                    role: res.data.role,
                    _id: res.data._id,
                  },
                });
              })
              .catch((err) => console.log('here the',err));
          } else {
            dispatch({
              type: 'LOGGED_OUT_USER',
            });
          }
    });

    return unsubscribe;
  }, [dispatch]);

  return <>{children}</>;
};

export default UserProvider;
