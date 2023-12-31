import {
  GladosRandomLinesNumber,
  numberLinesThatAreAlwaysSingular,
  randomLineTimePosition,
  subtitles,
} from "../constants";
import { padNumber } from "../utils";

const checkSpesificCases = ({
  hours,
  minutes,
  seconds,
  halfWayPoint,
  setIsSpeaking,
  setSubtitle,
}) => {
  // If it's the half way point and the timer is greater than 14 seconds, play the half way point sound
  if (hours === 0 && minutes === 0 && seconds === 10) {
    playSpesificLineRandom({
      line: "Glados_Line_10SecondsLeft",
      maxNumber: 13,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (
    hours === halfWayPoint.hours &&
    minutes === halfWayPoint.minutes &&
    seconds === halfWayPoint.seconds
  ) {
    playSpesificLineRandom({
      line: "Glados_Line_HalfWay",
      maxNumber: 3,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  // Chance to play a generic line instead of a spesific line
  const randomNum = Math.floor(Math.random() * 10) + 1;
  if (randomNum <= 2) {
    return false;
  }

  if (hours === 0 && minutes === 5 && seconds === 0) {
    playSpesificLineRandom({
      line: "Glados_Line_5MinutesLeft",
      maxNumber: 3,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 0 && minutes === 2 && seconds === 0) {
    playSpesificLineRandom({
      line: "Glados_Line_2MinutesLeft",
      maxNumber: 3,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  if (hours === 0 && minutes === 1 && seconds === 0) {
    playSpesificLineRandom({
      line: "Glados_Line_1MinuteLeft",
      maxNumber: 3,
      setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return true;
  }

  return false;
};

export const speakOppertunityGlados = ({
  hours,
  minutes,
  seconds,
  halfWayPoint,
  isSpeaking,
  setIsSpeaking,
  isPomodoro,
  pomodoroIsWork,
  setSubtitle,
}) => {
  // If the time equals the half way point, play the half way point sound
  if (isSpeaking) return;

  setIsSpeaking(true);
  const isSpesificCase = checkSpesificCases({
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    halfWayPoint: halfWayPoint,
    setIsSpeaking: setIsSpeaking,
    setSubtitle: setSubtitle,
  });
  if (isSpesificCase) return;

  if (isPomodoro && !pomodoroIsWork) {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    if (randomNum <= 4) {
      playSpesificLineRandom({
        line: "Glados_PomoLine_InRest",
        maxNumber: 3,
        callback: () => setIsSpeaking(false),
      });
      return;
    }
  }

  // Random number 1 to 10
  const randomNum = Math.floor(Math.random() * 10) + 1;

  if (randomNum <= 3) {
    playRandomNumberLine({
      minutes: minutes,
      hours: hours,
      seconds: seconds,
      setSubtitle: setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return;
  }
  if (randomNum <= 8) {
    playSimpleTimeAndRandomLine({
      minutes: minutes,
      hours: hours,
      seconds: seconds,
      setSubtitle: setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return;
  }
  if (randomNum <= 10) {
    justPlayRandomLine({
      setSubtitle: setSubtitle,
      callback: () => setIsSpeaking(false),
    });
    return;
  }
};

export const playStartLineGlados = ({
  setIsSpeaking,
  isSpeaking,
  setSubtitle,
}) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Glados_Line_TimerStart",
    maxNumber: 13,
    setSubtitle,
    callback: () => setIsSpeaking(false),
  });
};

export const playWorkSessionStartLineGlados = ({
  setIsSpeaking,
  isSpeaking,
}) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Glados_PomoLine_WorkStart",
    maxNumber: 8,
    callback: () => setIsSpeaking(false),
  });
};

export const playRestSessionStartLineGlados = ({
  setIsSpeaking,
  isSpeaking,
}) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Glados_PomoLine_RestStart",
    maxNumber: 5,
    callback: () => setIsSpeaking(false),
  });
};

export const playRestSkipLineGlados = ({ setIsSpeaking, isSpeaking }) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Glados_PomoLine_SkipRest",
    maxNumber: 3,
    callback: () => setIsSpeaking(false),
  });
};

export const playEndLineGlados = ({ setIsSpeaking, setSubtitle }) => {
  setIsSpeaking(true);

  playSpesificLineRandom({
    line: "TimeUp_Sound",
    maxNumber: 13,
    callback: () => {
      playSpesificLineRandom({
        line: "Glados_Line_TimeUp",
        maxNumber: 13,
        setSubtitle,
        callback: () => setIsSpeaking(false),
      });
    },
  });
};

export const playPauseLineGlados = ({
  setIsSpeaking,
  isSpeaking,
  setSubtitle,
}) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  const lineNumber = Math.floor(Math.random() * 8) + 1;

  setSubtitle(subtitles["Glados_Line_Pause_" + lineNumber]);
  playSound({
    sound: `Glados_Line_Pause_${lineNumber}`,
    callback: () => setIsSpeaking(false),
  });
};

export const playResumeLineGlados = ({ setIsSpeaking, isSpeaking }) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Glados_Line_Resume",
    maxNumber: 10,
    callback: () => setIsSpeaking(false),
  });
};

export const playWelcomeLineGlados = ({
  setIsSpeaking,
  isSpeaking,
  setSubtitle,
}) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Glados_Line_Welcome",
    maxNumber: 8,
    callback: () => setIsSpeaking(false),
    setSubtitle,
  });
};

