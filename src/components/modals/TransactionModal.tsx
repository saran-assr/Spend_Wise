import React, { useState, useEffect } from 'react';
import { X, ArrowDownRight, ArrowUpRight, Globe } from 'lucide-react';
import { Transaction, TransactionType, PaymentMethod } from '../../types';
import { useFinance } from '../../context/FinanceContext';
import {
  SUPPORTED_CURRENCIES,
  getExchangeRate,
  convertAmount,
  formatCurrency,
} from '../../constants/currencies';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTransaction?: Transaction | null;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  onClose,
  initialTransaction,
}) => {
  const { data, currency, addTransaction, updateTransaction } = useFinance();

  const [type, setType] = useState<TransactionType>('expense');
  const [txCurrency, setTxCurrency] = useState<string>(currency);
  const [amount, setAmount] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('Credit Card');
  const [notes, setNotes] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filter categories by selected type
  const availableCategories = data.categories.filter((c) => c.type === type);

  useEffect(() => {
    if (initialTransaction) {
      setType(initialTransaction.type);
      setAmount(String(initialTransaction.originalAmount !== undefined ? initialTransaction.originalAmount : initialTransaction.amount));
      setTxCurrency(initialTransaction.originalCurrency || currency);
      setCategoryId(initialTransaction.categoryId);
      setDescription(initialTransaction.description);
      setDate(initialTransaction.date);
      setPaymentMethod(initialTransaction.paymentMethod);
      setNotes(initialTransaction.notes || '');
    } else {
      setType('expense');
      setAmount('');
      setTxCurrency(currency);
      const firstCat = data.categories.find((c) => c.type === 'expense');
      setCategoryId(firstCat ? firstCat.id : '');
      setDescription('');
      setDate(new Date().toISOString().split('T')[0]);
      setPaymentMethod('Credit Card');
      setNotes('');
    }
    setErrors({});
  }, [initialTransaction, isOpen, data.categories, currency]);

  // Keep category in sync when switching type
  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    const firstCat = data.categories.find((c) => c.type === newType);
    if (firstCat) {
      setCategoryId(firstCat.id);
    }
  };

  if (!isOpen) return null;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    const numAmount = parseFloat(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      errs.amount = 'Please enter a valid amount greater than 0.';
    }

    if (!description.trim()) {
      errs.description = 'Description is required.';
    }

    if (!categoryId) {
      errs.category = 'Please select a category.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const numAmount = parseFloat(amount);
    const isForeign = txCurrency !== currency;
    const fxRate = isForeign ? getExchangeRate(txCurrency, currency) : 1;
    const baseAmount = isForeign ? convertAmount(numAmount, txCurrency, currency) : numAmount;

    if (initialTransaction) {
      updateTransaction(initialTransaction.id, {
        type,
        amount: baseAmount,
        categoryId,
        description: description.trim(),
        date,
        paymentMethod,
        notes: notes.trim() || undefined,
        originalCurrency: isForeign ? txCurrency : undefined,
        originalAmount: isForeign ? numAmount : undefined,
        exchangeRate: isForeign ? fxRate : undefined,
      });
    } else {
      addTransaction({
        type,
        amount: baseAmount,
        categoryId,
        description: description.trim(),
        date,
        paymentMethod,
        notes: notes.trim() || undefined,
        originalCurrency: isForeign ? txCurrency : undefined,
        originalAmount: isForeign ? numAmount : undefined,
        exchangeRate: isForeign ? fxRate : undefined,
      });
    }

    onClose();
  };

  const txConfig = SUPPORTED_CURRENCIES[txCurrency] || SUPPORTED_CURRENCIES.USD;
  const numParsedAmount = parseFloat(amount);
  const isForeignCurrency = txCurrency !== currency;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-900">
            {initialTransaction ? 'Edit Transaction' : 'Record Transaction'}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Type Toggle: Expense vs Income */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg">
              <button
                type="button"
                onClick={() => handleTypeChange('expense')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                  type === 'expense'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ArrowDownRight className="w-4 h-4 text-rose-600" />
                Expense
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('income')}
                className={`flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                  type === 'income'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <ArrowUpRight className="w-4 h-4 text-emerald-600" />
                Income
              </button>
            </div>
          </div>

          {/* Amount & Currency */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">
                Amount
              </label>
              {isForeignCurrency && (
                <span className="text-[11px] font-mono text-slate-500">
                  Base Workspace: {currency}
                </span>
              )}
            </div>

            <div className="grid grid-cols-[1fr_135px] gap-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono font-bold text-slate-400 text-sm">
                  {txConfig.symbol}
                </span>
                <input
                  type="number"
                  step="any"
                  min="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 rounded-lg border text-base font-mono font-bold focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 ${
                    errors.amount ? 'border-rose-400 text-rose-900' : 'border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <select
                value={txCurrency}
                onChange={(e) => setTxCurrency(e.target.value)}
                className="w-full px-2.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold bg-white text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 cursor-pointer"
              >
                {Object.values(SUPPORTED_CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>
            {errors.amount && <p className="text-xs text-rose-600 mt-1">{errors.amount}</p>}

            {/* Foreign currency live preview */}
            {isForeignCurrency && !isNaN(numParsedAmount) && numParsedAmount > 0 && (
              <div className="mt-2 py-1.5 px-2.5 bg-slate-50 rounded-lg border border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-500">Converted to workspace base:</span>
                <span className="font-mono font-bold text-slate-900">
                  ≈ {formatCurrency(convertAmount(numParsedAmount, txCurrency, currency), currency)}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Description / Payee
            </label>
            <input
              type="text"
              placeholder="e.g. Grocery store, Monthly salary, Coffee..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 ${
                errors.description ? 'border-rose-400' : 'border-slate-200'
              }`}
            />
            {errors.description && <p className="text-xs text-rose-600 mt-1">{errors.description}</p>}
          </div>

          {/* Category & Payment Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 bg-white ${
                  errors.category ? 'border-rose-400' : 'border-slate-200'
                }`}
              >
                {availableCategories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-xs text-rose-600 mt-1">{errors.category}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 bg-white"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
                <option value="UPI / Digital Wallet">UPI / Digital Wallet</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Transaction Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400 bg-white"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
              Notes (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Additional memo, receipt reference, tax note..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-slate-900/10 focus:border-slate-400"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
            >
              {initialTransaction ? 'Save Changes' : 'Record Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
