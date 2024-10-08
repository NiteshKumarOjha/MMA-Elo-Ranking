const calculateElo = (matches, K = 40) => {
  let rating = 2000; // Starting rating
  const N = matches.length;

  matches.forEach((match) => {
    const {
      result,
      preFightOddsFighter,
      preFightOddsOpponent,
      KD,
      SIG_Strikes,
      TOT_Strikes,
      Control_Time,
      Takedowns,
      Sub_Attempts,
      isChampionship,
    } = match;

    // Calculate Expected Score E
    const E =
      preFightOddsOpponent /
      (preFightOddsOpponent + Math.abs(preFightOddsFighter));

    // Calculate Performance Score
    const performanceScore =
      3 * KD +
      2 * (SIG_Strikes / TOT_Strikes) +
      2 * Control_Time +
      1.5 * Takedowns +
      1 * Sub_Attempts;

    // Determine Championship Multiplier
    const CM = isChampionship ? 1.5 : 1; // Apply 1.5 for championship matches, otherwise 1

    // Update ELO
    rating += (K * CM * (result - E) * performanceScore) / N;
  });

  return rating;
};
