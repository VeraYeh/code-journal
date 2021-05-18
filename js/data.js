/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

const $userPhotoUrl = document.querySelector('.photo-url');
const $imgSrc = document.querySelector('.img-src');

$userPhotoUrl.addEventListener('input', function (event) {
  const imgSrc = event.target.value;
  $imgSrc.setAttribute('src', imgSrc);
});

const $form = document.querySelector('form.container');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const journalData = {
    title: $form.elements.title.value,
    photoURL: $form.elements.photoURL.value,
    notes: $form.elements.notes.value,
    entryID: 0
  };
  data.nextEntryId += 1;
  journalData.entryID = data.nextEntryId - 1;
  data.entries.unshift(journalData);
  $imgSrc.src = 'images/placeholder-image-square.jpg';
  $form.reset();

  const entriesJSON = JSON.stringify(data.entries);
  localStorage.setItem('code-journal-local-storage', entriesJSON);
});
