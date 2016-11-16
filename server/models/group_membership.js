/**
 * Created by Brandon Garling on 11/15/2016.
 */
const database = require('../user_modules/database');
const encryption = require('../user_modules/encryption');

module.exports = {};

/**
 * A User model, this holds user information
 * @type {*}
 */
const GroupMembership = database.sequelize.define('group_membership', {

},{
    instanceMethods: {
        getSerializableFields: function() {
            return GroupMembership.getSerializableFields();
        }
    },
});

/**
 * The fields that should be serialized and sent to the client
 * @returns {[string]}
 */
GroupMembership.getSerializableFields = function () {
    return ['id', 'UserId', 'GroupId', 'createdAt', 'updatedAt'];
};

module.exports = GroupMembership;