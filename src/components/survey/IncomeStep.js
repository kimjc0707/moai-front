
import React, { useState, useEffect } from 'react';
import ItemListEditor from './ItemListEditor';

const IncomeStep = ({ data, onComplete, categories}) => {
  const [incomes, setincomes] = useState([]);

  /**
   * 컴포넌트가 마운트되거나 `data` prop이 변경될 때 초기 수입 데이터를 설정합니다.
   * `incomes`와 `irincomes`를 `data` prop에서 가져오거나 기본값으로 초기화합니다.
   * `hasIrregularIncome` 상태는 `data.irincomes`의 존재 여부에 따라 결정됩니다.
   */
  useEffect(() => {
    const initialRegular = data.incomes && data.incomes.length > 0
      ? data.incomes
      : [{ id: Date.now(), name: '', amount: '', categoryId: ''}];
    setincomes(initialRegular);
  }, [data]);

  /**
   * '다음' 또는 '지출 입력으로' 버튼 클릭 시 호출되는 함수.
   * 현재 단계가 'regular'이면 'irregular' 단계로 이동하고,
   * 'irregular' 단계이면 최종 수입 데이터를 `onComplete` 콜백을 통해 부모 컴포넌트로 전달합니다.
   * 비정기 수입이 없다고 선택했거나, 항목을 입력하지 않은 경우 빈 배열로 처리합니다.
   */
  const handleNext = () => {
    // 사용자가 '아니오'를 선택했으면 (hasIrregularIncome이 false) null을 전달하여 명시적으로 비정기 수입 없음을 표시
    // 그렇지 않으면 (hasIrregularIncome이 true) 실제 irincomes 배열을 전달 (비어있을 수도 있음)
    onComplete({ incomes});
  };


  return (
    <div className="step-container">
      <h2 className="step-title">수입 정보</h2>

      <div className="step-card">
        <h3 className="step-subtitle">수입</h3>
        <p className="step-description">매달 수입을 입력해주세요.</p>
        <ItemListEditor items={incomes} setItems={setincomes} categories={categories} />
      </div>

      <div className="btn-nav">
        <div />
        <button
          onClick={handleNext}
          className="btn btn-success ml-auto"
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default IncomeStep;

