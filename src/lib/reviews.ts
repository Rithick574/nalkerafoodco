export type Review = {
  /** Reviewer's name exactly as it appears on the original review. */
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  source: "Google" | "WhatsApp" | "In person";
  /** Optional, e.g. "October 2026". */
  date?: string;
  /** Set to "ml" for reviews written in Malayalam so they use the Malayalam font. */
  lang?: "en" | "ml";
};

/*
 * Real customer reviews only — copy them from Google Maps (or other feedback the customer has
 * agreed to share), keeping the wording and name as written. While this list is empty the
 * Reviews section invites visitors to leave a review on Google instead.
 *
 * Example:
 *   { name: "Customer name", rating: 5, text: "Review text as written", source: "Google", date: "November 2026" },
 */
export const reviews: Review[] = [];
