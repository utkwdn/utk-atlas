import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';

interface Props {
  outerDivClasses?: string;
  figureClasses?: string;
  innerDivClasses?: string;
  imgAttributes: Partial<Record<string, string>>;
}

const HomepageVideo = ({
  outerDivClasses,
  figureClasses,
  innerDivClasses,
  imgAttributes,
}: Props) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [videoHasBeenRequested, setVideoHasBeenRequested] = useState(false);
  const [videoIsReady, setVideoIsReady] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <div
      className={outerDivClasses || ''}
      style={{ width: '100%', height: '100%', float: 'none' }}
    >
      <figure
        className={figureClasses || ''}
        style={{ height: '100%', float: 'none' }}
      >
        <div className={innerDivClasses || ''} style={{ width: '100%' }}>
          <div
            style={{
              position: 'relative',
              paddingTop: '56.25%',
              width: '100%',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
              }}
            >
              {
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  {...imgAttributes}
                  alt={imgAttributes.alt || ''}
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    ...(videoIsReady
                      ? {
                          visibility: 'hidden',
                        }
                      : {
                          visibility: 'visible',
                        }),
                  }}
                />
              }
              {isHydrated && (
                <button
                  style={{
                    position: 'absolute',
                    top: '0',
                    bottom: '0',
                    left: '0',
                    right: '0',
                    background: 'none',
                    border: 'none',
                    width: '100%',
                    height: '100%',
                    ...(videoIsReady
                      ? {
                          visibility: 'hidden',
                        }
                      : {
                          visibility: 'visible',
                        }),
                  }}
                  disabled={videoHasBeenRequested}
                  aria-label="Play video"
                  onClick={() => {
                    const preview = document.querySelector(
                      '.react-player__preview'
                    );
                    if (preview instanceof HTMLElement) {
                      preview.click();
                      setVideoHasBeenRequested(true);
                    }
                  }}
                />
              )}
            </div>
            {isHydrated && (
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  bottom: '0',
                  left: '0',
                  right: '0',
                  ...(videoIsReady
                    ? {
                        visibility: 'visible',
                      }
                    : {
                        visibility: 'hidden',
                      }),
                }}
              >
                <ReactPlayer
                  onReady={() => {
                    setVideoIsReady(true);
                  }}
                  playing
                  light
                  controls
                  width="100%"
                  height="100%"
                  url="https://www.youtube.com/watch?v=lY8h0P3mQoY"
                />
              </div>
            )}
          </div>
        </div>
      </figure>
    </div>
  );
};

export default HomepageVideo;
