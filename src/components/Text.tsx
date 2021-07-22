import { Link } from "./Link";
import tw from "twin.macro";

export const Header = tw.h1`
 text-4xl font-extrabold mb-8
`;

export const SubHeader = tw.h2`
  text-2xl font-bold mb-4 mt-8
`;

export const Paragraph = tw.p`
  mb-12 max-w-sm
`;

export const PillLink = tw(Link)`
  block text-fg rounded-sm px-1 bg-violet-600 hover:bg-violet-500 hover:text-bg dark:hover:text-fg
`;

export const HighlightLink = tw(Link)`
  font-bold hover:text-accent
`;

export const UnderlineLink = tw(HighlightLink)`
  underline
`;
