import React, { useEffect, useState } from "react";
import styled from "styled-components";
import generateCalendar from "@/app/functions/Date/generateCalendar";
import changeMonth from "@/app/functions/Date/changeMonth";
import TriangleButtonIcon from "@/app/components/icons/TriangleButtonIcon";
import getTodayDate from "@/app/functions/Date/getTodayDate";
import PressableElement from "@/app/components/buttons/PressableElement";
import Color from "@/app/shared/Color";
import AlignCenter from "@/app/components/AlignCenter";

const ITEM_SIZE = "30px";

export interface CalendarProps {
  name: string; // 필드의 name 속성
  value: string; // 입력된 값 (유연한 타입)
  onDateSelect: (Date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  name,
  value,
  onDateSelect,
}: CalendarProps) => {
  const [days, setDays] = useState();
  const dayOfTheWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [thisDate, setThisDate] = useState();

  useEffect(() => {
    const temp = getTodayDate().split("-");
    const initDate: any = {
      year: parseInt(temp[0]),
      month: parseInt(temp[1]),
      day: parseInt(temp[2]),
    };
    const calendarDate = generateCalendar(initDate.year, initDate.month);
    setThisDate(initDate);
    setDays(calendarDate);
  }, []);

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

  function changeStringFormat(date: string): {
    year: number;
    month: number;
    day: number;
  } {
    const [year, month, day] = date.split("-").map(Number);
    return { year, month, day };
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
              const tmp = changeMonth(thisDate?.year, thisDate?.month, "prev");
              setThisDate(tmp);
              const calendarDate = generateCalendar(
                thisDate?.year,
                thisDate?.month
              );
              setDays(calendarDate);
            }}
          >
            <TriangleButtonIcon />
          </PressableElement>
          <YearMonthTitle>
            {thisDate?.year}년 {thisDate?.month}월
          </YearMonthTitle>
          {/* <YearMonthTitle>여기 연월 날짜 나올거임</YearMonthTitle> */}
          <PressableElement
            borderEnabled={false}
            idleColor="none"
            hoverColor="none"
            clickColor="none"
            width="fit-content"
            onClick={() => {
              const tmp = changeMonth(thisDate?.year, thisDate?.month, "next");
              setThisDate(tmp);
              const calendarDate = generateCalendar(
                thisDate?.year,
                thisDate?.month
              );
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
                      <AlignCenter
                        width={ITEM_SIZE}
                        height={ITEM_SIZE}
                      >
                        <PressableElement
                          width={ITEM_SIZE}
                          height={ITEM_SIZE}
                          borderRadius="200px"
                          borderEnabled={false}
                          idleColor={
                            checkDate(changeStringFormat(value), iter) == true
                              ? Color.text
                              : "none"
                          }
                          hoverColor={
                            checkDate(changeStringFormat(value), iter) == true
                              ? Color.text
                              : "none"
                          }
                          clickColor={
                            checkDate(changeStringFormat(value), iter) == true
                              ? Color.text
                              : "none"
                          }
                          onClick={() => {
                            onDateSelect(
                              iter.year + "-" + iter.month + "-" + iter.day
                            );
                          }}
                        >
                          <AlignCenter width="100%" height="100%">
                            <DayText
                              color={
                                checkDate(changeStringFormat(value), iter) ==
                                true
                                  ? Color.white
                                  : iter.isCurrentMonth
                                  ? Color.text
                                  : Color.lightGray
                              }
                              deco={iter.isToday ? "underline" : "none"}
                            >
                              {iter.day}
                            </DayText>
                          </AlignCenter>
                        </PressableElement>
                      </AlignCenter>
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

const Container = styled.div`
  border: 1px solid ${Color.lightGray};
  border-radius: 5px;
  width: 100%;
  max-width: 360px;
`;

const TopContainer = styled.div`
  padding: 10px;
  border-bottom: 1px solid ${Color.brightGray};
`;

const BodyContainer = styled.div`
  padding: 10px 20px 20px;
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

const DayText = styled.p<{ deco: string }>`
  margin: 0;
  border-radius: 200px;
  width: ${ITEM_SIZE};
  color: ${(props) => props.color};
  text-decoration: ${(props) => props.deco};
  font-size: 16px;
  font-weight: 500;
  text-align: center;
`;

export default Calendar;