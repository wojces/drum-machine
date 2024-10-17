function DrumMachine() {
  const { useState, useEffect } = React

  const [power, setPower] = useState(true)
  const [volume, setVolume] = useState(0.5)
  const [display, setDisplay] = useState('')

  const playSound = (key) => {
    if (!power) return;

    const audioElement = document.getElementById(key);
    audioElement.volume = volume;
    audioElement.currentTime = 0;
    audioElement.play();

    //Add active class to pad
    const element = document.getElementById(`drum-${key}`)
    element.classList.add('pad-active')
    setTimeout(() => element.classList.remove('pad-active'), 200)

    //Put text into text field
    const [text] = sounds.filter(sound => sound.key === key)
    setDisplay(text.name)
  }

  const handleKeyPress = (event) => {
    const key = event.key.toUpperCase();
    if (['Q', 'W', "E", "A", "S", "D", "Z", "X", "C"].includes(key)) {
      playSound(key)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [volume, power])

  return (
    <div id="drum-machine" className="container vh-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div id="display" className="col-8 p-0">
          <div className="row h-100 p-0 m-0">
            <div className="col-7 p-0 pad-container">
              <div className="row pad-box">
                <div className="drum-pad" id="drum-Q" onClick={() => playSound('Q')}>
                  <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-1.mp3" id="Q" className="clip"></audio>
                  Q</div>
                <div className="drum-pad" id="drum-W" onClick={() => playSound('W')}>
                  <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-2.mp3" id="W" className="clip"></audio>
                  W
                </div>
                <div className="drum-pad" id="drum-E" onClick={() => playSound('E')}>
                  <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-3.mp3" id="E" className="clip"></audio>
                  E</div>
              </div>
              <div className="row pad-box" >
                <div className="drum-pad" id="drum-A" onClick={() => playSound('A')}>
                  <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-4_1.mp3"
                    id="A" className="clip" ></audio>
                  A</div>
                <div className="drum-pad" id="drum-S" onClick={() => playSound('S')}>
                  <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Heater-6.mp3" id="S" className="clip"></audio>
                  S</div>
                <div className="drum-pad" id="drum-D" onClick={() => playSound('D')}>
                  <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Dsc_Oh.mp3" id="D" className="clip"></audio>
                  D</div>
              </div>
              <div className="row pad-box" >
                <div className="drum-pad" id="drum-Z" onClick={() => playSound('Z')}>
                  <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Kick_n_Hat.mp3" id="Z" className="clip"></audio>
                  Z</div>
                <div className="drum-pad" id="drum-X" onClick={() => playSound('X')}>
                  <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/RP4_KICK_1.mp3" id="X" className="clip"></audio>
                  X</div>
                <div className="drum-pad" id="drum-C" onClick={() => playSound('C')}>
                  <audio src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/Cev_H2.mp3" id="C" className="clip"></audio>
                  C</div>
              </div>
            </div>
            <div className="col-5 p-0">
              <div className="row manage">
                <div
                  className="form-check form-switch d-flex justify-content-center">
                  <label
                    className="form-check-label me-5 fw-bold"
                    htmlFor="powerSwitch">
                    Power
                  </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="powerSwitch"
                    checked={power}
                    onChange={() => {
                      setPower(!power)
                      setDisplay('')
                    }}
                  />
                </div>
              </div>
              <div className="row manage">
                <div className="text-field">{display}</div>
              </div>
              <div className="row manage">
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="1"
                  step="0.05"
                  id="volumeRange"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ReactDOM.render(<DrumMachine />, document.querySelector('#drum-wrapper'))


const sounds = [
  {
    key: 'Q',
    name: 'Heater 1'
  },
  {
    key: 'W',
    name: 'Heater 2'
  },
  {
    key: 'E',
    name: 'Heater 3'
  },
  {
    key: 'A',
    name: 'Heater 4'
  },
  {
    key: 'S',
    name: 'Clap'
  },
  {
    key: 'D',
    name: 'Open-HH'
  },
  {
    key: 'Z',
    name: "Kick-n'-Hat"
  },
  {
    key: 'X',
    name: 'Kick'
  },
  {
    key: 'C',
    name: 'Closed-HH'
  }
]