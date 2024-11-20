const Color = {
    primary: "#3F8CFF",
    text: "#242424",

    positive: "#00C868",
    negative: "#FF6565",

    white: "#ffffff",
    brightGray: "#f0f0f0",
    lightGray: "#c8c8c8",
    gray: "#a0a0a0",
    darkGray: "#787878",    

    grayBackground: "#f9f9f9",
}

export type ColorType = keyof typeof Color; // 색상 키 타입을 정의
export default Color;