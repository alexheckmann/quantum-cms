/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /': {action: 'public/view-homepage'},
  'GET /welcome/:unused?': {action: 'dashboard/view-welcome'},

  'GET /pricing': {action: 'public/view-pricing'},

  'GET /resources': {action: 'public/view-resources'},
  'GET /features': {action: 'public/view-features'},
  'Get /about': {action: 'public/view-about'},
  'GET /faq': {action: 'public/view-faq'},
  'GET /contact': {action: 'public/view-contact'},

  'GET /terms': {action: 'public/legal/view-terms'},
  'GET /privacy': {action: 'public/legal/view-privacy'},

  'GET /signup': {action: 'entrance/view-signup'},
  'GET /email/confirm': {action: 'entrance/confirm-email'},
  'GET /email/confirmed': {action: 'entrance/view-confirmed-email'},

  'GET /login': {action: 'entrance/view-login'},
  'GET /password/forgot': {action: 'entrance/view-forgot-password'},
  'GET /password/new': {action: 'entrance/view-new-password'},

  'GET /account': {action: 'account/view-account-overview'},
  'GET /account/password': {action: 'account/view-edit-password'},
  'GET /account/profile': {action: 'account/view-edit-profile'},

  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  '/terms': '/legal/terms',
  '/logout': '/api/v1/account/logout',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  '/api/v1/account/logout': {action: 'account/logout'},
  'PUT   /api/v1/account/update-password': {action: 'account/update-password'},
  'PUT   /api/v1/account/update-profile': {action: 'account/update-profile'},
  'PUT   /api/v1/account/update-billing-card': {action: 'account/update-billing-card'},
  'PUT   /api/v1/entrance/login': {action: 'entrance/login'},
  'POST  /api/v1/entrance/signup': {action: 'entrance/signup'},
  'POST  /api/v1/entrance/send-password-recovery-email': {action: 'entrance/send-password-recovery-email'},
  'POST  /api/v1/entrance/update-password-and-login': {action: 'entrance/update-password-and-login'},
  'POST  /api/v1/deliver-contact-form-message': {action: 'deliver-contact-form-message'},
  'POST  /api/v1/observe-my-session': {action: 'observe-my-session', hasSocketFeatures: true},

  //
  // textcontent
  //
  'GET /dashboard/text/new': {action: 'textcontent/new'},
  'GET /dashboard': {action: 'textcontent/find'},

  //
  // organisation
  //
  'GET /organisation/new': {action: 'organisation/view-new-organisation'},
  'POST /organisation': {action: 'organisation/create'},

  'GET /organisation/edit': {action: 'organisation/edit'},
  'POST /organisation/:id/update': {action: 'organisation/update'},

  'GET /organisation/delete': {action: 'organisation/delete'},

  'GET /organisation': {action: 'organisation/find'},

  //
  // API
  //

  // api/organisation
  'GET /api/organisation/findorg': {action: 'api/organisation/findorg'},
  'GET /api/organisation/checkadmin': {action: 'api/organisation/checkadmin'},
  'GET /api/organisation/fetchorgmembers': {action: 'api/organisation/fetchorgmembers'},
  'POST /api/organisation/appointadmin': {action: 'api/organisation/appointadmin'},
  'POST /api/organisation/deletemembers': {action: 'api/organisation/deletemembers'},
  'POST /api/organisation/submitinvite': {action: 'api/organisation/submitinvite'},


  // api/groups
  'GET /api/groups/find': {action: 'api/groups/find'},
  'GET /api/groups/findusers': {action: 'api/groups/findusers'},
  'GET /api/groups/checkadmin': {action: 'api/groups/checkadmin'},
  'GET /api/groups/description': {action: 'api/groups/description'},
  'GET /api/groups/findgrps': {action: 'api/groups/findgrps'},
  'POST /api/groups/deletemembers': {action: 'api/groups/deletemembers'},
  'POST /api/groups/appointadmin': {action: 'api/groups/appointadmin'},
  'POST /api/groups/addtogroup': {action: 'api/groups/addtogroup'},

  //
  // Groups
  //
  'GET /groups/new': {action: 'groups/view-new-group'},

  'GET /groups': {action: 'groups/find'},

  'GET /groups/leave': {action: 'groups/leave'},

  'POST /groups': {action: 'groups/create'},

  'GET /groups/edit': {action: 'groups/edit'},
  'POST /groups/:id/update': {action: 'groups/update'},

  /*
  TextContent
   */

  'GET /api/textcontent/find': {action: 'api/textcontent/find'},
  'GET /api/textcontent/findoneentry': {action: 'api/textcontent/findoneentry'},
  'GET /api/textcontent/destroy': {action: 'api/textcontent/destroy'},
  'GET /api/textcontent/findoldversions': {action: 'api/textcontent/findoldversions'},
  'GET /api/textcontent/findoneoldversion': {action: 'api/textcontent/findoneoldversion'},
  'GET /api/textcontent/findtags': {action: 'api/textcontent/findtags'},
  'GET /api/textcontent/removetag': {action: 'api/textcontent/removetag'},
  'POST /api/textcontent/createtag': {action: 'api/textcontent/createtag'},
  'POST /api/textcontent/update': {action: 'api/textcontent/update'},
  'POST /api/textcontent/save': {action: 'api/textcontent/save'},

  /*
  Content via external API call
   */
  'GET /api/external/:id': {action: 'api/external/text/findone'},

  //
  // Subscription
  //
  'GET /saveselection/:id': { action: 'subscription/saveselection' },

  'GET /subscription/:id': { action: 'subscription/getselection' },

  'GET /getservice/:id': { action: 'subscription/getservice' },

  'GET /checkorder': { action: 'subscription/checkorder' },

  'GET /createsubscription/:id': { action: 'subscription/createsubscription' },
};
