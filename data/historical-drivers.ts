export interface HistoricalDriver {
  id: string
  name: string
  country: string
  totalRaces: number
  titles: number
  podiums: number
  points: number
  highestRaceFinish: number
  teams: string[]
  seasons: string[]
  imageUrl: string
  uniqueTraits: string[]
}

export const historicalDrivers: HistoricalDriver[] = [
  {
    id: "lewis-hamilton",
    name: "Lewis Hamilton",
    country: "United Kingdom",
    totalRaces: 332,
    titles: 7,
    podiums: 197,
    points: 4639.5,
    highestRaceFinish: 1,
    teams: ["McLaren", "Mercedes"],
    seasons: ["2007-Present"],
    imageUrl: "/images/drivers/lewis-hamilton.png",
    uniqueTraits: ["Consistent", "Aggressive", "Adaptable"],
  },
  {
    id: "michael-schumacher",
    name: "Michael Schumacher",
    country: "Germany",
    totalRaces: 307,
    titles: 7,
    podiums: 155,
    points: 3088,
    highestRaceFinish: 1,
    teams: ["Benetton", "Ferrari", "Mercedes"],
    seasons: ["1991-2006", "2010-2012"],
    imageUrl: "/images/drivers/michael-schumacher.png",
    uniqueTraits: ["Relentless", "Precise", "Strategic"],
  },
  {
    id: "max-verstappen",
    name: "Max Verstappen",
    country: "Netherlands",
    totalRaces: 187,
    titles: 3,
    podiums: 99,
    points: 2586.5,
    highestRaceFinish: 1,
    teams: ["Toro Rosso", "Red Bull Racing"],
    seasons: ["2015-Present"],
    imageUrl: "/images/drivers/max-verstappen.png",
    uniqueTraits: ["Aggressive", "Determined", "Skilled"],
  },
  {
    id: "fernando-alonso",
    name: "Fernando Alonso",
    country: "Spain",
    totalRaces: 377,
    titles: 2,
    podiums: 106,
    points: 2278,
    highestRaceFinish: 1,
    teams: ["Minardi", "Renault", "McLaren", "Ferrari", "Alpine", "Aston Martin"],
    seasons: ["2001", "2003-2018", "2021-Present"],
    imageUrl: "/images/drivers/fernando-alonso.png",
    uniqueTraits: ["Versatile", "Tenacious", "Experienced"],
  },
  {
    id: "sebastian-vettel",
    name: "Sebastian Vettel",
    country: "Germany",
    totalRaces: 299,
    titles: 4,
    podiums: 122,
    points: 3098,
    highestRaceFinish: 1,
    teams: ["BMW Sauber", "Toro Rosso", "Red Bull Racing", "Ferrari", "Aston Martin"],
    seasons: ["2007-2022"],
    imageUrl: "/images/drivers/sebastian-vettel.png",
    uniqueTraits: ["Precise", "Consistent", "Analytical"],
  },
  {
    id: "ayrton-senna",
    name: "Ayrton Senna",
    country: "Brazil",
    totalRaces: 161,
    titles: 3,
    podiums: 80,
    points: 614,
    highestRaceFinish: 1,
    teams: ["Toleman", "Lotus", "McLaren", "Williams"],
    seasons: ["1984-1994"],
    imageUrl: "/images/drivers/ayrton-senna.png",
    uniqueTraits: ["Brave", "Passionate", "Gifted"],
  },
  {
    id: "alain-prost",
    name: "Alain Prost",
    country: "France",
    totalRaces: 199,
    titles: 4,
    podiums: 106,
    points: 798.5,
    highestRaceFinish: 1,
    teams: ["McLaren", "Renault", "Ferrari", "Williams"],
    seasons: ["1980-1993"],
    imageUrl: "/images/drivers/alain-prost.png",
    uniqueTraits: ["Calculated", "Smooth", "Intelligent"],
  },
  {
    id: "jim-clark",
    name: "Jim Clark",
    country: "United Kingdom",
    totalRaces: 72,
    titles: 2,
    podiums: 34,
    points: 274,
    highestRaceFinish: 1,
    teams: ["Lotus"],
    seasons: ["1960-1968"],
    imageUrl: "/images/drivers/jim-clark.png",
    uniqueTraits: ["Natural", "Dominant", "Pioneering"],
  },
  {
    id: "juan-manuel-fangio",
    name: "Juan Manuel Fangio",
    country: "Argentina",
    totalRaces: 51,
    titles: 5,
    podiums: 35,
    points: 277.64,
    highestRaceFinish: 1,
    teams: ["Alfa Romeo", "Maserati", "Mercedes", "Ferrari"],
    seasons: ["1950-1951", "1954-1958"],
    imageUrl: "/images/drivers/juan-manuel-fangio.png",
    uniqueTraits: ["Masterful", "Adaptable", "Consistent"],
  },
  {
    id: "jackie-stewart",
    name: "Jackie Stewart",
    country: "United Kingdom",
    totalRaces: 99,
    titles: 3,
    podiums: 43,
    points: 360,
    highestRaceFinish: 1,
    teams: ["BRM", "Matra", "Tyrrell"],
    seasons: ["1965-1973"],
    imageUrl: "/images/drivers/jackie-stewart.png",
    uniqueTraits: ["Skilled", "Advocate", "Charismatic"],
  },
]

export const searchDrivers = (
  searchTerm: string,
  drivers: HistoricalDriver[] = historicalDrivers, // default to full list
): HistoricalDriver[] => {
  if (!searchTerm?.trim()) return drivers

  const lower = searchTerm.toLowerCase()

  return drivers.filter((d) => {
    const nameMatch = d.name.toLowerCase().includes(lower)
    const countryMatch = d.country.toLowerCase().includes(lower)
    const teamMatch = d.teams?.some((t) => t.toLowerCase().includes(lower))
    const traitMatch = d.uniqueTraits?.some((t) => t.toLowerCase().includes(lower))
    return nameMatch || countryMatch || teamMatch || traitMatch
  })
}
