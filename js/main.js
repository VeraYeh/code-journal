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
  data.entries.unshift(journalData);
  data.nextEntryId++;
  journalData.entryID = data.nextEntryId - 1;
  $entryList.prepend(appendEntries(data.entries[0]));
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

  const title = document.createElement('h2');
  title.textContent = entry.title;
  divColumnHalfText.appendChild(title);

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
    $message.className = 'message';
  }
});

// NEW button click event/function
$newButton.addEventListener('click', function (event) {
  $entries.className = 'hidden';
  $entryForm.className = '';
  data.view = 'entry-form';
});

// ENTRIES button click event/function
$entriesButton.addEventListener('click', function (event) {
  $entries.className = '';
  $entryForm.className = 'hidden';
  data.view = 'entries';
});
