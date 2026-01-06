import './Dashboard.css';

const CORES = [
    { id: 'gba', name: 'GBA', icon: '👾' },
    { id: 'nds', name: 'DS', icon: '🖊️' },
    { id: 'nes', name: 'NES', icon: '📺' },
    { id: 'snes', name: 'SNES', icon: '🎮' },
];

const SystemSelector = ({ selectedCore, onSelect }) => {
    return (
        <div className="system-selector">
            <h3>Select Platform</h3>
            <div className="cores-grid">
                {CORES.map(core => (
                    <button
                        key={core.id}
                        className={`core-btn ${selectedCore === core.id ? 'active' : ''}`}
                        onClick={() => onSelect(core.id)}
                    >
                        <span className="core-icon">{core.icon}</span>
                        <span className="core-name">{core.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SystemSelector;
