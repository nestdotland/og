import { NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
import tw from "twin.macro";
import { Field, Label } from "../components/Field";
import { Layout } from "../components/Layout";
import { Link } from "../components/Link";
import { Select } from "../components/Select";
import { OG_HEIGHT, OG_WIDTH } from "../constants";
import { useConfig } from "../hooks/useConfig";
import { useCopy } from "../hooks/useCopy";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { useIsMounted } from "../hooks/useIsMounted";
import { useLayoutConfig } from "../hooks/useLayoutConfig";
import { layouts } from "../layouts";
import { FileType } from "../types";

const Home: NextPage = () => {
  const isMounted = useIsMounted();

  return (
    <main tw="px-6 pb-20 max-w-6xl w-full mx-auto">
      <header tw="text-center mt-12 mb-12 space-y-6">
        <h1 tw="text-5xl font-bold">Nest OG Image Generator</h1>
        <h2 tw="text-xl text-gray-400">Dynamic open graph images for Nest</h2>
      </header>

      {isMounted && (
        <section tw="grid gap-y-8 md:gap-8 grid-cols-1 md:grid-cols-3">
          <Config />
          <Viewer />
        </section>
      )}

      <section tw="mt-16">
        <div>
          <H2>What is This?</H2>
          <P>
            This service dynamically generates{" "}
            <StyledLink href="https://ogp.me/">Open Graph</StyledLink> images to
            be used in HTML meta tags. OG images are the images you see when you
            share a link on Twitter or Discord.
          </P>

          <P>
            <pre tw="pl-4 font-mono break-all overflow-hidden overflow-ellipsis">{`<meta property="og:image" content="{IMAGE_URL}" />`}</pre>
          </P>

          <P>
            The design and implementation of this site is heavily inspired by{" "}
            <StyledLink href="https://github.com/vercel/og-image">
              Vercel's example
            </StyledLink>{" "}
            and{" "}
            <StyledLink href="https://og.railway.app/">
              Railway's OG image Generator
            </StyledLink>
          </P>
        </div>
      </section>
    </main>
  );
};

const H2 = tw.h2`font-bold text-3xl mb-4`;
const P = tw.p`mb-4 max-w-xl leading-relaxed`;
const LI = tw.li``;
const HR = tw.hr`text-gray-500`;

const StyledLink = tw(Link)`
  no-underline text-violet-400 rounded-sm
  px-1 py-0.5
  hover:bg-coolGray-800
`;

export default Home;

export const Config: React.FC = () => {
  const [{ fileType, layoutName }, setConfig] = useConfig();

  const layout = useMemo(
    () => layouts.find(l => l.name === layoutName),
    [layoutName],
  );

  return (
    <div tw="space-y-4">
      <Field>
        <Label>Format</Label>
        <Select
          value={fileType}
          options={[{ value: "png" }, { value: "jpeg" }]}
          onChange={fileType =>
            setConfig(c => ({ ...c, fileType: fileType as FileType }))
          }
        />
      </Field>

      <Field>
        <Label>Layout</Label>
        <Select
          value={layoutName}
          options={layouts.map(l => ({ value: l.name }))}
          onChange={layoutName => setConfig(c => ({ ...c, layoutName }))}
        />
      </Field>

      <HR />

      {layout == null ? (
        <p>Layout {layoutName} does not exist</p>
      ) : (
        <Layout layout={layout} key={layout.name} />
      )}
    </div>
  );
};

export const Viewer: React.FC = () => {
  const [config] = useConfig();
  const [layoutConfig] = useLayoutConfig();
  const [isCopied, copy] = useCopy();
  const [isLoaded, setIsLoaded] = useState(true);

  const query = useMemo(() => {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries({ ...config, ...layoutConfig })) {
      if (value != null) {
        searchParams.set(key, value);
      }
    }

    return searchParams.toString();
  }, [config, layoutConfig]);

  const imageURL = useMemo(() => `/api/image?${query}`, [query]);
  const htmlURL = useMemo(() => `/api/html?${query}`, [query]);

  const debouncedImageURL = useDebouncedValue(imageURL, 200);
  useEffect(() => setIsLoaded(false), [debouncedImageURL]);

  return (
    <div tw="space-y-4 w-full col-span-2">
      <div
        className="image-wrapper"
        css={[
          tw`
          w-full relative
          border border-gray-600
          rounded-lg overflow-hidden
          `,
          { paddingTop: `${(OG_HEIGHT / OG_WIDTH) * 100}%` },
        ]}
      >
        <img
          css={[
            tw`absolute inset-0 h-full`,
            !isLoaded && {
              filter: "blur(5px)",
            },
          ]}
          src={debouncedImageURL}
          alt={`OG Image for the ${config.layoutName} layout`}
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      <div className="buttons" tw="flex space-x-2 justify-end">
        <button
          css={[buttonStyles]}
          onClick={() => copy(`${window.location.origin}${imageURL}`)}
        >
          {isCopied ? "Copied!" : "Copy Image URL"}
        </button>
        <Link css={[buttonStyles]} href={htmlURL} external>
          Open HTML Page
        </Link>
      </div>
    </div>
  );
};

const buttonStyles = tw`
  flex items-center justify-center
  px-2 py-1 w-40 h-10
  text-white font-medium no-underline
  rounded border border-gray-700
  bg-violet-600 hover:bg-violet-500
`;
