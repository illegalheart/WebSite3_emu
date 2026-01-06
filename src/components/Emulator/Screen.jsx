import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import './Emulator.css';

const Screen = forwardRef(({ romFile, core, onReady }, ref) => {
    const iframeRef = useRef(null);
    const [isReady, setIsReady] = useState(false);

    // When props change, we reload the iframe to ensure clean state
    const [key, setKey] = useState(0);

    useImperativeHandle(ref, () => ({
        saveState: () => {
            iframeRef.current?.contentWindow.postMessage({ type: 'SAVE_STATE' }, '*');
        },
        loadState: () => {
            iframeRef.current?.contentWindow.postMessage({ type: 'LOAD_STATE' }, '*');
        }
    }));

    useEffect(() => {
        setKey(k => k + 1);
        setIsReady(false);
    }, [romFile, core]);

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data?.type === 'EMULATOR_READY') {
                setIsReady(true);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    useEffect(() => {
        if (isReady && romFile && iframeRef.current) {
            // Create Blob URL for the File
            const url = URL.createObjectURL(romFile);

            iframeRef.current.contentWindow.postMessage({
                type: 'LOAD_GAME',
                payload: {
                    romUrl: url,
                    core: core || 'gba',
                    name: romFile.name
                }
            }, '*');

            return () => URL.revokeObjectURL(url);
        }
    }, [isReady, romFile, core, key]);

    return (
        <div className="emulator-screen-container">
            <iframe
                key={key}
                ref={iframeRef}
                src="/emulator.html"
                title="Emulator Core"
                className="emulator-iframe"
                allow="autoplay; fullscreen; gamepad"
            />
            {!isReady && <div className="loading-overlay">Initializing Core...</div>}
        </div>
    );
});

export default Screen;
