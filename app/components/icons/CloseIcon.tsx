import React from "react";
import Color from "@/app/shared/Color";
import { CommonIconProps } from "@/app/shared/types/commonProps";

const CloseIcon: React.FC<CommonIconProps> = ({
  color = Color.gray,
  width = "24",
  height = "24",
  style = {},
  ...props
}: CommonIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={style}
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default CloseIcon;
