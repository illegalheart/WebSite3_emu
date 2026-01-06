import { useEffect, useState } from 'react';

const Toast = ({ message, type = 'info', onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const styles = {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        padding: '12px 24px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px',
        color: '#fff',
        zIndex: 1000,
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        animation: 'slideIn 0.3s ease-out'
    };

    const icon = type === 'success' ? '✅' : 'ℹ️';

    return (
        <div style={styles}>
            <span>{icon}</span>
            <span>{message}</span>
        </div>
    );
};

export default Toast;
