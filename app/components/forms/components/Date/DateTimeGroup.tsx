import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Color from "@/app/shared/Color";
import Calendar from "./Calendar";
import TimePicker from "./TimePicker";
import AlignCenter from "@/app/components/AlignCenter";
import { DateTime } from "@/app/shared/types/commonProps";
import { formatDateTimeToStr } from "@/app/functions/Date/formatDateTime";
import { VerticalDivider } from "@/app/shared/styles/commonStyles";
import isFlexible from "@/app/functions/isFlexible";


interface DateTimeGroupProps {
  name: string;
  value: string;
  onSelect: (dateTime: string) => void;
}

const DateTimeGroup: React.FC<DateTimeGroupProps> = ({
  name,
  value,
  onSelect,
}: DateTimeGroupProps) => {
  const [dateTime, setDateTime] = useState<DateTime>();

  useEffect(() => {
    if (!!dateTime && !!dateTime.year) {
      onSelect(formatDateTimeToStr(dateTime));
    }

  }, [dateTime])


  const handleSelect = (newSelected: DateTime) => {
    setDateTime({ ...dateTime, ...newSelected });
  }

  return (
    <Container>
      <AlignCenter isFlex={!isFlexible(380)}>
        <Calendar value={value} onDateSelect={handleSelect} />
        {isFlexible(400) && <VerticalDivider height={"280px"} margin={"0 0 0 10px"} color={Color.brightGray} />}
        <TimePicker value={value} onTimeSelect={handleSelect} />
      </AlignCenter>
    </Container>
  );
};

const Container = styled.div`
  border: 1px solid ${Color.lightGray};
  border-radius: 5px;
  width: 100%;
  max-width: 360px;
`;

export default DateTimeGroup;