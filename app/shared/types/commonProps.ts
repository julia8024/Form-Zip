export interface CommonFormProps<ValueType = string, OnChangeType = (e: React.ChangeEvent<HTMLInputElement>) => void> {
    name: string;               // 필드의 name 속성
    value: ValueType;           // 입력된 값 (유연한 타입)
    onChange: OnChangeType;  	// 값이 변경될 때 호출되는 함수
    placeholder?: string;       // 필드의 placeholder (선택적)
    description?: string;       // 필드 설명
    type?: string;              // 입력 필드의 타입 (기본값: 'text')
    isEnabled: boolean;         // 활성화 (true: 활성화, false: 비활성화)
}

export interface CommonIconProps {
    color?: string;
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties;
}

export interface DateTime {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    ampm?: string;
}