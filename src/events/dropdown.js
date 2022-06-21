'use strict';

import UI from '/src/configs/ui.js'

function dropdown() {
  UI.file.addEventListener('mouseover', () => UI.fileContent.style.display = 'grid');
  UI.file.addEventListener('mouseout', () => UI.fileContent.style.display = 'none');
  UI.edit.addEventListener('mouseover', () => UI.editContent.style.display = 'grid');
  UI.edit.addEventListener('mouseout', () => UI.editContent.style.display = 'none');
  UI.add.addEventListener('mouseover', () => UI.addContent.style.display = 'grid');
  UI.add.addEventListener('mouseout', () => UI.addContent.style.display = 'none');
  UI.help.addEventListener('mouseover', () => UI.helpContent.style.display = 'grid');
  UI.help.addEventListener('mouseout', () => UI.helpContent.style.display = 'none');
  UI.settingsButton.addEventListener('click', () => {
    UI.settingsContent.style.display === 'grid' ?
      UI.settingsContent.style.display = 'none' :
      UI.settingsContent.style.display = 'grid'
  });
  UI.hotkeysButton.addEventListener('click', () => UI.container.style.display = 'grid');
  UI.container.addEventListener('click', () => UI.container.style.display = 'none');
}

export default dropdown;
