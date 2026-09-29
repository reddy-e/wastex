'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, WasteListing, Bid, Claim, Pickup, NotificationItem, MessageItem, UserRole } from './types';
import { INITIAL_USERS, INITIAL_LISTINGS, INITIAL_BIDS, INITIAL_CLAIMS, INITIAL_PICKUPS, INITIAL_NOTIFICATIONS, INITIAL_MESSAGES } from './mock-data';

interface AppStateContextType {
  currentUser: User;
  setCurrentRole: (role: UserRole) => void;
  users: User[];
  listings: WasteListing[];
  bids: Bid[];
  claims: Claim[];
  pickups: Pickup[];
  notifications: NotificationItem[];
  messages: MessageItem[];
  addListing: (listing: Omit<WasteListing, 'id' | 'createdAt' | 'status' | 'producerId' | 'producerName' | 'producerRole' | 'producerVerification' | 'producerBadge'>) => WasteListing;
  addBid: (listingId: string, amount: number, notes?: string) => void;
  addClaim: (listingId: string, intendedUse: string, notes?: string) => void;
  schedulePickup: (pickupData: Omit<Pickup, 'id' | 'createdAt' | 'status'>) => void;
  updatePickupStatus: (pickupId: string, status: Pickup['status']) => void;
  verifyUser: (userId: string, badgeName?: string) => void;
  markNotificationRead: (id: string) => void;
  sendMessage: (receiverId: string, content: string, listingId?: string) => void;
  deleteListing: (listingId: string) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);
  const [listings, setListings] = useState<WasteListing[]>(INITIAL_LISTINGS);
  const [bids, setBids] = useState<Bid[]>(INITIAL_BIDS);
  const [claims, setClaims] = useState<Claim[]>(INITIAL_CLAIMS);
  const [pickups, setPickups] = useState<Pickup[]>(INITIAL_PICKUPS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [messages, setMessages] = useState<MessageItem[]>(INITIAL_MESSAGES);

  const setCurrentRole = (role: UserRole) => {
    const foundUser = users.find((u) => u.role === role);
    if (foundUser) {
      setCurrentUser(foundUser);
    }
  };

  const addListing = (listingData: Omit<WasteListing, 'id' | 'createdAt' | 'status' | 'producerId' | 'producerName' | 'producerRole' | 'producerVerification' | 'producerBadge'>): WasteListing => {
    const newListing: WasteListing = {
      ...listingData,
      id: `lst-${Date.now()}`,
      producerId: currentUser.id,
      producerName: currentUser.name,
      producerRole: currentUser.role,
      producerVerification: currentUser.verificationStatus,
      producerBadge: currentUser.verificationBadge,
      status: 'AVAILABLE',
      createdAt: new Date().toISOString(),
    };

    setListings((prev) => [newListing, ...prev]);

    // Add automatic notification for high match
    const newNotif: NotificationItem = {
      id: `ntf-${Date.now()}`,
      userId: currentUser.id,
      title: 'Listing Published Successfully',
      message: `Your listing "${newListing.title}" is now active on Smart Waste Exchange.`,
      type: 'SYSTEM',
      read: false,
      link: `/listings/${newListing.id}`,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newListing;
  };

  const addBid = (listingId: string, amount: number, notes?: string) => {
    const targetListing = listings.find(l => l.id === listingId);
    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      listingId,
      bidderId: currentUser.id,
      bidderName: currentUser.name,
      bidderBadge: currentUser.verificationBadge,
      amount,
      notes,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    setBids((prev) => [newBid, ...prev]);

    // Notify producer
    if (targetListing) {
      setNotifications((prev) => [
        {
          id: `ntf-${Date.now()}`,
          userId: targetListing.producerId,
          title: 'New Bid Received!',
          message: `${currentUser.name} placed a bid of ₹${amount.toLocaleString()} on "${targetListing.title}".`,
          type: 'BID',
          read: false,
          link: `/listings/${listingId}`,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
  };

  const addClaim = (listingId: string, intendedUse: string, notes?: string) => {
    const targetListing = listings.find(l => l.id === listingId);
    const newClaim: Claim = {
      id: `clm-${Date.now()}`,
      listingId,
      claimerId: currentUser.id,
      claimerName: currentUser.name,
      claimerBadge: currentUser.verificationBadge,
      intendedUse,
      notes,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };
    setClaims((prev) => [newClaim, ...prev]);

    if (targetListing) {
      setNotifications((prev) => [
        {
          id: `ntf-${Date.now()}`,
          userId: targetListing.producerId,
          title: 'Organic Waste Claim Received',
          message: `${currentUser.name} requested to claim your listing "${targetListing.title}".`,
          type: 'CLAIM',
          read: false,
          link: `/listings/${listingId}`,
          createdAt: new Date().toISOString(),
        },
        ...prev,
      ]);
    }
  };

  const schedulePickup = (pickupData: Omit<Pickup, 'id' | 'createdAt' | 'status'>) => {
    const newPickup: Pickup = {
      ...pickupData,
      id: `pkp-${Date.now()}`,
      status: 'REQUESTED',
      createdAt: new Date().toISOString(),
    };
    setPickups((prev) => [newPickup, ...prev]);

    // Update listing status
    setListings((prev) =>
      prev.map((l) => (l.id === pickupData.listingId ? { ...l, status: 'IN_PICKUP' } : l))
    );
  };

  const updatePickupStatus = (pickupId: string, status: Pickup['status']) => {
    setPickups((prev) =>
      prev.map((p) => {
        if (p.id === pickupId) {
          const updated = { ...p, status };
          if (status === 'COMPLETED') {
            // Update associated listing
            setListings((lPrev) =>
              lPrev.map((l) => (l.id === p.listingId ? { ...l, status: 'COMPLETED' } : l))
            );
          }
          return updated;
        }
        return p;
      })
    );
  };

  const verifyUser = (userId: string, badgeName?: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              verificationStatus: 'VERIFIED' as const,
              verificationBadge: badgeName || u.verificationBadge || 'Verified Partner',
            }
          : u
      )
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const sendMessage = (receiverId: string, content: string, listingId?: string) => {
    const receiver = users.find((u) => u.id === receiverId);
    const targetListing = listings.find((l) => l.id === listingId);
    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      receiverId,
      receiverName: receiver ? receiver.name : 'User',
      listingId,
      listingTitle: targetListing?.title,
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const deleteListing = (listingId: string) => {
    setListings((prev) => prev.filter((l) => l.id !== listingId));
  };

  return (
    <AppStateContext.Provider
      value={{
        currentUser,
        setCurrentRole,
        users,
        listings,
        bids,
        claims,
        pickups,
        notifications,
        messages,
        addListing,
        addBid,
        addClaim,
        schedulePickup,
        updatePickupStatus,
        verifyUser,
        markNotificationRead,
        sendMessage,
        deleteListing,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
