/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

// Save entire data in local storage
window.addEventListener('beforeunload', function () {
  const allEntriesJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-data', allEntriesJSON);
});

// Get data from local storage and save in variable data.
const localAllEntries = localStorage.getItem('code-journal-data');

if (localAllEntries !== null) {
  data = JSON.parse(localAllEntries);
}
