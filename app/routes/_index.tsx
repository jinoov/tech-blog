import { json, type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'url';
import { Link, useLoaderData } from '@remix-run/react';
import { Card, CardBody, CardHeader, Divider } from '@nextui-org/react';

export const meta: MetaFunction = () => {
  return [{ title: 'jinoov.dev' }, { name: 'description', content: 'jinoov tech blog' }];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const titleList = await fs.readdir(path.join(dirname, '..', 'contents'));

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
          <>
            {i > 0 && <Divider />}
            <Link to={`/post/${content}`} key={i}>
              <Card shadow="none" radius="none" isHoverable className="py-3">
                <CardHeader className="font-medium">{content}</CardHeader>
              </Card>
            </Link>
          </>
        ))}
      </div>
    </div>
  );
}
