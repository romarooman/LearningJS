const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 25;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';




let battleLog = [];
let lastLoggedEntry;

function getMaxLifeValues() {
  enteredValue = prompt('Maximum life for you and the monster', '100');

  const parseValue = parseInt(enteredValue);
  if (isNaN(parseValue) || parseValue <= 0) {
    throw {message: 'ivalid user input, not a number'};
  }
  return parseValue
}


let choseMaxlife = getMaxLifeValues();
let currentMonstrHealth = choseMaxlife;
let currentPlayerHealth = choseMaxlife;
let hasBonusLife = true;

adjustHealthBars(choseMaxlife);

function writeToLog(ev, val, monsterHealth, playerHealth) {
  let logEntry = {
    event: ev,
    value: val,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };

  switch (ev) {
    case LOG_EVENT_PLAYER_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry.target = 'PLAYER';
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = 'PLAYER';
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry = {
        event: ev,
        value: val,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
      };
      break;
    default:
      logEntry = {};
  }
  // if (ev === LOG_EVENT_PLAYER_ATTACK) {
  //   logEntry.target = 'MONSTER';
  // } else if (ev === LOG_EVENT_PLAYER_STRONG_ATTACK) {
  //   logEntry.target = 'MONSTER';
  // } else if (ev === LOG_EVENT_MONSTER_ATTACK) {
  //   logEntry.target = 'PLAYER';
  // } else if (ev === LOG_EVENT_PLAYER_HEAL) {
  //   logEntry.target = 'PLAYER';
  // } else if (ev === LOG_EVENT_GAME_OVER) {
  //   logEntry = {
  //     event: ev,
  //     value: val,
  //     finalMonsterHealth: monsterHealth,
  //     finalPlayerHealth: playerHealth,
  //   };
  // }
  battleLog.push(logEntry);
}

function reset() {
  currentMonstrHealth = choseMaxlife;
  currentPlayerHealth = choseMaxlife;
  resetGame(choseMaxlife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
  currentPlayerHealth -= playerDamage;
  writeToLog(
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonstrHealth,
    currentPlayerHealth
  );

  if (currentPlayerHealth <= 0 && hasBonusLife) {
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth;
    setPlayerHealth(initialPlayerHealth);
    alert('You would be dead but the bonus life saved you');
  }

  if (currentPlayerHealth > 0 && currentMonstrHealth <= 0) {
    alert('You won!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'PLAYER WON',
      currentMonstrHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonstrHealth > 0) {
    alert('Monster won!');
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'MONSTER WON',
      currentMonstrHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonstrHealth <= 0) {
    alert('You have a draw'); //ничья
    writeToLog(
      LOG_EVENT_GAME_OVER,
      'A DRAW',
      currentMonstrHealth,
      currentPlayerHealth
    );
  }

  if (currentPlayerHealth <= 0 || currentMonstrHealth <= 0) {
    reset();
  }
}

function attackMonster(mode) {
  let maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  let logEvent =
    mode === MODE_ATTACK
      ? LOG_EVENT_PLAYER_ATTACK
      : LOG_EVENT_PLAYER_STRONG_ATTACK;
  // if (mode === MODE_ATTACK) {
  //   maxDamage = ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_ATTACK;
  // } else if (mode === MODE_STRONG_ATTACK) {
  //   maxDamage = STRONG_ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  // }
  const damage = dealMonsterDamage(maxDamage);
  currentMonstrHealth -= damage;
  writeToLog(logEvent, damage, currentMonstrHealth, currentPlayerHealth);
  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= choseMaxlife - HEAL_VALUE) {
    alert("You can't heal to more then max inintial health.");
    healValue = choseMaxlife - currentPlayerHealth;
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue);
  currentPlayerHealth += healValue;
  writeToLog(
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonstrHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler() {
  for (let i = 0; i < 3; i++){
    console.log('------------');
  }

  //можно называть циклы
  let j = 0;
  OutWhile: do {
    console.log('Outer ', j);
    innerFor: for (let k = 0; k < 5; k++) {
      if (k=== 3) {
        break;
      }
      console.log('Inner ', k);
    }
    j++;
  } while (j < 3);

  let r = 0;
  for (const logEntry of battleLog) {
    if (!lastLoggedEntry && lastLoggedEntry !== 0 || lastLoggedEntry < r ) { // || - or _________&& -and
      console.log(`#${r}`);
      for (const key in logEntry) {
        console.log(`#${key} => ${logEntry[key]} `);
    }
    lastLoggedEntry = r;
    break;
  }
    r++;
  }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
