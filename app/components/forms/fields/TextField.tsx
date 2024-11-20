import React from "react";
import { CommonFormProps } from "@/app/shared/types/commonProps";
import ClearButton from "../components/ClearButton";

// prettier-ignore
interface TextFieldProps extends CommonFormProps<string | number, (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void> {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isMultiLine?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  name,
  value,
  onChange,
  placeholder,
  description,
  type = "text",
  isMultiLine = false,
  isEnabled = true, // TO DO : check isEnabled
}: TextFieldProps) => {
  const handleClear = () => {
    onChange({
      target: { name, value: "" },
    } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
  };
  return (
    <div style={{ position: "relative", width: "100%" }}>
      {isMultiLine ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            padding: "8px",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            paddingRight: "30px", // X 버튼 공간 확보
            resize: "vertical",
          }}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            padding: "8px",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            paddingRight: "30px", // X 버튼 공간 확보
          }}
        />
      )}
      {!!value && <ClearButton right={true} onClick={handleClear} />}
    </div>
  );
};

export default TextField;
