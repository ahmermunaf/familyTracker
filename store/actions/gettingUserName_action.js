export default class GettingUserName_Action {
    static UserName = 'UserName'
    static UserNameData(value){
        return { 
            type : 'UserName',
            data: value
        }
    }
}