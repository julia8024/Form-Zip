import React from "react";
import Color from "@/app/shared/Color";
import PressableElement from "./PressableElement";
import AlignCenter from "../AlignCenter";
import { Text } from "@/app/shared/styles/commonStyles";

interface ButtonProps {
  text: string;
  color?: string;
  backgroundColor?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  padding?: string | number;
  isEnabled?: boolean;
  scaleEnabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

// 기본 버튼 (비활성화 상태도 O)
const Button: React.FC<ButtonProps> = ({
  text = "",
  color = Color.white,
  backgroundColor = Color.text,
  width = "100%",
  height = "100%",
  borderRadius = "6px",
  padding = "10px",
  isEnabled = true,
  scaleEnabled = true,
  onClick,
}: ButtonProps) => {
  return (
    <div style={{width: width, position: "relative"}}>
      <PressableElement
        borderEnabled={!isEnabled}
        borderRadius={borderRadius}
        width={width}
        idleColor={isEnabled ? backgroundColor : Color.brightGray}
        hoverColor={isEnabled ? backgroundColor : "none"}
        clickColor={isEnabled ? backgroundColor : "none"}
        padding={padding}
        scaleEnabled={scaleEnabled && isEnabled}
        onClick={(e) => {
            isEnabled && onClick(e);
        }}
      >
        <AlignCenter width={width} height={height}>
          <Text color={isEnabled ? color : Color.gray}>{text}</Text>
        </AlignCenter>
      </PressableElement>
    </div>
  );
};

export default Button;
