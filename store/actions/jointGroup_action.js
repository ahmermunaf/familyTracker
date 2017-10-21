export default class JointGroup_Action {
    static JointGroup = 'JointGroup'
    static JointGroupData(value){
        return { 
            type : 'JointGroup',
            data: value
        }
    }
    static Name = 'Name'
    static GroupName(value){
        return { 
            type : 'Name',
            data: value
        }
    }
}