// import React, { useState } from 'react';
// import './DoubleSlider.css'; // Import the CSS file

// function DoubleSlider() {
//   const [minValue, setMinValue] = useState(20);
//   const [maxValue, setMaxValue] = useState(80);

//   const handleMinChange = (event) => {
//     const value = Math.min(Number(event.target.value), maxValue - 1);
//     setMinValue(value);
//   };

//   const handleMaxChange = (event) => {
//     const value = Math.max(Number(event.target.value), minValue + 1);
//     setMaxValue(value);
//   };

//   return (
//     <div className="double-slider-container">
//       <input
//         type="range"
//         min="0"
//         max="100"
//         value={minValue}
//         onChange={handleMinChange}
//         className="slider min"
//       />
//       <input
//         type="range"
//         min="0"
//         max="100"
//         value={maxValue}
//         onChange={handleMaxChange}
//         className="slider max"
//       />
//       <div className="range">
//         <div className="range-value">{minValue}</div>
//         <div className="range-value">{maxValue}</div>
//       </div>
//     </div>
//   );
// }

// export default DoubleSlider;
import React, { useState, useEffect } from 'react';
import './DoubleSlider.css';

function DoubleSlider({ min, max }) {
  const [leftValue, setLeftValue] = useState(min);
  const [rightValue, setRightValue] = useState(max);

  const updateBackground = () => {
    const range = max - min;
    const leftPercentage = ((leftValue - min) / range) * 100;
    const rightPercentage = ((rightValue - min) / range) * 100;

    const slider = document.querySelector('.slider');
    slider.style.background = `linear-gradient(to right, #25daa5 ${leftPercentage}%, #C6C6C6 ${leftPercentage}%, #C6C6C6 ${rightPercentage}%, #25daa5 ${rightPercentage}%)`;
  };

  useEffect(() => {
    updateBackground();
  }, [leftValue, rightValue]);

  return (
    <div className="double-slider">
      <input
        type="range"
        min={min}
        max={max}
        value={leftValue}
        onChange={(e) => setLeftValue(parseInt(e.target.value))}
        className="slider"
        id="leftSlider"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={rightValue}
        onChange={(e) => setRightValue(parseInt(e.target.value))}
        className="slider"
        id="rightSlider"
      />
    </div>
  );
}

export default DoubleSlider;
