type OnlineStatus = "Online" | "Away" | "Busy" | "Invisible" | "Offline";
type AccessLevel =
  | "Private"
  | "LAN"
  | "Friends"
  | "FriendsOfFriends"
  | "RegisteredUsers"
  | "Anyone";
type OutputDevice = "Unknown" | "Headless" | "Screen" | "VR" | "Camera";
type RecordId = {
  recordId: string;
  ownerId: string;
};
type Tag = string;
type SessionUser = {
  username: string;
  userID: string;
  isPresent: boolean;
  outputDevice: OutputDevice;
};

type Session = {
  name: string;
  description: string;
  correspondingWorldId: RecordId;
  tags: Array<Tag>;
  sessionId: string;
  normalizedSessionId: string;
  hostUserId: string;
  hostMachineId: string;
  hostUsername: string;
  compatibilityHash: string;
  universeId: string;
  neosVersion: string;
  headlessHost: boolean;
  sessionURLs: Array<string>;
  parentSessionIds: Array<string>;
  nestedSessionIds: Array<string>;
  sessionUsers: Array<SessionUser>;
  thumbnail: string;
  joinedUsers: number;
  activeUsers: number;
  totalJoinedUsers: number;
  totalActiveUsers: number;
  maxUsers: number;
  mobileFriendly: boolean;
  sessionBeginTime: string;
  lastUpdate: string;
  awaySince: string;
  accessLevel: string;
};

type PatreonData = any;
type Profile = {
  iconUrl: string;
  backgroundUrl?: string;
  tagline?: string;
  description?: string;
  profileWorldUrl?: string;
  showcaseItems?: Array<string>;
  tokenOptOut?: Array<string>;
};

type User = {
  id: string;
  username: string;
  normalizedUsername: string;
  alternateNormalizedNames: Array<string>;
  registrationDate: string;
  isVerified: boolean;
  accountBanExpiration: string | null;
  publicBanExpiration: string | null;
  publicBanType: "Standard" | "Hard" | "Soft" | null;
  spectatorBanExpiration: string | null;
  muteBanExpiration: string | null;
  listingBanExpiration: string | null;
  tags: Array<Tag>;
  referralId: string;
  patreonData: PatreonData;
  profile: Profile;
  quotaBytes: number;
  usedBytes: number;
};

type UserStatus = {
  onlineStatus: OnlineStatus;
  lastStatusChange: string;
  currentSessionId: string;
  currentSessionAccessLevel: AccessLevel;
  currentSessionHidden: boolean;
  currentHosting: boolean;
  compatibilityHash: string;
  neosVersion: string;
  publicRSAKey: string;
  outputDevice: OutputDevice;
  isMobile: boolean;
  activeSessions: Array<Session>;
};

type UserInfoAndUserStatus = {
  userInfo: User;
  status: UserStatus | null;
};

type Credentials = {
  userId: string;
  token: string;
  created: string;
  expire: string;
  rememberMe: boolean;
  sourceIP: string;
  partitionKey: string;
  rowKey: string;
  timestamp: string;
  eTag: string;
};

type Friend = {
  id: string;
  friendUsername: string;
  friendStatus: "Accepted" | string;
  userStatus: UserStatus;
  profile: Profile;
  latestMessageTime: string;
  ownerId: string;
  checked: boolean; // Import用. 実際のResponseには含まれない
};

export type {
  OnlineStatus,
  User,
  UserStatus,
  OutputDevice,
  UserInfoAndUserStatus,
  Session,
  SessionUser,
  Credentials,
  Friend,
}
