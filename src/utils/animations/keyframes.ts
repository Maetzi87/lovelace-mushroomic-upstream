import { css } from "lit";

export const mushroomicKeyframes = css`
  /* ALERT – makes any icon blink */
  @keyframes mushic-blink {
    100% { opacity: 0; }
  }
  /* ALERT – makes shape blink */
  @keyframes mushic-ping {
    0%   { box-shadow: 0 0 0 0 rgba(from var(--mushic-final-animation-color) r g b / 0.7); }
    100% { box-shadow: 0 0 5px 7px transparent; }
  }

  /* BATTERY CHARGING ANIMATION – used for mushic:battery-high */
  @keyframes mushic-charge {
    0%  { clip-path: polygon(0% 0%, 0% 100%, 37% 100%, 37% 28%, 65% 28%, 65% 80%, 37% 80%, 37% 100%, 100% 100%, 100% 0%); }
    20% { clip-path: polygon(0% 0%, 0% 100%, 37% 100%, 37% 28%, 65% 28%, 65% 65%, 37% 64%, 37% 100%, 100% 100%, 100% 0%); }
    40% { clip-path: polygon(0% 0%, 0% 100%, 37% 100%, 37% 28%, 65% 28%, 65% 45%, 37% 45%, 37% 100%, 100% 100%, 100% 0%); }
    60% { clip-path: polygon(0% 0%, 0% 100%, 37% 100%, 37% 28%, 65% 28%, 65% 28%, 37% 28%, 37% 100%, 100% 100%, 100% 0%); }
  }
  
  /* SCREEN FLICKER EFFECT */
  @keyframes mushic-flicker { 
    0%   { background: linear-gradient(180deg, rgba(from var(--mushic-final-animation-color) r g b / 0.3) 0%, transparent 30%, transparent 100%);                                   }
    25%  { background: linear-gradient(180deg, transparent 0%, rgba(from var(--mushic-final-animation-color) r g b / 0.3) 25%, transparent 55%, transparent 100%);                  }
    50%  { background: linear-gradient(180deg, transparent 0%, transparent 20%, rgba(from var(--mushic-final-animation-color) r g b / 0.3) 50%, transparent 80%, transparent 100%); }
    75%  { background: linear-gradient(180deg, transparent 0%, transparent 45%, rgba(from var(--mushic-final-animation-color) r g b / 0.3) 75%, transparent 100%);                  }
    100% { background: linear-gradient(180deg, transparent 0%, transparent 70%, rgba(from var(--mushic-final-animation-color) r g b / 0.3) 100%);                                   }
  }
  
  /* HEATING RADIATOR - used for mushic:radiator */
  @keyframes mushic-heat {
   0%        { clip-path: inset(50% 0 0 0); }
   95%, 100% { clip-path: inset(0 0 0 0);   }
  }
  
  /* GLOW EFFEKT - gradient-like shape-animation for any (heating) icon - used for mushic:water-boiler, mushic:water-boiler-auto and mushic:water-heater */
  @keyframes mushic-glow {
    0%  { background: var(--mushic-final-animation-color, red); box-shadow: 0 0 0 0 transparent, 0 0 20px 20px var(--mushic-shape-color, var(--mushic-icon-color)) inset;                          }
    70% { background: var(--mushic-shape-color, var(--mushic-icon-color)); box-shadow: 0 0 5px 7px var(--mushic-final-animation-color, red), 0 0 0px 0px var(--mushic-final-animation-color, red) inset; } 
  }
  
  /* OPENING DOOR – used for mushic:door */
  @keyframes mushic-door {
    0%, 66% { transform: rotateY(0deg);    transform-origin: 30%; }
    33%     { transform: rotateY(-120deg); transform-origin: 30%; }
  }

  /* SEND ANIMATION – used for mushic:access-point */
  @keyframes mushic-send {
    0%   { clip-path: circle(13% at 50% 50%); }
    100% { clip-path: circle(50% at 50% 50%); }
  }
  
  /* RINGING BELL – used for mushic:bell-ring */
  @keyframes mushic-ring {
    0%   { transform: rotate(0);      clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    2%   { transform: rotate(30deg);  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);                                                        }
    6%   { transform: rotate(-28deg); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    10%  { transform: rotate(34deg);  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);                                                        }
    14%  { transform: rotate(-32deg); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    18%  { transform: rotate(30deg);  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);                                                        }
    22%  { transform: rotate(-28deg); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    26%  { transform: rotate(26deg);  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);                                                        }
    30%  { transform: rotate(-24deg); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    34%  { transform: rotate(22deg);  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);                                                        }
    38%  { transform: rotate(-20deg); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    42%  { transform: rotate(18deg);  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);                                                        }
    46%  { transform: rotate(-16deg); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    50%  { transform: rotate(14deg);  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);                                                        }
    54%  { transform: rotate(-12deg); clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    58%  { transform: rotate(10deg);  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);                                                        }
    62%  { transform: rotate(-8deg);  clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
    66%  { transform: rotate(6deg);                                                                                                               }
    70%  { transform: rotate(-4deg);                                                                                                              }
    74%  { transform: rotate(2deg);                                                                                                               }
    78%  { transform: rotate(-1deg);                                                                                                              }
    82%  { transform: rotate(1deg);                                                                                                               }
    86%  { transform: rotate(0);                                                                                                                  }
    100% { transform: rotate(0);      clip-path: polygon(0 50%, 0 100%, 100% 100%, 100% 50%, 85% 50%, 80% 30%, 60% 5%, 40% 5%, 20% 30%, 15% 50%); }
  }
  
  /* ANIMATED VACUUM – used for mushic:robot-vacuum */
  @keyframes mushic-vacuum {
    0%          { transform: translate(0, 0) rotate(0);           }
    5%, 7%      { transform: rotate(-40deg);                      }
    12%, 14%    { transform: rotate(40deg);                       }
    17%, 20%    { transform: translate(0%, 0%) rotate(0);         }
    30%, 39.99% { transform: translate(0%, -125%);                }
    40%         { transform: translate(0%, -125%) rotate(180deg); }
    50%         { transform: translate(0%, 0%) rotate(180deg);    }
    55%, 57%    { transform: rotate(140deg);                      }
    62%, 64%    { transform: rotate(220deg);                      }
    67%, 70%    { transform: rotate(180deg);                      }
    80%, 89.99% { transform: translate(0%, 125%) rotate(180deg);  }
    90%         { transform: translate(0%, 125%) rotate(0);       }
    100%        { transform: translate(0%, 0%) rotate(0);         }
  }

  /* ANIMATED CEILING FAN 1 – WIND - used for mushic:ceiling-fan-wind and mushic:ceiling-fan-wind-variant */
  @keyframes mushic-wind-forward {
    0%        { clip-path: inset(0 0% 30% 0); }
    95%, 100% { clip-path: inset(0 0 0 0);    }
  }
  @keyframes mushic-wind-reverse {
    0%, 5%  { clip-path: inset(0% 0% 0% 0%);  }
    100%    { clip-path: inset(0 0% 30% 0);   }
  }

  /* ANIMATED CEILING FAN 2 – BLADE-ROTATION - used for mushic:ceiling-fan-blades */
  @keyframes mushic-blade-rotation {
    0%  { transform: rotateY(0deg);    }
    25% { transform: rotateY(-90deg);  }
    50% { transform: rotateY(-180deg); }
    75% { transform: rotateY(-90deg);  }
  }

  /* ANIMATED FAN (or whatever) - ROTATION - used for mushic:fan and mushic:washing-machine-drum */
  @keyframes mushic-rotate {
    0%   { transform: rotate(0deg);   }
    100% { transform: rotate(360deg); }
  }
  
  /* ANIMATED WASHING MACHINE 1 - SHAKE - used for mushic:washing-machine-* */
  @keyframes mushic-shake {
    0%, 100% { transform: translate(0, 0)           rotate(0);     }
    20%      { transform: translate(0.4px, -0.4px)  rotate(-4deg); }
    40%      { transform: translate(-0.4px, 0.4px)  rotate(4deg);  }
    60%      { transform: translate(0.4px, 0.4px)   rotate(-4deg); }
    80%      { transform: translate(-0.4px, -0.4px) rotate(4deg);  }
  }
  /* ANIMATED WASHING MACHINE 2 - BUBBLE - used for mushic:washing-machine-wash */
  @keyframes mushic-bubble {
    0%, 100%  { clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 34% 74%, 28% 63%, 31% 47%, 43% 37%, 65% 40%, 73% 61%, 63% 77%, 47% 81%, 34% 74%, 35% 100%, 100% 100%, 100% 0%);                            }
    12.5%     { clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 34% 74%, 27% 60%, 33% 46%, 40% 50%, 48% 61%, 58% 56%, 51% 42%, 64% 40%, 74% 61%, 63% 77%, 47% 81%, 34% 74%, 35% 100%, 100% 100%, 100% 0%); }
    25%       { clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 34% 74%, 27% 60%, 33% 46%, 40% 50%, 48% 61%, 58% 56%, 60% 51%, 69% 47%, 74% 61%, 63% 77%, 47% 81%, 34% 74%, 35% 100%, 100% 100%, 100% 0%); }
    37.5%     { clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 34% 74%, 27% 60%, 33% 46%, 40% 50%, 48% 61%, 58% 56%, 64% 59%, 71% 56%, 72% 66%, 63% 77%, 47% 81%, 34% 74%, 35% 100%, 100% 100%, 100% 0%); }
    50%       { clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 34% 74%, 27% 60%, 34% 60%, 43% 57%, 48% 61%, 58% 56%, 64% 59%, 71% 56%, 72% 66%, 63% 77%, 47% 81%, 34% 74%, 35% 100%, 100% 100%, 100% 0%); }
    62.5%     { clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 34% 74%, 27% 60%, 34% 60%, 43% 57%, 46% 46%, 52% 47%, 63% 58%, 71% 56%, 72% 66%, 63% 77%, 47% 81%, 34% 74%, 35% 100%, 100% 100%, 100% 0%); }
    75%       { clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 34% 74%, 27% 60%, 34% 60%, 43% 57%, 46% 46%, 52% 47%, 58% 53%, 67% 46%, 73% 62%, 63% 77%, 47% 81%, 34% 74%, 35% 100%, 100% 100%, 100% 0%); }
    87.5%     { clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 34% 74%, 27% 60%, 33% 46%, 45% 40%, 57% 52%, 67% 47%, 74% 61%, 63% 77%, 47% 81%, 34% 74%, 35% 100%, 100% 100%, 100% 0%);                   }
  }
  
  /* ANIMATED WASHING MACHINE 3 - WASH - used for mushic:washing-machine-drum-full */
  @keyframes mushic-wash {
    0%, 100%   { clip-path: polygon(100% 100%, 20% 100%, 20% 66.5%, 23.33% 65.96%, 26.67% 64.5%, 30% 62.5%, 33.33% 60.5%, 36.67% 59.04%, 40% 58.5%, 43.33% 59.04%, 46.67% 60.5%, 50% 62.5%, 53.33% 64.5%, 56.67% 65.96%, 60% 66.5%, 63.33% 65.96%, 66.67% 64.5%, 70% 62.5%, 73.33% 60.5%, 76.67% 59.04%, 80% 58.5%, 83.33% 59.04%, 86.67% 60.5%, 90% 62.5%, 93.33% 64.5%, 96.67% 65.96%, 100% 66.5%, 100% 65.96%, 100% 64.5%, 100% 62.5%, 100% 60.5%, 100% 59.04%, 100% 58.5%); }
    50%        { clip-path: polygon(80% 100%, 0% 100%, 0% 66.5%, 0% 65.96%, 0% 64.5%, 0% 62.5%, 0% 60.5%, 0% 59.04%, 0% 58.5%, 3.33% 59.04%, 6.67% 60.5%, 10% 62.5%, 13.33% 64.5%, 16.67% 65.96%, 20% 66.5%, 23.33% 65.96%, 26.67% 64.5%, 30% 62.5%, 33.33% 60.5%, 36.67% 59.04%, 40% 58.5%, 43.33% 59.04%, 46.67% 60.5%, 50% 62.5%, 53.33% 64.5%, 56.67% 65.96%, 60% 66.5%, 63.33% 65.96%, 66.67% 64.5%, 70% 62.5%, 73.33% 60.5%, 76.67% 59.04%, 80% 58.5%); }
  }
  
  /* ANIMATED WASHING MACHINE 4 - RINSE - used for mushic:washing-machine-rinse */
  @keyframes mushic-rinse {
    50%  { clip-path: polygon(0% 100%, 28% 100%, 28% 51%, 36% 40%, 64% 40%, 74% 56.67%, 67.5% 75%, 36% 75%, 28% 58.33%, 28% 100%, 100% 100%, 100% 0%, 0% 0%); }
  }
  /* ANIMATED WASHING MACHINE 5 - DRY - used for mushic:tumble-dryer */
  @keyframes mushic-dry {
    50%  { clip-path: polygon(0% 100%, 28% 100%, 28% 51%, 36% 40%, 64% 40%, 74% 56.67%, 67.5% 75%, 36% 75%, 28% 58.33%, 28% 100%, 100% 100%, 100% 0%, 0% 0%); }
    100% { clip-path: polygon(0% 100%, 28% 100%, 28% 51%, 36% 40%, 64% 40%, 64% 40%, 64% 40%, 36% 40%, 28% 58.33%, 28% 100%, 100% 100%, 100% 0%, 0% 0%);      }
  }
  
  /* ANIMATED DISHWASHER - used for mushic:dishwasher */
  @keyframes mushic-bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0);                    } 
    40%                     { transform: translateY(-1.2px) rotate(5deg);  } 
    60%                     { transform: translateY(-1.1px) rotate(-4deg); } 
  } 
  @keyframes mushic-dishwash {
    0%, 100% { clip-path: polygon(0% 0%, 0% 100%, 26.67% 100%, 26.67% 59.13%, 46.89% 36.62%, 26.67% 50.57%, 71% 69%, 63.38% 36.62%, 26.67% 59.13%, 26.67% 100%, 100% 100%, 100% 0%); }
    50%      { clip-path: polygon(0 0, 0 100%, 35% 100%, 36% 74%, 31% 43%, 61% 40%, 71% 69%, 62% 78%, 36% 73%, 35% 100%, 100% 100%, 100% 0);                                         }
 }

 /* COURIOUS DOG - used for mushic:frenchie */
 @keyframes mushic-huh {
    0%, 10%, 75%, 100% { transform: rotate(0deg);   }
    15%                { transform: rotate(-25deg); }
    30%, 35%           { transform: rotate(-35deg); }
    50%                { transform: rotate(12deg);  }
    65%                { transform: rotate(-8deg);  }
 }

 /* AIR-ANIMATION - used for mushic:air-freshener and mushic:air-freshener-variant */
 @keyframes mushic-air {
    100% { clip-path: inset(0% 0 0 0);  }
    50%  { clip-path: inset(35% 0 0 0); }
 }

/* ANIMATED PURIFIER - used for mushic:air-purifier */
 @keyframes mushic-purify {
    0%, 100% { clip-path: inset(0 0 0 0);                                                                }
    25%      { clip-path: polygon(100% 100%, 0 100%, 0 0, 100% 0, 98% 32%, 63% 42%, 65% 58%, 100% 43%);  }
    75%      { clip-path: polygon(100% 100%, 0 100%, 0 0, 100% 0, 100% 44%, 64% 61%, 64% 73%, 100% 72%); }
    50%      { clip-path: polygon(100% 100%, 0 100%, 0 0, 100% 0, 78% 38%, 64% 43%, 64% 72%, 100% 73%);  }
 }
 
 /* SIGNAL-ANIMATION - used for mushic:wifi */
 @keyframes mushic-good-signal {
    0%  { clip-path: circle(0% at 50% 85%);  }
    20% { clip-path: circle(30% at 50% 85%); }
    40% { clip-path: circle(55% at 50% 85%); }
    60% { clip-path: circle(80% at 50% 85%); }
 }
 @keyframes mushic-ok-signal {
    0%  { clip-path: circle(0% at 50% 85%);  }
    20% { clip-path: circle(30% at 50% 85%); }
    40% { clip-path: circle(55% at 50% 85%); }
 }
 @keyframes mushic-low-signal {
    0%  { clip-path: circle(0% at 50% 85%);  }
    20% { clip-path: circle(30% at 50% 85%); }
 }
 
 /* ANIMATED PRINTER 1 - used for mushic:printer */
 @keyframes mushic-print {
    3%, 31%   { clip-path: polygon(30% 32%, 30% 0%, 0% 0%, 0% 100%, 100% 100%, 100% 0%, 70% 0%, 70% 32%);                                                                           }
    32%, 39%  { clip-path: polygon(0% 0%, 0% 100%, 30% 100%, 30% 15%, 70% 15%, 70% 32%, 30% 32%, 30% 100%, 100% 100%, 100% 0%);                                                     }
    40%, 48%  { clip-path: polygon(0% 0%, 0% 100%, 30% 100%, 30% 19%, 70% 19%, 70% 32%, 30% 32%, 30% 100%, 100% 100%, 100% 0%);                                                     }
    49%, 56%  { clip-path: polygon(0% 0%, 0% 100%, 30% 100%, 30% 23%, 70% 23%, 70% 32%, 30% 32%, 30% 100%, 100% 100%, 100% 0%);                                                     }
    57%, 64%  { clip-path: polygon(0% 0%, 0% 100%, 33.4% 100%, 33.4% 27%, 70% 27%, 70% 30%, 33.4% 30%, 33.4% 78%, 66.6% 78%, 66.6% 81%, 33.4% 81%, 33.4% 100%, 100% 100%, 100% 0%); }
    65%, 100% { clip-path: polygon(0% 0%, 0% 100%, 33.4% 100%, 33.4% 78%, 66.6% 78%, 66.6% 90%, 33.4% 90%, 33.4% 100%, 100% 100%, 100% 0%);                                         }
}
/* ANIMATED PRINTER 2 - used for mushic:paper */
@keyframes mushic-paper {
    0%, 2%    { clip-path: inset(100% 0 0 0);}
    3%, 7%    { transform: translateY(-10%); clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 35% 15%, 65% 15%, 65% 60%, 35% 60%, 3% 100%, 100% 100%, 100% 0%); }
    8%, 15%   { transform: translateY(-6%);  clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 35% 15%, 65% 15%, 65% 60%, 35% 60%, 3% 100%, 100% 100%, 100% 0%); }
    16%, 23%  { transform: translateY(-2%);  clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 35% 15%, 65% 15%, 65% 40%, 35% 40%, 3% 100%, 100% 100%, 100% 0%); }
    24%, 31%  { transform: translateY(2%);   clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 35% 15%, 65% 15%, 65% 40%, 35% 40%, 3% 100%, 100% 100%, 100% 0%); }
    32%, 39%  { transform: translateY(6%);   clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 35% 15%, 65% 15%, 65% 40%, 35% 40%, 3% 100%, 100% 100%, 100% 0%); }
    40%, 48%  { transform: translateY(10%);  clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 35% 15%, 65% 15%, 65% 40%, 35% 40%, 3% 100%, 100% 100%, 100% 0%); }
    49%, 56%  { transform: translateY(14%);                                                                                                                 }
    57%, 64%  { transform: translateY(18%);                                                                                                                 }
    65%, 72%  { transform: translateY(22%);                                                                                                                 }
    73%, 80%  { transform: translateY(26%);                                                                                                                 }
    81%, 100% { transform: translateY(30%);                                                                                                                 }
}

`;