export const playSettingsLineGlados = ({ setIsSpeaking, isSpeaking }) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Glados_Line_Settings",
    maxNumber: 3,
    callback: () => setIsSpeaking(false),
  });
};

export const playResetLineGlados = ({
  setIsSpeaking,
  isSpeaking,
  setSubtitle,
}) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Glados_Line_Reset",
    maxNumber: 3,
    setSubtitle,
    callback: () => setIsSpeaking(false),
  });
};

export const playByeLineGlados = ({ setIsSpeaking, isSpeaking }) => {
  if (isSpeaking) return;
  setIsSpeaking(true);
  playSpesificLineRandom({
    line: "Glados_Line_Bye",
    maxNumber: 2,
    callback: () => setIsSpeaking(false),
  });
};

const playSpesificLineRandom = ({ line, maxNumber, setSubtitle, callback }) => {
  // Random number min 1 max maxNumber
  const randomNum = Math.floor(Math.random() * maxNumber) + 1;

  if (setSubtitle) setSubtitle(subtitles[`${line}_${randomNum}`]);

  playSound({
    sound: `${line}_${randomNum}`,
    callback: callback,
  });
};

const createTimeString = ({ hours, minutes, seconds, isSingular }) => {
  let timeString = "";
  if (hours) {
    timeString += hours + (hours == 1 || isSingular ? " hour" : "hours");
  }
  if (hours && (minutes || seconds)) {
    timeString += " and ";
  }
  if (minutes) {
    timeString +=
      minutes + (minutes == 1 || isSingular ? " minute" : " minutes");
  }
  if (minutes && seconds) {
    timeString += " and ";
  }
  if (seconds) {
    timeString +=
      seconds + (seconds == 1 || isSingular ? " second" : " seconds");
  }
  return timeString;
};

const playRandomNumberLine = ({
  minutes,
  hours,
  seconds,
  setSubtitle,
  callback,
}) => {
  // Random number min 1 max 16
  const randomNum = Math.floor(Math.random() * 16) + 1;

  const isSingular = numberLinesThatAreAlwaysSingular.includes(randomNum);

  // Set the subtitle to the random number line with the time in the middle
  setSubtitle(
    subtitles["Glados_NumberLine_Start_" + randomNum] +
      createTimeString({
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        isSingular,
      }) +
      subtitles["Glados_NumberLine_End_" + randomNum]
  );

  // Play the intro sound, on callback play the time sound, on callback play the outro sound
  playIntroSound({
    number: randomNum,
    callback: () =>
      playTimeSound({
        minutes: minutes,
        hours: hours,
        seconds: seconds,
        isSingular: isSingular,
        callback: () =>
          playOutroSound({ number: randomNum, callback: callback }),
      }),
  });
};

