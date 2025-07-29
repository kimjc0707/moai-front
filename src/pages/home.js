import React from 'react';

export default function Home() {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gray-50">
            <div className="w-full sm:w-96 h-56 border rounded-2xl shadow p-8 hover:shadow-xl transition bg-white">
                <h2 className="text-2xl font-bold mb-3">예산 이름</h2>
                <p className="text-base text-gray-700 mb-4">상세 설명이 여기에 들어갑니다.</p>
                <button className="text-blue-600 hover:underline">자세히 보기 →</button>
            </div>
        </div>
    );
}