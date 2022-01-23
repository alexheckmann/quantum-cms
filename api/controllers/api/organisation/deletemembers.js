module.exports = {

    friendlyName: 'Delete members',

    description: 'Delete members from organisation.',

    inputs: {
        members: {
            type: 'ref',
            required: true
        }
    },

    exits: {
    },


    fn: async function (inputs) {
        // set org and admin for each Member null
        await User.update({id: inputs.members}).set({
            organisation: null,
            admin: null,
        });

        // find all groups
        let groups = await WorkingGroup.find().populate('workers').populate('admins');
        let groupIds = [];

        if (groups) {
            groups.forEach(element => {
                groupIds.push(element.id);
            });

            // remove from all groups the deleted members
            await WorkingGroup.removeFromCollection(groupIds, 'workers').members(inputs.members);
            await WorkingGroup.removeFromCollection(groupIds, 'admins').members(inputs.members);
        }
        return true;
    }
};