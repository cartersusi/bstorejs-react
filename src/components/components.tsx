import React, { useEffect, useState } from 'react';
import { BstoreHost } from '../bstore-client';

function useBstoreSource(path: string, useStream: boolean = false) {
  const [source, setSource] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      setSource(path);
    } else if (BstoreHost) {
      const endpoint = useStream ? 'stream' : 'bstore';
      setSource(`${BstoreHost}/${endpoint}/${path}`);
    } else {
      setIsError(true);
    }
  }, [path, source, useStream]);

  return { source, isError };
}

function withBstore<C extends object>(
  WrappedComponent: React.ComponentType<C & { src: string }>,
  displayName: string,
  useStream: boolean = false
) {
  const BstoreComponent = ({ path, ...rest }: { path: string } & Omit<C, 'src'>) => {
    const { source, isError } = useBstoreSource(path, useStream);

    if (isError) {
      return <div>{`Failed to load ${displayName}`}</div>;
    }

    return <WrappedComponent src={source} {...rest as C} />;
  };

  BstoreComponent.displayName = `Bstore${displayName}`;
  return BstoreComponent;
}

type BstoreProps<T> = Omit<T, 'src'> & { path: string };

export const BstoreVideo = withBstore<React.VideoHTMLAttributes<HTMLVideoElement>>(
  (props) => <video {...props} />,
  'Video',
  true
);

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

export type BstoreVideoProps = BstoreProps<React.VideoHTMLAttributes<HTMLVideoElement>>;
export type BstoreImageProps = BstoreProps<React.ImgHTMLAttributes<HTMLImageElement>>;
export type BstoreIFrameProps = BstoreProps<React.IframeHTMLAttributes<HTMLIFrameElement>>;
export type BstoreApplicationProps = BstoreProps<React.EmbedHTMLAttributes<HTMLEmbedElement>>;