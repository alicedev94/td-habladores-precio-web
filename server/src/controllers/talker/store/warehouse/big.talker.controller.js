const big = (doc, start, end) => {
  doc.on("data", start);
  doc.on("end", end);

  console.log("doc");

  doc.end();
};

module.exports = big;
