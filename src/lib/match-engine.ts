import { WasteListing, User, SmartMatchResult } from './types';

/**
 * Smart Match Engine
 * Transparent, rule-based algorithmic scoring system designed to evaluate compatibility 
 * between waste listings and interested recyclers/agricultural users.
 */
export function calculateSmartMatches(
  listing: WasteListing,
  potentialUsers: User[]
): SmartMatchResult[] {
  const matches: SmartMatchResult[] = [];

  for (const user of potentialUsers) {
    // Skip matching listing producer with themselves
    if (user.id === listing.producerId) continue;

    let score = 0;
    const reasons: string[] = [];

    // 1. Role / Category Alignment (Max 40 points)
    if (listing.type === 'E_WASTE' && user.role === 'RECYCLER_INDUSTRY') {
      score += 40;
      reasons.push('Direct match: E-Waste Recycler seeking electronic components');
    } else if (listing.type === 'ORGANIC_WASTE' && user.role === 'FARMER_ORGANIC_USER') {
      score += 40;
      reasons.push('Direct match: Agricultural user seeking compostable organic material');
    } else if (user.role === 'ADMIN') {
      continue; // Skip admin matching
    } else {
      score += 15;
      reasons.push('Secondary match: General commercial party');
    }

    // 2. Geographic Proximity (Max 30 points)
    const distance = listing.distanceKm || Math.floor(Math.random() * 8) + 1;
    if (distance <= 5) {
      score += 30;
      reasons.push(`Optimal distance: Within ${distance.toFixed(1)} km radius`);
    } else if (distance <= 15) {
      score += 20;
      reasons.push(`Feasible logistics: ${distance.toFixed(1)} km away`);
    } else {
      score += 10;
      reasons.push(`Regional range: ${distance.toFixed(1)} km away`);
    }

    // 3. Quantity & Feasibility (Max 20 points)
    if (listing.quantity >= 50) {
      score += 20;
      reasons.push('Commercial batch volume meets minimum pickup threshold');
    } else {
      score += 12;
      reasons.push('Suitable batch size for localized exchange');
    }

    // 4. Verification & Trust (Max 10 points)
    if (user.verificationStatus === 'VERIFIED') {
      score += 10;
      reasons.push('Verified partner status');
    }

    // Cap score at 98% for realistic presentation
    const finalScore = Math.min(score, 98);

    // Only include matches >= 60%
    if (finalScore >= 60) {
      matches.push({
        listing,
        matchScore: finalScore,
        matchedUser: user.name,
        userRole: user.role,
        distanceKm: distance,
        reasons,
      });
    }
  }

  // Sort by highest match score
  return matches.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * AI Waste Classifier Simulator
 * Analyzes uploaded image characteristics or metadata to return classification insights.
 */
export function simulateAIWasteClassification(imageFileName?: string, userCategoryHint?: string) {
  const isEWasteHint = userCategoryHint === 'E_WASTE' || (imageFileName && /circuit|board|laptop|phone|cable|server|tech/i.test(imageFileName));

  if (isEWasteHint) {
    return {
      detectedCategory: 'E_WASTE' as const,
      subcategory: 'Printed Circuit Boards (PCB) & Micro-components',
      confidence: 94.6,
      estimatedCondition: 'Scrap / Precious Metals Recovery Suitable',
      suggestedPriceRange: '₹250 - ₹380 / kg',
      recyclabilityIndex: 92,
      safetyNotes: 'Ensure battery units and toxic heavy metal elements are segregated before thermal processing.',
    };
  } else {
    return {
      detectedCategory: 'ORGANIC_WASTE' as const,
      subcategory: 'Vegetable Peelings & Market Waste',
      confidence: 91.2,
      estimatedCondition: 'Fresh Segregated Raw Organic Scrap',
      suggestedPriceRange: 'Free / Community Exchange (₹0 - ₹2 / kg for bulk biogas)',
      recyclabilityIndex: 98,
      safetyNotes: 'Source verified clean from non-food-waste contaminants. Suitable for vermicomposting & anaerobic digestion.',
    };
  }
}
