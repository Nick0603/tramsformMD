const algo = require("./algo");

describe("algo", () => {
  test("should return same text if no markups", () => {
    const data = {
      text: "aaaabbbbcccc",
      markups: [],
    };
    expect(algo(data)).toBe("aaaabbbbcccc");
  });

  test("integration", () => {
    const data = {
      text: "code in text, and link in text, and ZhgChgLi, and bold, and I, only i",
      markups: [
        {
          type: "CODE",
          start: 5,
          end: 7,
        },
        {
          start: 18,
          end: 22,
          href: "http://zhgchg.li",
          type: "LINK",
        },
        {
          type: "STRONG",
          start: 50,
          end: 63,
        },
        {
          type: "EM",
          start: 55,
          end: 69,
        },
      ],
    };

    expect(algo(data)).toBe(
      "code `in` text, and [link](http://zhgchg.li) in text, and ZhgChgLi, and **bold, *and I,*** *only i*"
    );
  });

  describe("CODE markup", () => {
    test("apply in start index", () => {
      const data = {
        text: "aaaabbbbcccc",
        markups: [
          {
            type: "CODE",
            start: 0,
            end: 4,
          },
        ],
      };

      expect(algo(data)).toBe("`aaaa`bbbbcccc");
    });

    test("apply in middle", () => {
      const data = {
        text: "aaaabbbbcccc",
        markups: [
          {
            type: "CODE",
            start: 4,
            end: 8,
          },
        ],
      };

      expect(algo(data)).toBe("aaaa`bbbb`cccc");
    });

    test("apply in end index", () => {
      const data = {
        text: "aaaabbbbcccc",
        markups: [
          {
            type: "CODE",
            start: 8,
            end: 12,
          },
        ],
      };

      expect(algo(data)).toBe("aaaabbbb`cccc`");
    });
  });

  describe("STRONG markup", () => {
    test("apply once", () => {
      const data = {
        text: "aaaabbbbcccc",
        markups: [
          {
            type: "STRONG",
            start: 8,
            end: 12,
          },
        ],
      };

      expect(algo(data)).toBe("aaaabbbb**cccc**");
    });

    test("apply twice", () => {
      const data = {
        text: "aaaabbbbcccc",
        markups: [
          {
            type: "STRONG",
            start: 0,
            end: 4,
          },
          {
            type: "STRONG",
            start: 8,
            end: 12,
          },
        ],
      };

      expect(algo(data)).toBe("**aaaa**bbbb**cccc**");
    });
  });

  describe("EM markup", () => {
    test("apply in middle", () => {
      const data = {
        text: "aaaabbbbcccc",
        markups: [
          {
            type: "EM",
            start: 4,
            end: 8,
          },
        ],
      };

      expect(algo(data)).toBe("aaaa*bbbb*cccc");
    });
  });

  describe("LINK markup", () => {
    test("apply in middle", () => {
      const data = {
        text: "aaaabbbbcccc",
        markups: [
          {
            type: "LINK",
            start: 4,
            end: 8,
            href: "https://google.com",
          },
        ],
      };

      expect(algo(data)).toBe("aaaa[bbbb](https://google.com)cccc");
    });
  });
});
