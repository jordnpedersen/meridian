'use strict';

function removeObject() {
  // TODO: Implement this function
}


/**
 * Returns the proper name of the object for the scene
 * @param {string} objectName
 * @returns object name to use
 */
function getName(objectName) {
  const ul = document.getElementById("sceneObjects");
  const lis = ul.getElementsByTagName("li");

  let highest = -1;

  // Find highest appended number substring of object name
  for (let child of lis) {
    let childName = child.children.item(0).outerText;
    if (childName.includes(objectName)) {
      if ((childName == objectName) && highest < 0) {
        highest = 0;
      } else {
        const childNameSplit = childName.split(objectName);
        if (childNameSplit.length == 2 && !isNaN(childNameSplit[1])) {
          // childName is in correct format of <objectName>+<number>
          const num = Number(childNameSplit[1]);
          if (num > highest) {
            highest = num;
          }
        }
      }
    }
  };

  if (highest == -1) {
    return objectName;
  } else {
    return objectName + (++highest).toString();
  }

}

export {getName};
