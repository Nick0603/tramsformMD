const { map, forEach, filter, isNil, trim } = require("lodash");
const _ = require("lodash");

class Node {
  children = [];
  constructor(text, start, end, type = "pure", options) {
    this.start = start;
    this.end = end;
    this.children.push(text);
    this.type = type;
    this.options = options;
  }

  applyMarkup(markup) {
    const { start, end, type, ...options } = markup;
    let iterator = this.start;
    const newChildren = [];
    forEach(this.children, (child) => {
      if (typeof child === "string") {
        let childStart = iterator;
        let childEnd = iterator + child.length;
        const isInclude = !(childEnd < start || childStart > end);
        if (isInclude) {
          newChildren.push(child.substring(0, start - iterator));
          newChildren.push(
            new Node(
              child.substring(start - iterator, end - iterator),
              start,
              end,
              type,
              options
            )
          );
          newChildren.push(child.substring(end - iterator));
        } else {
          newChildren.push(child);
        }
        iterator += child.length;
      }
      if (child instanceof Node) {
        const isInclude = !(child.end < start || child.start > end);
        if (isInclude) {
          child.applyMarkup(markup);
        }
        newChildren.push(child);
        iterator = child.end;
      }
    });
    this.children = filter(
      newChildren,
      (child) => !isNil(child) && child !== ""
    );
    console.debug(iterator, type, JSON.stringify(this.children, null, 2));
    return this.children;
  }

  getResult() {
    const text = map(this.children, (child) => {
      if (typeof child === "string") {
        return child;
      }
      if (child instanceof Node) {
        return child.getResult();
      }
      return child;
    }).join("");

    if (this.type === "CODE") {
      return `\`${text}\``;
    }

    if (this.type === "LINK") {
      return `[${text}](${this.options.href})`;
    }

    if (this.type === "STRONG") {
      const spaceOnStart = text.match(/^( *)/)[0];
      const spaceOnEnd = text.match(/( *)$/)[0];
      return `${spaceOnStart}**${trim(text)}**${spaceOnEnd}`;
    }

    if (this.type === "EM") {
      const spaceOnStart = text.match(/^( *)/)[0];
      const spaceOnEnd = text.match(/( *)$/)[0];
      return `${spaceOnStart}*${trim(text)}*${spaceOnEnd}`;
    }

    return text;
  }
}

function algo({ text, markups = [] }) {
  const root = new Node(text, 0, text.length, "pure");
  forEach(markups, (markup) => {
    root.applyMarkup(markup);
  });
  return root.getResult();
}

module.exports = algo;
