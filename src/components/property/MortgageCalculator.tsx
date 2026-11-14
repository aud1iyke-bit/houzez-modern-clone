'use client';

import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, Calendar, ShieldCheck, PieChart } from 'lucide-react';
import { useApp } from '@/context/AppContext';

interface MortgageCalculatorProps {
  initialPrice: number;
  hoaFee?: number;
}

export default function MortgageCalculator({ initialPrice, hoaFee = 150 }: MortgageCalculatorProps) {
  const { formatPrice } = useApp();
  const [homePrice, setHomePrice] = useState<number>(initialPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(3.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(25);
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(0.8); // 0.8% anual
  const [homeInsurance, setHomeInsurance] = useState<number>(65); // mensual

  const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
  const loanAmount = Math.max(0, homePrice - downPaymentAmount);

  // Monthly Principal & Interest formula
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;
  
  let monthlyPrincipalInterest = 0;
  if (monthlyRate > 0 && totalMonths > 0) {
    monthlyPrincipalInterest = 
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  const monthlyTax = (homePrice * (propertyTaxRate / 100)) / 12;
  const totalMonthlyPayment = Math.round(monthlyPrincipalInterest + monthlyTax + homeInsurance + hoaFee);

  const pAndIPercent = Math.round((monthlyPrincipalInterest / (totalMonthlyPayment || 1)) * 100);
  const taxPercent = Math.round((monthlyTax / (totalMonthlyPayment || 1)) * 100);
  const hoaPercent = Math.round((hoaFee / (totalMonthlyPayment || 1)) * 100);
  const insPercent = Math.max(0, 100 - pAndIPercent - taxPercent - hoaPercent);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center space-x-2.5 mb-6 pb-4 border-b border-gray-100">
        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">Calculadora de Hipoteca</h3>
          <p className="text-xs text-gray-500">Estima tu cuota mensual estimada para esta propiedad</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Controls Column */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Precio de la Propiedad (€)
            </label>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value) || 0)}
              className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Enganche ({downPaymentPercent}%)
              </label>
              <input
                type="number"
                min="0"
                max="90"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value) || 0)}
                className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <span className="text-[11px] text-gray-400 mt-0.5 block">
                {formatPrice(downPaymentAmount)}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Tasa de Interés (% anual)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                max="15"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                className="w-full px-3.5 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Plazo de Amortización: {loanTermYears} años
            </label>
            <input
              type="range"
              min="10"
              max="35"
              step="5"
              value={loanTermYears}
              onChange={(e) => setLoanTermYears(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-medium">
              <span>10 años</span>
              <span>20 años</span>
              <span>25 años</span>
              <span>30 años</span>
              <span>35 años</span>
            </div>
          </div>
        </div>

        {/* Results & Breakdown Column */}
        <div className="bg-gray-50 rounded-xl p-5 border border-gray-200/80 flex flex-col justify-between">
          <div>
            <span className="text-xs text-gray-500 uppercase font-semibold">Cuota Mensual Estimada</span>
            <div className="text-3xl font-black text-gray-900 mt-1 mb-4 text-[#0054a6]">
              {formatPrice(totalMonthlyPayment, '/mes')}
            </div>

            {/* Visual breakdown progress bar */}
            <div className="w-full h-3 rounded-full overflow-hidden flex bg-gray-200 mb-4 shadow-inner">
              <div style={{ width: `${pAndIPercent}%` }} className="bg-blue-600" title="Capital e Interés" />
              <div style={{ width: `${taxPercent}%` }} className="bg-amber-500" title="Impuestos IBI" />
              <div style={{ width: `${hoaPercent}%` }} className="bg-emerald-500" title="Comunidad" />
              <div style={{ width: `${insPercent}%` }} className="bg-purple-500" title="Seguro" />
            </div>

            {/* Breakdown item list */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-gray-700">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                  <span>Capital e Intereses ({pAndIPercent}%)</span>
                </span>
                <span className="font-bold">{formatPrice(Math.round(monthlyPrincipalInterest))}</span>
              </div>

              <div className="flex items-center justify-between text-gray-700">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                  <span>Impuestos (IBI estimado)</span>
                </span>
                <span className="font-bold">{formatPrice(Math.round(monthlyTax))}</span>
              </div>

              <div className="flex items-center justify-between text-gray-700">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                  <span>Cuota de Comunidad / HOA</span>
                </span>
                <span className="font-bold">{formatPrice(hoaFee)}</span>
              </div>

              <div className="flex items-center justify-between text-gray-700">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block"></span>
                  <span>Seguro del Hogar Estimado</span>
                </span>
                <span className="font-bold">{formatPrice(homeInsurance)}</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 mt-4 leading-tight">
            * Cálculo puramente estimativo y no vinculante. Los términos finales dependerán de la entidad financiera y la evaluación de riesgo crediticio.
          </p>
        </div>
      </div>
    </div>
  );
}
