import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
    color?: string;
};

const ReportSvg: React.FC<Props> = ({ color = "#4C4C60" }) => (
    <Svg width={23} height={23} fill="none">
        <Path
            d="M20.979 3.953h-1.573v-.719a2.159 2.159 0 0 0-2.156-2.156H2.875A2.159 2.159 0 0 0 .719 3.234v4.672c0 .199.16.36.36.36h3.233v11.5c0 1.189.968 2.156 2.157 2.156h12.578a2.159 2.159 0 0 0 2.156-2.156V16.89a.36.36 0 0 0-.36-.36h-1.437v-1.797h1.573c.718 0 1.302-.584 1.302-1.302V5.256c0-.719-.584-1.303-1.302-1.303ZM4.313 7.547H1.438V3.234c0-.792.644-1.437 1.437-1.437h1.438v5.75Zm3.593 9.344v2.875c0 .792-.644 1.437-1.437 1.437a1.439 1.439 0 0 1-1.438-1.437V1.796H17.25c.793 0 1.438.646 1.438 1.438v.72H7.77c-.718 0-1.302.583-1.302 1.302v8.176c0 .718.584 1.302 1.302 1.302h10.916v1.797H8.267a.36.36 0 0 0-.36.36ZM9.59 4.67a2.79 2.79 0 0 1-2.402 2.403V5.256c0-.322.261-.584.583-.584h1.82Zm-2.402 6.942a2.79 2.79 0 0 1 2.402 2.403H7.771a.584.584 0 0 1-.583-.584v-1.819Zm13.296 5.637v2.516c0 .792-.644 1.437-1.437 1.437H8.07c.343-.382.554-.885.554-1.437V17.25h11.86Zm1.078-3.818a.584.584 0 0 1-.584.584H19.16a2.79 2.79 0 0 1 2.402-2.403v1.819Zm0-2.543a3.51 3.51 0 0 0-3.126 3.127h-8.122a3.51 3.51 0 0 0-3.127-3.127V7.8a3.51 3.51 0 0 0 3.127-3.127h8.122a3.51 3.51 0 0 0 3.127 3.126v3.091Zm0-3.815a2.79 2.79 0 0 1-2.402-2.402h1.819c.322 0 .584.262.584.584v1.818Z"
            fill={color}
        />
        <Path
            d="M14.375 5.39c-1.982 0-3.594 1.774-3.594 3.954.199 5.244 6.99 5.243 7.188 0 0-2.18-1.613-3.953-3.594-3.953Zm0 7.188c-1.585 0-2.875-1.45-2.875-3.234.16-4.292 5.591-4.29 5.75 0 0 1.783-1.29 3.234-2.875 3.234Z"
            fill={color}
        />
    </Svg>
);

export default ReportSvg;
