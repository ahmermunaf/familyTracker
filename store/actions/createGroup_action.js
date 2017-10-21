export default class CreateGroup_Action {
    static CreateGroup = 'CreateGroup'
    static CreateGroupData(value){
        return { 
            type : 'CreateGroup',
            data: value
        }
    }
}