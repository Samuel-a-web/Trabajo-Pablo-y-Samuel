export interface CrewMember {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly emoji: string;
  readonly role: string;
  readonly funFact: string;
}

export interface ScheduleItem {
  readonly day: string;
  readonly hours: string;
  readonly tooltip: string;
}

export interface RestaurantData {
  readonly crew: readonly CrewMember[];
  readonly schedule: readonly ScheduleItem[];
}

export interface User {
  id: string;
  username: string;
  password?: string;
}

export interface LoginCredentials {
  username: string;
  password?: string;
}

export interface RegisterCredentials {
  username: string;
  password?: string;
}
