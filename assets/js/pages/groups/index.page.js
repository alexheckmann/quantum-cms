let userIsAdmin;

// resets the table and initiates the creation of a new one
function resetTable() {
  console.log('resetTable()');
  $('#membersTable').empty();
  createMemberTable();
}

// fetches the description of the selected group
function createGrpDesc(grp) {
  console.log('createGrpDesc()');

  let origin = window.location.origin;
  let url = new URL(origin + '/api/groups/description');
  url.searchParams.append('id', grp);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      $('#grpDescText').text(data[0].description);
    });
}

/*
- creates a new table
- fetches a new group description
- checks if the current user is admin of the selected group
- updates the members to add */
function createMemberTable() {
  console.log('createMemberTable()');
  let grp = $('#grpSelect').val();
  if (grp) {
    createGrpDesc(grp);
    checkAdminCurrentUser(grp);
    findGrpMembers(grp);
    findMembersToAdd(grp);
  } else {
    console.log('User has no group.');
  }
}

/*
Checks whether the current user is the admin of the selected group
and shows/hides the toolbar options accordingly.
*/
function checkAdminCurrentUser(grp) {
  console.log('checkAdminCurrentUser()');
  fetch(createFetchURL('/api/groups/checkadmin', 'id', grp))
    .then(res => res.json())
    .then(data => {
      userIsAdmin = data;
      console.log('isAdmin: ' + data);
      if (data) {
        showAdminTools();
      } else {
        showMemberTools();
      }
    });
}

function showAdminTools() {
  $('#toolbarAdmin').show();
  $('#toolbarGrpsAdmin').show();
  $('#toolbarMember').hide();
  $('#toolbarGrpsMember').hide();
  $('#addMembersSelect').show();
}

function showMemberTools() {
  $('#toolbarAdmin').hide();
  $('#toolbarGrpsAdmin').hide();
  $('#toolbarMember').show();
  $('#toolbarGrpsMember').show();
  $('#addMembersSelect').hide();
}

// fetches the members of the selected group
function findGrpMembers(grp) {
  console.log('findGrpMembers()');
  fetch(createFetchURL('/api/groups/find', 'id', grp))
    .then(res => res.json())
    .then(data => {
      if (userIsAdmin) {
        createGroupTableChk(data);
      } else {
        createGroupTable(data);
      }
    });
}

// fetches all groups to the current user
function findGrps() {
  console.log('findGrps()');
  let origin = window.location.origin;
  let url = new URL(origin + '/api/groups/findgrps');

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        createOptions(data);
      }
    });
}

// create options with the groups of the current user
function createOptions(data) {
  let select = $('#selectGrp');
  select.empty();

  data.forEach(element => {
    let option = $('<option>').text(element.name);
    option.attr('value', element.id);
    select.append(option);
  });
}

// Creates a table with checkboxes
function createGroupTableChk(data) {
  let i = 0;
  let table = $('#membersTable');
  let tbody = $('<tbody>');
  // thead element
  table.append(createChkThead(true));
  // tbody element
  table.append(tbody);
  data.forEach((element) => {
    tbody.append(createChkTR(element, i));
    i = i + 1;
  });
}

// creates a thead for a member table with a checkbox
function createChkThead(idAdmin) {
  let thead = $('<thead>').addClass('thead-light');
  thead.append($('<th id="id">').hide());
  appendToElement(thead, 'th', 'name', 'Name', '');
  appendToElement(thead, 'th', 'role', 'Role', '');
  if (idAdmin) {
    thead.append($('<th>').html('<input type="checkbox" id="selectAll" class="checkbox" onclick="selectAll()" />'));
  }
  return thead;
}

// creates a TR for a member table with checkbox
function createChkTR(element, i) {
  let tr = $('<tr>').addClass('checkable qntm-tr');
  tr.append($('<td>').text(element.id).hide());
  appendTdToRow(tr, element.name, i);
  appendTdToRow(tr, element.role, i);
  tr.append($('<td>').html('<input type="checkbox" class="checkbox"/>'));
  // if tr is admin, set disabled
  if (element.role === 'Admin') {
    tr.find('td input:checkbox').prop('disabled', true);
  }
  return tr;
}

