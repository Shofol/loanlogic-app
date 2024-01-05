export const formatToFile = (file: any) => {
  return {
    name: file.name.split(".")[0],
    uri: file.uri,
    type: file.mimeType
    // size: file.size
  };
};
