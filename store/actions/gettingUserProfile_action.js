export default class GettingUserProfile_Action {
    static UserProfile = 'UserProfile'
    static UserProfileData(value){
        return { 
            type : 'UserProfile',
            data: value
        }
    }
}