import useWindowSize from '@/app/hook/useWindowSize';

const isFlexible = (customWidth?: number): boolean => {
    const { width } = useWindowSize();
    const threshold = customWidth !== undefined ? customWidth : 768; // 매개변수가 있으면 그 값을 사용, 없으면 768 사용
    return width >= threshold; // 비교
};

export default isFlexible;
