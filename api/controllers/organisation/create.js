module.exports = {


    friendlyName: 'Create organisation',


    description: 'Create organisation.',


    inputs: {
        name: {
            description: 'The name of the organisation.',
            type: 'string',
            required: true
        },
    },


    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'pages/organisation/show'
        },
    },


    fn: async function (inputs) {
        // create new organisation
        sails.log.debug("Create new organisation.")
        let organisation = {
            name: inputs.name,
        };
        organisation = await Organisation.create(organisation).fetch();
        sails.log.debug('Created Organisation:')
        sails.log.debug(organisation)

        // Add creating user to organisation and give admin rights
        let user = await User.findOne({
            id: this.req.session.userId,
        }).update({
            organisation: organisation.id,
            admin: organisation.id
        });
        sails.log.debug('User:')
        sails.log.debug(user)

        if (!textcontent) { throw 'notFound'; }
        return {
            message: "Organisation successfully created.",
            organisation: organisation
        };
    }

};