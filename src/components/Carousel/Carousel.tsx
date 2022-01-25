import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { Episode } from 'src/api/types';
import Card from 'src/components/Card/Card';

import styles from './Carousel.module.sass';

const Carousel = ({ episodes = [] }: { episodes: Episode[] }): JSX.Element => {
  const router = useRouter();
  const [isBinded, toggleBinded] = useState(false);
  const [isScroll, toggleIsScroll] = useState(false);
  const [offset, setOffset] = useState(0);
  const [position, setPosition] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [carouselSize, setCarouselSize] = useState(0);
  const [containerSize, setContainerSize] = useState(0);
  const calcMax = () => carouselSize - containerSize;
  const startPosition = useRef(0);

  const handleResizeWindow = () => {
    setCarouselSize(carousel.current?.getBoundingClientRect().width ?? 0);
    setContainerSize(container.current?.getBoundingClientRect().width ?? 0);
  };

  const updateMax = () => {
    handleResizeWindow();
    return calcMax();
  };

  const validatePosition = (position) =>
    Math.max(Math.min(position, 0), calcMax() || updateMax() || -Infinity);

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);

    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
    (e.target as HTMLDivElement).setPointerCapture(e.pointerId);
    toggleBinded(true);
    toggleIsScroll(false);
    setOffset(e.clientX - position);
    startPosition.current = position;
  };

  const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (isBinded) {
      e.preventDefault();
      toggleIsScroll(true);
      setPosition(validatePosition(e.clientX - offset));
    }
  };

  const onLostPointerCapture: React.PointerEventHandler<HTMLDivElement> = (
    e
  ) => {
    toggleBinded(false);
    const extension = 200 * e.pressure;
    setPosition(
      validatePosition(
        position + extension * (startPosition.current > position ? -1 : 1)
      )
    );
  };

  return (
    <div
      ref={carousel}
      className={styles.Carousel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onLostPointerCapture={onLostPointerCapture}
    >
      <div
        ref={container}
        className={styles.Container}
        style={{ left: `${position}px` }}
      >
        {episodes.map((episode) => (
          <Card
            key={episode.episode_id}
            title={episode.title}
            onClick={() => {
              if (!isScroll) {
                router.push(`/episode/${episode.episode_id}`);
              }
            }}
          >
            <div className={styles.Details}>
              <h3 className={styles.DetailsTitle}>{episode.title}</h3>
              <div className={styles.DetailsContainer}>
                <span>#{episode.episode}</span>
                {episode.air_date}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
