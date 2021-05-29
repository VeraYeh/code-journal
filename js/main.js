/* global data */
/* exported data */

const $form = document.querySelector('form.container');
const $userPhotoUrl = document.querySelector('.photo-url');
const $imgSrc = document.querySelector('img');
const $entryList = document.querySelector('ul');
const $entryForm = document.querySelector('[data-view="entry-form"]');
const $entries = document.querySelector('[data-view="entries"]');
const $entriesButton = document.querySelector('.entryButton');
const $newButton = document.querySelector('.newButton');
const $message = document.querySelector('.message');

// Change img src attribute when user input.
$userPhotoUrl.addEventListener('input', function (event) {
  const imgSrc = event.target.value;
  $imgSrc.src = imgSrc;
});

// Form submit event listener and function.
$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const journalData = {
    title: $form.elements.title.value,
    photoURL: $form.elements.photoURL.value,
    notes: $form.elements.notes.value
  };
  const editEntryID = $form.getAttribute('editEntryID');
  // if submitting an edit
  if (editEntryID !== null) {
    // replace entries with updated values
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryID.toString() === editEntryID) {
        data.editing[0].title = $form.elements.title.value;
        data.editing[0].photoURL = $form.elements.photoURL.value;
        data.editing[0].notes = $form.elements.notes.value;
        data.entries.splice(i, 1, data.editing[0]);
      }
    }
    // remove all entries from DOM
    while ($entryList.firstChild) {
      $entryList.removeChild($entryList.firstChild);
    }
    // re-append updated entries
    for (let m = 0; m < data.entries.length; m++) {
      const reAppendValue = appendEntries(data.entries[m]);
      $entryList.appendChild(reAppendValue);
    }
  } else {
    // if submitting an new entry
    data.entries.unshift(journalData);
    data.nextEntryId++;
    journalData.entryID = data.nextEntryId - 1;
    $entryList.prepend(appendEntries(data.entries[0]));
  }

  $form.reset();
  $imgSrc.src = 'images/placeholder-image-square.jpg';
  $entryForm.className = 'hidden';
  $entries.className = '';
  $message.className = 'hidden';
  data.view = 'entries';
});

// Dom tree for new entries.
function appendEntries(entry) {

  const listItem = document.createElement('li');

  const divContainer = document.createElement('div');
  divContainer.className = 'container';
  listItem.appendChild(divContainer);

  const divRow = document.createElement('div');
  divRow.className = 'row';
  divContainer.appendChild(divRow);

  const divColumnHalf = document.createElement('div');
  divColumnHalf.className = 'column-half';
  divRow.appendChild(divColumnHalf);

  const imgTag = document.createElement('img');
  imgTag.src = entry.photoURL;
  imgTag.className = 'img-src';
  divColumnHalf.appendChild(imgTag);

  const divColumnHalfText = document.createElement('div');
  divColumnHalfText.className = 'column-half text';
  divRow.appendChild(divColumnHalfText);

  const divEdit = document.createElement('div');
  divColumnHalfText.appendChild(divEdit);

  const title = document.createElement('h2');
  title.textContent = entry.title;
  divEdit.appendChild(title);

  const editIcon = document.createElement('i');
  editIcon.className = 'fas fa-pen';
  editIcon.setAttribute('data-entry-id', entry.entryID);
  divEdit.appendChild(editIcon);

  const notes = document.createElement('p');
  notes.textContent = entry.notes;
  divColumnHalfText.appendChild(notes);

  return listItem;
}

// Dom loaded event/function
document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const value = appendEntries(data.entries[i]);
    $entryList.appendChild(value);
  }
  if (data.view === 'entry-form') {
    $entries.className = 'hidden';
    $entryForm.className = '';
    $message.className = 'hidden';
  } else if (data.view === 'entries' && data.entries.length > 0) {
    $entries.className = '';
    $entryForm.className = 'hidden';
    $message.className = 'hidden';
  } else if (data.view === 'entries' && data.entries.length === 0) {
    $entries.className = '';
    $entryForm.className = 'hidden';
  }
});

// NEW button click event/function
$newButton.addEventListener('click', function (event) {
  $entries.className = 'hidden';
  $entryForm.className = '';
  data.view = 'entry-form';
  // reset entry form to blank
  $form.elements.title.value = '';
  $form.elements.photoURL.value = '';
  $form.elements.notes.value = '';
  $imgSrc.src = 'images/placeholder-image-square.jpg';
});

// ENTRIES button click event/function
$entriesButton.addEventListener('click', function (event) {
  $entries.className = '';
  $entryForm.className = 'hidden';
  data.view = 'entries';
  if (data.entries.length === 0) {
    $message.className = 'message';
  } else {
    $message.className = 'hidden';
  }
});

// Entries view click event
$entries.addEventListener('click', function (event) {

  // when the click icon is clicked
  if (event.target.tagName === 'I') {
    // hide entries and show entry form
    $entries.className = 'hidden';
    $entryForm.className = '';

    // find the data entry id that the icon associated with.
    const editID = event.target.getAttribute('data-entry-id');
    // iterate the data.entries array to find the entryID that matches icon ID
    for (let j = 0; j < data.entries.length; j++) {
      // if dataEntryID matches icon ID, add entries in editing, set the form input area to show that entryID data
      if (data.entries[j].entryID.toString() === editID) {
        data.editing.unshift(data.entries[j]);
        $imgSrc.setAttribute('src', data.entries[j].photoURL);
        $form.elements.title.setAttribute('value', data.entries[j].title);
        $form.elements.photoURL.setAttribute('value', data.entries[j].photoURL);
        $form.elements.notes.textContent = data.entries[j].notes;
        // set editID on the form element. (so later check if the form is an edit or new entry)
        $form.setAttribute('editEntryID', editID);
      }
    }
  }
});
