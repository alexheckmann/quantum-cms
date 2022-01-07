function saveText() {
  let title = $('#entry_title').val();
  let content = $('#entry_content').val();
  let user = this.req.session.userId;
  const formData = {
    title,
    content,
    user,
    _csrf: window.SAILS_LOCALS._csrf
  };

  const body = JSON.stringify(formData);
  const postForm = (body) => {
    return fetch('/api/v1/textcontent/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    });
  };
}

function save() {
  console.log('Save: ');
  let entryTitle = $('#entry_title').val();
  let content = $('#entry_content').val();
  let user = this.req.session.userId;
  const formData = {
    entryTitle,
    content,
    status: 'active',
    // TODO
    endpoint: 'https://qntm-cms.herokuapp.com/textcontent/api/',
    author: user,
    _csrf: window.SAILS_LOCALS._csrf
  };
  const body = JSON.stringify(formData);
  const postForm = (body) => {
    return fetch('/api/v1/reservation/create', {
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
      console.log('AJX: Result -->');
      let id = data.id;
      window.location = '/textcontent/'+id+'/edit';
    });
}
