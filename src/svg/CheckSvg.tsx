import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CheckSvg: React.FC<any> = ({ color }: { color: string }) => (
  <Svg width={14} height={10} fill="none">
    <Path
      d="M12.333 1 5 8.333 1.667 5"
      stroke={color ? color : "#1B1D4D"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CheckSvg;
