const express = require("express");
const router = express.Router();
const { PollVote, Option } = require("../database");

// API route to calculate IRV winner for a specific poll
router.get('/:pollId/irv-result', async (req, res) => {

    // IRV Logic in JavaScript - DEFINED INSIDE THE ROUTE
    const calculateIrvWinner = (ballots) => {
      let candidates = new Set();
      ballots.forEach(ballot => {
        ballot.forEach(candidate => {
          candidates.add(candidate);
        });
      });

      let activeCandidates = Array.from(candidates);
      const rounds = []; // Array to store details of each round

      let roundNum = 1;

      while (true) {
        if (activeCandidates.length === 0) {
          rounds.push({
            round: roundNum,
            message: "No winner: All candidates eliminated (tie or invalid ballots)",
            votes: {},
            eliminated: null,
            totalActiveBallots: 0
          });
          return { winner: null, message: "No winner: All candidates eliminated.", rounds };
        }

        let roundVotes = {};
        activeCandidates.forEach(candidate => {
          roundVotes[candidate] = 0;
        });

        let totalActiveBallots = 0;

        ballots.forEach(ballot => {
          for (let i = 0; i < ballot.length; i++) {
            const preferredCandidate = ballot[i];
            if (activeCandidates.includes(preferredCandidate)) {
              roundVotes[preferredCandidate]++;
              totalActiveBallots++;
              break;
            }
          }
        });

        if (totalActiveBallots === 0) {
          rounds.push({
            round: roundNum,
            message: "No winner: No active ballots left to count.",
            votes: roundVotes,
            eliminated: null,
            totalActiveBallots: 0
          });
          return { winner: null, message: "No winner: No active ballots left to count.", rounds };
        }

        const majorityThreshold = totalActiveBallots / 2.0;

        for (const candidate in roundVotes) {
          if (roundVotes[candidate] > majorityThreshold) {
            rounds.push({
              round: roundNum,
              message: `Winner: ${candidate}`,
              votes: roundVotes,
              eliminated: null,
              totalActiveBallots: totalActiveBallots,
              winnerFound: true
            });
            return { winner: candidate, message: `Winner: ${candidate} (${roundVotes[candidate]} votes out of ${totalActiveBallots})`, rounds };
          }
        }

        if (Object.keys(roundVotes).length === 0) {
          rounds.push({
            round: roundNum,
            message: "No winner: No active candidates to count votes for.",
            votes: {},
            eliminated: null,
            totalActiveBallots: 0
          });
          return { winner: null, message: "No winner: No active candidates to count votes for.", rounds };
        }

        let minVotes = Infinity;
        let candidatesToEliminate = [];

        for (const candidate in roundVotes) {
          if (roundVotes[candidate] < minVotes) {
            minVotes = roundVotes[candidate];
            candidatesToEliminate = [candidate];
          } else if (roundVotes[candidate] === minVotes) {
            candidatesToEliminate.push(candidate);
          }
        }

        const candidateToEliminate = candidatesToEliminate[0];

        const allTied = Object.values(roundVotes).every(val => val === minVotes);
        if (allTied && activeCandidates.length > 1) {
            rounds.push({
              round: roundNum,
              message: `Tie among remaining candidates: ${activeCandidates.join(', ')}`,
              votes: roundVotes,
              eliminated: null,
              totalActiveBallots: totalActiveBallots
            });
            return { winner: null, message: `Tie among remaining candidates: ${activeCandidates.join(', ')}`, rounds };
        }

        rounds.push({
          round: roundNum,
          message: `Eliminating: ${candidateToEliminate}`,
          votes: { ...roundVotes },
          eliminated: candidateToEliminate,
          totalActiveBallots: totalActiveBallots
        });

        activeCandidates = activeCandidates.filter(c => c !== candidateToEliminate);
        roundNum++;
      }
    };

    try {
      const { pollId } = req.params;

      const rawVotes = await PollVote.findAll({
        where: { poll_id: pollId, isSubmitted: true },
        include: [{
          model: Option,
          attributes: ['options_id', 'option_text']
        }],
        order: [
          ['user_id', 'ASC'],
          ['rank', 'ASC']
        ]
      });

      const votesByUser = {};
      rawVotes.forEach(vote => {
        if (!votesByUser[vote.user_id]) {
          votesByUser[vote.user_id] = [];
        }
        if (vote.Option && vote.Option.option_text) {
            votesByUser[vote.user_id].push({
              rank: vote.rank,
              option_text: vote.Option.option_text
            });
        }
      });

      const structuredBallots = Object.values(votesByUser).map(userRanks => {
          userRanks.sort((a, b) => a.rank - b.rank);
          return userRanks.map(rankDetail => rankDetail.option_text);
      }).filter(ballot => ballot.length > 0);

      if (structuredBallots.length === 0) {
        return res.status(404).json({ winner: null, message: "No submitted votes found for this poll.", rounds: [] });
      }

      const result = calculateIrvWinner(structuredBallots);
      res.json(result);

    } catch (error) {
      console.error("Error calculating IRV result:", error);
      res.status(500).json({ winner: null, message: "Internal server error.", rounds: [] });
    }
});

module.exports = router;