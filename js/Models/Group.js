/**
 * Created by Brandon Garling on 11/9/2016.
 */
let nextId = -1;
export default class Group {
    Id;
    Name = "";
    Color = "red";
    CreatedById = null;
    createdAt = null;
    updatedAt = null;

    ItemIds = [];
    UserIds = [];

    constructor(id) {
        if (id === undefined)
            this.Id = nextId--;
        else
            this.Id = id;
    }
}