const playSimpleTimeAndRandomLine = ({
  minutes,
  hours,
  seconds,
  setSubtitle,
  callback,
}) => {
  const lineNumber = Math.floor(Math.random() * GladosRandomLinesNumber) + 1;

  let playBefore = true;
  if (randomLineTimePosition?.[lineNumber] === "a") {
    playBefore = false;
  } else if (randomLineTimePosition?.[lineNumber] === "e") {
    const randomNum = Math.floor(Math.random() * 2) + 1;
    if (randomNum === 1) {
      playBefore = false;
    }
  }

  if (playBefore) {
    setSubtitle(
      createTimeString({ hours: hours, minutes: minutes, seconds: seconds }) +
        " " +
        subtitles["Glados_Line_Random_" + lineNumber]
    );
  } else {
    setSubtitle(
      subtitles["Glados_Line_Random_" + lineNumber] +
        " " +
        createTimeString({ hours: hours, minutes: minutes, seconds: seconds })
    );
  }

  if (playBefore) {
    playSimpleTime({
      hours: hours,
      minutes: minutes,
      seconds: seconds,
      callback: () => {
        playSound({
          sound: `Glados_Line_Random_${lineNumber}`,
          callback: callback,
        });
      },
    });
  } else {
    playSound({
      sound: `Glados_Line_Random_${lineNumber}`,
      callback: () => {
        playSimpleTime({
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          callback: callback,
        });
      },
    });
  }
};

const justPlayRandomLine = ({ setSubtitle, callback }) => {
  playSpesificLineRandom({
    line: "Glados_Line_Random",
    maxNumber: GladosRandomLinesNumber,
    setSubtitle,
    callback: callback,
  });
};

const playSimpleTime = ({ hours, minutes, seconds, callback }) => {
  // Random number min 1 max 3
  const randomIntroNum = Math.floor(Math.random() * 3) + 1;
  const randomOutroNum = Math.floor(Math.random() * 3) + 1;
  const introSound = `Glados_SimpleTime_Start_${randomIntroNum}`;
  const outroSound = `Glados_SimpleTime_End_${randomOutroNum}`;

  // Play the intro sound, on callback play the minutes sound, on callback play the outro sound
  playSound({
    sound: introSound,
    callback: () =>
      playTimeSound({
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        callback: () => playSound({ sound: outroSound, callback: callback }),
      }),
  });
};

const playTimeUnitSound = ({ num, unit, isContinuing = false, callback }) => {
  // Plays the number of minutes, then the minutes unit sound, then the callback
  playNumberSound(num, () => {
    const unitAudio = new Audio(`SFX/Glados_Number_${unit}.mp3`);
    if (isContinuing) {
      unitAudio.onended = () => {
        playSound({
          sound: "Glados_Number_And",
          callback: callback,
        });
      };
    } else {
      unitAudio.onended = callback; // Call the callback after the unit sound has ended
    }
    unitAudio.play();
  });
};

const playNumberSound = (num, callback) => {
  if (num >= 1 && num <= 19) {
    const audio = new Audio(`SFX/Glados_Number_${padNumber(num)}.mp3`);
    audio.play();
    audio.onended = callback;
  } else {
    let tens = Math.floor(num / 10) * 10;
    let ones = num % 10;

    if (tens !== 0 && ones !== 0) {
      const audio = new Audio(`SFX/Glados_Number_${padNumber(tens)}.mp3`);
      audio.play();
      audio.onended = () => {
        const onesAudio = new Audio(`SFX/Glados_Number_${padNumber(ones)}.mp3`);
        onesAudio.play();
        onesAudio.onended = callback; // Call the callback after ones sound has ended
      };
    } else if (tens !== 0) {
      const audio = new Audio(`SFX/Glados_Number_${padNumber(tens)}.mp3`);
      audio.play();
      audio.onended = callback;
    } else if (ones !== 0) {
      const audio = new Audio(`SFX/Glados_Number_${padNumber(ones)}.mp3`);
      audio.play();
      audio.onended = callback;
    }
  }
};

