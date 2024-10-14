import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import dashjs from 'dashjs';
import { BstoreHost } from '../bstore-client';

const VideoPlayer: React.FC<{ src: string } & React.VideoHTMLAttributes<HTMLVideoElement>> = ({ src, ...props }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // trim ext suffix from src
    var dirname = "";
    const ext = src.split('.').pop();
    if (ext) {
      dirname = src.slice(0, -ext.length - 1);
    }

    const dashUrl = `${dirname}/index.mpd`;
    const hlsUrl = `${dirname}/index.m3u8`;
    const mp4Url = src;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(hlsUrl);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl;
    } else if (dashjs.supportsMediaSource()) {
      const player = dashjs.MediaPlayer().create();
      player.initialize(video, dashUrl, true);
    } else {
      video.src = mp4Url;
    }
  }, [src]);

  return (
    <video 
      ref={videoRef}
      controls 
      style={{ width: '100vw', height: 'auto', margin: 0, padding: 0 }}
      {...props}
    >
      <source src={`${src}/index.m3u8`} type="application/x-mpegURL" />
      <source src={`${src}/index.mpd`} type="application/dash+xml" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
};

function useBstoreSource(path: string) {
  const [source, setSource] = React.useState<string>('');
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      setSource(path);
    } else if (BstoreHost) {
      setSource(`${BstoreHost}/bstore/${path}`);
    } else {
      setIsError(true);
    }
  }, [path]);

  return { source, isError };
}

function withBstore<C extends object>(
  WrappedComponent: React.ComponentType<C & { src: string }>,
  displayName: string
) {
  const BstoreComponent = ({ path, ...rest }: { path: string } & Omit<C, 'src'>) => {
    const { source, isError } = useBstoreSource(path);

    if (isError) {
      return <div>{`Failed to load ${displayName}`}</div>;
    }

    return <WrappedComponent src={source} {...rest as C} />;
  };

  BstoreComponent.displayName = `Bstore${displayName}`;
  return BstoreComponent;
}

export const BstoreVideo = withBstore<React.ComponentProps<typeof VideoPlayer>>(
  VideoPlayer,
  'VideoPlayer'
);

export type BstoreVideoProps = {
  path: string;
} & Omit<React.ComponentProps<typeof VideoPlayer>, 'src'>;

export default BstoreVideo;

type BstoreProps<T> = Omit<T, 'src'> & { path: string };

export const BstoreImage = withBstore<React.ImgHTMLAttributes<HTMLImageElement>>(
  (props) => <img {...props} />,
  'Image'
);

export const BstoreIFrame = withBstore<React.IframeHTMLAttributes<HTMLIFrameElement>>(
  (props) => <iframe {...props} />,
  'IFrame'
);

export const BstoreApplication = withBstore<React.EmbedHTMLAttributes<HTMLEmbedElement>>(
  (props) => <embed {...props} />,
  'Application'
);

//export type BstoreVideoProps = BstoreProps<React.VideoHTMLAttributes<HTMLVideoElement>>;
export type BstoreImageProps = BstoreProps<React.ImgHTMLAttributes<HTMLImageElement>>;
export type BstoreIFrameProps = BstoreProps<React.IframeHTMLAttributes<HTMLIFrameElement>>;
export type BstoreApplicationProps = BstoreProps<React.EmbedHTMLAttributes<HTMLEmbedElement>>;