"use client"

import { VehicleSection } from "@/components/sections/vehicle"

export function GarageSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <VehicleSection env="city" />
      <VehicleSection env="night" />
      <VehicleSection env="studio" />
      <VehicleSection env="sunset" />
    </div>
  )
}
