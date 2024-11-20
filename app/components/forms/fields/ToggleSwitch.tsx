import { CommonFormProps } from "@/app/shared/types/commonProps";
import React from "react";
import styled from "styled-components";
import AlignCenter from "../../AlignCenter";
import Color from "@/app/shared/Color";

const ITEM_SIZE = 20;

interface ToggleSwitchProps
  extends CommonFormProps<
    boolean,
    (e: { target: { name: string; value: boolean } }) => void
  > {
  value: boolean; // 입력된 값
  onChange: (e: { target: { name: string; value: boolean } }) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  name,
  value,
  onChange,
  isEnabled = true,
}: ToggleSwitchProps) => {
  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    onChange({
      ...e,
      target: {
        ...e.target,
        name,
        value: checked, // checked 상태를 value로 전달
      },
    });
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        opacity: isEnabled ? 1 : 0.5,
      }}
    >
      <ToggleContainer isChecked={value}>
        <AlignCenter
          width={ITEM_SIZE * 2 + 4}
          height={ITEM_SIZE + 4}
          left={!value}
          right={value}
        >
          <ToggleCircle size={ITEM_SIZE} />
          <input
            type="checkbox"
            name={name}
            onChange={handleToggleChange}
            checked={value}
            style={{ display: "none" }}
          />
        </AlignCenter>
      </ToggleContainer>
    </div>
  );
};

const ToggleContainer = styled.label.withConfig({
  shouldForwardProp: (prop) => {
    return prop !== "isChecked"
  }
})<{ isChecked: boolean }>`
  background: ${(props) =>
    props.isChecked ? Color.text : Color.lightGray};
  border-radius: 200px;
  border: 1px solid ${(props) =>
    props.isChecked ? Color.text : Color.lightGray}
  position: relative;
`;

const ToggleCircle = styled.div.withConfig({
  shouldForwardProp: (prop) => {
    return prop !== 'size';
  }
})<{ size: number }>`
  margin: 2px;
  background: ${Color.white};
  border-radius: 200px;
  border: 1px solid ${Color.gray};
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;

export default ToggleSwitch;
