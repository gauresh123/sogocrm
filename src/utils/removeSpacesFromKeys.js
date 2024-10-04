export const removeSpacesFromKeys = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = key.replace(/ /g, ''); // Remove spaces from the key
      newObj[newKey] = obj[key];
    }
  }
  return newObj;
};
