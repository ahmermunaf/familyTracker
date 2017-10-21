export default class CreatedGroupList_Action {
    static GroupList = 'GroupList'
    static GroupListData(value){
        return { 
            type : 'GroupList',
            data: value
        }
    }
    static GroupName = 'GroupName'
    static GroupNameData(value){
        return { 
            type : 'GroupName',
            data: value
        }
    }
}