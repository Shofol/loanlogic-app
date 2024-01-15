export const mapMuniValue = (
  municipalitiesValues: any[],
  values: any,
  departmentFieldName: string,
  muniFieldName: string
) => {
  return municipalitiesValues
    .filter((muni) => muni.department === values[`${departmentFieldName}`])[0]
    ?.municipalities.filter(
      (element: any) => element.value === values[`${muniFieldName}`]
    );
};
