"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAppContext } from "@/context/app-context"

const tracks = [
  "Austrian GP",
  "Monaco GP",
  "Spa-Francorchamps",
  "Silverstone",
  "Monza",
  "Suzuka",
  "Singapore GP",
  "Abu Dhabi GP",
]

export function TrackSelector() {
  const { selectedTrack, setSelectedTrack } = useAppContext()

  return (
    <Select value={selectedTrack} onValueChange={setSelectedTrack}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select track" />
      </SelectTrigger>
      <SelectContent>
        {tracks.map((track) => (
          <SelectItem key={track} value={track}>
            {track}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
