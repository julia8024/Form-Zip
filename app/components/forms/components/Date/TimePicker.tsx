import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Color from "@/app/shared/Color";
import { DateTime } from "@/app/shared/types/commonProps";
import formatStrToDateTime from "@/app/functions/Date/formatDateTime";
import CircleButton from "@/app/components/buttons/CircleButton";

const ITEM_SIZE = "30px";

interface TimePickerProps {
  value: string; // 입력된 값 (유연한 타입)
  onTimeSelect: (time: DateTime) => void;
}

interface TimeData {
  hour: string;
  minute: string;
  ampm: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onTimeSelect,
}: TimePickerProps) => {
  const [selectedHour, setSelectedHour] = useState(formatStrToDateTime(value).hour ?? 12);
  const [selectedMinute, setSelectedMinute] = useState(formatStrToDateTime(value).minute ?? 0);
  const [ampm, setAmpm] = useState(formatStrToDateTime(value).ampm ?? "AM");

  const hoursArray = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutesArray = Array.from({ length: 60 }, (_, i) => i);

  const handleSelect = () => {
    onTimeSelect({ hour: selectedHour, minute: selectedMinute, ampm: ampm });
  };

  useEffect(() => {
    handleSelect();
  }, [selectedHour, selectedMinute, ampm]);

  return (
    <PickerContainer>
      <TimeSelector>
        <div>
          <TimeTitle>H</TimeTitle>
          <TimeList>
            {hoursArray.map((hour) => (
              <CircleButton
                size={ITEM_SIZE}
                backgroundColor={hour === selectedHour ? Color.text : "none"}
                onClick={() => {
                  setSelectedHour(hour);
                }}
                textColor={hour === selectedHour ? Color.white : Color.text}
                text={String(hour).padStart(2, "0")}
              />
            ))}
          </TimeList>
        </div>
        <div>
          <TimeTitle>M</TimeTitle>
          <TimeList>
            {minutesArray.map((minute) => (
              <CircleButton
                size={ITEM_SIZE}
                backgroundColor={
                  minute === selectedMinute ? Color.text : "none"
                }
                onClick={() => {
                  setSelectedMinute(minute);
                }}
                textColor={minute === selectedMinute ? Color.white : Color.text}
                text={String(minute).padStart(2, "0")}
              />
            ))}
          </TimeList>
        </div>
      </TimeSelector>
      <AmpmContainer>
        <AmpmButton
          isSelected={ampm === "AM"}
          borderRadius={ampm === "AM" ? "5px" : "5px 0 0 5px"}
          onClick={() => {
            setAmpm("AM");
          }}
        >
          AM
        </AmpmButton>
        <AmpmButton
          isSelected={ampm === "PM"}
          borderRadius={ampm === "PM" ? "5px" : "0 5px 5px 0"}
          onClick={() => {
            setAmpm("PM");
          }}
        >
          PM
        </AmpmButton>
      </AmpmContainer>
    </PickerContainer>
  );
};

// Styled Components
const PickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px 20px;
`;

const TimeSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TimeTitle = styled.p`
  margin: 0;
  color: ${Color.text};
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid ${Color.brightGray};
`;

const TimeList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  max-height: 190px; /* 원하는 최대 높이 설정 */
  overflow-y: scroll; /* 스크롤은 가능하지만 스크롤바는 숨김 */

  /* 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari에서 스크롤바 숨김 */
  }

  -ms-overflow-style: none; /* IE, Edge에서 스크롤바 숨김 */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨김 */
`;

const AmpmContainer = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid ${Color.lightGray};
  border-radius: 5px;
`;

const AmpmButton = styled.button<{ isSelected: boolean; borderRadius: string }>`
  margin: 0;
  padding: 6px 10px;
  cursor: pointer;
  color: ${({ isSelected }) => (isSelected ? Color.white : Color.text)};
  background-color: ${({ isSelected }) =>
    isSelected ? Color.text : "transparent"};
  border: none;
  border-radius: ${(props) => props.borderRadius};
`;

export default TimePicker;
