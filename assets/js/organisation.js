var $table = $('#dataTable');
var $deleteButton = $('#deleteBtn');
var $adminButton = $('#adminBtn');

$('tr').find('td[id^="dataTable_stateRow_adminCheck"]').each(function () {
  var self = $(this);
  if (self.text() === 'Admin') {
    self.closest('tr').attr('disabled', 'disabled');
  }
});

$(() => {
  $deleteButton.click(() => {
    var ids = $.map($table.bootstrapTable('getSelections'), (row) => {
      return row.id;
    });
    console.log('IDs to delete: '+ids);
    deleteMembers(ids);
  });

  $adminButton.click(() => {
    var ids = $.map($table.bootstrapTable('getSelections'), (row) => {
      return row.id;
    });
    console.log('IDs to set admin: '+ids);
    appointAdmin(ids);
  });
});

function stateFormatter(value, row, index) {
  console.log('FUNCTION stateFormatter');
  let id = $(this).attr('id');
  console.log('Index: ' + index + '| Value: ' + value + '| ID: ' + id);

  if (!!value) {
    return {
      disabled: true,
      checked: false
    };
  }
  return value;
}

function appointAdmin(ids) {
  console.log('Appoint as admin: ');
  let members = Array.from(ids);

  const formData = {
    members: members,
    _csrf: window.SAILS_LOCALS._csrf
  };
  const body = JSON.stringify(formData);
  const postForm = (body) => {
    return fetch('/api/v1/organisation/appointadmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    }).then(alert('OK'));
  };
  postForm(body);
  window.location = '/organisation';
}

function deleteMembers(ids) {
  console.log('Delete Members: ');
  let members = Array.from(ids);

  const formData = {
    members: members,
    _csrf: window.SAILS_LOCALS._csrf
  };
  const body = JSON.stringify(formData);
  const postForm = (body) => {
    return fetch('/api/v1/organisation/deletemembers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    });
  };
  postForm(body);
  window.location = '/organisation';
}
