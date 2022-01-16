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

        let workingGrp = await WorkingGroup.removeFromCollection(inputs.id, 'workers').members(ids);

        if (workingGrp) {
            return true;
        } else {
            throw("Error in deletemembers controller -> check 'api/controllers/api/groups/deletemembers.js'.");
        }
    }
};