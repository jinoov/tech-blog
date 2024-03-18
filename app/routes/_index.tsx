import { json, type MetaFunction } from '@remix-run/node';
import path from 'node:path';
import fs from 'node:fs/promises';
import { Link, useLoaderData } from '@remix-run/react';
import { Card, CardHeader, Divider } from '@nextui-org/react';
import { Fragment } from 'react/jsx-runtime';

export const meta: MetaFunction = () => {
  return [{ title: 'jinoov.dev' }, { name: 'description', content: 'jinoov tech blog' }];
};

export async function loader() {
  const titleList = await fs.readdir(path.join(path.resolve(), 'contents'));

  return json({
    titleList: titleList.map((content) => content.replace(/\.md$/, '')),
  });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <div className="flex flex-col">
        {data.titleList.map((content, i) => (
          <Fragment key={i}>
            {i > 0 && <Divider />}
            <Link to={`/post/${content}`}>
              <Card shadow="none" radius="none" isHoverable className="py-3">
                <CardHeader className="font-medium">{content}</CardHeader>
              </Card>
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
