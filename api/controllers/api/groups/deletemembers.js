module.exports = {

    friendlyName: 'Delete members',

    description: 'Delete selected members from a working group.',

    inputs: {
        id : {
            type: 'string',
            required: true
          },
        members: {
            type: 'ref',
            required: true
        }
    },

    exits: {
    },


    fn: async function (inputs) {
        let ids = inputs.members.map(i=>Number(i));
        console.log("ids: " + ids);        

        await WorkingGroup.removeFromCollection(inputs.id, 'workers').members(ids);

        return true;
    }
};