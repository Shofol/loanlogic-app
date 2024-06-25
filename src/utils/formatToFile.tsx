export const formatToFile = (file: any) => {
  return {
    name: file.name,
    uri: file.uri,
    type: file.mimeType
    // size: file.size
  };
};
