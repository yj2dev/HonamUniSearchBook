const distribute = (total, current) => {
  const pagingCnt = 9;
  const half = Math.floor(pagingCnt / 2);
  const arr = [];
  current = parseInt(current);
  let L = current - half;
  // console.log("===current, half : ", current, half);
  // console.log("[TYPE]===current, half : ", typeof current, typeof half);
  let R = current + half;
  // console.log("===current, half : ", current, half);
  // console.log("[TYPE]===current, half : ", typeof current, typeof half);
  // console.log("Add R", current + half);
  // console.log("half: ", half);
  // console.log("L, R: ", L, R);
  // console.log("ARR: ", arr);
  // console.log("total: ", total, "current: ", current);

  if (L < 1) {
    R += Math.abs(L) + 1;
    L = 1;
  }

  if (R > total) {
    L -= R - total;
    R = total;
  }
  // console.log("L, R: ", L, R);
  L = L < 0 ? 1 : L;
  for (let i = L; i <= R; i++) {
    arr.push(i);
  }
  // console.log("ARR: ", arr);
  return arr;
};

for (let i = -3; i < 30; i++) {
  console.log(distribute(29, i), i);
}
console.log(distribute(2, 1));
