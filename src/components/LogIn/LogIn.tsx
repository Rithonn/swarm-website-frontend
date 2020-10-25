import React from 'react';
import backgroundImageStyling from '../../styles/backgroundImageStyling'
import {Button, Form} from "react-bootstrap";
import './LogIn.css';
import Image from "../../utils/Image";
import {Link, RouteComponentProps} from "react-router-dom";
import {LoginState, verifyUser} from "./LoginApi";

const loginLogo = require('../../images/swarmLogoIcon.png');
const background = backgroundImageStyling();


interface LoginProps extends RouteComponentProps<{}>{}


function IncorrectLogin(props: { failedLogin: boolean; }){
    const isLoggedIn = props.failedLogin;
    if(isLoggedIn){
        return <p id={'incorrectLogin'}>Incorrect Username or Password</p>
    }
    return null
}

class LogIn extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = {
            redirect: false,
            failedLogin: false,
            data: {
                username: '',
                password: ''
            }
        }
    }

    componentDidMount() {
        setTimeout(function (){
            // @ts-ignore, object could possibly be null
            document.getElementById('loginBox').classList.add('fade-in');
        }, 1)
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const loginInfo = this.state.data;
        const newLoginInfo = {
            ...loginInfo,
            [e.target.name]: e.target.value
        }
        this.setState({data: newLoginInfo})
    }

    handleSubmit = async (e: React.FormEvent)=> {

        e.preventDefault();

        const response = await verifyUser(this.state.data.username, this.state.data.password);

        if(response.Status){
            this.props.history.push('/home')
        }else{
            this.setState({failedLogin: true});
        }


    }

    render() {
        return(
            <section style={background}>
                <div id="loginBox">
                    <Form onSubmit={this.handleSubmit}>
                        <Image id='loginLogo' src={String(loginLogo)} alt='Swarm Robotics Logo'/>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Text className={'text-center loginText'}>Username</Form.Text>
                            <Form.Control className={'loginTextInput text-center'}
                                          onChange={this.handleChange} type="username"
                                          name={"username"} required placeholder="Enter Username"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Text className={'loginText text-center'}>Password</Form.Text>
                            <Form.Control className={'loginTextInput text-center'}
                                          onChange={this.handleChange}
                                          required type="password" name={"password"}
                                          placeholder="Password" />
                        </Form.Group>

                        <IncorrectLogin failedLogin={this.state.failedLogin}/>

                        <Button id={'loginButton'} variant="primary" type="submit">
                            Login
                        </Button>

                        <Link to="/signup">
                            <Form.Text className={"text-muted text-center"}>
                                Sign up
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

export default LogIn