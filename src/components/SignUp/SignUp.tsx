import React from 'react';
import backgroundImageStyling from '../../styles/backgroundImageStyling'
import {Button, Form} from "react-bootstrap";
import './SignUp.css';
import Image from "../../utils/Image";
import {Link, RouteComponentProps} from "react-router-dom";
import {createUser, SignUpState, findUser} from "./SignUpApi";


//require any images
const logo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();


interface SignUpProps extends RouteComponentProps<{}>{}

function UserAlreadyExists(props: { userExists: boolean; }){
    const userExists = props.userExists;
    if(userExists){
        return <p id={'incorrectSignUp'}>Error creating new user</p>
    }
    return null
}

function PasswordMismatch(props: {passwordMismatch: boolean}){
    const passwordMismatch = props.passwordMismatch;
    if(passwordMismatch){
        return <p id={'incorrectSignUp'}>Passwords do not match</p>
    }
    return null
}

class SignUp extends React.Component<SignUpProps, SignUpState> {

    constructor(props: any) {
        super(props);
        this.state={
            userCreateFail: false,
            userCreateSuccess: false,
            passwordMismatch: false,
            data:{
                firstName: '',
                lastName: '',
                username: '',
                password: '',
                verifyPassword: '',
                email: ''
            }
        }
    }

    componentDidMount() {
        setTimeout(function () {
            // @ts-ignore, object could possibly be null
            document.getElementById('signUpBox').classList.add('fade-in');
        }, 1)
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const signUp = this.state.data;
        const signUpData = {
            ...signUp,
            [e.target.name]: e.target.value
        }
        this.setState({data: signUpData});
    }

    handleSubmit = async (e: React.FormEvent)=> {
        e.preventDefault();

        //First make sure the user doesn't exist
        let response = await findUser(this.state.data.username);
        if(response.Status){
            //Error flag, make sure to set a display here if it fails
            this.setState({userCreateFail: true});
            return null;
        }

        //Verify the passwords were the same
        if(this.state.data.password !== this.state.data.verifyPassword){
            this.setState({passwordMismatch: true});
            return null;
        }

        //Create user and redirect to login
        response = await createUser(this.state.data);
        if(response.id){

            this.props.history.push('/');
        }
        this.setState({userCreateFail: true});

        //Create an error here if response was null or something bad occurred
        return null
    }

    render() {
        return(
            <section style={background}>
                <div id="signUpBox">
                    <Form onSubmit={this.handleSubmit}>
                        <Image id='signUplogo' src={String(logo)} alt='Swarm Robotics Logo'/>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className={'text-center signUpText'}>First Name</Form.Text>
                            <Form.Control className={'signUpTextInput text-center'}
                                          name={"firstName"} onChange={this.handleChange}
                                          type="firstName" required placeholder="First Name" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className={'text-center signUpText'}>Last Name</Form.Text>
                            <Form.Control className={'signUpTextInput text-center'}
                                          name={"lastName"} onChange={this.handleChange}
                                          type="lastName" required placeholder="Last Name" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className={'text-center signUpText'}>Email address</Form.Text>
                            <Form.Control className={'signUpTextInput text-center'}
                                          name={"email"} onChange={this.handleChange}
                                          type="email" required placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className={'text-center signUpText'}>Username</Form.Text>
                            <Form.Control className={'signUpTextInput text-center'}
                                          name={"username"} onChange={this.handleChange}
                                          type="username" required placeholder="Enter Username" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Text className={'signUpText text-center'}>Password</Form.Text>
                            <Form.Control className={'signUpTextInput text-center'}
                                          name={"password"} onChange={this.handleChange}
                                          type="password" required placeholder="Password" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Text className={'signUpText text-center'}>Verify Password</Form.Text>
                            <Form.Control className={'signUpTextInput text-center'}
                                          name={"verifyPassword"} onChange={this.handleChange}
                                          type="password" required placeholder="Verify Passowrd" />
                        </Form.Group>

                        <UserAlreadyExists userExists={this.state.userCreateFail}/>
                        <PasswordMismatch passwordMismatch={this.state.passwordMismatch}/>

                        <Button id={'signUpButton'} variant="primary" type="submit">
                            Sign Up
                        </Button>

                        <Link to="/">
                            <Form.Text className={"text-muted text-center"}>
                                Login
                            </Form.Text>
                        </Link>
                        <Form.Text className={"text-muted text-center"}>
                           Forgot Password
                        </Form.Text>
                    </Form>
                </div>
            </section>
        );
    }
}

export default SignUp