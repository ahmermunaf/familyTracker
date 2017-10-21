export default class RequestList_Action {
    static RequestList = 'RequestList'
    static RequestListData(value){
        return { 
            type : 'RequestList',
            data: value
        }
    }
}