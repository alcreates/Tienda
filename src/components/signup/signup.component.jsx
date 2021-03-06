import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import './signup.styles.scss';



class SignUp extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }
    handleSubmit = async event => {
        event.preventDefault();
        const {displayName, email, password, confirmPassword} = this.state;
        if(password !== confirmPassword) {
            alert(`Passwords don't match`)
            return
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);
            createUserProfileDocument(user, {displayName});
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = (event) => {
        const {value, name} = event.target;

        this.setState({
            [name] : value
        })
    }


    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return(
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput 
                    type='text'
                    label='Displayname' 
                    name='displayName' 
                    value={displayName}
                    onChange={this.handleChange}
                    >
                    </FormInput>
                    <FormInput 
                    type='email' 
                    label='Email'
                    name='email' 
                    value={email}
                    onChange={this.handleChange}
                    >
                    </FormInput>
                    <FormInput 
                    type='password' 
                    name='password' 
                    label='Password'
                    value={password}
                    onChange={this.handleChange}
                    >
                    </FormInput>
                    <FormInput 
                    type='password' 
                    label='Confirm Password'
                    name='confirmPassword' 
                    value={confirmPassword}
                    onChange={this.handleChange}
                    >
                    </FormInput>
                    <CustomButton type="submit">Sign Up</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;