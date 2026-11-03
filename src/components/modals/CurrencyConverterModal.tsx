import React, { useState, useMemo } from 'react';
import { X, ArrowRightLeft, Calculator, TrendingUp, Check, ArrowRight } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import {
  SUPPORTED_CURRENCIES,
  getExchangeRate,
  convertAmount,
  formatCurrency,
} from '../../constants/currencies';

export const CurrencyConverterModal: React.FC = () => {
  const {
    currency,
    converterModalOpen,
    setConverterModalOpen,
    convertWorkspaceCurrency,
  } = useFinance();

  const [fromCode, setFromCode] = useState<string>(currency);
  const [toCode, setToCode] = useState<string>(currency === 'USD' ? 'EUR' : 'USD');
  const [inputAmount, setInputAmount] = useState<string>('100');

  // Quick preset amounts
  const presets = [10, 50, 100, 250, 500, 1000, 5000];

  const numAmount = parseFloat(inputAmount) || 0;
  const rate = useMemo(() => getExchangeRate(fromCode, toCode), [fromCode, toCode]);
  const inverseRate = useMemo(() => getExchangeRate(toCode, fromCode), [fromCode, toCode]);
  const convertedValue = useMemo(() => convertAmount(numAmount, fromCode, toCode), [numAmount, fromCode, toCode]);

  const fromConfig = SUPPORTED_CURRENCIES[fromCode] || SUPPORTED_CURRENCIES.USD;
  const toConfig = SUPPORTED_CURRENCIES[toCode] || SUPPORTED_CURRENCIES.USD;

  if (!converterModalOpen) return null;

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  const allCurrencies = Object.values(SUPPORTED_CURRENCIES);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-slate-100 text-slate-800">
              <Calculator className="w-4 h-4 text-slate-700" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">Live Currency Converter</h3>
              <p className="text-xs text-slate-500">
                Instant calculations across 110+ world currencies at calibrated FX benchmarks.
              </p>
            </div>
          </div>
          <button
            onClick={() => setConverterModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 flex-1 overflow-y-auto pr-1">
          {/* Main Calculation Display Card */}
          <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-sm">
            <div className="flex items-baseline justify-between text-xs text-slate-400 mb-1">
              <span>Converted Result</span>
              <span className="font-mono">
                1 {fromCode} = {rate < 1 ? rate.toFixed(4) : rate.toFixed(2)} {toCode}
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-white">
                {formatCurrency(convertedValue, toCode)}
              </span>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>
                {formatCurrency(numAmount, fromCode)}
              </span>
              <span className="font-mono text-[11px]">
                1 {toCode} = {inverseRate < 1 ? inverseRate.toFixed(4) : inverseRate.toFixed(2)} {fromCode}
              </span>
            </div>
          </div>

          {/* Amount Input */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Amount to Convert
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400 text-sm">
                {fromConfig.symbol}
              </span>
              <input
                type="number"
                min="0"
                step="any"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-base font-mono font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1">
              Quick:
            </span>
            {presets.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setInputAmount(String(val))}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                  numAmount === val
                    ? 'bg-slate-900 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {val}
              </button>
            ))}
          </div>

          {/* From & To Currency Selectors with Swap */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            {/* From Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                From Currency
              </label>
              <div className="relative">
                <select
                  value={fromCode}
                  onChange={(e) => setFromCode(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 appearance-none cursor-pointer"
                >
                  {allCurrencies.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 truncate">
                {fromConfig.country} ({fromConfig.symbol})
              </p>
            </div>

            {/* Swap Button */}
            <div className="pt-4 flex justify-center">
              <button
                type="button"
                onClick={handleSwap}
                title="Swap currencies"
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* To Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                To Currency
              </label>
              <div className="relative">
                <select
                  value={toCode}
                  onChange={(e) => setToCode(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 appearance-none cursor-pointer"
                >
                  {allCurrencies.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 truncate">
                {toConfig.country} ({toConfig.symbol})
              </p>
            </div>
          </div>

          {/* Quick Denominations Table */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-2">
              <TrendingUp className="w-3.5 h-3.5 text-slate-600" />
              <span>Conversion Reference Matrix</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[1, 10, 50, 100].map((d) => {
                const cv = convertAmount(d, fromCode, toCode);
                return (
                  <div key={d} className="p-2 bg-white rounded-lg border border-slate-100">
                    <span className="text-[10px] font-mono text-slate-400 block">
                      {formatCurrency(d, fromCode)} =
                    </span>
                    <span className="font-mono font-bold text-slate-900 text-xs">
                      {formatCurrency(cv, toCode)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 mt-4 border-t border-slate-100">
          <div>
            {toCode !== currency && (
              <button
                type="button"
                onClick={() => {
                  convertWorkspaceCurrency(toCode, true);
                  setConverterModalOpen(false);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:underline"
              >
                <span>Make {toCode} my workspace currency</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setConverterModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
