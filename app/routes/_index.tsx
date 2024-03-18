import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { Link, useLoaderData } from '@remix-run/react';

export const meta: MetaFunction = () => {
  return [{ title: 'jinoov.dev' }, { name: 'description', content: 'jinoov tech blog' }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const title = params.title;

  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const contentList = await fs.readdir(path.join(dirname, '..', 'contents'));

  return json({
    contentList: contentList.map((content) => content.replace(/\.md$/, '')),
  });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {data.contentList.map((content, i) => (
          <Link to={`/post/${content}`} key={i}>
            {content}
          </Link>
        ))}
      </div>
    </div>
  );
}
