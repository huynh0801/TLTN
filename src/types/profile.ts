export interface LocationCoordinate {
  lat: number
  lng: number
}

export interface UserStats {
  visitedPlaces: number
  reviewsCount: number
  upcomingTrips: number
  rewardPoints: number
}

export interface UserProfile {
  id: string
  name: string
  handle: string
  title: string
  avatarUrl: string
  bio: string
  email: string
  phone: string
  locationName: string
  homeCoordinate: LocationCoordinate
  stats: UserStats
  favoriteTags: string[]
}

export type ScheduleStatus = "upcoming" | "completed" | "in_progress"

export interface ScheduleItem {
  id: string
  placeName: string
  category: string
  address: string
  date: string
  time: string
  status: ScheduleStatus
  coordinates: LocationCoordinate
  guestsCount: number
  signatureDish: string
  notes?: string
  imageUrl: string
}
