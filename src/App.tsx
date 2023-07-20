
import { Sine, TweenMax } from 'gsap';
import { useRef } from 'react';
import SlotCounter, { SlotCounterRef } from 'react-slot-counter';

function App() {
  const counterRef = useRef<SlotCounterRef>(null);
  const headRef = useRef<SVGEllipseElement>(null);
  const stickRef = useRef<SVGRectElement>(null);
  const holeRef = useRef<SVGEllipseElement>(null);

  const handleStartClick = () => {
    counterRef.current?.startAnimation();
    slotTriggerMove()
  };

  function slotTriggerMove() {
    const head = headRef.current;
    const stick = stickRef.current;
    const hole = holeRef.current;

    TweenMax.set([head, stick, hole], { y: 0, scale: 1 });
    TweenMax.to(head, .4, { y: 70, repeat: 1, yoyo: true, ease: Sine.easeIn });
    TweenMax.to(stick, .4, { y: 14, scaleY: .3, transformOrigin: "50% 100%", repeat: 1, yoyo: true, ease: Sine.easeIn });
    TweenMax.to(hole, .4, { y: 10, scaleY: 2, repeat: 1, yoyo: true, ease: Sine.easeIn });
  }

  const generateDummy = () => ['🎰', '🍉', '🍒', '🍍', '🎲', '🍋', '🍀']
  // Array.from({length: 100}, (_, index) => index.toString())
  // ['🎰', '🍉', '🍒', '🍍', '🎲', '🍋', '🍀']

  return (
    <>
      <div className="container">
        <div className="slot">
          <div className="base-machine">
            <div className="base-frame">
              <SlotCounter charClassName='char' valueClassName='val' value={123} ref={counterRef} duration={3} dummyCharacterCount={100} dummyCharacters={generateDummy()} hasInfiniteList/>
            </div>
          </div>
          <div id="slot-trigger" onClick={handleStartClick}>
            <svg id="trigger" xmlns="http://www.w3.org/2000/svg" width="35" height="143.6" viewBox="0 0 35 143.6" >
              <defs>
                <linearGradient id="linear-gradient" x1="6.21" y1="143.63" x2="6.21" y2="67.37" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#191d2e" />
                  <stop offset="0.1" stopColor="#191d2e" />
                  <stop offset="0.6" stopColor="#e6ded1" />
                  <stop offset="0.8" stopColor="#e6ded1" />
                  <stop offset="1" stopColor="#e6ded1" />
                </linearGradient>
                <linearGradient id="linear-gradient-2" x1="23.71" y1="127.98" x2="23.71" y2="83.01" />
                <linearGradient id="linear-gradient-3" x1="20.46" y1="55.66" x2="25.41" y2="55.66" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#c0a472" />
                  <stop offset="0.1" stopColor="#c0a472" />
                  <stop offset="0.6" stopColor="#e6ded1" />
                  <stop offset="0.8" stopColor="#e6ded1" />
                  <stop offset="1" stopColor="#e6ded1" />
                </linearGradient>
                <radialGradient id="radial-gradient" cx="23.05" cy="12.33" fx="31.426365772510508" r="12.04" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#f9fffb" />
                  <stop offset="0.001" stopColor="#f9fffb" />
                  <stop offset="1" stopColor="#525053" />
                </radialGradient>
              </defs>
              <path id="ring1" d="M0,67.4H7.3a5.1,5.1,0,0,1,5.1,5.1v66.1a5.1,5.1,0,0,1-5.1,5.1H0a0,0,0,0,1,0,0V67.4A0,0,0,0,1,0,67.4Z" fill="url(#linear-gradient)" />
              <path id="ring2" d="M12.4,83H29.7A5.3,5.3,0,0,1,35,88.3v34.4a5.3,5.3,0,0,1-5.3,5.3H12.4a0,0,0,0,1,0,0V83A0,0,0,0,1,12.4,83Z" fill="url(#linear-gradient)" />
              <ellipse id="hole" cx="22.9" cy="88.6" rx="5.9" ry="2.2" fill="#3f3f3f" ref={holeRef} />
              <rect id="stick" x="20.5" y="22.2" width="5" height="66.88" fill="url(#linear-gradient-3)" ref={stickRef} />
              <ellipse id="head" cx="22.9" cy="11.3" rx="11.2" ry="11.3" fill="url(#radial-gradient)" ref={headRef} />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default App