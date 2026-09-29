export type UserRole = 
  | 'WASTE_PRODUCER' 
  | 'RECYCLER_INDUSTRY' 
  | 'FARMER_ORGANIC_USER' 
  | 'ADMIN';

export type VerificationStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';

export type WasteCategoryType = 'E_WASTE' | 'ORGANIC_WASTE';

export type ListingStatus = 'AVAILABLE' | 'BIDDING' | 'CLAIMED' | 'IN_PICKUP' | 'COMPLETED' | 'CANCELLED';

export type PickupStatus = 'REQUESTED' | 'CONFIRMED' | 'SCHEDULED' | 'PICKED_UP' | 'COMPLETED' | 'CANCELLED';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization?: string;
  phone?: string;
  address?: string;
  city?: string;
  area?: string;
  verificationStatus: VerificationStatus;
  verificationBadge?: string; // e.g. "Verified Recycler", "Verified Farmer"
  rating: number;
  completedExchangesCount: number;
  avatarUrl?: string;
}

export interface WasteListing {
  id: string;
  producerId: string;
  producerName: string;
  producerRole: UserRole;
  producerVerification: VerificationStatus;
  producerBadge?: string;
  type: WasteCategoryType;
  categoryName: string;
  title: string;
  description: string;
  quantity: number;
  unit: string; // "kg", "tons", "units"
  condition: string; // "Good", "Scrap", "Refurbishable", "Fresh Organic"
  source: String; // "IT Office", "Vegetable Market", "Hotel Kitchen", "E-Waste Depot"
  availabilityDate: string;
  expiryDate?: string;
  address: string;
  city: string;
  area: string;
  distanceKm: number;
  images: string[];
  preferredCollection: 'Self Drop-off' | 'Pickup Required' | 'Both';
  expectedPrice?: number; // null if free
  isFree: boolean;
  
  // Organic waste safety
  contaminationStatus?: 'None' | 'Minor Organic Mix' | 'Non-Hazardous';
  suitableUse?: 'Composting' | 'Biogas' | 'Agricultural Soil Conditioning' | 'Industrial Recovery';
  safetyDisclaimerAccepted?: boolean;

  status: ListingStatus;
  createdAt: string;
}

export interface Bid {
  id: string;
  listingId: string;
  bidderId: string;
  bidderName: string;
  bidderBadge?: string;
  amount: number;
  notes?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
}

export interface Claim {
  id: string;
  listingId: string;
  claimerId: string;
  claimerName: string;
  claimerBadge?: string;
  intendedUse: string;
  notes?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
}

export interface Pickup {
  id: string;
  listingId: string;
  listingTitle: string;
  wasteType: WasteCategoryType;
  producerId: string;
  producerName: string;
  collectorId: string;
  collectorName: string;
  scheduledDate: string;
  timeSlot: string;
  pickupAddress: string;
  contactPerson: string;
  contactPhone: string;
  notes?: string;
  status: PickupStatus;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'MATCH' | 'BID' | 'CLAIM' | 'PICKUP' | 'VERIFICATION' | 'SYSTEM';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
  listingId?: string;
  listingTitle?: string;
  content: string;
  read?: boolean;
  createdAt: string;
}

export interface SmartMatchResult {
  listing: WasteListing;
  matchScore: number; // 0 - 100%
  matchedUser: string;
  userRole: UserRole;
  distanceKm: number;
  reasons: string[];
}

export interface AIClassificationResult {
  detectedCategory: WasteCategoryType;
  subcategory: string;
  confidence: number;
  estimatedCondition: string;
  suggestedPriceRange?: string;
  recyclabilityIndex: number;
  safetyNotes: string;
}
