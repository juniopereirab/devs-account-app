import { useEffect } from "react";
import { useSelector } from "react-redux";
import Layout from "../../Components/Layout";
import { useHistory } from 'react-router'

const SecurePage = () => {
    const user = useSelector((state) => state)
    const history = useHistory()
    
    useEffect(() => {
        const data = user as any
        if(data){
            if(!data.auth.user.loggedIn) {
                history.push('/')
            }
        }
    }, [user, history])
    return (
        <Layout>
            <div>this is a secure page</div>
        </Layout>
    );
};

export default SecurePage;