// Creates a table without checkboxes
function createGroupTable(data) {
  let i = 0;
  let table = $('#membersTable');
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

// creates a TR for a member table without checkbox
function createTR(element, i) {
  let tr = $('<tr>');
  tr.append($('<td id="id">').text(element.id).hide());
  appendTdToRow(tr, element.name, i);
  appendTdToRow(tr, element.role, i);
  return tr;
}

// helper to create table
function appendToElement(element, type, dataField, value, i) {
  let id = `${value}${i}`;
  element.append(`<${type} id='${id}' data-field='${dataField}'>${value}</${type}>`);
}

// creates a td element and appends it to a tr
function appendTdToRow(row, value, i) {
  let id = `${value}${i}`;
  row.append(`<td id='${id}'>${value}</td>`);
}

// generates a list of the ids of the selected tr elements to be deleted
$(document).ready(() => {
  $('#deleteFromGrpBtn').click((e) => {
    $('#btnTableHint').hide();
    e.preventDefault();
    let rows = [];
    // Enumerate over each checked checkbox
    getCheckedTrText(rows);

    if (rows.length > 0) {
      deleteFromGrp(rows);
    } else {
      $('#btnTableHint').show();
    }
  });
});

$(document).ready(() => {
  $('#appointAdminGrpBtn').click((e) => {
    $('#btnTableHint').hide();
    e.preventDefault();
    let rows = [];
    // Enumerate over each checked checkbox
    getCheckedTrText(rows);

    if (rows.length > 0) {
      appointAsAdmin(rows);
    } else {
      $('#btnTableHint').show();
    }
  });
});

// get the text of the first td (id) of all checked tr elements
function getCheckedTrText(rows) {
  $('input:checked').each(function () {
    $(this).closest('tr').find('td:first-child').each(function () {
      // gather the text into rows
      if (!isEmpty($(this).text())) {
        rows.push($(this).text());
      }
    });
  });
}

// checks whether a string is empty
function isEmpty(str) {
  return (!str || str.length === 0);
}

// appoints the selected members as admin of the current group
function appointAsAdmin(ids) {
  let members = Array.from(ids);
  let grp = $('#grpSelect').val();

  const formData = {
    members: members,
    _csrf: window.SAILS_LOCALS._csrf
  };
  const body = JSON.stringify(formData);
  const postForm = (body) => {
    return fetch(createFetchURL('/api/groups/appointadmin', 'id', grp), {
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
        // update table
        resetTable();
      }
    });
}

// delete selected IDs from the current group
function deleteFromGrp(ids) {
  let members = Array.from(ids);
  let grp = $('#grpSelect').val();

  const formData = {
    members: members,
    _csrf: window.SAILS_LOCALS._csrf
  };
  const body = JSON.stringify(formData);
  const postForm = (body) => {
    return fetch(createFetchURL('/api/groups/deletemembers', 'id', grp), {
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
        // update table
        resetTable();
      }
    });
}

$(document).ready(() => {
  // sets row checked
  $('.membersTable').on('click', 'tr', function (event) {
    if (event.target.type !== 'checkbox') {
      $(':checkbox', this).trigger('click');
    }
  });

  // highlights selected tr
  $('.membersTable').on('change', 'input[type=\'checkbox\']', function (e) {
    if ($(this).is(':checked')) {
      $(this).closest('tr').addClass('highlight_row');
    } else {
      $(this).closest('tr').removeClass('highlight_row');
    }
  });
});

// opens an edit window with the currently selected group
function editGrp() {
  let grpId = $('#grpSelect').find(':selected').val();
  window.location = createFetchURL('/groups/edit', 'id', grpId);
}

// removes the current user from the selected group
function leaveGrp() {
  let grpId = $('#grpSelect').find(':selected').val();
  fetch(createFetchURL('/groups/leave', 'id', grpId))
    .then(res => res.json())
    .then(data => {
      if (data) {
        window.location = '/groups';
      }
    });
}

// select or deselect all checkboxes that are not disabled
function selectAll() {

  let isAllBoxChecked = $('#selectAll')[0].checked; // main checkbox inside table thead

  let table = $('#membersTable'); // table selector
  let tdCheckbox = table.find('tbody input:checkbox:enabled'); // checboxes inside table body

  for (let userCheckBox of tdCheckbox) {
    userCheckBox.checked = isAllBoxChecked;
  }
  // TODO if all tr are checked, the th must also be checked
}

// disabling A-Z and arrows
function ignoreKeys(e) {
  if (!e) {
    e = window.event;
  }
  if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 37 && e.keyCode <= 40)) // A to Z || arrows
  {
    e.returnValue = false;
    e.cancel = true;
  }
}

// gets all members from the organisation who are not currently in the selected group
function findMembersToAdd(grp) {
  $('#memberSelect').empty();

  let origin = window.location.origin;
  let url = new URL(origin + '/api/groups/findusers');
  url.searchParams.append('id', grp);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      createMembersOptions(data);
    });
}

// creates the options with the members that can be added to the group
function createMembersOptions(data) {
  let select = $('#memberSelect');
  data.forEach(element => {
    let option = $('<option onclick="setSelected()"></option>').text(element.name).val(element.id);
    select.append(option);
  });
}

// adds the selected members to the group
function addToGrp() {
  $('#btnMemberSelectHint').hide();
  let ids = [];
  // Enumerate over each checked checkbox
  $('#memberSelect option:selected').each(function () {
    ids.push($(this).val());
  });

  if (ids.length > 0) {
    let members = Array.from(ids);
    let grp = $('#grpSelect').val();

    const formData = {
      members: members,
      _csrf: window.SAILS_LOCALS._csrf
    };
    const body = JSON.stringify(formData);
    const postForm = (body) => {
      return fetch(createFetchURL('/api/groups/addtogroup', 'id', grp), {
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
          resetTable();
        }
      });
  } else {
    $('#btnMemberSelectHint').show();
  }
}

// help function for creating a fetch URL
function createFetchURL(route, searchParam, searchParamName) {
  let origin = window.location.origin;
  let url = new URL(origin + route);
  url.searchParams.append(searchParam, searchParamName);
  return url;
}

// help function for creating a fetch URL
function createFetchURLRoute(route) {
  let origin = window.location.origin;
  let url = new URL(origin + route);
  return url;
}
