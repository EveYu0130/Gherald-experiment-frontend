import React, { createContext, useContext, useState } from "react";
import { useTranslation } from 'react-i18next';

// export const Auth = {
//     isAuthenticated: false,
//     signin(cb) {
//         Auth.isAuthenticated = true;
//         setTimeout(cb, 100);
//     },
//     signout(cb) {
//         Auth.isAuthenticated = false;
//     }
// };

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const { t } = useTranslation();
    const [error, setError] = useState("");
    // localStorage.clear();

    const signin = (id) => {
        fetch(`/api/participants/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(response => {
            if  (response.status === 200) {
                return response.json();
            } else {
                throw t('participant_id_invalid');
            }
        }).then(data => {
            if (data.completed) {
                throw t('already_participated');
            }
            setUser({
                id: data.id,
                group: data.tool,
                project: data.project
            })
            localStorage.setItem("user", JSON.stringify(data));
            // console.log(JSON.stringify(data));
        }).catch(error => {
            console.log(error);
            setError(error);
        });
    };

    const signout = () => {
        setUser(null);
    };

    return {
        user,
        error,
        setUser,
        signin,
        signout
    };
}
