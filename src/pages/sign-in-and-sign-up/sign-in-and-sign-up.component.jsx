import React from 'react';
import './sign-in-and-sign-up.styles.scss';
import SingIn from '../../components/sign-in/sign-in.component';
import SingUp from '../../components/signup/signup.component';

const SignInAndSignUpPage = () => {
    return(
        <div className="sign-in-and-sign-up">
            <SingIn/>
            <SingUp/>
        </div>
    )
}


export default SignInAndSignUpPage;