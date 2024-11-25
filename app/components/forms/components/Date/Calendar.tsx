import React, { useEffect, useState } from "react";
import styled from "styled-components";
import generateCalendar from "@/app/functions/Date/generateCalendar";
import changeMonth from "@/app/functions/Date/changeMonth";
import TriangleButtonIcon from "@/app/components/icons/TriangleButtonIcon";
import getTodayDate from "@/app/functions/Date/getTodayDate";
import PressableElement from "@/app/components/buttons/PressableElement";
import Color from "@/app/shared/Color";
import AlignCenter from "@/app/components/AlignCenter";
import { DateTime } from "@/app/shared/types/commonProps";
import filterFields from "@/app/functions/filterFields";
import formatStrToDateTime from "@/app/functions/Date/formatDateTime";
import CircleButton from "@/app/components/buttons/CircleButton";

const ITEM_SIZE = "30px";

interface CalendarProps {
  value: string; // 입력된 값 (유연한 타입)
  onDateSelect: (date: DateTime) => void;
}

interface CalendarDate {
  year: number;
  month: number;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  onDateSelect,
}: CalendarProps) => {
  const [days, setDays] = useState<CalendarDate[][] | undefined>(undefined);
  const dayOfTheWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [thisDate, setThisDate] = useState(
    formatStrToDateTime(value) ?? getTodayDate()
  );

  useEffect(() => {
    if (!!!value) {
      const initDate: DateTime = getTodayDate();
      setThisDate(initDate);
      setDays(generateCalendar(getTodayDate().year!, getTodayDate().month!));
    } else {
      setDays(generateCalendar(thisDate.year!, thisDate.month!));
    }
  }, []);

  useEffect(() => {
    onDateSelect(filterFields(thisDate, ["year", "month", "day"]));
  }, [thisDate]);

  function checkDate(date1: any, date2: any) {
    if (
      date1.year == date2.year &&
      date1.month == date2.month &&
      date1.day == date2.day
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Container>
      <TopContainer>
        <AlignCenter>
          <PressableElement
            borderEnabled={false}
            idleColor="none"
            hoverColor="none"
            clickColor="none"
            width="fit-content"
            onClick={() => {
              const tmp = changeMonth(thisDate.year!, thisDate.month!, "prev");
              setThisDate(tmp);
              const calendarDate = generateCalendar(tmp.year!, tmp.month!);
              setDays(calendarDate);
            }}
          >
            <TriangleButtonIcon />
          </PressableElement>
          <YearMonthTitle>
            {thisDate?.year}년 {thisDate?.month}월
          </YearMonthTitle>
          <PressableElement
            borderEnabled={false}
            idleColor="none"
            hoverColor="none"
            clickColor="none"
            width="fit-content"
            onClick={() => {
              const tmp = changeMonth(thisDate.year!, thisDate!.month!, "next");
              setThisDate(tmp);
              const calendarDate = generateCalendar(tmp.year!, tmp.month!);
              setDays(calendarDate);
            }}
          >
            <TriangleButtonIcon style={{ transform: "rotate(180deg)" }} />
          </PressableElement>
        </AlignCenter>
      </TopContainer>
      <BodyContainer>
        <DayContainer>
          {dayOfTheWeek.map((iter) => {
            return (
              <AlignCenter width={ITEM_SIZE} height={ITEM_SIZE}>
                <DayTitle>{iter}</DayTitle>
              </AlignCenter>
            );
          })}
        </DayContainer>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {!!days &&
            days.map((item) => {
              return (
                <DayContainer>
                  {item.map((iter) => {
                    return (
                      <>
                        <CircleButton
                          size={ITEM_SIZE}
                          backgroundColor={
                            checkDate(formatStrToDateTime(value), iter) == true
                              ? Color.text
                              : "none"
                          }
                          onClick={() => {
                            setThisDate(iter);
                          }}
                          textColor={
                            checkDate(formatStrToDateTime(value), iter) == true
                              ? Color.white
                              : iter.isCurrentMonth
                              ? Color.text
                              : Color.lightGray
                          }
                          text={iter.day + ""}
                          textStyle={{
                            textDecoration: iter.isToday ? "underline" : "none",
                          }}
                        />
                      </>
                    );
                  })}
                </DayContainer>
              );
            })}
        </div>
      </BodyContainer>
    </Container>
  );
};

const Container = styled.div``;

const TopContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${Color.brightGray};
`;

const BodyContainer = styled.div`
  padding: 10px 10px 20px;
`;

const DayContainer = styled.div`
  width: 100%;
  display: flex;
  gap: calc((100% - 210px) / 6);
`;

const YearMonthTitle = styled.p`
  margin: 0;
  color: ${Color.text};
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  padding: 0 ${ITEM_SIZE};
`;

const DayTitle = styled.p`
  margin: 0;
  color: ${Color.gray};
  font-size: 14px;
  font-weight: 500;
`;

export default Calendar;