import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { BstoreHost } from '../bstore-client';
function useBstoreSource(path, useStream = false) {
    const [source, setSource] = useState('');
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        if (path.startsWith('http://') || path.startsWith('https://')) {
            // path is hardcoded, not recommended for React Components
            setSource(path);
        }
        else if (BstoreHost) {
            var endpoint = useStream ? 'stream' : 'bstore';
            if (endpoint === 'stream') {
                // only allow video files to be streamed, browser vtype support is users responsibility
                const extension = path.split('.').pop();
                const valid_extensions = ["video/mp4", "video/webm", "video/ogg", "video/wmv", "video/mov", "video/avchd", "video/av1"];
                if (!valid_extensions.includes(extension)) {
                    endpoint = 'bstore';
                }
            }
            setSource(`${BstoreHost}/${endpoint}/${path}`);
        }
        else {
            setIsError(true);
        }
    }, [path, source, useStream]);
    return { source, isError };
}
function withBstore(WrappedComponent, displayName, useStream = false) {
    const BstoreComponent = ({ path, ...rest }) => {
        const { source, isError } = useBstoreSource(path, useStream);
        if (isError) {
            return _jsx("div", { children: `Failed to load ${displayName}` });
        }
        return _jsx(WrappedComponent, { src: source, ...rest });
    };
    BstoreComponent.displayName = `Bstore${displayName}`;
    return BstoreComponent;
}
export const BstoreVideo = withBstore((props) => _jsx("video", { ...props }), 'Video', true);
export const BstoreImage = withBstore((props) => _jsx("img", { ...props }), 'Image');
export const BstoreIFrame = withBstore((props) => _jsx("iframe", { ...props }), 'IFrame');
export const BstoreApplication = withBstore((props) => _jsx("embed", { ...props }), 'Application');
