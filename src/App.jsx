import { useState, useRef, useEffect } from 'react'
import './styles/App.css'
import RomPicker from './components/Dashboard/RomPicker'
import SystemSelector from './components/Dashboard/SystemSelector'
import Screen from './components/Emulator/Screen'
import Toast from './components/UI/Toast'

function App() {
  const [currentRom, setCurrentRom] = useState(null)
  const [currentCore, setCurrentCore] = useState('gba')
  const [isPlaying, setIsPlaying] = useState(false)
  const [toast, setToast] = useState(null);

  const screenRef = useRef(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data?.type === 'TOAST') {
        setToast(event.data.payload);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleFileLoaded = (file) => {
    setCurrentRom(file)
    setIsPlaying(true)

    const ext = file.name.split('.').pop().toLowerCase()
    if (ext === 'gba') setCurrentCore('gba')
    if (ext === 'nds') setCurrentCore('nds')
    if (ext === 'nes') setCurrentCore('nes')
    if (ext === 'sfc' || ext === 'smc') setCurrentCore('snes')
  }

  const handleStop = () => {
    setIsPlaying(false)
    setCurrentRom(null)
  }

  const handleFullscreen = () => {
    const mainElement = document.querySelector('.main-content');
    if (mainElement) {
      if (!document.fullscreenElement) {
        mainElement.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Web3 Emulator</h1>
        <div className="header-actions">
          {isPlaying && (
            <div className="control-group">
              <button className="action-btn" onClick={handleFullscreen}>📺 Maximize</button>
              <button className="stop-btn" onClick={handleStop}>Stop Game</button>
            </div>
          )}
        </div>
      </header>
      <main className="main-content">
        {isPlaying && currentRom ? (
          <Screen ref={screenRef} romFile={currentRom} core={currentCore} />
        ) : (
          <div className="dashboard">
            <SystemSelector selectedCore={currentCore} onSelect={setCurrentCore} />
            <div style={{ height: '24px' }}></div>
            <RomPicker onFileLoaded={handleFileLoaded} />
          </div>
        )}
      </main>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}

export default App
