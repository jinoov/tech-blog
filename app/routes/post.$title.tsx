import { LoaderFunctionArgs, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import fs from 'node:fs/promises';
import path from 'node:path';
import { remark } from 'remark';
import html from 'remark-html';
import matter from 'gray-matter';
import { assert } from '~/utils/assert';
import { tryRun } from '~/utils/tryRun';
import Markdown from '~/components/markdown';

export async function loader({ params }: LoaderFunctionArgs) {
  const title = params.title;

  assert(typeof title !== 'undefined', 'title은 무조건 존재한다');

  const filePath = path.join(path.resolve(), 'contents', 'posts', `${title}.md`);
  const { data: file, error } = await tryRun(fs.readFile(filePath));

  if (error) {
    return new Response(null, {
      status: 404,
    });
  }

  const matterResult = matter(file);

  const processed = await remark().use(html).process(matterResult.content);
  const contentHtml = processed.toString();

  return json({
    title,
    contentHtml,
  });
}

export default function PostDetailPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <Markdown content={data.contentHtml} />
    </div>
  );
}
