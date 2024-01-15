import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  color?: string;
};

const MoreVerticalSvg: React.FC<Props> = ({ color = "#4C4C60" }) => (
  <Svg width={19} height={19} fill="none">
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={color}
      strokeWidth={1.2}
      d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
    />
  </Svg>
);

export default MoreVerticalSvg;
