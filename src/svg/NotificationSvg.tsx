import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

type Props = {
    color?: string;
};

const NotificationSvg: React.FC<Props> = ({ color = "#4C4C60" }) => (
    <Svg width={22} height={22} fill="none">
        <Path
            d="M18.219 16.724H3.78a.387.387 0 0 1-.386-.387V9.118c0-4.194 3.411-7.605 7.605-7.605 4.194 0 7.606 3.412 7.606 7.605v7.219a.387.387 0 0 1-.387.387ZM4.168 15.95h13.664V9.118A6.84 6.84 0 0 0 11 2.286a6.84 6.84 0 0 0-6.832 6.832v6.832Z"
            fill={color}
        />
        <Path
            d="M18.219 16.724H3.78a.387.387 0 0 1-.386-.387V9.118c0-4.194 3.411-7.605 7.605-7.605 4.194 0 7.606 3.412 7.606 7.605v7.219a.387.387 0 0 1-.387.387ZM4.168 15.95h13.664V9.118A6.84 6.84 0 0 0 11 2.286a6.84 6.84 0 0 0-6.832 6.832v6.832Z"
            fill={color}
        />
        <Path
            d="M20.028 13.211a.387.387 0 0 1-.387-.387V8.775c0-1.093-.212-2.16-.63-3.17a8.243 8.243 0 0 0-1.796-2.687.387.387 0 1 1 .547-.547 9.013 9.013 0 0 1 1.963 2.938c.458 1.105.69 2.27.69 3.466v4.05a.387.387 0 0 1-.387.386ZM1.972 13.211a.387.387 0 0 1-.387-.387V8.775c0-1.195.232-2.361.69-3.466a9.012 9.012 0 0 1 1.963-2.938.387.387 0 0 1 .547.547A8.242 8.242 0 0 0 2.99 5.605a8.242 8.242 0 0 0-.63 3.17v4.05a.387.387 0 0 1-.387.386ZM11 20.487a3.597 3.597 0 0 1-3.399-2.42.387.387 0 1 1 .731-.252 2.823 2.823 0 0 0 5.335 0 .387.387 0 1 1 .731.252A3.597 3.597 0 0 1 11 20.487Z"
            fill={color}
        />
        <Path
            d="M18.448 18.328H3.552c-.317 0-.616-.124-.84-.349a1.18 1.18 0 0 1-.349-.84c0-.317.124-.616.348-.84.225-.225.523-.349.841-.349h14.896c.318 0 .616.124.84.348.225.225.349.524.349.84v.001c0 .317-.124.616-.348.84a1.197 1.197 0 0 1-.841.349ZM3.552 16.724a.413.413 0 0 0-.415.415.412.412 0 0 0 .415.415h14.896a.418.418 0 0 0 .415-.415.414.414 0 0 0-.415-.415H3.552Z"
            fill={color}
        />
    </Svg>
);

export default NotificationSvg;
