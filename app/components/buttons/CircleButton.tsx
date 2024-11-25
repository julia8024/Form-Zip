import React from "react";
import Color from "@/app/shared/Color";
import PressableElement from "./PressableElement";
import AlignCenter from "../AlignCenter";
import styled from "styled-components";

interface CircleButtonProps {
  size: string | number; // width == height == size
  backgroundColor?: string;
  idleColor?: string;
  hoverColor?: string;
  clickColor?: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  textColor?: string;
  text: string;
  textStyle?: React.CSSProperties;
}

// backgroundColor를 설정하면, idleColor == hoverColor == clickColor == backgroundColor
// backgroundColor를 설정하지 않고, idleColor, hoverColor, clickColor를 각각 설정하면 각각 적용됨
// 기본 PressableElement 컴포넌트에 적용된 컬러를 원한다면 4가지 컬러 모두 설정 X

const CircleButton: React.FC<CircleButtonProps> = ({
  size,
  backgroundColor,
  idleColor,
  hoverColor,
  clickColor,
  onClick,
  textColor = Color.text,
  text = "",
  textStyle = {},
}: CircleButtonProps) => {
  return (
    <>
      <PressableElement
        width={size}
        height={size}
        borderRadius="200px"
        borderEnabled={false}
        idleColor={idleColor || backgroundColor}
        hoverColor={hoverColor || backgroundColor}
        clickColor={clickColor || backgroundColor}
        onClick={onClick}
      >
        <AlignCenter width={size} height={size}>
          <ButtonText size={size} color={textColor} style={textStyle}>
            {text}
          </ButtonText>
        </AlignCenter>
      </PressableElement>
    </>
  );
};

const ButtonText = styled.p<{ size: string | number; color: string }>`
  margin: 0;
  border-radius: 200px;
  width: ${(props) => props.size};
  color: ${(props) => props.color};
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
`;

export default CircleButton;
