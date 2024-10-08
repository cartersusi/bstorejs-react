import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { BstoreHost } from '../bstore-client';
function useBstoreSource(path) {
    const [source, setSource] = useState('');
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        if (path.startsWith('http://') || path.startsWith('https://')) {
            setSource(path);
        }
        else if (BstoreHost) {
            setSource(`${BstoreHost}/bstore/${path}`);
        }
        else {
            setIsError(true);
        }
    }, [path, source]);
    return { source, isError };
}
function withBstore(WrappedComponent, displayName) {
    const BstoreComponent = ({ path, ...rest }) => {
        const { source, isError } = useBstoreSource(path);
        if (isError) {
            return _jsx("div", { children: `Failed to load ${displayName}` });
        }
        return _jsx(WrappedComponent, { src: source, ...rest });
    };
    BstoreComponent.displayName = `Bstore${displayName}`;
    return BstoreComponent;
}
export const BstoreVideo = withBstore((props) => _jsx("video", { ...props }), 'Video');
export const BstoreImage = withBstore((props) => _jsx("img", { ...props }), 'Image');
export const BstoreIFrame = withBstore((props) => _jsx("iframe", { ...props }), 'IFrame');
export const BstoreApplication = withBstore((props) => _jsx("embed", { ...props }), 'Application');
