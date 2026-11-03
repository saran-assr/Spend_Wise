import React, { useState, useMemo } from 'react';
import { X, Search, Check, ArrowRightLeft, AlertCircle, ArrowRight } from 'lucide-react';
import { useFinance } from '../../context/FinanceContext';
import {
  SUPPORTED_CURRENCIES,
  CurrencyConfig,
  getExchangeRate,
  convertAmount,
  formatCurrency,
} from '../../constants/currencies';

const POPULAR_CURRENCIES = ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'CAD', 'AUD', 'AED', 'SGD', 'CHF', 'CNY', 'SAR'];

export const CurrencySelectorModal: React.FC = () => {
  const { currency, currencyModalOpen, setCurrencyModalOpen, convertWorkspaceCurrency, summary, data } = useFinance();

  const [search, setSearch] = useState('');
  const [selectedCode, setSelectedCode] = useState(currency);

  // Keep selectedCode in sync when currency changes
  React.useEffect(() => {
    setSelectedCode(currency);
  }, [currency, currencyModalOpen]);

  // Filter list
  const filteredCurrencies = useMemo(() => {
    const q = search.trim().toLowerCase();
    const all = Object.values(SUPPORTED_CURRENCIES);
    if (!q) return all;
    return all.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.country.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
    );
  }, [search]);

  if (!currencyModalOpen) return null;

  const currentConfig = SUPPORTED_CURRENCIES[currency] || SUPPORTED_CURRENCIES.USD;
  const targetConfig = SUPPORTED_CURRENCIES[selectedCode] || SUPPORTED_CURRENCIES.USD;
  const currentRate = getExchangeRate(currency, selectedCode);
  const isSameCurrency = currency === selectedCode;

  const handleApply = (codeToApply?: string) => {
    const target = codeToApply || selectedCode;
    if (target === currency) {
      setCurrencyModalOpen(false);
      return;
    }
    convertWorkspaceCurrency(target);
    setCurrencyModalOpen(false);
  };

  // Preview calculations based on current user numbers
  const previewIncomeBefore = summary.totalIncome;
  const previewIncomeAfter = convertAmount(previewIncomeBefore, currency, selectedCode);
  const previewExpensesBefore = summary.totalExpenses;
  const previewExpensesAfter = convertAmount(previewExpensesBefore, currency, selectedCode);
  const previewNetBefore = summary.netCashFlow;
  const previewNetAfter = convertAmount(previewNetBefore, currency, selectedCode);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-slate-100 text-slate-800">
                <ArrowRightLeft className="w-4 h-4 text-slate-700" />
              </span>
              <h3 className="text-base font-bold text-slate-900">Change Workspace Currency & Convert Amounts</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Select any currency: all currency symbols will update and all transactions, budgets, and balances will convert to that currency's value.
            </p>
          </div>
          <button
            onClick={() => setCurrencyModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Currency Summary & Live Rate */}
        <div className="mt-3 py-2.5 px-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl leading-none">{currentConfig.flag}</span>
            <div>
              <p className="text-xs font-semibold text-slate-900">
                Active: {currentConfig.name} ({currentConfig.code}) • <span className="font-mono font-bold">{currentConfig.symbol}</span>
              </p>
              <p className="text-[11px] text-slate-500">
                Country: {currentConfig.country}
              </p>
            </div>
          </div>
          {!isSameCurrency && (
            <div className="text-left sm:text-right bg-white sm:bg-transparent p-2 sm:p-0 rounded-lg border sm:border-0 border-slate-200">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                Exchange Benchmark
              </span>
              <span className="text-xs font-mono font-bold text-indigo-700">
                1 {currency} ≈ {currentRate < 1 ? currentRate.toFixed(4) : currentRate.toFixed(2)} {selectedCode} ({targetConfig.symbol})
              </span>
            </div>
          )}
        </div>

        {/* Live Conversion Preview Card when different currency selected */}
        {!isSameCurrency && (
          <div className="mt-2.5 p-3 rounded-xl bg-indigo-50/70 border border-indigo-100">
            <div className="flex items-center justify-between text-xs font-bold text-indigo-950 mb-2">
              <span className="flex items-center gap-1.5">
                <span>Conversion Value Preview</span>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded font-semibold">
                  Automatic Recalculation
                </span>
              </span>
              <span className="font-mono text-[11px] text-indigo-700">
                {currentConfig.code} ({currentConfig.symbol}) → {targetConfig.code} ({targetConfig.symbol})
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="bg-white p-2 rounded-lg border border-indigo-100/80">
                <span className="text-[10px] text-slate-500 block">Total Income</span>
                <div className="text-[11px] font-mono text-slate-400 line-through">
                  {formatCurrency(previewIncomeBefore, currency)}
                </div>
                <div className="text-xs font-mono font-bold text-emerald-700">
                  {formatCurrency(previewIncomeAfter, selectedCode)}
                </div>
              </div>

              <div className="bg-white p-2 rounded-lg border border-indigo-100/80">
                <span className="text-[10px] text-slate-500 block">Total Expenses</span>
                <div className="text-[11px] font-mono text-slate-400 line-through">
                  {formatCurrency(previewExpensesBefore, currency)}
                </div>
                <div className="text-xs font-mono font-bold text-rose-700">
                  {formatCurrency(previewExpensesAfter, selectedCode)}
                </div>
              </div>

              <div className="bg-white p-2 rounded-lg border border-indigo-100/80">
                <span className="text-[10px] text-slate-500 block">Net Balance</span>
                <div className="text-[11px] font-mono text-slate-400 line-through">
                  {formatCurrency(previewNetBefore, currency)}
                </div>
                <div className="text-xs font-mono font-bold text-slate-900">
                  {formatCurrency(previewNetAfter, selectedCode)}
                </div>
              </div>
            </div>

            <p className="text-[11px] text-indigo-900 mt-2 leading-relaxed">
              All {data.transactions.length} transactions, {data.budgets.length} budgets, and {data.savingsGoals.length} savings goals will be recalculated to {targetConfig.name} ({targetConfig.symbol}).
            </p>
          </div>
        )}

        {/* Search Input */}
        <div className="relative mt-3">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search currency code, country, or name (e.g. Euro, Rupee, Yen, Pound, Mexico)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
          />
        </div>

        {/* Popular Currencies Bar */}
        {!search && (
          <div className="mt-2.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Popular Global Currencies
            </span>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_CURRENCIES.map((code) => {
                const c = SUPPORTED_CURRENCIES[code];
                if (!c) return null;
                const isSelected = selectedCode === code;
                const isCurrent = currency === code;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => setSelectedCode(code)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-2xs font-bold ring-2 ring-slate-900/20'
                        : isCurrent
                        ? 'bg-slate-100 border border-slate-300 text-slate-900 font-semibold'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.code}</span>
                    <span className="font-mono text-[10px] opacity-80">{c.symbol}</span>
                    {isCurrent && <span className="text-[9px] text-emerald-600 font-bold">•</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Scrollable Currency List */}
        <div className="mt-3 flex-1 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100 max-h-52 sm:max-h-60">
          {filteredCurrencies.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No currencies match "{search}".
            </div>
          ) : (
            filteredCurrencies.map((c: CurrencyConfig) => {
              const isSelected = selectedCode === c.code;
              const isCurrent = currency === c.code;
              const rateToActive = getExchangeRate(currency, c.code);

              return (
                <div
                  key={c.code}
                  onClick={() => setSelectedCode(c.code)}
                  className={`flex items-center justify-between p-2.5 hover:bg-slate-50 cursor-pointer transition-colors ${
                    isSelected ? 'bg-slate-50/90 font-medium' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl leading-none">{c.flag}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{c.code}</span>
                        <span className="text-xs text-slate-700">{c.name}</span>
                        {isCurrent && (
                          <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded-md">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400">{c.country}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {!isCurrent && (
                      <span className="text-[11px] font-mono text-slate-400 hidden xs:inline">
                        1 {currency} ≈ {rateToActive < 1 ? rateToActive.toFixed(4) : rateToActive.toFixed(2)}
                      </span>
                    )}
                    <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md min-w-[28px] text-center">
                      {c.symbol}
                    </span>
                    {!isCurrent ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(c.code);
                        }}
                        className="px-2 py-1 text-[11px] font-semibold text-slate-700 hover:text-white hover:bg-slate-900 border border-slate-200 rounded-md transition-colors"
                        title={`Convert directly to ${c.code}`}
                      >
                        Convert
                      </button>
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col xs:flex-row items-center justify-between gap-3 pt-3 mt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 self-start xs:self-auto">
            <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              Target: <strong className="text-slate-800">{targetConfig.name}</strong> ({targetConfig.code} • {targetConfig.symbol})
            </span>
          </div>
          <div className="flex items-center gap-2 w-full xs:w-auto justify-end">
            <button
              type="button"
              onClick={() => setCurrencyModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleApply()}
              disabled={isSameCurrency}
              className={`px-4 py-2 text-xs font-semibold rounded-lg shadow-2xs transition-all flex items-center gap-1.5 ${
                isSameCurrency
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {isSameCurrency ? (
                'Already Active'
              ) : (
                <>
                  <span>Convert All to {selectedCode} ({targetConfig.symbol})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
