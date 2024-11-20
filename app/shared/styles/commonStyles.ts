import styled from 'styled-components';
import Color from '../Color';

/*
	// import 하는 방법
	import { Container } from '../styles/commonStyles';
*/

// 공통적으로 사용할 스타일 정의
// export const Container = styled.div`
//   display: flex;
//   height: 100vh;
//   align-items: center;
//   justify-content: center;
//   background-color: #f8f9fa;
// `;


// 대제목
export const Title = styled.h1`
    margin: 0;
    padding: 0;
    font-size: 24px;
    font-weight: 600;
    color: ${Color.text};
    line-height: 28px;
`;

export const Description = styled.p`
    margin: 0;
	font-size: 16px;
	font-weight: 400;
	color: ${Color.gray};
	line-height: 21px;
`;

// 소제목
export const STitle = styled.h2`
    margin: 0;
    padding: 0;
    font-size: 20px;
    font-weight: 600;
    color: ${Color.text};
    line-height: 24px;
`;

export const SDescription = styled.p`
    margin: 0;
    padding: 6px 0 0 0;
    font-size: 12px;
    font-weight: 400;
    color: ${Color.gray};
    line-height: 20x;
`;


// 아이템
export const ItemTitle = styled.p<{ margin?: string }>`
    margin: ${props => props.margin || "0"};
    padding: 0;
    font-size: 16px;
    font-weight: 600;
    color: ${Color.text};
    line-height: 21px;
`

export const ItemDescription = styled.p`
    margin: 8px 0 0 0;
    padding: 0;
    font-size: 14px;
    font-weight: 400;
    color: ${Color.gray};
    line-height: 18px;
`;

// 기본 본문 텍스트
export const Text = styled.p<{ color?: string }>`
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-weight: 400;
    color: ${props => props.color ?? Color.text};
    line-height: 18px;
`;


// 회색 가로선
export const Divider = styled.div<{ color?: string }>`
    margin: 0;
    padding: 0;
    border-bottom: 1px solid ${props => props.color ?? Color.lightGray};
`;

// 회색 세로선
export const VerticalDivider = styled.div<{ color?: string, height: string | number, margin?: string | number }>`
  height: ${props => props.height};
  margin: ${props => props.margin || "0"};
  border-left: 1px solid ${props => props.color || Color.gray};
`;