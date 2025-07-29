import React, { useState, useEffect } from 'react';

const ItemListEditor = ({ items, setItems, categories }) => {

  let newItems = items.map((item) => (
      { ...item, placeholderName: item.categoryId === '' 
        ? categories[0].name 
        : categories.filter((c) => c.id === item.categoryId)[0].name } 
      ));

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), name: '', amount: '', categoryId: ''}]);
  };

  const handleUpdateItem = (id, field, value) => {
    if (field === 'amount')
      value = Number(value.replace(/,/g, ''));

    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };
  
  const handleRemoveItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };
  
  const handleUpdateCategory = (id, categoryId) => {
    handleUpdateItem(id, 'categoryId', categoryId);
  };

  const amoutWithComma = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }


  return (
    <div className="item-list-editor">
      {newItems.map((item) => (
        <div key={item.id} className="item-row">
          <select 
          className="category-select"
          onChange={(e) => handleUpdateCategory(item.id, e.target.value)}
          >
            {categories.map((c)=> (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder={item.placeholderName}
            value={item.name}
            onInput={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
            className="item-input"
          />
          <input
            type="text"
            placeholder="금액"
            value={amoutWithComma(item.amount)}
            onChange={(e) => handleUpdateItem(item.id, 'amount', e.target.value)}
            className="item-input item-input-amount"
          />
          <button
            onClick={() => handleRemoveItem(item.id)}
            disabled={items.length <= 1}
            className="btn-remove-item"
          >
            삭제
          </button>
        </div>
      ))}
      <button
        onClick={handleAddItem}
        className="btn-add-item"
      >
        + 항목 추가
      </button>
    </div>
  );
};

export default ItemListEditor;

