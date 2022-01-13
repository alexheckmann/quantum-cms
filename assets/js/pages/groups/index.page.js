var deleteFromGrpButton = $('#deleteFromGrpBtn');

var userIsAdmin;

function resetTable() {
    console.log("resetTable()");
    $('#membersTable').empty();
    createMemberTable();
}

function createGrpDesc(grp) {
    console.log("createGrpDesc()");

    let origin = window.location.origin;
    let url = new URL(origin + '/api/groups/description');
    url.searchParams.append("id", grp);

    fetch(url)
        .then(res => res.json())
        .then(data => {
            $('#grpDescText').text(data[0].description)
        })
}

function createMemberTable() {
    console.log("createMemberTable()");
    let grp = $("#grpSelect").val();
    if (grp) {
        createGrpDesc(grp);
        checkAdminCurrentUser(grp);
        findGrp(grp);
    } else {
        console.log("User has no group.")
    }

}

function checkAdminCurrentUser(grp) {
    console.log("checkAdminCurrentUser()");

    let origin = window.location.origin;
    let url = new URL(origin + '/api/groups/checkadmin');
    url.searchParams.append("id", grp);

    fetch(url)
        .then(res => res.json())
        .then(data => {
            userIsAdmin = data;
            console.log("data: " + data);
            if (data) {
                $("#toolbarAdmin").show();
                $("#toolbarGrpsAdmin").show();
                $("#toolbarMember").hide();
                $("#toolbarGrpsMember").hide();

            } else {
                $("#toolbarAdmin").hide();
                $("#toolbarGrpsAdmin").hide();
                $("#toolbarMember").show();
                $("#toolbarGrpsMember").show();
            }
        })
}

function findGrp(grp) {
    console.log("findGrp()");

    let origin = window.location.origin;
    let url = new URL(origin + '/api/groups/find');
    url.searchParams.append("id", grp);

    fetch(url)
        .then(res => res.json())
        .then(data => {
            if (userIsAdmin) {
                createGroupTableChk(data);
            } else {
                createGroupTable(data);
            }
        })
}

function createGroupTableChk(data) {
    let i = 0;
    var table = $('#membersTable');
    var thead = $('<thead>').addClass("thead-light");
    thead.append($('<th id="id">').hide())
    appendToElement(thead, 'th', 'name', "Name", '');
    appendToElement(thead, 'th', 'role', 'Role', '');
    thead.append($('<th>').html('<input type="checkbox" id="selectAll" class="checkbox" onclick="selectAll()" />'));
    table.append(thead);

    var tbody = $('<tbody>');
    table.append(tbody);

    data.forEach((element) => {
        var tr = $('<tr>').addClass("checkable qntm-tr");
        tr.append($('<td>').text(element.id).hide());
        appendTdToRow(tr, element.name, i);
        appendTdToRow(tr, element.role, i)
        tr.append($('<td>').html('<input type="checkbox" class="checkbox"/>'));

        if (element.role === "Admin") {
            tr.find('td input:checkbox').prop('disabled', true);
        }
        i = i + 1;
        tbody.append(tr);
    })
}

function createGroupTable(data) {
    let i = 0;
    var table = $('#membersTable');
    var thead = $('<thead>').addClass("thead-light");
    var tbody = $('<tbody>');
    thead.append($('<th id="id">').hide())
    appendToElement(thead, 'th', 'name', "Name", '');
    appendToElement(thead, 'th', 'role', 'Role', '');
    table.append(thead);
    table.append(tbody);

    data.forEach((element) => {
        var tr = $('<tr>');
        tr.append($('<td id="id">').text(element.id).hide());
        appendTdToRow(tr, element.name, i);
        appendTdToRow(tr, element.role, i)
        i = i + 1;
        tbody.append(tr);
    })
}

function appendToElement(element, type, dataField, value, i) {
    let id = `${value}${i}`;
    element.append(`<${type} id='${id}' data-field='${dataField}'>${value}</${type}>`);
}

function appendTdToRow(row, value, i) {
    let id = `${value}${i}`;
    row.append(`<td id='${id}'>${value}</td>`);
}

$(() => {
    deleteFromGrpButton.click(function (e) {
        $('#btnHint').hide();
        e.preventDefault();
        var rows = [];

        // Enumerate over each checked checkbox
        $('input:checked').each(function () {
            var row = [];

            // Enumerate over all td elements in the parent tr,
            // skipping the first one (which contains just the
            // checkbox).
            $(this).closest('tr').find('td:first-child').each(function () {
                // Gather the text into row
                row.push($(this).text());
            });

            // Add this row to our list of rows
            rows.push(row);
        });

        if (rows.length > 0) {
            deleteFromGrp(rows);
        } else {
            $('#btnHint').show();
        }
    });
});

function deleteFromGrp(ids) {
    let members = Array.from(ids);
    let grp = $("#grpSelect").val();
    let origin = window.location.origin;
    let url = new URL(origin + '/api/groups/deletemembers');
    url.searchParams.append("id", grp);

    const formData = {
        members: members,
        _csrf: window.SAILS_LOCALS._csrf
    };
    const body = JSON.stringify(formData);
    const postForm = (body) => {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });
    };
    postForm(body);
    // TODO return true...
    resetTable();
}

$(document).ready(function () {
    // sets row checked 
    $('.membersTable').on('click', 'tr', function (event) {
        if (event.target.type !== 'checkbox') {
            $(':checkbox', this).trigger('click');
        }
    });

    // highlights selected tr
    $(".membersTable").on('change', "input[type='checkbox']", function (e) {
        if ($(this).is(":checked")) {
            $(this).closest('tr').addClass("highlight_row");
        } else {
            $(this).closest('tr').removeClass("highlight_row");
        }
    });
});

// opens an edit window with the currently selected group
function editGrp() {
    var grpId = $('#grpSelect').find(":selected").val();
    let origin = window.location.origin;
    let url = new URL(origin + '/groups/edit');
    url.searchParams.append("id", grpId);
    window.location = url;
}

// activates a controller that removes the current user from the current group
function leaveGrp() {
    var grpId = $('#grpSelect').find(":selected").val();
    let origin = window.location.origin;
    let url = new URL(origin + '/groups/leave');
    url.searchParams.append("id", grpId);
    window.location = url;
}

// select or deselect all checkboxes that are not disabled
function selectAll() {

    let isAllBoxChecked = $("#selectAll")[0].checked; // main checkbox inside table thead

    var table = $('#membersTable'); // table selector 
    var tdCheckbox = table.find('tbody input:checkbox:enabled'); // checboxes inside table body

    for (let userCheckBox of tdCheckbox) {
        console.log(userCheckBox);
        userCheckBox.checked = isAllBoxChecked;
    }
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

function checkData(grps) {
    alert(grps.length)
    if (grps.length < 1) {
        $('#noGrpsSection').show();
        $('#grpsSection').hide();

    }
}