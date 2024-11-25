import React, { useState } from "react";
import { CommonFormProps } from "@/app/shared/types/commonProps";
import ClearButton from "../components/ClearButton";
import DateTimeGroup from "../components/Date/DateTimeGroup";
import { formatPrettyStr } from "@/app/functions/Date/formatDateTime";

interface DateFieldProps extends CommonFormProps<string> {
  value: string;
}

const DateField: React.FC<DateFieldProps> = ({
  name,
  value,
  onChange,
  placeholder = "날짜 선택",
  description,
  type = "text",
  isEnabled = true,
}: DateFieldProps) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSelect = (newDateTime: string) => {
    onChange({
      target: { name, value: newDateTime },
    } as React.ChangeEvent<HTMLInputElement>); // 선택된 날짜를 상위 컴포넌트에 전달
  };


  const handleClear = () => {
    onChange({
      target: { name, value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <input
        type={type}
        id={name}
        name={name}
        value={value && formatPrettyStr(value)}
        onChange={onChange}
        onClick={() => {
          setShowCalendar(!showCalendar);
        }}
        placeholder={placeholder}
        style={{
          padding: "8px",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "4px",
          paddingRight: "30px", // X 버튼 공간 확보
        }}
        readOnly={!isEnabled}
      />
      {value && !showCalendar && (
        <ClearButton right={true} onClick={handleClear} />
      )}
      {showCalendar &&
        <DateTimeGroup name={name} value={value} onSelect={handleSelect} />}
    </div>
  );
};

export default DateField;