const playIntroSound = ({ number, callback }) => {
  const introAudio = new Audio(`SFX/Glados_NumberLine_Start_${number}.mp3`);

  introAudio.onerror = () => {
    callback();
  };

  introAudio.onended = callback;

  introAudio.play().catch((error) => {
    callback();
  });
};

const playOutroSound = ({ number, callback }) => {
  // Check if the outro sound exists, if it does play it, if not directly call the callback
  const outroAudio = new Audio(`SFX/Glados_NumberLine_End_${number}.mp3`);

  outroAudio.onerror = () => {
    callback();
  };

  outroAudio.onended = callback;

  outroAudio.play().catch((error) => {
    callback();
  });
};

const playSound = ({ sound, callback }) => {
  // Check if the sound exists, if it does play it, if not directly call the callback
  const audio = new Audio(`SFX/${sound}.mp3`);

  audio.onerror = () => {
    callback();
  };

  audio.onended = callback;

  audio.play().catch((error) => {
    callback();
  });
};

const playTimeSound = ({
  hours,
  minutes,
  seconds,
  isSingular = false,
  callback,
}) => {
  // Plays the number of hours, then minutes, then seconds, then the callback. Play the 'and' sound between each time unit

  if (hours) {
    let hoursString = "Hours";
    if (hours === 1 || isSingular) {
      hoursString = "Hour";
    }

    playTimeUnitSound({
      num: parseInt(hours, 10),
      unit: hoursString,
      isContinuing: (minutes || seconds) && true,
      callback: () => {
        if (minutes) {
          let minutesString = "Minutes";
          if (minutes === 1 || isSingular) {
            minutesString = "Minute";
          }
          playTimeUnitSound({
            num: parseInt(minutes, 10),
            unit: minutesString,
            isContinuing: seconds && true,
            callback: () => {
              if (seconds) {
                let secondsString = "Seconds";
                if (seconds === 1 || isSingular) {
                  secondsString = "Second";
                }
                playTimeUnitSound({
                  num: parseInt(seconds, 10),
                  unit: secondsString,
                  callback: callback,
                });
              } else {
                callback();
              }
            },
          });
        } else if (seconds) {
          let secondsString = "Seconds";
          if (seconds === 1 || isSingular) {
            secondsString = "Second";
          }
          playTimeUnitSound({
            num: parseInt(seconds, 10),
            unit: secondsString,
            callback: callback,
            isContinuing: false,
          });
        } else {
          callback();
        }
      },
    });
  } else if (minutes) {
    let minutesString = "Minutes";
    if (minutes === 1 || isSingular) {
      minutesString = "Minute";
    }
    playTimeUnitSound({
      num: parseInt(minutes, 10),
      unit: minutesString,
      isContinuing: seconds && true,
      callback: () => {
        if (seconds) {
          let secondsString = "Seconds";
          if (seconds === 1 || isSingular) {
            secondsString = "Second";
          }
          playTimeUnitSound({
            num: parseInt(seconds, 10),
            unit: secondsString,
            callback: callback,
          });
        } else {
          callback();
        }
      },
    });
  } else if (seconds) {
    let secondsString = "Seconds";
    if (seconds === 1 || isSingular) {
      secondsString = "Second";
    }
    playTimeUnitSound({
      num: parseInt(seconds, 10),
      unit: secondsString,
      callback: callback,
    });
  } else {
    callback(); // If no time units are specified, directly play the outro
  }
};
