import React from "react";
import PressableElement from "../../buttons/PressableElement";
import CloseIcon from "../../icons/CloseIcon";
import AlignCenter from "../../AlignCenter";
import styled from "styled-components";

interface ClearButtonProps {
  right?: boolean; // true이면 우측 고정
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

interface ClearBtnProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ClearBtn: React.FC<ClearBtnProps> = ({ onClick }: ClearBtnProps) => {
  return (
    <PressableElement
      width={"24px"}
      height={"24px"}
      borderEnabled={false}
      borderRadius={"100px"}
      onClick={onClick}
    >
      <AlignCenter width="20px" height="20px">
        <CloseIcon />
      </AlignCenter>
    </PressableElement>
  );
};

const ClearButton: React.FC<ClearButtonProps> = ({
  right = false,
  onClick,
}: ClearButtonProps) => {
  return (
    <>
      {right ? (
        <ClearBtnContainer>
          <ClearBtn onClick={onClick} />
        </ClearBtnContainer>
      ) : (
        <ClearBtn onClick={onClick} />
      )}
    </>
  );
};

const ClearBtnContainer = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export default ClearButton;
