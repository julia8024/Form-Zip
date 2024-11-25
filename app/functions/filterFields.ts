// 데이터 객체에서 원하는 필드만 추출하는 메소드
export default function filterFields(
  content: { [key: string]: any },
  fields: string[]
) {
  return fields.reduce((acc, field) => {
    if (content[field] !== undefined) {
      acc[field] = content[field]; // 해당 필드가 존재하면 추가
    }
    return acc;
  }, {} as { [key: string]: any });
}

// 사용 예시
// const filteredContent = filterFields(content, ["title", "price"]);