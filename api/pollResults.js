

// api/pollResults.js
const express = require("express");
const router = express.Router();
const { PollVote, Option } = require("../database"); 
// const { Op } = require("sequelize"); 

// IRV Logic in JavaScript
// New API route to calculate IRV winner for a specific poll
router.get('/:pollId/irv-result', async (req, res) => {
    const calculateIrvWinner = (ballots) => {
    console.log("ballots")
  let candidates = new Set();
  ballots.forEach(ballot => {
    ballot.forEach(candidate => {
      candidates.add(candidate);
    });
  });
   console.log( " candidates ", candidates);

  let activeCandidates = Array.from(candidates);

  while (true) {
    if (activeCandidates.length === 0) {
      return { winner: null, message: "No winner: All candidates eliminated (tie or invalid ballots)" };
    }

    let roundVotes = {};
    activeCandidates.forEach(candidate => {
      roundVotes[candidate] = 0;
    });

    let totalActiveBallots = 0;

    ballots.forEach(ballot => {
      // Find the first preference that is still an active candidate
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
        return { winner: null, message: "No winner: No active ballots left to count in this round." };
    }

    const majorityThreshold = totalActiveBallots / 2.0;

    for (const candidate in roundVotes) {
      if (roundVotes[candidate] > majorityThreshold) {
        return { winner: candidate, message: `Winner: ${candidate} (with ${roundVotes[candidate]} votes out of ${totalActiveBallots})` };
      }
    }

    if (Object.keys(roundVotes).length === 0) {
        return { winner: null, message: "No winner: No active candidates to count votes for." };
    }

    let minVotes = Infinity;
    let candidatesToEliminate = [];

    for (const candidate in roundVotes) {
      if (roundVotes[candidate] < minVotes ) { 
        minVotes = roundVotes[candidate]; 
        candidatesToEliminate = [candidate];
      } else if (roundVotes[candidate] === minVotes) {
        candidatesToEliminate.push(candidate);
      }
    }

    // Tie-breaking for elimination: For simplicity, eliminate the first one found.
    const candidateToEliminate = candidatesToEliminate[0];

    const allTied = Object.values(roundVotes).every(val => val === minVotes);
    if (allTied && activeCandidates.length > 1) {
        return { winner: null, message: `Tie among remaining candidates: ${activeCandidates.join(', ')}` };
    }

    activeCandidates = activeCandidates.filter(c => c !== candidateToEliminate);
    console.log(`Eliminating: ${candidateToEliminate} (with ${minVotes} votes). Remaining candidates: ${activeCandidates.join(', ')}`);
  }
};
  try {
    const { pollId } = req.params;
    console.log("ID", pollId);

    // Fetch all poll votes for the given pollId, including the associated Option details
    const rawVotes = await PollVote.findAll({
      where: { poll_id: pollId }, 
      include: [{
        model: Option,
        attributes: ['options_id', 'option_text'] 
      }],
      order: [
        ['user_id', 'ASC'], 
        ['rank', 'ASC'] 
      ]
    });
    console.log("rawVotes", rawVotes);

    // Group votes by user_id to reconstruct full ranked ballots
    const votesByUser = {};
    rawVotes.forEach(vote => {
      if (!votesByUser[vote.user_id]) {
        votesByUser[vote.user_id] = [];
      }
      // Push the option_text (candidate name) based on its rank
      // Ensure option is available, as include might fail if association is broken
      if (vote.Option && vote.Option.option_text) {
          votesByUser[vote.user_id].push({
            rank: vote.rank,
            option_text: vote.Option.option_text
          });
      }
    });

    // Transform grouped votes into the flat array of ranked arrays (ballots) for the IRV algorithm
    const structuredBallots = Object.values(votesByUser).map(userRanks => {
        // Sort by rank to ensure the order is correct
        userRanks.sort((a, b) => a.rank - b.rank);
        return userRanks.map(rankDetail => rankDetail.option_text);
    }).filter(ballot => ballot.length > 0); // Filter out any empty ballots

    if (structuredBallots.length === 0) {
      return res.status(404).json({ winner: null, message: "No submitted votes found for this poll to calculate IRV winner." });
    }

    const result = calculateIrvWinner(structuredBallots);
    res.json(result);

  } catch (error) {
    console.error("Error calculating IRV result:", error);
    res.status(500).json({ winner: null, message: "Internal server error calculating IRV result." });
  }
});

module.exports = router;