import React, { useState } from 'react';
import IncomeStep from '../components/survey/IncomeStep';
import ExpenseStep from '../components/survey/ExpenseStep';
import '../components/survey/survey.css';

const SurveyPage = () => {
  const [step, setStep] = useState('income'); // 'income', 'expense', 'complete'
  const [surveyData, setsurveyData] = useState({
    incomes: [], 
    fixedExpenses: [],
    variableExpenses: [],
  });

  const incomeCategories = [
    { id: "salary", name: "월급", placeholderName: "월급" },
    { id: "sideJob", name: "부수입", placeholderName: "알바, 배달 등" },
    { id: "business", name: "사업소득", placeholderName: "사업소득" },
    { id: "investment", name: "투자수익", placeholderName: "주식/코인/배당 등" },
    { id: "etc", name: "기타", placeholderName: "기타" }
  ];
  const expenseCategories = [
    { id: "housing", name: "주거비", placeholderName: "월세, 대출 이자, 관리비 등", type:"fixed" },
    { id: "communication", name: "통신비", placeholderName: "휴대폰, 인터넷", type:"fixed" },
    { id: "insurance", name: "보험료", placeholderName: "실비보험 , 자동차 보험 등", type:"fixed" },
    { id: "subscription", name: "정기 구독료", placeholderName: "넷플릭스, 유튜브, 클라우드 등", type:"fixed" },
    { id: "transport", name: "교통비", placeholderName: "정기권, 주유비, 자동차 할부금", type:"fixed" },
    { id: "education", name: "교육비", placeholderName: "학원비, 수강료 등", type:"fixed" },
    { id: "childcare", name: "육아비", placeholderName: "보육료, 어린이집 등", type:"fixed" },
    { id: "food", name: "식비", placeholderName: "식료품, 외식, 배달 등", type:"variable"},
    { id: "shopping", name: "쇼핑", placeholderName: "의류, 잡화, 온라인쇼핑", type:"variable" },
    { id: "leisure", name: "여가/문화", placeholderName: "영화, 공연, 여행 등", type:"variable" },
    { id: "ceremony", name: "경조사비", placeholderName: "축의금, 부조금 등", type:"variable" },
    { id: "medical", name: "의료비", placeholderName: "병원진료비, 약값 등", type:"variable" },
    { id: "etc", name: "기타", placeholderName: "기타", type:"all" },
  ];

  /**
   * 설문 데이터를 업데이트하는 함수.
   * 이전 상태를 기반으로 새로운 데이터를 병합합니다.
   * @param {object} data - 업데이트할 설문 데이터 객체.
   */
  const updateSurveyData = (data) => {
    setsurveyData((prev) => ({ ...prev, ...data }));
  };

  /**
   * 수입 정보 단계가 완료되었을 때 호출되는 함수.
   * 수입 데이터를 업데이트하고 다음 단계(지출)로 넘어갑니다.
   * @param {object} incomeData - 완료된 수입 데이터.
   */
  const handleIncomeComplete = (incomeData) => {
    updateSurveyData(incomeData);
    setStep('expense');
  };

  /**
   * 지출 정보 단계가 완료되었을 때 호출되는 함수.
   * 지출 데이터를 업데이트하고 최종 설문 데이터를 콘솔에 로깅한 후 설문 완료 단계로 넘어갑니다.
   * @param {object} expenseData - 완료된 지출 데이터.
   */
  const handleExpenseComplete = (expenseData) => {
    const finalData = { ...surveyData, ...expenseData };
    updateSurveyData(expenseData);
    console.log('Final Survey Data:', finalData);
    setStep('complete');
  };

  /**
   * 이전 단계(수입 정보)로 돌아가는 함수.
   */
  const handleBackToIncome = () => {
    setStep('income');
  };

  /**
   * 현재 설문 단계에 따라 적절한 컴포넌트를 렌더링하는 함수.
   * 'income', 'expense', 'complete' 단계에 맞는 UI를 반환합니다.
   * @returns {JSX.Element|null} 현재 단계에 해당하는 컴포넌트 또는 null.
   */
  const renderStep = () => {
    switch (step) {
      case 'income':
        return <IncomeStep data={surveyData} onComplete={handleIncomeComplete} categories={incomeCategories} />;
      case 'expense':
        return (
          <ExpenseStep
            data={surveyData}
            onComplete={handleExpenseComplete}
            onBack={handleBackToIncome}
            categories={expenseCategories}
          />
        );
      case 'complete':
        return (
          <div className="completion-card">
            <h2 className="completion-title">설문이 완료되었습니다!</h2>
            <p className="completion-text">성공적으로 가계부 정보가 저장되었습니다.</p>
            {/* You can add a summary or a link to the results page here */}
          </div>
        );
      default:
        return null;
    }
  };

  /**
   * 현재 설문 단계에 따른 진행률(%)을 반환하는 함수.
   * @returns {number} 현재 진행률 (0, 33, 66, 100 중 하나).
   */
  const getProgress = () => {
    if (step === 'income') return 33;
    if (step === 'expense') return 66;
    if (step === 'complete') return 100;
    return 0;
  };

  return (
    <div className="survey-container">
      <div className="survey-card">
        <div className="progress-container">
          <div className="progress-header">
            <div>
              <span className="progress-badge">
                {step === 'income' ? '수입 정보' : step === 'expense' ? '지출 정보' : '설문 완료'}
              </span>
            </div>
            <div className="text-right">
              <span className="progress-percentage">
                {getProgress()}%
              </span>
            </div>
          </div>
          <div className="progress-bar-background">
            <div
              style={{ width: `${getProgress()}%` }}
              className="progress-bar"
            ></div>
          </div>
        </div>
        <div className="survey-content">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
