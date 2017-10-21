export default class SignIn_Action {
    static SignIn = 'SignIn'
    static SignInData(value){
        return { 
            type : 'SignIn',
            data: value
        }
    }
}