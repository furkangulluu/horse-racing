export const deepCopy = (deepObject: any) => {
  return JSON.parse(JSON.stringify(deepObject));
};
