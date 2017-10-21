export default class SignUp_Action {
    static SignUp = 'SignUp'
    static SignUpData(value){
        return { 
            type : 'SignUp',
            data: value
        }
    }
}