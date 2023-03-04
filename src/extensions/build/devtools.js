/* eslint-disable */
// @ts-nocheck

chrome.devtools.panels.create(
  'C-Render',
  'assets/C_React_Logo.png',
  'Panel.html',
  () => {
    // code invoked on panel creation
  }
);

chrome.devtools.panels.elements.createSidebarPane('Tree', (sidebar) => {
  // sidebar initialization code here
  console.log('testing if tree sidebar is working ');
  sidebar.setObject({ some_data: 'Some data to show' });
});

chrome.devtools.panels.elements.createSidebarPane('Performance', (sidebar) => {
  // sidebar initialization code here
  console.log('testing if performance sidebar is working ');
  sidebar.setObject({ some_data: 'Some data to show' });
});
