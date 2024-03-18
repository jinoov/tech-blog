import clsx from 'clsx';
import styles from './markdown.module.css';

export default function Markdown({ content }: { content: string }) {
  return <div className={clsx(styles['markdown-body'], '[&_ul]:list-disc', '[&_ul]:list-inside')} dangerouslySetInnerHTML={{ __html: content }} />;
}
