function plugin(options) {
  options = options || [
    {
      open: "{",
      close: "}",
      element: "span",
      class: "term-1"
    },
    {
      open: "{{",
      close: "}}",
      element: "span",
      class: "term-2"
    }
  ];

  const Parser = this.Parser;
  const tokenizers = Parser.prototype.inlineTokenizers;
  const methods = Parser.prototype.inlineMethods;

  let insertPoint = methods.indexOf("text");

  options.reverse().forEach((config, idx) => {
    // require: term.open, term.closed
    if (!config.open || !config.close) {
      return;
    }
    // default element 'span', default class 'term'
    const name = config.name || `term_${idx}`;

    tokenizers[name] = function(eat, value, silent) {
      if (!value.startsWith(config.open)) {
        return;
      }
      const closeIndex = value.indexOf(config.close, config.open.length);
      if (closeIndex === -1) {
        return;
      }
      if (silent) {
        return true;
      }

      const term = value.substring(config.open.length, closeIndex);
      const toEat = value.substring(0, closeIndex + config.close.length);

      const node = {
        type: name,
        data: {
          hName: config.element || "span"
        },
        children: this.tokenizeInline(term, eat.now())
      };

      if (config.class) {
        node.data.hProperties = {
          className: config.class
        };
      }

      eat(toEat)(node);
    };

    tokenizers[name].locator = function(value, fromIndex) {
      return value.indexOf(config.open, fromIndex);
    };

    tokenizers[name].notInLink = true;

    methods.splice(insertPoint++, 0, name);
  });
}

module.exports = plugin;
