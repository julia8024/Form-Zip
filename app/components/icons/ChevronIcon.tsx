import React from "react";
import Color from "@/app/shared/Color";
import { CommonIconProps } from "@/app/shared/types/commonProps";

const ChevronIcon: React.FC<CommonIconProps> = ({
  color = Color.text,
  width = "24",
  height = "24",
  style = {}, // 기본값을 빈 객체로 설정
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
    style={style} // 전달된 style 적용
    {...props}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default ChevronIcon;
