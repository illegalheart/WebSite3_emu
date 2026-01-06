import { useRef, useState } from 'react';
import './Dashboard.css';

const RomPicker = ({ onFileLoaded }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            onFileLoaded(files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            onFileLoaded(e.target.files[0]);
        }
    };

    return (
        <div
            className={`rom-picker ${isDragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".gba,.gb,.nds,.nes,.sfc,.smc,.zip"
                style={{ display: 'none' }}
            />
            <div className="picker-content">
                <div className="icon">📂</div>
                <h3>Drop ROM File Here</h3>
                <p>or click to browse</p>
                <span className="supported-formats">.gba, .nds, .nes, .sfc</span>
            </div>
        </div>
    );
};

export default RomPicker;
