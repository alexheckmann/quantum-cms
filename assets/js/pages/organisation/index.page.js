let orgId;
let userIsOrgAdmin;

function fetchOrgData() {
  orgId = $.trim($('#orgIdLabel').text());
  if (orgId.length > 0) {
    findOrg();
    checkOrgAdminUser();
    fetchOrgMembers();
  } else {
  }
}

function findOrg() {
  let origin = window.location.origin;
  let url = new URL(origin + '/api/organisation/findorg');
  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data) {
        $('#orgNameLabel').text(data[0].name);
        orgId = data[0].id;
      }
    });
}

// opens an edit window with the org
function editOrg() {
  window.location = createFetchURL('/organisation/edit', 'id', orgId);
}

function resignFromOrg() {
  window.location = createFetchURL('/organisation/delete', 'id', orgId);
}

/*
Checks whether the current user is the admin of the organisation
and shows/hides the toolbar options accordingly.
*/
function checkOrgAdminUser() {
  let origin = window.location.origin;
  let url = new URL(origin + '/api/organisation/checkadmin');
  fetch(url)
    .then(res => res.json())
    .then(data => {
      userIsOrgAdmin = data;
      if (data) {
        showOrgAdminTools();
      } else {
        showOrgMemberTools();
      }
    });
}

function showOrgAdminTools() {
  $('#orgMemberToolbar').hide();
  $('#orgAdminToolbar').css('display', 'flex');
  $('#orgAdminTableToolbar').show();
  $('#orgAdminSubToolbar').show();
}

function showOrgMemberTools() {
  $('#orgAdminToolbar').hide();
  $('#orgAdminTableToolbar').hide();
  $('#orgAdminSubToolbar').hide();
  $('#orgMemberToolbar').css('display', 'flex');
}

// fetches the members of the selected group
function fetchOrgMembers() {
  fetch(createFetchURL('/api/organisation/fetchorgmembers', 'id', orgId))
    .then(res => res.json())
    .then(data => {
      if (userIsOrgAdmin) {
        createOrgTableChk(data);
      } else {
        createOrgTable(data);
      }
    });
}

// Creates a table with checkboxes
function createOrgTableChk(data) {
  let i = 0;
  let table = $('#orgMembersTable');
  let tbody = $('<tbody>');
  // thead element
  table.append(createChkTheadOrg(true));
  // tbody element
  table.append(tbody);
  data.forEach((element) => {
    tbody.append(createChkTR(element, i));
    i = i + 1;
  });
}

// creates a thead for a member table with a checkbox
function createChkTheadOrg(idAdmin) {
  let thead = $('<thead>').addClass('thead-light');
  thead.append($('<th id="id">').hide());
  appendToElement(thead, 'th', 'name', 'Name', '');
  appendToElement(thead, 'th', 'role', 'Role', '');
  if (idAdmin) {
    thead.append($('<th>').html('<input type="checkbox" id="selectAllOrg" class="checkbox" onclick="selectAllOrg()" />'));
  }
  return thead;
}

// Creates a table without checkboxes
function createOrgTable(data) {
  let i = 0;
  let table = $('#orgMembersTable');
  let tbody = $('<tbody>');
  // thead element
  table.append(createChkThead(false));
  // tbody element
  table.append(tbody);
  data.forEach((element) => {
    tbody.append(createTR(element, i));
    i = i + 1;
  });
}


// appoints the selected members as admin of the current group
function appointAsOrgAdmin() {
  $('#btnTableHint').hide();
  let rows = [];
  // Enumerate over each checked checkbox
  getCheckedTrText(rows);

  if (rows.length > 0) {
    let members = Array.from(rows);

    const formData = {
      members: members,
      _csrf: window.SAILS_LOCALS._csrf
    };
    const body = JSON.stringify(formData);
    const postForm = (body) => {
      return fetch(createFetchURLRoute('/api/organisation/appointadmin'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      });
    };
    postForm(body)
      .then(res => res.json())
      .then(data => {
        if (data) {
          resetOrgMembersTable();
        }
      });
  } else {
    $('#btnTableHint').show();
  }
}

function deleteFromOrg() {
  $('#btnTableHint').hide();
  let rows = [];
  // Enumerate over each checked checkbox
  getCheckedTrText(rows);

  if (rows.length > 0) {
    let members = Array.from(rows);

    const formData = {
      members: members,
      _csrf: window.SAILS_LOCALS._csrf
    };
    const body = JSON.stringify(formData);
    const postForm = (body) => {
      return fetch(createFetchURLRoute('/api/organisation/deletemembers'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      });
    };
    postForm(body)
      .then(res => res.json())
      .then(data => {
        if (data) {
          resetOrgMembersTable();
        } else {
          // TODO Fehlerbehandlung
        }
      });
  } else {
    $('#btnTableHint').show();
  }
}

function resetOrgMembersTable() {
  $('#orgMembersTable').empty();
  fetchOrgMembers();
}

// select or deselect all checkboxes that are not disabled
function selectAllOrg() {

  let isAllBoxChecked = $('#selectAllOrg')[0].checked; // main checkbox inside table thead

  let table = $('#orgMembersTable'); // table selector
  let tdCheckbox = table.find('tbody input:checkbox:enabled'); // checboxes inside table body

  for (let userCheckBox of tdCheckbox) {
    userCheckBox.checked = isAllBoxChecked;
  }
}

function showInviteCodeInput() {
  $('#inviteCodeSection').show();
}

function submitCode() {
  let el = $('#inviteCodeInput');
  let code = el.val();
  if (code.length === parseInt(el.attr('maxlength'))) {
    const formData = {
      inviteCode: code,
      _csrf: window.SAILS_LOCALS._csrf
    };
    const body = JSON.stringify(formData);
    const postForm = (body) => {
      return fetch(createFetchURLRoute('/api/organisation/submitinvite'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      });
    };
    postForm(body)
      .then(res => {
        try {
          if (!res.ok) {
            $('#inviteCodeAlert').show;
            throw new Error('HTTP status ' + res.status);
          } else {
            window.location = '/organisation';
          }
        } catch (e) {
          $('#inviteCodeAlert').show();
        }
        res.json();
      });
  }
}
