import React from 'react';
import './header.css';

export default function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <img src="/images/MoAI.png" alt="로고" className="logo" />
            </div>
            <div className="button-container">
                <button className="btn-header btn-register">
                    등록
                </button>
                <button className="btn-header btn-login">
                    로그인
                </button>
            </div>
        </header>
    );
}
