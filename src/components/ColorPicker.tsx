// components/ColorPicker.tsx
import React from 'react';

interface ColorPickerProps {
    label: string;
    initialColor: string;
    onColorChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, initialColor, onColorChange }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
            <label style={{ minWidth: '80px', marginRight: '10px' }}>{label}:</label>
            <input
                type="color"
                value={initialColor}
                onChange={(e) => onColorChange(e.target.value)}
                style={{ width: '40px', height: '40px', border: 'none' }}
            />
            <span style={{ marginLeft: '10px' }}>{initialColor}</span>
        </div>
    );
};

export default ColorPicker;