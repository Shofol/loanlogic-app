import { theme } from "../constants";

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

export const getStatusColor = (status: string) => {
  if (status) {
    if (status.includes("PENDING")) {
      return theme.COLORS.warning;
    } else if (status.includes("ACCEPTED")) {
      return theme.COLORS.green;
    } else if (status.includes("REFUSED")) {
      return theme.COLORS.mainDark;
    } else if (status.includes("ERROR")) {
      return theme.COLORS.danger;
    } else {
      return theme.COLORS.info;
    }
  }
};
