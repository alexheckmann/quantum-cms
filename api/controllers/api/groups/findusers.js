module.exports = {


    friendlyName: 'Find available users',


    description: 'Find all available users for a selected group.',


    inputs: {
        id: {
            type: 'string',
            required: true
        },
    },


    exits: {

    },

    fn: async function (inputs) {
        console.log("ID of the selected group: " + inputs.id);

        // current user
        let user = await User.findOne({ id: this.req.me.id });

        // fetches the group with the selected ID
        let grp = await WorkingGroup.findOne({ id: inputs.id }).populate('workers').populate('admins');

        let workerIds = []
        grp.workers.forEach(element => {
            workerIds.push(element.id);
        })

        console.log("Workers: " + workerIds);
        

        // all user from the same org as the current user
        let users = await User.find().where({ organisation: user.organisation });

        let userIds = [];

        users.forEach(element => {
            userIds.push(element.id);
        })

        console.log("All users from org: " + userIds);

        // all user with same org that are not in the selected group
        const availableUsers = userIds.filter(function(x) { 
            return workerIds.indexOf(x) < 0;
          });

        console.log("All available users from org: " + availableUsers);


        let finalUsers = await User.find().where({id: availableUsers});

        let data = [];

        finalUsers.forEach(element => {
            data.push({name: element.fullName, id: element.id});
        })

        return data;
    }
};