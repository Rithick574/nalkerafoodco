export const site = {
  brand: "Nalkera",
  company: "Nalkera Foodco",
  url: "https://www.nalkera.com",
  website: "www.nalkera.com",
  phoneDisplay: "+91 73560 45804",
  phoneHref: "tel:+917356045804",
  whatsappHref: "https://wa.me/917356045804",
  location: "Poochol, Kerala",
  mapsUrl: "https://maps.app.goo.gl/UR79VSRBtRurp4sU6",
  mapEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4200.076941819315!2d75.1819254!3d12.1508141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba46f0055686cab%3A0xcfbd9d7bbb1c401e!2sNalkera%20Foodco!5e1!3m2!1sen!2sin!4v1793192904486!5m2!1sen!2sin",
  geo: { latitude: 12.1508141, longitude: 75.1819254 },
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
  { href: "#order", label: "Order" },
  { href: "#story", label: "Our Story" },
  { href: "#contact", label: "Contact" },
] as const;

export const footerLinks = [
  ...navLinks.filter((l) => l.href !== "#contact"),
  { href: "#reviews", label: "Reviews" },
  { href: "#find-us", label: "Find Us" },
  { href: "#contact", label: "Contact" },
] as const;

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
