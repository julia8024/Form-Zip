import React from "react";

interface AlignCenterProps {
    left?: boolean;
    right?: boolean;
    between?: boolean;
    width?: string | number;
    height?: string | number;
    background?: string;
    isFlex?: boolean; // true인 경우 화면 너비에 따른 레이아웃 자동조정
    gap?: string | number;
    margin?: string | number;
    children: React.ReactNode;
}

const AlignCenter: React.FC<AlignCenterProps> = ({ left = false, right = false, between = false, width = "100%", height = "100%", background, isFlex = false, gap, margin, children }: AlignCenterProps) => {
    let justifyContent = "center";
    if (left) {
        justifyContent = "left";
    } else if (right) {
        justifyContent = "right";
    } else if (between) {
        justifyContent = "space-between";
    }
    return (
        <div
            style={{
                width: width,
                height: height,
                display: "flex",
                justifyContent: justifyContent,
                flexDirection: isFlex ? "column" : "row",
                alignItems: "center",
                background: background,
                gap: gap,
                margin: margin,

            }}
        >
            {children}
        </div>)
};


export default AlignCenter;
