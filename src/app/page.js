"use client"
import Image from "next/image";
import { useState } from "react";


export default function EQEComponent() {
  // State hooks for input parameters
  const [current, setCurrent] = useState(75);
  const [radiance, setRadiance] = useState(0.0011);
  const [area, setArea] = useState(0.16);
  const [wavelength, setWavelength] = useState(626);
  const [eqe, setEqe] = useState(null);

  // Conversion and calculation functions
  function getResponsivity(current, radiance = 0.001, area = 0.16) {
      return current / (radiance * area);
  }

  function getEqeFromR(responsivity, wavelength) {
      return (1240 * responsivity) / wavelength;
  }

  function calculateEqe() {
      const currentInAmps = current / 1e6; // Convert from uA to A
      const R = getResponsivity(currentInAmps, radiance, area);
      const calculatedEqe = getEqeFromR(R, wavelength);
      setEqe(calculatedEqe);
  }

  return (
    <div className="flex flex-col items-center justify-center m-10">
      <span className="text-wrap w-1/3 text-center m-5">Welcome to the simple EQE calculator.
         This calculator assumes that you have zero dark current and monochromatic light.
          For reference our emission maxima for LED light is: RED = 626 BLUE = 461
GREEN = 522. Light intensity for R = 0.0011, G = 0.0011, B= 0.0009 </span>
    <label className="mb-4">
        Current (in uA)  :
        <input
            type="number"
            placeholder="Current in uA"
            className="ml-2 p-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
        />
    </label>
    <br />
    <label className="mb-4">
        Radiance (in W/cm2)  :
        <input
            type="number"
            placeholder="Radiance in W/cm2"
            className="ml-2 p-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={radiance}
            onChange={(e) => setRadiance(e.target.value)}
        />
    </label>
    <br />
    <label className="mb-4">
        Area (in cm2)  :
        <input
            type="number"
            placeholder="Area in cm2"
            className="ml-2 p-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={area}
            onChange={(e) => setArea(e.target.value)}
        />
    </label>
    <br />
    <label className="mb-4">
        Wavelength (in nm)  :
        <input
            type="number"
            placeholder="Wavelength in nm"
            className="ml-2 p-2 border border-gray-300 bg-gray-50 text-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500"
            value={wavelength}
            
            onChange={(e) => setWavelength(e.target.value)}
        />
    </label>
    <br />
    <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
        onClick={calculateEqe}
    >
        Calculate EQE
    </button>
    <div className="m-5">{eqe !== null && <p>Calculated EQE: {eqe}</p>}</div>
</div>
  );
}