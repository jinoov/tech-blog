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
import { Image } from '@nextui-org/react';

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
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-bold text-4xl mb-2">{data.title}</h2>
        <p className="text-sm text-right">2024. 03. 19</p>
      </div>
      <Image src="https://plus.unsplash.com/premium_photo-1681412205470-77848a519359?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" isZoomed radius="none" />
      <Markdown content={data.contentHtml} />
    </div>
  );
}
