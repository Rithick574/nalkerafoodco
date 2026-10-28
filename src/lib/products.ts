/*
 * Nalkera Coconut Oil pack sizes, largest first — shared by the product slider and the order builder.
 */

const BOTTLE_1L = { src: "/images/brand/nalkera-coconut-oil-1l.png", width: 554, height: 1954 };
// 500 ml and 300 ml: the design team's 500 ml packshot with the label's size text retouched
// (it shipped reading "1 Ltr"). Replace with the design team's own artwork when it arrives.
const BOTTLE_500 = { src: "/images/brand/nalkera-coconut-oil-500ml.png", width: 581, height: 1559 };
const BOTTLE_300 = { src: "/images/brand/nalkera-coconut-oil-300ml.png", width: 581, height: 1559 };

/*
 * Pack sizes, largest first. `scale` is the bottle's height relative to the 1 Ltr bottle, so the
 * slide shows the sizes true to each other (500 ml is drawn at 80% in the design team's artwork).
 */
export const sizes = [
  {
    key: "1l",
    amount: "1",
    unit: "Ltr",
    ml: 1000,
    label: "1 Ltr",
    tagline: "The family size",
    blurb: "For busy kitchens that reach for coconut oil every single day.",
    image: BOTTLE_1L,
    scale: 1,
  },
  {
    key: "500ml",
    amount: "500",
    unit: "ml",
    ml: 500,
    label: "500 ml",
    tagline: "The everyday size",
    blurb: "A handy bottle for smaller households and day-to-day cooking.",
    image: BOTTLE_500,
    scale: 0.8,
  },
  {
    key: "300ml",
    amount: "300",
    unit: "ml",
    ml: 300,
    label: "300 ml",
    tagline: "The compact size",
    blurb: "Easy to carry, easy to store — and just right for a first taste of Nalkera.",
    // TODO: replace with the official 300 ml packshot; the 500 ml bottle shape stands in until then.
    image: BOTTLE_300,
    scale: 0.68,
  },
] as const;

export type PackSize = (typeof sizes)[number];
export type PackSizeKey = PackSize["key"];
