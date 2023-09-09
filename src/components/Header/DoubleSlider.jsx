// import React, { useState, useEffect } from 'react';
// import './DoubleSlider.css';

// function DoubleSlider({ min, max }) {
//   const [leftValue, setLeftValue] = useState(min);
//   const [rightValue, setRightValue] = useState(max);

//   const updateBackground = () => {
//     const range = max - min;
//     const leftPercentage = ((leftValue - min) / range) * 100;
//     const rightPercentage = ((rightValue - min) / range) * 100;

//     const slider = document.querySelector('.slider');
//     slider.style.background = `linear-gradient(to right, #25daa5 ${leftPercentage}%, #C6C6C6 ${leftPercentage}%, #C6C6C6 ${rightPercentage}%, #25daa5 ${rightPercentage}%)`;
//   };

//   useEffect(() => {
//     updateBackground();
//   }, [leftValue, rightValue]);

//   return (
//     <div className="double-slider">
//       <input
//         type="range"
//         min={min}
//         max={max}
//         value={leftValue}
//         onChange={(e) => setLeftValue(parseInt(e.target.value))}
//         className="slider"
//         id="leftSlider"
//       />
//       <input
//         type="range"
//         min={min}
//         max={max}
//         value={rightValue}
//         onChange={(e) => setRightValue(parseInt(e.target.value))}
//         className="slider"
//         id="rightSlider"
//       />
//     </div>
//   );
// }

// export default DoubleSlider;

import React, { useState, useEffect } from 'react';
import './DoubleSlider.css';

function DoubleSlider({ min, max }) {
  const [leftValue, setLeftValue] = useState(min);
  const [rightValue, setRightValue] = useState(max);

  useEffect(() => {
    // Ensure leftValue is always less than or equal to rightValue
    if (leftValue > rightValue) {
      setLeftValue(rightValue);
    }
    updateBackground();
  }, [leftValue, rightValue]);

  const updateBackground = () => {
    const range = max - min;
    const leftPercentage = ((leftValue - min) / range) * 100;
    const rightPercentage = ((rightValue - min) / range) * 100;

    const slider = document.querySelector('.slider');
    slider.style.background = `linear-gradient(to right, #25daa5 ${leftPercentage}%, #C6C6C6 ${leftPercentage}%, #C6C6C6 ${rightPercentage}%, #25daa5 ${rightPercentage}%)`;
  };

  const handleLeftInputChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (newValue >= min && newValue <= rightValue) {
      setLeftValue(newValue);
    }
  };

  const handleRightInputChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (newValue >= leftValue && newValue <= max) {
      setRightValue(newValue);
    }
  };

  return (
    <div className="range_container">
      <div className="sliders_control">
        <input
          type="range"
          min={min}
          max={max}
          value={leftValue}
          onChange={(e) => setLeftValue(parseInt(e.target.value))}
          className="slider"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={rightValue}
          onChange={(e) => setRightValue(parseInt(e.target.value))}
          className="slider"
        />
      </div>
      <div className="form_control">
        <input
          type="number"
          value={leftValue}
          onChange={handleLeftInputChange}
        />
        <input
          type="number"
          value={rightValue}
          onChange={handleRightInputChange}
        />
      </div>
    </div>
  );
}

export default DoubleSlider;
