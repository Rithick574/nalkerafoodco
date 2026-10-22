export const site = {
  brand: "Nalkera",
  company: "Nalkera Foodco",
  url: "https://www.nalkera.com",
  website: "www.nalkera.com",
  phoneDisplay: "+91 73560 45804",
  phoneHref: "tel:+917356045804",
  whatsappHref: "https://wa.me/917356045804",
  location: "Poochol, Kerala",
  taglineMl: "നല്ല കേരളത്തിന്റെ രുചി",
  description:
    "Nalkera Foodco is a Kerala food brand from Poochol, bringing the familiar goodness of Kerala to everyday life — starting with Nalkera Coconut Oil.",
} as const;

export function whatsappLink(message?: string) {
  return message ? `${site.whatsappHref}?text=${encodeURIComponent(message)}` : site.whatsappHref;
}

export const productEnquiry = "Hi Nalkera, I'd like to know more about Nalkera Coconut Oil.";

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About Us" },
  { href: "#products", label: "Our Products" },
  { href: "#story", label: "Our Story" },
  { href: "#contact", label: "Contact" },
] as const;

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
