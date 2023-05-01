import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../functions/user';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // add a loading state
  const {user} = useSelector((state) => ({...state}))
  const history = useNavigate()

  
  

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
          setLoading(false); 
    });

    return unsubscribe;
  }, [dispatch]);
  
  useEffect(() => {
    if (!user) {
      history('/login');
    } 
  }, [history]);
 
  if (loading) {
    return <div>Loading...</div>; // show loading message
  }

  return <>{children}</>;
};

export default UserProvider;
