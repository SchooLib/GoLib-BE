exports.pagintaion = (offsetAsNumber, limitAsNumber) => {
  let p = 0;
  if (!Number.isNaN(offsetAsNumber) && offsetAsNumber > 0) {
    p = offsetAsNumber;
  }

  let s = 1000000;
  if (
    !Number.isNaN(limitAsNumber) &&
    limitAsNumber > 0 &&
    limitAsNumber < 1000000
  ) {
    s = limitAsNumber;
  }

  return { page: p, size: s };
};
