
import React, { useState, useMemo } from 'react';
import { Ruler, Weight, Maximize, Droplet } from 'lucide-react';

type UnitCategory = 'length' | 'mass' | 'area' | 'volume';

interface Unit {
  key: string;
  name: string;
  ratio: number; // base on standard (e.g., m, kg, m2, l)
}

const UNITS: Record<UnitCategory, { icon: any, label: string, units: Unit[] }> = {
  length: {
    label: '長度',
    icon: Ruler,
    units: [
      { key: 'mm', name: '公釐 (mm)', ratio: 0.001 },
      { key: 'cm', name: '公分 (cm)', ratio: 0.01 },
      { key: 'm', name: '公尺 (m)', ratio: 1 },
      { key: 'km', name: '公里 (km)', ratio: 1000 },
      { key: 'in', name: '英吋 (in)', ratio: 0.0254 },
      { key: 'ft', name: '英呎 (ft)', ratio: 0.3048 },
    ]
  },
  mass: {
    label: '重量',
    icon: Weight,
    units: [
      { key: 'mg', name: '毫克 (mg)', ratio: 0.000001 },
      { key: 'g', name: '公克 (g)', ratio: 0.001 },
      { key: 'kg', name: '公斤 (kg)', ratio: 1 },
      { key: 't', name: '公噸 (t)', ratio: 1000 },
      { key: 'oz', name: '盎司 (oz)', ratio: 0.0283495 },
      { key: 'lb', name: '磅 (lb)', ratio: 0.453592 },
    ]
  },
  area: {
    label: '面積',
    icon: Maximize,
    units: [
      { key: 'm2', name: '平方公尺 (m²)', ratio: 1 },
      { key: 'km2', name: '平方公里 (km²)', ratio: 1000000 },
      { key: 'ha', name: '公頃 (ha)', ratio: 10000 },
      { key: 'ac', name: '英畝 (ac)', ratio: 4046.86 },
      { key: 'ping', name: '坪 (ping)', ratio: 3.3058 },
    ]
  },
  volume: {
    label: '體積',
    icon: Droplet,
    units: [
      { key: 'ml', name: '毫升 (ml)', ratio: 0.001 },
      { key: 'l', name: '公升 (l)', ratio: 1 },
      { key: 'm3', name: '立方公尺 (m³)', ratio: 1000 },
      { key: 'gal', name: '加侖 (gal)', ratio: 3.78541 },
    ]
  }
};

const UnitConverter: React.FC = () => {
  const [activeCat, setActiveCat] = useState<UnitCategory>('length');
  const [currentValue, setCurrentValue] = useState<string>('1');
  const [currentUnit, setCurrentUnit] = useState<string>(UNITS.length.units[2].key); // Default to 'm'

  const convertedResults = useMemo(() => {
    const val = parseFloat(currentValue) || 0;
    const catUnits = UNITS[activeCat].units;
    const sourceUnit = catUnits.find(u => u.key === currentUnit);
    if (!sourceUnit) return [];

    const baseValue = val * sourceUnit.ratio;
    
    return catUnits.map(u => ({
      ...u,
      value: parseFloat((baseValue / u.ratio).toPrecision(8))
    }));
  }, [activeCat, currentValue, currentUnit]);

  const handleCategoryChange = (cat: UnitCategory) => {
    setActiveCat(cat);
    setCurrentUnit(UNITS[cat].units[0].key);
  };

  return (
    <div className="space-y-6">
      <div className="flex p-1 bg-gray-100 rounded-2xl gap-1">
        {(Object.keys(UNITS) as UnitCategory[]).map(cat => {
          const Icon = UNITS[cat].icon;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all text-sm font-bold ${activeCat === cat ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Icon size={16} /> {UNITS[cat].label}
            </button>
          );
        })}
      </div>

      <div className="bg-white border-2 border-indigo-100 p-6 rounded-3xl shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">輸入數值</label>
            <input
              type="number"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-indigo-400 focus:bg-white rounded-xl outline-none transition-all font-mono text-lg"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">來源單位</label>
            <select
              value={currentUnit}
              onChange={(e) => setCurrentUnit(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-indigo-400 focus:bg-white rounded-xl outline-none transition-all font-bold text-gray-700"
            >
              {UNITS[activeCat].units.map(u => (
                <option key={u.key} value={u.key}>{u.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {convertedResults.map(res => (
          <div key={res.key} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center group hover:border-indigo-200 transition-colors">
            <p className="text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-tighter">{res.name}</p>
            <div className="text-lg font-black text-gray-800 break-all px-2 font-mono">
              {res.value.toString()}
            </div>
            <button 
              onClick={() => navigator.clipboard.writeText(res.value.toString())}
              className="mt-2 text-[10px] font-bold text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity hover:underline"
            >
              複製數值
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnitConverter;
