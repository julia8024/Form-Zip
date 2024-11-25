import React, { useEffect, useState } from "react";
import Calendar from "./Calendar";
import styled from "styled-components";
import Color from "@/app/shared/Color";
import AlignCenter from "@/app/components/AlignCenter";
import { DateTime } from "@/app/shared/types/commonProps";
import { formatDateTimeToStr } from "@/app/functions/Date/formatDateTime";
import { VerticalDivider } from "@/app/shared/styles/commonStyles";
import TimePicker from "./TimePicker";


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
      <AlignCenter>
        <Calendar value={value} onDateSelect={handleSelect} />
        <VerticalDivider height={"280px"} margin={"0 0 0 10px"} color={Color.brightGray}/>
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