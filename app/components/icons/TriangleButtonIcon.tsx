import * as React from "react";
import Color from "@/app/shared/Color";
import { CommonIconProps } from "@/app/shared/types/commonProps";


const TriangleButtonIcon: React.FC<CommonIconProps> = ({
  color = Color.text,
  width = "10",
  height = "10",
  style = {},
  ...props
}: CommonIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 10 10"
    fill={color}
    style={style}
    {...props}
  >
    <path d="M1.75 5.43301C1.41667 5.24056 1.41667 4.75944 1.75 4.56699L6.25 1.96891C6.58333 1.77646 7 2.01702 7 2.40192L7 7.59808C7 7.98298 6.58333 8.22354 6.25 8.03109L1.75 5.43301Z" />
  </svg>
);
export default TriangleButtonIcon;
