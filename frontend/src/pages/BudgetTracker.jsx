import React, { useState, useEffect } from 'react';
import {
    PlusIcon,
    MinusIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    HomeIcon,
    ShieldCheckIcon,
    ShoppingBagIcon,
    HeartIcon,
    FilmIcon,
    TruckIcon,
    UserGroupIcon,
    DocumentTextIcon,
    ArrowUpTrayIcon,
    PrinterIcon,
    XMarkIcon
} from '@heroicons/react/24/outline';
import jsPDF from 'jspdf';
import '../styles/BudgetTracker.css';

const BudgetTracker = () => {
    // State for budget data
    const [budgetData, setBudgetData] = useState({
        income: {
            salary: 0,
            partTime: 0,
            investment: 0,
            rental: 0,
            pension: 0,
            other: 0,
            custom: []
        },
        expenses: {
            homeUtilities: {
                rent: 0,
                electricity: 0,
                gas: 0,
                water: 0,
                internet: 0,
                phone: 0,
                maintenance: 0,
                custom: []
            },
            insuranceFinancial: {
                healthInsurance: 0,
                carInsurance: 0,
                homeInsurance: 0,
                lifeInsurance: 0,
                bankFees: 0,
                creditCard: 0,
                loans: 0,
                custom: []
            },
            groceries: {
                food: 0,
                household: 0,
                personalCare: 0,
                custom: []
            },
            personalMedical: {
                medical: 0,
                dental: 0,
                pharmacy: 0,
                fitness: 0,
                clothing: 0,
                custom: []
            },
            entertainment: {
                diningOut: 0,
                movies: 0,
                subscriptions: 0,
                hobbies: 0,
                travel: 0,
                custom: []
            },
            transport: {
                fuel: 0,
                publicTransport: 0,
                carMaintenance: 0,
                registration: 0,
                parking: 0,
                custom: []
            },
            children: {
                schoolFees: 0,
                childcare: 0,
                activities: 0,
                clothing: 0,
                medical: 0,
                custom: []
            }
        }
    });

    const [autosave, setAutosave] = useState(true);
    const [showExportModal, setShowExportModal] = useState(false);

    // Load data from localStorage on component mount
    useEffect(() => {
        const savedData = localStorage.getItem('budgetTrackerData');
        if (savedData) {
            setBudgetData(JSON.parse(savedData));
        }
    }, []);

    // Save to localStorage when data changes and autosave is enabled
    useEffect(() => {
        if (autosave) {
            localStorage.setItem('budgetTrackerData', JSON.stringify(budgetData));
        }
    }, [budgetData, autosave]);

    // Helper function to update nested values
    const updateValue = (category, subcategory, field, value) => {
        setBudgetData(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [subcategory]: typeof prev[category][subcategory] === 'object'
                    ? { ...prev[category][subcategory], [field]: parseFloat(value) || 0 }
                    : parseFloat(value) || 0
            }
        }));
    };

    // Add custom item
    const addCustomItem = (category, subcategory) => {
        const name = prompt('Enter item name:');
        if (name) {
            setBudgetData(prev => {
                const target = category === 'income'
                    ? prev[category]
                    : prev[category][subcategory];

                return {
                    ...prev,
                    [category]: category === 'income'
                        ? {
                            ...prev[category],
                            custom: [...prev[category].custom, { name, value: 0, id: Date.now() }]
                        }
                        : {
                            ...prev[category],
                            [subcategory]: {
                                ...prev[category][subcategory],
                                custom: [...prev[category][subcategory].custom, { name, value: 0, id: Date.now() }]
                            }
                        }
                };
            });
        }
    };

    // Calculate totals
    const calculateTotal = (obj) => {
        let total = 0;
        Object.entries(obj).forEach(([key, value]) => {
            if (key === 'custom') {
                total += value.reduce((sum, item) => sum + (item.value || 0), 0);
            } else if (typeof value === 'number') {
                total += value;
            } else if (typeof value === 'object') {
                total += calculateTotal(value);
            }
        });
        return total;
    };

    const totalIncome = calculateTotal(budgetData.income);
    const totalExpenses = calculateTotal(budgetData.expenses);
    const netAmount = totalIncome - totalExpenses;

    // Print functionality
    const handlePrint = () => {
        window.print();
    };

    // Export functionality
    const handleExport = () => {
        setShowExportModal(true);
    };

    const handleExportJSON = () => {
        const dataStr = JSON.stringify(budgetData, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

        const exportFileDefaultName = `budget_${new Date().toISOString().split('T')[0]}.json`;

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        setShowExportModal(false);
    };

    const handleExportPDF = () => {
        const pdf = new jsPDF();
        const currentDate = new Date().toLocaleDateString();
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Standard header
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(18);
        pdf.setFont(undefined, 'bold');
        pdf.text('MONTHLY BUDGET WORKSHEET', pageWidth / 2, 20, { align: 'center' });

        pdf.setFontSize(10);
        pdf.setFont(undefined, 'normal');
        pdf.text(`Date: ${currentDate}`, 20, 35);

        // Draw a line under header
        pdf.line(20, 40, pageWidth - 20, 40);

        let yPos = 55;

        // Helper function to draw table rows
        const drawTableRow = (label, amount, yPosition, isHeader = false, isSubItem = false, isTotal = false) => {
            // Check if we need a new page
            if (yPosition > pageHeight - 30) {
                pdf.addPage();
                yPosition = 20;
            }

            if (isHeader) {
                pdf.setFont(undefined, 'bold');
                pdf.setFontSize(12);
                // Draw line above section with more space
                pdf.line(20, yPosition - 8, pageWidth - 20, yPosition - 8);
            } else {
                pdf.setFont(undefined, 'normal');
                pdf.setFontSize(10);
            }

            if (isTotal) {
                pdf.setFont(undefined, 'bold');
                // Draw line above total with more space
                pdf.line(20, yPosition - 5, pageWidth - 20, yPosition - 5);
            }

            const xPos = isSubItem ? 35 : 20;
            pdf.text(label, xPos, yPosition);

            if (amount !== null) {
                const amountText = `$${amount.toLocaleString()}`;
                const textWidth = pdf.getTextWidth(amountText);
                pdf.text(amountText, pageWidth - 25 - textWidth, yPosition);
            }

            // Increased spacing for better readability
            return yPosition + (isHeader ? 18 : isTotal ? 15 : 14);
        };

        // INCOME SECTION
        yPos = drawTableRow('INCOME', null, yPos, true);

        let hasIncomeItems = false;
        incomeCategories.forEach(category => {
            const value = budgetData.income[category.key];
            if (value > 0) {
                yPos = drawTableRow(category.label, value, yPos, false, true);
                hasIncomeItems = true;
            }
        });

        // Custom income items
        budgetData.income.custom.forEach(item => {
            if (item.value > 0) {
                yPos = drawTableRow(item.name, item.value, yPos, false, true);
                hasIncomeItems = true;
            }
        });

        if (!hasIncomeItems) {
            yPos = drawTableRow('No income recorded', 0, yPos, false, true);
        }

        // Total Income
        yPos += 8;
        yPos = drawTableRow('TOTAL INCOME', totalIncome, yPos, false, false, true);
        yPos += 20;

        // EXPENSES SECTION
        yPos = drawTableRow('EXPENSES', null, yPos, true);

        let hasExpenseItems = false;
        expenseCategories.forEach(category => {
            const categoryTotal = calculateTotal(budgetData.expenses[category.key]);
            if (categoryTotal > 0) {
                // Category header
                yPos = drawTableRow(category.label.toUpperCase(), categoryTotal, yPos, false, false, false);

                // Category items
                let categoryHasItems = false;
                category.items.forEach(item => {
                    const value = budgetData.expenses[category.key][item.key];
                    if (value > 0) {
                        yPos = drawTableRow(item.label, value, yPos, false, true);
                        categoryHasItems = true;
                        hasExpenseItems = true;
                    }
                });

                // Custom items for category
                if (budgetData.expenses[category.key].custom) {
                    budgetData.expenses[category.key].custom.forEach(item => {
                        if (item.value > 0) {
                            yPos = drawTableRow(item.name, item.value, yPos, false, true);
                            categoryHasItems = true;
                            hasExpenseItems = true;
                        }
                    });
                }

                yPos += 10; // More space between categories
            }
        });

        if (!hasExpenseItems) {
            yPos = drawTableRow('No expenses recorded', 0, yPos, false, true);
        }

        // Total Expenses
        yPos += 8;
        yPos = drawTableRow('TOTAL EXPENSES', totalExpenses, yPos, false, false, true);
        yPos += 25;

        // SUMMARY SECTION
        yPos = drawTableRow('SUMMARY', null, yPos, true);

        yPos = drawTableRow('Total Monthly Income', totalIncome, yPos);
        yPos = drawTableRow('Total Monthly Expenses', totalExpenses, yPos);

        yPos += 8;
        const netAmountLabel = netAmount >= 0 ? 'Net Income (Surplus)' : 'Net Loss (Deficit)';
        yPos = drawTableRow(netAmountLabel, Math.abs(netAmount), yPos, false, false, true);

        // Budget Analysis
        yPos += 20;
        yPos = drawTableRow('BUDGET ANALYSIS', null, yPos, true);

        const savingsPercentage = totalIncome > 0 ? ((netAmount / totalIncome) * 100) : 0;
        if (netAmount >= 0) {
            yPos = drawTableRow(`Savings Rate: ${savingsPercentage.toFixed(1)}%`, null, yPos);
            if (savingsPercentage >= 20) {
                yPos = drawTableRow('Status: Excellent savings rate', null, yPos);
            } else if (savingsPercentage >= 10) {
                yPos = drawTableRow('Status: Good savings rate', null, yPos);
            } else {
                yPos = drawTableRow('Status: Consider increasing savings', null, yPos);
            }
        } else {
            yPos = drawTableRow(`Over-spending: ${Math.abs(savingsPercentage).toFixed(1)}%`, null, yPos);
            yPos = drawTableRow('Status: Review and reduce expenses', null, yPos);
        }

        // Expense breakdown by percentage
        yPos += 15;
        pdf.setFontSize(9);
        pdf.setFont(undefined, 'italic');
        pdf.text('Note: Review categories with highest percentages for potential savings', 20, yPos);

        // Footer
        yPos = pageHeight - 20;
        pdf.line(20, yPos - 5, pageWidth - 20, yPos - 5);
        pdf.setFontSize(8);
        pdf.setFont(undefined, 'normal');
        pdf.text('Budget Tracker Report', 20, yPos);
        pdf.text(`Page 1 - Generated ${currentDate}`, pageWidth - 80, yPos);

        const fileName = `monthly_budget_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(fileName);
        setShowExportModal(false);
    };    // Category configurations
    const incomeCategories = [
        { key: 'salary', label: 'Salary/Wage (after tax)', icon: CurrencyDollarIcon },
        { key: 'partTime', label: 'Part-time/Casual work', icon: CurrencyDollarIcon },
        { key: 'investment', label: 'Investment income', icon: ChartBarIcon },
        { key: 'rental', label: 'Rental income', icon: HomeIcon },
        { key: 'pension', label: 'Pension/Benefits', icon: ShieldCheckIcon },
        { key: 'other', label: 'Other income', icon: DocumentTextIcon }
    ];

    const expenseCategories = [
        {
            key: 'homeUtilities',
            label: 'Home & utilities',
            icon: HomeIcon,
            color: 'blue',
            items: [
                { key: 'rent', label: 'Rent/Mortgage' },
                { key: 'electricity', label: 'Electricity' },
                { key: 'gas', label: 'Gas' },
                { key: 'water', label: 'Water' },
                { key: 'internet', label: 'Internet/Phone' },
                { key: 'maintenance', label: 'Home maintenance' }
            ]
        },
        {
            key: 'insuranceFinancial',
            label: 'Insurance & financial',
            icon: ShieldCheckIcon,
            color: 'purple',
            items: [
                { key: 'healthInsurance', label: 'Health insurance' },
                { key: 'carInsurance', label: 'Car insurance' },
                { key: 'homeInsurance', label: 'Home insurance' },
                { key: 'lifeInsurance', label: 'Life insurance' },
                { key: 'bankFees', label: 'Bank fees' },
                { key: 'creditCard', label: 'Credit card payments' },
                { key: 'loans', label: 'Loans' }
            ]
        },
        {
            key: 'groceries',
            label: 'Groceries',
            icon: ShoppingBagIcon,
            color: 'green',
            items: [
                { key: 'food', label: 'Food & beverages' },
                { key: 'household', label: 'Household supplies' },
                { key: 'personalCare', label: 'Personal care' }
            ]
        },
        {
            key: 'personalMedical',
            label: 'Personal & medical',
            icon: HeartIcon,
            color: 'pink',
            items: [
                { key: 'medical', label: 'Medical expenses' },
                { key: 'dental', label: 'Dental' },
                { key: 'pharmacy', label: 'Pharmacy' },
                { key: 'fitness', label: 'Fitness/Gym' },
                { key: 'clothing', label: 'Clothing' }
            ]
        },
        {
            key: 'entertainment',
            label: 'Entertainment & eat-out',
            icon: FilmIcon,
            color: 'cyan',
            items: [
                { key: 'diningOut', label: 'Dining out' },
                { key: 'movies', label: 'Movies/Entertainment' },
                { key: 'subscriptions', label: 'Subscriptions' },
                { key: 'hobbies', label: 'Hobbies' },
                { key: 'travel', label: 'Travel/Holidays' }
            ]
        },
        {
            key: 'transport',
            label: 'Transport & auto',
            icon: TruckIcon,
            color: 'orange',
            items: [
                { key: 'fuel', label: 'Fuel' },
                { key: 'publicTransport', label: 'Public transport' },
                { key: 'carMaintenance', label: 'Car maintenance' },
                { key: 'registration', label: 'Registration' },
                { key: 'parking', label: 'Parking' }
            ]
        },
        {
            key: 'children',
            label: 'Children',
            icon: UserGroupIcon,
            color: 'indigo',
            items: [
                { key: 'schoolFees', label: 'School fees' },
                { key: 'childcare', label: 'Childcare' },
                { key: 'activities', label: 'Activities/Sports' },
                { key: 'clothing', label: 'Children clothing' },
                { key: 'medical', label: 'Children medical' }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Budget Planner</h1>
                                <p className="mt-1 text-sm text-gray-600">
                                    Work out where your money is going and take control of your finances
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handlePrint}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 no-print"
                                >
                                    <PrinterIcon className="h-4 w-4 mr-2" />
                                    Print
                                </button>
                                <button
                                    onClick={handleExport}
                                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 no-print"
                                >
                                    <ArrowUpTrayIcon className="h-4 w-4 mr-2" />
                                    Export
                                </button>
                            </div>
                        </div>

                        {/* Autosave toggle */}
                        <div className="mt-4 flex items-center">
                            <span className="text-sm font-medium text-gray-700 mr-3">Autosave</span>
                            <button
                                onClick={() => setAutosave(!autosave)}
                                className={`${autosave ? 'bg-indigo-600' : 'bg-gray-200'
                                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                                <span
                                    className={`${autosave ? 'translate-x-5' : 'translate-x-0'
                                        } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                                />
                            </button>
                            <p className="ml-3 text-xs text-gray-500">
                                Budget data will be automatically saved to your device
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Income Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <CurrencyDollarIcon className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-lg font-semibold text-white">Income</h3>
                                        <p className="text-green-100 text-sm">Monthly income streams</p>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="text-2xl font-bold text-white number-change">
                                        ${totalIncome.toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 space-y-4">
                                {incomeCategories.map((category) => {
                                    const IconComponent = category.icon;
                                    return (
                                        <div key={category.key} className="space-y-2">
                                            <div className="flex items-center">
                                                <IconComponent className="h-4 w-4 text-gray-400 mr-2" />
                                                <label className="block text-sm font-medium text-gray-700">
                                                    {category.label}
                                                </label>
                                            </div>
                                            <input
                                                type="number"
                                                value={budgetData.income[category.key]}
                                                onChange={(e) => updateValue('income', category.key, null, e.target.value)}
                                                className="budget-input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                                placeholder="0"
                                            />
                                        </div>
                                    );
                                })}

                                {/* Custom income items */}
                                {budgetData.income.custom.map((item) => (
                                    <div key={item.id} className="space-y-2">
                                        <div className="flex items-center">
                                            <DocumentTextIcon className="h-4 w-4 text-gray-400 mr-2" />
                                            <label className="block text-sm font-medium text-gray-700">
                                                {item.name}
                                            </label>
                                        </div>
                                        <input
                                            type="number"
                                            value={item.value}
                                            onChange={(e) => {
                                                setBudgetData(prev => ({
                                                    ...prev,
                                                    income: {
                                                        ...prev.income,
                                                        custom: prev.income.custom.map(customItem =>
                                                            customItem.id === item.id
                                                                ? { ...customItem, value: parseFloat(e.target.value) || 0 }
                                                                : customItem
                                                        )
                                                    }
                                                }));
                                            }}
                                            className="budget-input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                            placeholder="0"
                                        />
                                    </div>
                                ))}

                                <button
                                    onClick={() => addCustomItem('income')}
                                    className="w-full flex items-center justify-center px-3 py-2 border border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <PlusIcon className="h-4 w-4 mr-1" />
                                    Add custom item
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Expenses Section */}
                    <div className="lg:col-span-2">
                        <div className="space-y-6">
                            {expenseCategories.map((category) => {
                                const IconComponent = category.icon;
                                const categoryTotal = calculateTotal(budgetData.expenses[category.key]);

                                return (
                                    <div key={category.key} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden budget-card">
                                        <div className={`budget-category-${category.color} px-6 py-4`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0">
                                                        <IconComponent className="h-6 w-6 text-white" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <h3 className="text-lg font-semibold text-white">{category.label}</h3>
                                                    </div>
                                                </div>
                                                <div className="text-xl font-bold text-white number-change">
                                                    ${categoryTotal.toLocaleString()}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {category.items.map((item) => (
                                                    <div key={item.key} className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            {item.label}
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={budgetData.expenses[category.key][item.key]}
                                                            onChange={(e) => updateValue('expenses', category.key, item.key, e.target.value)}
                                                            className="budget-input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                                            placeholder="0"
                                                        />
                                                    </div>
                                                ))}

                                                {/* Custom items for this category */}
                                                {budgetData.expenses[category.key].custom?.map((item) => (
                                                    <div key={item.id} className="space-y-2">
                                                        <label className="block text-sm font-medium text-gray-700">
                                                            {item.name}
                                                        </label>
                                                        <input
                                                            type="number"
                                                            value={item.value}
                                                            onChange={(e) => {
                                                                setBudgetData(prev => ({
                                                                    ...prev,
                                                                    expenses: {
                                                                        ...prev.expenses,
                                                                        [category.key]: {
                                                                            ...prev.expenses[category.key],
                                                                            custom: prev.expenses[category.key].custom.map(customItem =>
                                                                                customItem.id === item.id
                                                                                    ? { ...customItem, value: parseFloat(e.target.value) || 0 }
                                                                                    : customItem
                                                                            )
                                                                        }
                                                                    }
                                                                }));
                                                            }}
                                                            className="budget-input w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                                            placeholder="0"
                                                        />
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-4">
                                                <button
                                                    onClick={() => addCustomItem('expenses', category.key)}
                                                    className="flex items-center px-3 py-2 border border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:text-gray-900 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    <PlusIcon className="h-4 w-4 mr-1" />
                                                    Add custom item
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                                <div className={`${netAmount >= 0
                                    ? 'bg-gradient-to-r from-green-500 to-green-600'
                                    : 'bg-gradient-to-r from-red-500 to-red-600'
                                    } px-6 py-4`}>
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <ChartBarIcon className="h-6 w-6 text-white" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-lg font-semibold text-white">Summary</h3>
                                            <p className="text-white text-opacity-90 text-sm">Monthly overview</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                        <span className="text-sm font-medium text-green-800">Total Income</span>
                                        <span className="text-lg font-bold text-green-900">
                                            ${totalIncome.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                                        <span className="text-sm font-medium text-red-800">Total Expenses</span>
                                        <span className="text-lg font-bold text-red-900">
                                            ${totalExpenses.toLocaleString()}
                                        </span>
                                    </div>

                                    <div className={`flex justify-between items-center p-4 rounded-lg ${netAmount >= 0 ? 'bg-green-100' : 'bg-red-100'
                                        }`}>
                                        <span className={`text-sm font-semibold ${netAmount >= 0 ? 'text-green-800' : 'text-red-800'
                                            }`}>
                                            {netAmount >= 0 ? 'Money Left Over' : 'Over Budget'}
                                        </span>
                                        <span className={`text-xl font-bold ${netAmount >= 0 ? 'text-green-900' : 'text-red-900'
                                            }`}>
                                            ${Math.abs(netAmount).toLocaleString()}
                                        </span>
                                    </div>

                                    {/* Budget Health Indicator */}
                                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                        <h4 className="text-sm font-semibold text-gray-800 mb-2">Budget Health</h4>
                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full ${netAmount >= 0 ? 'bg-green-500' : 'bg-red-500'
                                                    }`}
                                                style={{
                                                    width: `${Math.min(100, Math.abs(netAmount) / (totalIncome || 1) * 100)}%`
                                                }}
                                            ></div>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2">
                                            {netAmount >= 0
                                                ? `You're saving ${((netAmount / totalIncome) * 100).toFixed(1)}% of your income`
                                                : `You're overspending by ${((Math.abs(netAmount) / totalIncome) * 100).toFixed(1)}%`
                                            }
                                        </p>
                                    </div>

                                    {/* Quick Tips */}
                                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                        <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 Quick Tips</h4>
                                        <ul className="text-xs text-blue-700 space-y-1">
                                            <li>• Try to save at least 20% of your income</li>
                                            <li>• Review your subscriptions monthly</li>
                                            <li>• Set up automatic savings transfers</li>
                                            <li>• Track spending for better accuracy</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Export Modal */}
            {showExportModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Export Budget Data</h3>
                            <button
                                onClick={() => setShowExportModal(false)}
                                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="p-6">
                            <p className="text-sm text-gray-600 mb-6">
                                Choose how you'd like to export your budget data:
                            </p>

                            <div className="space-y-4">
                                <button
                                    onClick={handleExportPDF}
                                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                                >
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z" clipRule="evenodd" />
                                    </svg>
                                    Export as PDF
                                </button>

                                <button
                                    onClick={handleExportJSON}
                                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                                >
                                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
                                    </svg>
                                    Export as JSON
                                </button>
                            </div>
                        </div>

                        <div className="px-6 py-3 bg-gray-50 rounded-b-lg">
                            <button
                                onClick={() => setShowExportModal(false)}
                                className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetTracker;