import React from 'react';

interface FieldProps {
  label: string;
  placeholder: string;
  type: string;
  value: string | number;
  onChange: (value: string) => void;
}

const Field: React.FC<FieldProps> = ({ label, placeholder, type, value, onChange }) => (
  <div className="input-group">
    <label className="input-group__label">{label}</label>
    <input className="input-group__input" type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

export default Field;
