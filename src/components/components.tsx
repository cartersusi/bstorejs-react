"use client";
import React, { useEffect, useRef, useState } from 'react';
import { BstoreHost } from '../bstore-client';

//const VideoPlayer: React.FC<{ src: string } & React.VideoHTMLAttributes<HTMLVideoElement>> = ({ src, ...props }) => {
const VideoPlayer: React.FC<{ src: string } & React.VideoHTMLAttributes<HTMLVideoElement>> = ({ src, ...props }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isClient, setIsClient] = useState(false);
  const [dashUrl, setDashUrl] = useState('');
  const [hlsUrl, setHlsUrl] = useState('');
  const [mp4Url, setMp4Url] = useState('');
  const [posterUrl, setPosterUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !videoRef.current || !src) return;

    const loadPlayer = async () => {
      const video = videoRef.current;
      if (!video) return;

      var dirname = "";
      const ext = src.split('.').pop();
      if (ext) {
        dirname = src.slice(0, -ext.length - 1);
      }

      setDashUrl(`${dirname}/index.mpd`);
      setHlsUrl(`${dirname}/index.m3u8`);
      setMp4Url(mp4Url);

      if (props.poster) {
        if (props.poster.startsWith('http://') || props.poster.startsWith('https://')) {
          setPosterUrl(props.poster);
        } else if (BstoreHost) {
          setPosterUrl(`${BstoreHost}/bstore/${dirname}/index.jpg`);
        }
      } else if (BstoreHost) {
        setPosterUrl(`${BstoreHost}/bstore/${dirname}/index.jpg`);
      } else {
        setPosterUrl(undefined);
      }

      try {
        const Hls = (await import('hls.js')).default;
        const dashjs = (await import('dashjs')).default;

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
      } catch (error) {
        console.error('Error loading video libraries:', error);
        video.src = mp4Url;
      }
    };
    console.log("loadPlayer");
    console.log(isClient);
    console.log(dashUrl);
    console.log(hlsUrl);
    console.log(mp4Url);
    console.log(posterUrl);

    loadPlayer();
  }, [src, isClient, dashUrl, hlsUrl, mp4Url]);

  return (
    <video 
      ref={videoRef}
      controls
      poster={posterUrl}
      {...props}
    >
      <source src={dashUrl} type="application/x-mpegURL" />
      <source src={hlsUrl} type="application/dash+xml" />
      <source src={mp4Url} type="video/mp4" />
    </video>
  );
};

function useBstoreSource(path: string) {
  const [source, setSource] = React.useState<string>('');
  const [isError, setIsError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      if (path.startsWith('http://') || path.startsWith('https://')) {
        setSource(path);
      } else if (BstoreHost) {
        setSource(`${BstoreHost}/bstore/${path}`);
      } else {
        setIsError(true);
      }
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
    const [isClient, setIsClient] = React.useState(false);

    React.useEffect(() => {
      setIsClient(true);
    }, []);

    if (!isClient) {
      return null; // or a loading placeholder
    }

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