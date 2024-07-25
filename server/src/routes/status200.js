const donwload = (res) => {
  return res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=alicePdf.pdf",
  });
};

module.exports = { donwload };
