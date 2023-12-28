import React, { useState, useEffect } from 'react';

function ImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false); 

    const generateImage = () => {
        if (!prompt.trim()) {
            setErrorMessage('Please enter a prompt for the image to be generated.');
            return;
        }

        setErrorMessage('');
        setIsGenerating(true); // 画像生成開始時にボタンを無効化
        setImage('')
        setIsLoading(true);
        fetch('http://127.0.0.1:5000/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        })
        .then(response => response.json())
        .then(data => {
            setImage('data:image/png;base64,' + data.image);
            setIsLoading(false);
            setIsGenerating(false);
        })
        .catch(error => {
            console.error('Error:', error);
            setIsLoading(false);
            setIsGenerating(false);
        });
    };

    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = image;
        link.download = 'generated-image.png'; // ダウンロードするファイル名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // サイドバーの表示・非表示をトグル
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            const sidebar = document.querySelector('.sidebar');
            if (isSidebarOpen && sidebar && !sidebar.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isSidebarOpen]);

    return (
        <>
            <div className="header-ribbon">
                {/* ハンバーガーメニューSVG */}
                <svg className="hamburger-menu" onClick={toggleSidebar} width="30" height="30" viewBox="0 0 100 80" fill="#fff">
                  <rect y="10" width="100" height="8"></rect>
                  <rect y="40" width="100" height="8"></rect>
                  <rect y="70" width="100" height="8"></rect>
                </svg>
                Muse Mind Draw {/* ヘッダーにアプリ名を表示 */}
            </div>

            {/* サイドバー */}
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <h2>Image Generator</h2>
                {/* 他のサイドバーメニュー項目があればここに */}
            </div>

            <div className="body-content">

                <div className="center-title">
                    AI Image Generator
                </div>
                <input
                    type="text"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="Enter a prompt"
                />
                <button onClick={generateImage} disabled={isGenerating}>Generate Image</button>
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                {isLoading && <div className="loader"></div>}
                {image && (
                    <>
                        <img src={image} alt="Generated" />
                        <button onClick={downloadImage}>Download Image</button>
                    </>
                )}
            </div>
        </>
    );
}

export default ImageGenerator;
