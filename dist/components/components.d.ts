import React from 'react';
declare const VideoPlayer: React.FC<{
    src: string;
} & React.VideoHTMLAttributes<HTMLVideoElement>>;
export declare const BstoreVideo: {
    ({ path, ...rest }: {
        path: string;
    } & Omit<{
        src: string;
    } & React.VideoHTMLAttributes<HTMLVideoElement>, "src">): import("react/jsx-runtime").JSX.Element | null;
    displayName: string;
};
export type BstoreVideoProps = {
    path: string;
} & Omit<React.ComponentProps<typeof VideoPlayer>, 'src'>;
type BstoreProps<T> = Omit<T, 'src'> & {
    path: string;
};
export declare const BstoreImage: {
    ({ path, ...rest }: {
        path: string;
    } & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src">): import("react/jsx-runtime").JSX.Element | null;
    displayName: string;
};
export declare const BstoreIFrame: {
    ({ path, ...rest }: {
        path: string;
    } & Omit<React.IframeHTMLAttributes<HTMLIFrameElement>, "src">): import("react/jsx-runtime").JSX.Element | null;
    displayName: string;
};
export declare const BstoreApplication: {
    ({ path, ...rest }: {
        path: string;
    } & Omit<React.EmbedHTMLAttributes<HTMLEmbedElement>, "src">): import("react/jsx-runtime").JSX.Element | null;
    displayName: string;
};
export type BstoreImageProps = BstoreProps<React.ImgHTMLAttributes<HTMLImageElement>>;
export type BstoreIFrameProps = BstoreProps<React.IframeHTMLAttributes<HTMLIFrameElement>>;
export type BstoreApplicationProps = BstoreProps<React.EmbedHTMLAttributes<HTMLEmbedElement>>;
export {};
