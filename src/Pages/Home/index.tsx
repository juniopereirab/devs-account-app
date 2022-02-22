import { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "../../Components/EditProfile";

import Layout from "../../Components/Layout";

const Auth = lazy(() => import("../../Modules/Auth"));

const HomePage = () => {
    const user = useSelector((state) => state)
    const [logged, setLogged] = useState(false)
    
    useEffect(() => {
        const data = user as any
        if(data){
            if(data.auth.user.loggedIn) {
                setLogged(true)
            }
            else {
                setLogged(false)
            }
        }
    }, [user])

    return (
        <Layout>
            {logged ? <EditProfile /> : <Auth /> }
        </Layout>
    );
};

export default HomePage;
