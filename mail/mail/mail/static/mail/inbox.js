document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
  //compose_email();

  const composeForm = document.querySelector('#compose-form');

  composeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    send_email();
  });

  function send_email() {
    const user_email = document.querySelector('#user-email');
    const subject = document.querySelector('#compose-subject');
    const recipients = document.querySelector('#compose-recipients');
    const body = document.querySelector('#compose-body');
    
      if (subject.value === '' || recipients.value === '' || body.value === '') {
        alert('Please, fill all the fields');
      // Si el usuario se envia a si mismo
      } else if (recipients.value.includes(user_email.innerText)) {
        alert('You cannot send an email to yourself');
      }
      // Fetch
      else {
        fetch('/emails', {
          method: 'POST',
          body: JSON.stringify({
            recipients: recipients.value,
            subject: subject.value,
            body: body.value
          })
        })
        .then(response => response.json())
        .then(result => {
          // Print result
          console.log(result);
        })
      }
  }
}); // Final del DomContentLoaded

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
  
}


function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}