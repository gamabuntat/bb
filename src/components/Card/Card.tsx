import Image from 'next/image';

import styles from './Card.module.sass';

const Card = (
  props: React.HTMLProps<HTMLButtonElement> &
    React.PropsWithChildren<{ photo?: string }>
) => {
  const defaultProps = { ...props, children: null, photo: null };
  const { photo = '/noImg.webp' } = props;

  return (
    <button
      {...defaultProps}
      className={styles.Card}
      type="button"
      aria-label="card"
    >
      <div className={styles.ImgContainer}>
        <Image
          src={photo}
          alt={photo}
          width="180px"
          height="220px"
          priority={false}
          objectFit="cover"
          placeholder="blur"
          blurDataURL="/noImg.webp"
        />
      </div>
      <div className={styles.Details}>{props.children}</div>
    </button>
  );
};
export default Card;
