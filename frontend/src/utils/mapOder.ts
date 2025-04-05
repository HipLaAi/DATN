type OrderableItem = {
  [key: string]: any; // key có thể là bất kỳ chuỗi nào, giá trị có thể là bất kỳ loại dữ liệu nào
};

export const mapOrder = <T extends OrderableItem>(
  originalArray: T[], 
  orderArray: (string | number)[], 
  key: keyof T
): T[] => {
  if (!originalArray || !orderArray || !key) return [];

  const clonedArray = [...originalArray];
  const orderedArray = clonedArray.sort((a, b) => {
    return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key]);
  });

  return orderedArray;
};
