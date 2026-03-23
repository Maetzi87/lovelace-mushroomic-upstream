import { css } from "lit";

export const mushroomKeyframes = css`
  /* ALERT – makes any icon blink */
  @keyframes blink {
    100% { opacity: 0; }
  }

  /* BATTERY CHARGING ANIMATION – use with mdi:battery-high */
  @keyframes charge {
    0%  { clip-path: polygon(0% 0%, 0% 100%, 37% 100%, 37% 28%, 65% 28%, 65% 80%, 37% 80%, 37% 100%, 100% 100%, 100% 0%); }
    20% { clip-path: polygon(0% 0%, 0% 100%, 37% 100%, 37% 28%, 65% 28%, 65% 65%, 37% 64%, 37% 100%, 100% 100%, 100% 0%); }
    40% { clip-path: polygon(0% 0%, 0% 100%, 37% 100%, 37% 28%, 65% 28%, 65% 45%, 37% 45%, 37% 100%, 100% 100%, 100% 0%); }
    60% { clip-path: polygon(0% 0%, 0% 100%, 37% 100%, 37% 28%, 65% 28%, 65% 28%, 37% 28%, 37% 100%, 100% 100%, 100% 0%); }
  }
  
  /* SCREEN FLICKER EFFECT - use with :before-element and content:""; - adjust width, height and margin to your needs */
  @keyframes flicker { 
    0%   { background: linear-gradient(180deg, rgba(166, 40, 235, 0.3) 0%, transparent 30%, transparent 100%);                                   }
    25%  { background: linear-gradient(180deg, transparent 0%, rgba(166, 40, 235, 0.3) 25%, transparent 55%, transparent 100%);                  }
    50%  { background: linear-gradient(180deg, transparent 0%, transparent 20%, rgba(166, 40, 235, 0.3) 50%, transparent 80%, transparent 100%); }
    75%  { background: linear-gradient(180deg, transparent 0%, transparent 45%, rgba(166, 40, 235, 0.3) 75%, transparent 100%);                  }
    100% { background: linear-gradient(180deg, transparent 0%, transparent 70%, rgba(166, 40, 235, 0.3) 100%);                                   }
  }
  
  /* HEATING RADIATOR - use with mdi:radiator */
  @keyframes heat {
   0%        { clip-path: inset(50% 0 0 0); }
   95%, 100% { clip-path: inset(0 0 0 0);   }
  }
  
  /* OPENING DOOR – use with mdi:door */
  @keyframes open {
    0%, 66% { transform: rotateY(0deg);    }
    33%     { transform: rotateY(-120deg); }
  }

  /* SEND ANIMATION – use with mdi:access-point */
  @keyframes send {
    0%   { clip-path: circle(13% at 50% 50%); }
    100% { clip-path: circle(50% at 50% 50%); }
  }
  
  /* RINGING BELL – use with mdi:bell-ring */
  @keyframes ring {
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
  
  /* ANIMATED VACUUM – use with mdi:robot-vacuum */
  @keyframes vacuum {
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

  /* ANIMATED CEILING FAN 1 – WIND - use with local:center-and-wind */
  @keyframes wind-forward {
    0%        { clip-path: polygon(0% 60%, 50% 73%, 100% 60%, 100% 0%, 0% 0%); }
    50%       { clip-path: inset(0 0% 30% 0);                                  }
    95%, 100% { clip-path: inset(0 0 0 0);                                     }
  }
  @keyframes wind-reverse {
    0%, 5%  { clip-path: inset(0% 0% 0% 0%);                                 }
    50%     { clip-path: inset(0 0% 30% 0);                                  }
    100%    { clip-path: polygon(0% 60%, 50% 73%, 100% 60%, 100% 0%, 0% 0%); }
  }

  /* ANIMATED CEILING FAN 2 – ROTATION - use with local:blades */
  @keyframes blade-rotation {
    0%, 100%  { transform: rotateY(0deg);    }
    25%       { transform: rotateY(-90deg);  }
    50%       { transform: rotateY(-180deg); }
    75%       { transform: rotateY(-90deg);  }
  }
  
  /* ANIMATED WASHING MACHINE 1 - SHAKE and BUBBLE - use with mdi:washing-machine and local:wash */
  @keyframes shake {
    0%, 100% { transform: translate(0, 0)           rotate(0);     }
    20%      { transform: translate(0.4px, -0.4px)  rotate(-4deg); }
    40%      { transform: translate(-0.4px, 0.4px)  rotate(4deg);  }
    60%      { transform: translate(0.4px, 0.4px)   rotate(-4deg); }
    80%      { transform: translate(-0.4px, -0.4px) rotate(4deg);  }
  }
  @keyframes bubble {
    0%, 100%  { clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 34% 74%, 28% 63%, 31% 47%, 43% 37%, 65% 40%, 73% 61%, 63% 77%, 47% 81%, 34% 74%, 35% 100%, 100% 100%, 100% 0%);                            }
    12.5%     { clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 34% 74%, 27% 60%, 33% 46%, 40% 50%, 48% 61%, 58% 56%, 51% 42%, 64% 40%, 74% 61%, 63% 77%, 47% 81%, 34% 74%, 35% 100%, 100% 100%, 100% 0%); }
    25%       { clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 34% 74%, 27% 60%, 33% 46%, 40% 50%, 48% 61%, 58% 56%, 60% 51%, 69% 47%, 74% 61%, 63% 77%, 47% 81%, 34% 74%, 35% 100%, 100% 100%, 100% 0%); }
    37.5%     { clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 34% 74%, 27% 60%, 33% 46%, 40% 50%, 48% 61%, 58% 56%, 64% 59%, 71% 56%, 72% 66%, 63% 77%, 47% 81%, 34% 74%, 35% 100%, 100% 100%, 100% 0%); }
    50%       { clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 34% 74%, 27% 60%, 34% 60%, 43% 57%, 48% 61%, 58% 56%, 64% 59%, 71% 56%, 72% 66%, 63% 77%, 47% 81%, 34% 74%, 35% 100%, 100% 100%, 100% 0%); }
    62.5%     { clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 34% 74%, 27% 60%, 34% 60%, 43% 57%, 46% 46%, 52% 47%, 63% 58%, 71% 56%, 72% 66%, 63% 77%, 47% 81%, 34% 74%, 35% 100%, 100% 100%, 100% 0%); }
    75%       { clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 34% 74%, 27% 60%, 34% 60%, 43% 57%, 46% 46%, 52% 47%, 58% 53%, 67% 46%, 73% 62%, 63% 77%, 47% 81%, 34% 74%, 35% 100%, 100% 100%, 100% 0%); }
    87.5%     { clip-path: polygon(0% 0%, 0% 100%, 35% 100%, 34% 74%, 27% 60%, 33% 46%, 45% 40%, 57% 52%, 67% 47%, 74% 61%, 63% 77%, 47% 81%, 34% 74%, 35% 100%, 100% 100%, 100% 0%);                   }
  }
  /* ANIMATED WASHING MACHINE 2 - WASH and RINSE-DRY - use with local:waves and mdi:dishwasher or mdi:tumble-dryer */
  @keyframes wash {
    0%, 100% { transform: translateX(20%);  clip-path: circle(21.7% at 30% 58%); }
    30%      { transform: translateX(-15%); clip-path: circle(21.7% at 65% 58%); }
    45%      { transform: translateX(10%);  clip-path: circle(21.7% at 40% 58%); }
    75%      { transform: translateX(-25%); clip-path: circle(21.7% at 75% 58%); }
  }
  @keyframes rinse-dry {
    50%  { clip-path:  inset(100% 0 0 0); }
  }
  
  /* ANIMATED DISHWASHER - use with mdi:dishwasher */
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0);                    } 
    40%                     { transform: translateY(-1.2px) rotate(5deg);  } 
    60%                     { transform: translateY(-1.1px) rotate(-4deg); } 
  } 
  @keyframes dishwash {
    50%  { clip-path: polygon(0 0, 0 100%, 35% 100%, 36% 74%, 31% 43%, 61% 40%, 71% 69%, 62% 78%, 36% 73%, 35% 100%, 100% 100%, 100% 0); }
 }

 /* COURIOUS DOG - use with local:frenchie (or any other face-like icon) */
 @keyframes huh {
    0%, 10%, 75%, 100% { transform: rotate(0deg);   }
    15%                { transform: rotate(-25deg); }
    30%, 35%           { transform: rotate(-35deg); }
    50%                { transform: rotate(12deg);  }
    65%                { transform: rotate(-8deg);  }
 }

 /* AIR-ANIMATION - use with local:air-freshener */
 @keyframes air {
    100% { clip-path: inset(0% 0 0 0);  }
    50%  { clip-path: inset(35% 0 0 0); }
 }
`;
