
import { Sine, TweenMax } from 'gsap';
import { useRef, useState } from 'react';
import SlotCounter, { SlotCounterRef } from 'react-slot-counter';
import Snowfall from 'react-snowfall';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function App() {
  const counter1Ref = useRef<SlotCounterRef>(null);
  const counter2Ref = useRef<SlotCounterRef>(null);
  const counter3Ref = useRef<SlotCounterRef>(null);
  const counter4Ref = useRef<SlotCounterRef>(null);
  const headRef = useRef<SVGEllipseElement>(null);
  const stickRef = useRef<SVGRectElement>(null);
  const holeRef = useRef<SVGEllipseElement>(null);
  const [value, setValue] = useState<string>('0000')
  const [showCoins, setShowCoins] = useState<boolean>(false)
  const [rollCounter1, setRollCounter1] = useState<boolean>(false)
  const [rollCounter2, setRollCounter2] = useState<boolean>(false)
  const [rollCounter3, setRollCounter3] = useState<boolean>(false)
  const [rollCounter4, setRollCounter4] = useState<boolean>(false)

  function slotTriggerMove() {
    const head = headRef.current;
    const stick = stickRef.current;
    const hole = holeRef.current;

    TweenMax.set([head, stick, hole], { y: 0, scale: 1 });
    TweenMax.to(head, .4, { y: 70, repeat: 1, yoyo: true, ease: Sine.easeIn });
    TweenMax.to(stick, .4, { y: 14, scaleY: .3, transformOrigin: "50% 100%", repeat: 1, yoyo: true, ease: Sine.easeIn });
    TweenMax.to(hole, .4, { y: 10, scaleY: 2, repeat: 1, yoyo: true, ease: Sine.easeIn });
  }

  const getRandomNumber = async() => {
    setShowCoins(false)
    slotTriggerMove()
    const res: {numeroParticipantes: string, numeroSorteado: string} = await fetch('https://s1n1.squidchat.digital/api/v1/tailandia/sorteios/resultado', {method: 'GET'}).then(T => T.json())

    setValue(res.numeroSorteado)
    await rollSlots()
  }

  const rollSlots = async () => {
    setRollCounter1(true)
    await delay(100)
    counter1Ref.current?.startAnimation({direction: 'bottom-up'})
    await delay(15000)
    
    setRollCounter2(true)
    await delay(100)
    counter2Ref.current?.startAnimation({direction: 'bottom-up'})
    await delay(15000)
    
    setRollCounter3(true)
    await delay(100)
    counter3Ref.current?.startAnimation({direction: 'bottom-up'})
    await delay(15000)
    
    setRollCounter4(true)
    await delay(100)
    counter4Ref.current?.startAnimation({direction: 'bottom-up'})
    await delay(45000)

    const audio = new Audio('sound.mp3')
  
    setShowCoins(true)
    audio.play()
  };
  

  const coin = document.createElement('img')
  coin.src = 'dollar.png'

  return (
    <>
      {showCoins ? <Snowfall images={[coin]} radius={[30, 30]} speed={[5, 10]} wind={undefined}/> : null}
      <div className="container body" id="root2">
        <div className={showCoins ? "slot pulse-effect" : "slot"}>
          <div className="base-machine">
            <div className="base-frame">
              <SlotCounter charClassName='char char1' valueClassName='val' value={rollCounter1 ? value[0] : 0} ref={counter1Ref} duration={15} autoAnimationStart={false} hasInfiniteList={true} animateUnchanged={false} dummyCharacterCount={100}/>
               <SlotCounter charClassName='char char2' valueClassName='val' value={rollCounter2 ? value[1] : 0} ref={counter2Ref} duration={15} autoAnimationStart={false} hasInfiniteList={true} animateUnchanged={false} dummyCharacterCount={100}/>
               <SlotCounter charClassName='char' valueClassName='val' value={rollCounter3 ? value[2] : 0} ref={counter3Ref} duration={15} autoAnimationStart={false} hasInfiniteList={true} animateUnchanged={false} dummyCharacterCount={100}/>
              <SlotCounter charClassName='char' valueClassName='val' value={rollCounter4 ? value[3] : 0} ref={counter4Ref} duration={45} autoAnimationStart={false} hasInfiniteList={true} animateUnchanged={false} dummyCharacterCount={1000}/>
            </div>
          </div>
          <div id="slot-trigger" onClick={getRandomNumber}>
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
      <img src="logo.png" alt="" className="logo"/>
    </>
  );
}

export default App