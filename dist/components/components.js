import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { BstoreHost } from '../bstore-client';
function useBstoreSource(path, useStream = false) {
    const [source, setSource] = useState('');
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        if (path.startsWith('http://') || path.startsWith('https://')) {
            setSource(path);
        }
        else if (BstoreHost) {
            const endpoint = useStream ? 'stream' : 'bstore';
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
