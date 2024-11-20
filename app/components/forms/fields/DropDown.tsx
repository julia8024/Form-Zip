import { CommonFormProps } from "@/app/shared/types/commonProps";
import React, { useState } from "react";
import styled from "styled-components";
import ChevronIcon from "../../icons/ChevronIcon";
import AlignCenter from "../../AlignCenter";
import PressableElement from "../../buttons/PressableElement";
import { Divider, Text } from "@/app/shared/styles/commonStyles";
import Color from "@/app/shared/Color";

interface DropDownProps extends CommonFormProps {
  options: string[];
}

const Dropdown: React.FC<DropDownProps> = ({
  name,
  value,
  options,
  placeholder = "선택",
  onChange,
  isEnabled, // TO DO : check isEnabled
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange({
      target: { name, value: option },
    } as React.ChangeEvent<HTMLInputElement>);
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  return (
    <Container>
      <PressableElement
        borderRadius={"4px"}
        borderEnabled={false}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div style={{ padding: "10px", width: "100%" }}>
          <AlignCenter between={true}>
            {!!value ? (
              <Text>{value}</Text>
            ) : (
              <Text color={Color.gray}>{placeholder}</Text>
            )}
            <AlignCenter width="20px" height="20px">
              <ChevronIcon
                style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
              />
            </AlignCenter>
          </AlignCenter>
        </div>
      </PressableElement>
      {isOpen && (
        <>
          <Divider />
          <DropdownItem onClick={() => handleSelect("")}>
            <Text>{"선택 해제"}</Text>
          </DropdownItem>
          <DropdownList>
            {!!options &&
              options.map((option, index) => (
                <DropdownItem key={index} onClick={() => handleSelect(option)}>
                  <Text>{option}</Text>
                </DropdownItem>
              ))}
          </DropdownList>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid ${Color.lightGray};
  border-radius: 4px;
  cursor: pointer;
  background: ${Color.white};
`;

const DropdownList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: 160px;
  overflow-y: auto;
`;

const DropdownItem = styled.li`
  margin: 0;
  list-style: none;
  padding: 10px;
  &:hover {
    background-color: ${Color.grayBackground};
  }
`;

export default Dropdown;
