import {url} from '../../utils/DetermineUrl'

export interface LoginState{
    redirect: boolean,
    failedLogin: boolean,
    data: LoginData
}

interface LoginData{
    username: string,
    password: string
}


export async function verifyUser(username: string, password: string){
    const response = await fetch(
        url + "/user/verify_password?username=" +
        username + "&password=" + password, {
        method: 'GET',
        headers: {
            'Content-Type': 'application-json'
        }})

    const responseToJson = await response.json();

    return responseToJson;

}