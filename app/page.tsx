"use client";
import { useState } from "react";
import TextField from "./components/forms/fields/TextField";
import Dropdown from "./components/forms/fields/DropDown";
import styled from "styled-components";
import Color from "./shared/Color";

interface Data {
  title: string,
  description: string,
  num: number,
  status: string,
}

export default function Home() {

  const [data, setData] = useState<Data>({
    title: "",
    description: "",
    num: 0,
    status: "",
  });

  // input
  const setInput = (e: any) => {
    console.log("타겟", e.target);
    const { value, name } = e.target;
    console.log("name!", name, value);
    setData({ ...data, [name]: value });
  };

  return (
    <Container>
      <div>테스트 텍스트</div>

      <SubContainer>
        <LabelText>한 줄 텍스트필드</LabelText>
        <TextField
          name={"title"}
          value={data.title}
          onChange={setInput}
          placeholder={"제목 입력"}
          isEnabled={true}
        />

      </SubContainer>
      <SubContainer>
      <LabelText>여러 줄 텍스트필드</LabelText>
        <TextField
          name={"description"}
          isMultiLine={true}
          value={data.description}
          onChange={setInput}
          placeholder={"상세하게 작성"}
          isEnabled={true}
        />
      </SubContainer>
      <SubContainer>
      <LabelText>숫자 필드</LabelText>
        <TextField
          name={"num"}
          type={"number"}
          value={data.num}
          onChange={setInput}
          placeholder={"숫자만 입력"}
          isEnabled={true}
        />
      </SubContainer>

      <SubContainer>
      <LabelText>드롭다운</LabelText>
        <Dropdown
          name={"status"}
          value={data.status}
          options={["작성 전", "작성 중", "작성 완료"]}
          onChange={setInput}
          placeholder={"선택"}
          isEnabled={true}
        />
      </SubContainer>


    </Container>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LabelText = styled.label`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: ${Color.text};
`;
