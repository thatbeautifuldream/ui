import { getPageImage, source } from "@/lib/source";
import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { generate as DefaultImage } from "fumadocs-ui/og";

export const revalidate = false;

export async function GET(
  _req: Request,
  { params }: RouteContext<"/og/docs/[...slug]">,
) {
  const { slug } = await params;
  // Remove the last segment (image filename) if it's an array with more than 1 element
  const pageSlug =
    Array.isArray(slug) && slug.length > 1 ? slug.slice(0, -1) : slug;
  const page = source.getPage(pageSlug);
  if (!page) notFound();

  return new ImageResponse(
    <DefaultImage
      primaryColor="black"
      primaryTextColor="white"
      title={page.data.title}
      description={page.data.description}
      site="attn/ui"
    />,
    {
      width: 1200,
      height: 630,
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: getPageImage(page).segments,
  }));
}
