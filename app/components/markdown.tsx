import css from './markdown.module.css';

export default function Markdown({ content }: { content: string }) {
  return <div className={css['post-content']} dangerouslySetInnerHTML={{ __html: content }} />;
}
