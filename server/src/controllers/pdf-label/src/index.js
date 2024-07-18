const label = (doc, font, fontSize, content, x, y, config) => {
  doc
    .font(font)
    .fontSize(fontSize)
    .text(
      content,
      x,
      y,
      config
    );
};

module.exports = { label };
