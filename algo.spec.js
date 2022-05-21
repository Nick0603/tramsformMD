const algo = require("./algo");

describe("algo", () => {
  test("should return same text if no markups", () => {
    const data = {
      text: "aaaabbbbcccc",
      markups: [],
    };
    expect(algo(data)).toBe("aaaabbbbcccc");
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

    test("apply STRONG", () => {
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
          }
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

  describe("STRONG AND EM markup", () => {
    test.only("apply in middle", () => {
      const data = {
        text: "aaaabbbbcccc",
        markups: [
          {
            type: "STRONG",
            start: 2,
            end: 10,
          },
          {
            type: "EM",
            start: 4,
            end: 8,
          },
        ],
      };

      expect(algo(data)).toBe("aa**aa*bbbb*cc**cc");
    });


    test.only("apply in middle", () => {
      const data = {
        text: "aaaa bbbb cccc",
        markups: [
          {
            type: "STRONG",
            start: 0,
            end: 9,
          },
          {
            type: "EM",
            start: 5,
            end: 14,
          },
        ],
      };

      expect(algo(data)).toBe("**aaaa *bbbb*** *cccc*");
    });
  });
});
