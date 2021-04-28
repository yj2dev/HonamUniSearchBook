const distribute = (total, current) => {
  const pagingCnt = 10;
  const half = Math.floor(pagingCnt / 2);
  const pagingList = [];
  let L = current - half;
  let R = current + half;

  if (L < 1) {
    R += Math.abs(L) + 1;
    L = 1;
  }

  if (R > total) {
    L -= R - total;
    R = total;
  }
  for (let i = L; i <= R; i++) {
    pagingList.push(i);
  }

  return pagingList;
};

for (let i = -3; i < 30; i++) {
  console.log(distribute(29, i), i);
}
console.log(distribute(2, 1));
