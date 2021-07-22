import React from "react";
import { Link } from "./Link";
import "twin.macro";

export const Footer: React.FC = () => (
  <footer tw="flex w-full py-10 mx-auto">
    <Link tw="mt-2 md:mt-0" href="/">
      <span tw="text-accent">♥</span>️
    </Link>
  </footer>
);
