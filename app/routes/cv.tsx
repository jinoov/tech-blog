import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import fs from 'node:fs/promises';
import path from 'node:path';
import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';
import Markdown from '~/components/markdown';

export async function loader() {
  const filePath = path.join(path.resolve(), 'contents', 'cv', 'cv.md');
  const data = await fs.readFile(filePath);

  const matterResult = matter(data);

  const processed = await remark().use(html).process(matterResult.content);
  const contentHtml = processed.toString();

  return json({
    contentHtml,
  });
}

export default function AboutPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-7">
      <div>
        <h2 className="font-bold text-2xl">최진호</h2>
        <p>SW Engineer</p>
      </div>
      <Markdown content={data.contentHtml} />
    </div>
  );
}
