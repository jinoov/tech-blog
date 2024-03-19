import 'highlight.js/styles/default.min.css';
import highlight from 'highlight.js';
import { useIsomorphicEffect } from '~/hooks/useIsomorphicEffect';

export default function Markdown({ content }: { content: string }) {
  useIsomorphicEffect(() => {
    highlight.highlightAll();
  }, []);

  return <div className="post-content" dangerouslySetInnerHTML={{ __html: content }} />;
}
