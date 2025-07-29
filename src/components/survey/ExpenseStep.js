import React, { useState, useEffect } from 'react';
import ItemListEditor from './ItemListEditor';

const ExpenseStep = ({ data, onComplete, onBack, categories }) => {
  const [step, setStep] = useState('fixed'); // 'fixed', 'variable'
  const [fixedExpenses, setFixedExpenses] = useState([]);
  const [variableExpenses, setVariableExpenses] = useState([]);
  const fixedCategories = categories.filter((c) => c.type !== 'variable');
  const variableCategories = categories.filter((c) => c.type !== 'fixed');
  /**
   * 컴포넌트가 마운트되거나 `data` prop이 변경될 때 초기 지출 데이터를 설정합니다.
   * `fixedExpenses`와 `variableExpenses`를 `data` prop에서 가져오거나 기본값으로 초기화합니다.
   */
  useEffect(() => {
    const initialFixed = data.fixedExpenses && data.fixedExpenses.length > 0
        ? data.fixedExpenses
        : [{ id: Date.now(), name: '', amount: '', categoryId: '' }];
    setFixedExpenses(initialFixed);
    
    const initialVariable = data.variableExpenses && data.variableExpenses.length > 0
    ? data.variableExpenses
    : [{ id: Date.now(), name: '', amount: '', categoryId: '' }];
    setVariableExpenses(initialVariable);
  }, [data]);

  /**
   * 고정 지출 질문을 다음 질문으로 넘기거나, 모든 고정 지출 질문이 완료되면 변동 지출 단계로 넘어갑니다.
   */
  const moveToVariable = () => {
    setStep('variable');
  };

  /**
   * '다음' 또는 '설문 완료' 버튼 클릭 시 호출되는 함수.
   * 현재 단계가 'fixed'이면 다음 고정 지출 질문으로 넘어가거나 변동 지출 단계로 이동하고,
   * 'variable' 단계이면 최종 지출 데이터를 `onComplete` 콜백을 통해 부모 컴포넌트로 전달합니다.
   */
  const handleNext = () => {
    if (step === 'fixed') 
        moveToVariable();
    else 
      onComplete({ fixedExpenses, variableExpenses });
  };

  /**
   * '이전' 버튼 클릭 시 호출되는 함수.
   * 현재 단계가 'variable'이면 'fixed' 단계로 돌아가고,
   * 'fixed' 단계이면 이전 고정 지출 질문으로 돌아가거나, 더 이상 이전 질문이 없으면 `onBack` 콜백을 호출합니다.
   */
  const handleBack = () => {
    if (step === 'variable') 
      setStep('fixed');
    else 
      onBack();
  };

  return (
    <div className="step-container">
      <h2 className="step-title">지출 정보</h2>

      {step === 'fixed' ? (
        <div className="step-card">
          <h3 className="step-subtitle">고정 지출</h3>
          <p className="step-description">매달 고정 지출 항목을 입력해주세요.</p>
          <ItemListEditor
                items={fixedExpenses}
                setItems={setFixedExpenses}
                placeholderName="예: SKT, 인터넷"
                categories={fixedCategories}
              />
        </div>
      ) : (
        <div className="step-card">
          <h3 className="step-subtitle">변동 지출</h3>
           <p className="step-description">매달 변동적인 지출 항목을 입력해주세요.</p>
          <ItemListEditor 
              items={variableExpenses} 
              setItems={setVariableExpenses} 
              placeholderName="예: 외식, 쇼핑"
              categories={variableCategories}
            />
        </div>
      )}

      <div className="btn-nav">
        <button
          onClick={handleBack}
          className="btn btn-secondary"
        >
          이전
        </button>
        <button
          onClick={handleNext}
          className="btn btn-success ml-auto"
        >
          {step === 'variable' ? '설문 완료' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default ExpenseStep;
