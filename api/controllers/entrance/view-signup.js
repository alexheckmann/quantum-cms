module.exports = {


  friendlyName: 'View signup',


  description: 'Display "Signup" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/entrance/signup',
    },

    redirect: {
      description: 'The requesting user is already logged in.',
      responseType: 'redirect'
    }

  },


  fn: async function (inputs, exits) {

    if (this.req.me) {
      throw {redirect: '/dashboard'};
    }

    return exits.success({layout: 'layouts/public-layout'});
  }


};
