export const formatName = (name: string, surname: string) => {
  const capName = name.charAt(0).toUpperCase() + name.slice(1);
  const capSurname = surname.charAt(0).toUpperCase() + surname.slice(1);
  return `${capName} ${capSurname}`;
};
