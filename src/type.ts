export interface Hero {
  id: number
  name: string
  powerstats: {
    intelligence: number
    strength: number
    speed: number
    durability: number
    power: number
    combat: number
  }
  biography: {
    fullName: string
    publisher: string
    alignment: string
  }
  appearance: {
    gender: string
    race: string
  }
  images: {
    sm: string
    md: string
    lg: string
  }
}