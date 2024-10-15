"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useRef, useState } from 'react';
import { BstoreHost } from '../bstore-client';
const VideoPlayer = ({ src, ...props }) => {
    const videoRef = useRef(null);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);
    useEffect(() => {
        if (!isClient || !videoRef.current || !src)
            return;
        const loadPlayer = async () => {
            const video = videoRef.current;
            if (!video)
                return;
            // trim ext suffix from src
            var dirname = "";
            const ext = src.split('.').pop();
            if (ext) {
                dirname = src.slice(0, -ext.length - 1);
            }
            const dashUrl = `${dirname}/index.mpd`;
            const hlsUrl = `${dirname}/index.m3u8`;
            const mp4Url = src;
            try {
                const Hls = (await import('hls.js')).default;
                const dashjs = (await import('dashjs')).default;
                if (Hls.isSupported()) {
                    const hls = new Hls();
                    hls.loadSource(hlsUrl);
                    hls.attachMedia(video);
                }
                else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                    video.src = hlsUrl;
                }
                else if (dashjs.supportsMediaSource()) {
                    const player = dashjs.MediaPlayer().create();
                    player.initialize(video, dashUrl, true);
                }
                else {
                    video.src = mp4Url;
                }
            }
            catch (error) {
                console.error('Error loading video libraries:', error);
                video.src = mp4Url;
            }
        };
        loadPlayer();
    }, [src, isClient]);
    return (_jsxs("video", { ref: videoRef, controls: true, style: { width: '100vw', height: 'auto', margin: 0, padding: 0 }, ...props, children: [_jsx("source", { src: `${src}/index.m3u8`, type: "application/x-mpegURL" }), _jsx("source", { src: `${src}/index.mpd`, type: "application/dash+xml" }), _jsx("source", { src: `${src}.mp4`, type: "video/mp4" })] }));
};
function useBstoreSource(path) {
    const [source, setSource] = React.useState('');
    const [isError, setIsError] = React.useState(false);
    React.useEffect(() => {
        const isBrowser = typeof window !== 'undefined';
        if (isBrowser) {
            if (path.startsWith('http://') || path.startsWith('https://')) {
                setSource(path);
            }
            else if (BstoreHost) {
                setSource(`${BstoreHost}/bstore/${path}`);
            }
            else {
                setIsError(true);
            }
        }
    }, [path]);
    return { source, isError };
}
function withBstore(WrappedComponent, displayName) {
    const BstoreComponent = ({ path, ...rest }) => {
        const { source, isError } = useBstoreSource(path);
        const [isClient, setIsClient] = React.useState(false);
        React.useEffect(() => {
            setIsClient(true);
        }, []);
        if (!isClient) {
            return null; // or a loading placeholder
        }
        if (isError) {
            return _jsx("div", { children: `Failed to load ${displayName}` });
        }
        return _jsx(WrappedComponent, { src: source, ...rest });
    };
    BstoreComponent.displayName = `Bstore${displayName}`;
    return BstoreComponent;
}
export const BstoreVideo = withBstore(VideoPlayer, 'VideoPlayer');
export default BstoreVideo;
export const BstoreImage = withBstore((props) => _jsx("img", { ...props }), 'Image');
export const BstoreIFrame = withBstore((props) => _jsx("iframe", { ...props }), 'IFrame');
export const BstoreApplication = withBstore((props) => _jsx("embed", { ...props }), 'Application');
