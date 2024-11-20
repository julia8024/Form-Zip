import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Color from "@/app/shared/Color";
import AlignCenter from "../AlignCenter";

const TRANSPARENT_COLOR = "#00000000";

interface PressableElementProps {
	idleColor?: string;
	hoverColor?: string;
	clickColor?: string;
	borderColor?: string;
	borderEnabled?: boolean;
	borderRadius?: string | number;
	scaleEnabled?: boolean;
	backgroundEnabled?: boolean;
	onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
	width?: string | number;
	height?: string | number;
	padding?: string | number;
	overflow?: string;
	className?: string;
	children: React.ReactNode;
}

const PressableElement: React.FC<PressableElementProps> = ({
	children,
	idleColor = TRANSPARENT_COLOR,
	hoverColor = Color.brightGray,
	clickColor = Color.grayBackground,
	borderColor = Color.lightGray,
	borderEnabled = true,
	borderRadius = "0px" || 0,
	scaleEnabled = true,
	backgroundEnabled = true,
	// cursor = "pointer",
	onClick,
	width = "100%",
	height = "100%",
	padding = "0" || 0,
	overflow = "hidden",
	className,
}: PressableElementProps) => {
	const containerRef = useRef();
	const [pressedDownScale, setPressedDownScale] = useState(1);

	useEffect(() => {
		if (!scaleEnabled) {
			setPressedDownScale(1);
		} else if (containerRef.current?.offsetWidth < 100 && containerRef.current?.offsetHeight < 100) {
			setPressedDownScale(0.92)
		} else if (containerRef.current?.offsetWidth < 300 && containerRef.current?.offsetHeight < 300) {
			setPressedDownScale(0.97)
		} else {
			setPressedDownScale(0.98)
		}
	}, [scaleEnabled, containerRef]);

	return (
		<div>
			<Container
				// ref={containerRef}
				onClick={onClick}
				overflow={overflow}
				onContextMenu={() => {
					return false;
				}}
				idleColor={idleColor}
				hoverColor={hoverColor}
				clickColor={clickColor}
				backgroundEnabled={backgroundEnabled}
				pressedDownScale={pressedDownScale}
				cursor={"pointer"}
				className={className}
				style={{
					height: height,
					width: width,
					borderRadius: borderRadius,
				}}
			>
				<InnerContainer
					borderColor={borderColor}
					borderEnabled={borderEnabled}
					style={{ padding: padding, borderRadius: borderRadius }}
				>
					<AlignCenter width={"100%"} height={"100%"}>
						{children}
					</AlignCenter>
				</InnerContainer>
			</Container>
		</div>
	);
};

const Container = styled.div.withConfig({
	shouldForwardProp: (prop) => {
		return prop !== 'backgroundEnabled' && prop !== 'idleColor' && prop !== 'hoverColor' && prop !== "clickColor" && prop !== "pressedDownScale";
	}
}) <{
	overflow: string;
	cursor: string;
	backgroundEnabled: boolean;
	idleColor: string;
	hoverColor: string;
	clickColor: string;
	pressedDownScale: number;
}>`
  position: relative;
  margin: 0;
  padding: 0;
  overflow: ${({ overflow }) => overflow};
  cursor: ${({ cursor, backgroundEnabled }) =>
		backgroundEnabled ? cursor : "default"};

  background: ${({ idleColor, backgroundEnabled }) =>
		backgroundEnabled ? idleColor : TRANSPARENT_COLOR};
  transform: scale3d(1, 1, 1);

  transition: background-color 0.25s, transform 0.3s;

  :hover {
    background: ${({ idleColor, hoverColor, backgroundEnabled }) => {
		if (backgroundEnabled) {
			return hoverColor;
		} else {
			return TRANSPARENT_COLOR;
		}
	}};

    transform: scale3d(1, 1, 1);
    transition: background-color 0.1s, transform 0.2s;
  }

  :active {
    background: ${({ clickColor, backgroundEnabled }) =>
		backgroundEnabled ? clickColor : TRANSPARENT_COLOR};
    transform: scale3d(
      ${({ pressedDownScale }) => pressedDownScale},
      ${({ pressedDownScale }) => pressedDownScale},
      1
    );
    transition: background-color 0.15s, transform 0.17s;
  }
`;


const InnerContainer = styled.div.withConfig({
	shouldForwardProp: (prop) => {
		return prop !== 'borderColor' && prop !== 'borderEnabled';
	}
}) <{
	borderEnabled: boolean;
	borderColor: string;
}>`
  width: 100%;
  border: 1px solid
    ${({ borderEnabled, borderColor }) =>
		borderEnabled ? borderColor : TRANSPARENT_COLOR};
`;

export default PressableElement;
