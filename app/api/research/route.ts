export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    // Use the SearchWeb capability via a simple approach
    // In a real implementation, this would use the AI SDK or SearchWeb API
    const mockResearchResults = [
      "Aggressive play in poker typically yields 15-20% better results in tournament play. When you have position advantage, raising 3x the big blind is optimal.",
      "Pot odds calculation: If the pot is $100 and you need to call $20, you're getting 5:1 odds. You should call if your hand has better than 16.7% equity.",
      "Bluffing frequency should be around 30-40% of the time in late position with weak holdings to maintain unpredictability and maximize EV.",
      "Pre-flop equity depends heavily on position. Premium pairs (AA, KK, QQ) have 80%+ equity heads-up but decreases with more players.",
      "Conservative fold rates of 70-80% pre-flop are optimal for long-term profitability. Only play top 15-20% of starting hands.",
      "When short-stacked (less than 10 big blinds), push-fold strategy becomes optimal. Calculate all-in equity vs. opponent calling range.",
    ];

    const result = mockResearchResults[Math.floor(Math.random() * mockResearchResults.length)];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return Response.json({ result, query });
  } catch (error) {
    console.error('[v0] Research API error:', error);
    return Response.json({ error: 'Research failed' }, { status: 500 });
  }
}
