import React, { useEffect, useState } from "react";
import { CommonFormProps } from "@/app/shared/types/commonProps";
import Calendar from "../components/Date/Calendar";

interface DateTimeFieldProps extends CommonFormProps<string> {
  value: string;
}

const DateTimeField: React.FC<DateTimeFieldProps> = ({
  name,
  value,
  onChange,
  placeholder = "날짜 선택",
  description,
  type = "text",
  isEnabled = true,
}: DateTimeFieldProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {

  }, [])


  const handleDateSelect = (newDate: string) => {
    setShowCalendar(false); // 캘린더 닫기
    console.log(newDate)
    onChange({ target: { name, value: newDate } } as React.ChangeEvent<HTMLInputElement>); // 선택된 날짜를 상위 컴포넌트에 전달
  };

  return (
    <div>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onClick={() => {setShowCalendar(!showCalendar)}}
        placeholder={placeholder}
        style={{
          padding: "8px",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        readOnly={!isEnabled}
      />
      {showCalendar && <Calendar value={value} name={name} onDateSelect={handleDateSelect} />}
    </div>
  );
};

export default DateTimeField;