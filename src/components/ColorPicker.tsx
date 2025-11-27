import React from "react";

interface ColorPickerProps {
  label: string;
  initialColor: string;
  onColorChange: (color: string) => void;
}

export default function ColorPicker({ label, initialColor, onColorChange }: ColorPickerProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
      <label style={{ minWidth: 80, marginRight: 10 }}>{label}:</label>
      <input
        type="color"
        value={initialColor}
        onChange={(e) => onColorChange(e.target.value)}
        style={{ width: 40, height: 40, border: "none" }}
      />
      <span style={{ marginLeft: 10 }}>{initialColor}</span>
    </div>
  );
}
