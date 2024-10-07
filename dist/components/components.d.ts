import React from 'react';
type BstoreProps<T> = Omit<T, 'src'> & {
    path: string;
};
export declare const BstoreVideo: {
    ({ path, ...rest }: {
        path: string;
    } & Omit<React.VideoHTMLAttributes<HTMLVideoElement>, "src">): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const BstoreImage: {
    ({ path, ...rest }: {
        path: string;
    } & Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src">): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const BstoreIFrame: {
    ({ path, ...rest }: {
        path: string;
    } & Omit<React.IframeHTMLAttributes<HTMLIFrameElement>, "src">): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export declare const BstoreApplication: {
    ({ path, ...rest }: {
        path: string;
    } & Omit<React.EmbedHTMLAttributes<HTMLEmbedElement>, "src">): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export type BstoreVideoProps = BstoreProps<React.VideoHTMLAttributes<HTMLVideoElement>>;
export type BstoreImageProps = BstoreProps<React.ImgHTMLAttributes<HTMLImageElement>>;
export type BstoreIFrameProps = BstoreProps<React.IframeHTMLAttributes<HTMLIFrameElement>>;
export type BstoreApplicationProps = BstoreProps<React.EmbedHTMLAttributes<HTMLEmbedElement>>;
export {};
