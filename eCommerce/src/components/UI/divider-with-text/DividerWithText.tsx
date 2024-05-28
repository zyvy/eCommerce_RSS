import styles from './DividerWithText.module.css';

type ComponentPropsType = {
  text: string;
};

function DividerWithText({ text }: ComponentPropsType) {
  return (
    <div className={styles.lineWithText}>
      <span className={styles.title}>{text}</span>
    </div>
  );
}

export default DividerWithText;
