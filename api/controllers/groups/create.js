module.exports = {


    friendlyName: 'Create a working group.',


    description: 'Create a new working group.',


    inputs: {
        name: {
            description: 'The name of the working group.',
            type: 'string',
            required: true
        },
        description: {
            description: 'The description of the working group.',
            type: 'string',
        },
    },


    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/groups/show'
        },
    },


    fn: async function (inputs) {
        // create new group
        sails.log.debug("Create a new working group.")
        let grp = {
            name: inputs.name,
            description: inputs.description
        };
        grp = await WorkingGroup.create(grp).fetch();
        sails.log.debug('Created working group:')
        sails.log.debug(grp)

        // adds the user who created the working group to it and gives him admin rights.
        let user = await User.findOne({id: this.req.me.id }).populate('workingGroups').populate('adminOf');

        await User.addToCollection(this.req.me.id, 'workingGroups', grp.id);
        await User.addToCollection(this.req.me.id, 'adminOf', grp.id);

        /*
        await WorkingGroup.addToCollection(grp.id, 'workers', user.id);
        await WorkingGroup.addToCollection(grp.id, 'admins', user.id);
        */

        sails.log.debug('User:')
        sails.log.debug(user)

        sails.log.debug('Group:')
        sails.log.debug(grp)

        if (!grp) { throw 'notFound'; }
        return {
            message: "Working group successfully created.",
            grp: grp
        };
    }

};