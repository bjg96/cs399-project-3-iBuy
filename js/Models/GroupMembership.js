/**
 * Created by not Brandon Garling on 11/9/2016.
 */
let nextId = -1;
export default class GroupMembership {
    Id;
    UserId = null;
    GroupId = null;
    createdAt = null;
    updatedAt = null;

    constructor(id) {
        if (id === undefined)
            this.Id = nextId--;
        else
            this.Id = id;
    }
}