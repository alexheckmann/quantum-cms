module.exports = {


  friendlyName: 'View new organisation',


  description: 'Display "New Organisation" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/organisation/new'
    },
    redirect: {
      responseType: 'redirect',
      description: 'User already has an organisation, so he will be redirected.'
    }

  },


  fn: async function () {
    let user = await User.findOne({id: this.req.session.userId}).populate('organisation');
    if (user.organisation) {
      throw {redirect: '/organisation'};
    }
  }


};
