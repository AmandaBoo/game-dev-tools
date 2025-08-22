'use client'

import { useEffect, useState } from "react";
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function Page() {
  const [totalReviews, setTotalReviews] = useState<string>('');
  const [fullPrice, setFullPrice] = useState<string>('');
  const [hasPublisher, setHasPublisher] = useState(false);
  const [kitfoxEstimate, setKitfoxEstimate] = useState(0);

  useEffect(() => {
    const reviews = parseFloat(totalReviews) || 0;
    const price = parseFloat(fullPrice) || 0;
    let revenue = reviews * 12 * 0.7 * price;
    if (hasPublisher) revenue = revenue * 0.6;
    setKitfoxEstimate(Math.round(revenue));
  }, [totalReviews, fullPrice, hasPublisher]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-xl mx-auto">
        
        <div className="bg-base-200 p-8 rounded-2xl shadow-xl">
          <h1 className="text-3xl font-bold mb text-center font-georgia">Kitfox Steam Revenue Calculator</h1>

          <div className="flex justify-center">
            <div className="tooltip tooltip-bottom rounded-2xl" data-tip="Revenue = (# of Reviews x 12) x Price - 30% Steam Cut - 40% Publisher Cut (if enabled)">
              <button className="btn btn-circle"><InformationCircleIcon className='size-4'/></button>
            </div>
          </div>

          {/* Total Reviews Input */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Total Reviews</span>
            </label>
            <input 
              type="number"
              className="input input-bordered w-full focus:input-primary dark:focus:input-secondary"
              value={totalReviews}
              onChange={(e) => setTotalReviews(e.target.value)}
              placeholder="Enter total reviews"
            />
          </div>

          {/* Full Price Input */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Full Price</span>
            </label>
            <input 
              type="number"
              className="input input-bordered w-full focus:input-primary dark:focus:input-secondary"
              value={fullPrice}
              onChange={(e) => setFullPrice(e.target.value)}
              placeholder="Enter full price"
            />
          </div>

          {/* Publisher Toggle */}
          <div className="form-control items-center text-center">
            <label className="label flex-col gap-2 cursor-pointer">
              <span className="label-text text-center">Does this game have an external publisher?</span>
              <input 
                type="checkbox"
                className="toggle toggle-primary dark:toggle-secondary"
                checked={hasPublisher}
                onChange={(e) => setHasPublisher(e.target.checked)}
              />
            </label>
          </div>

          {/* Revenue Display */}
          <div className="mt-12 text-center flex flex-col items-center gap-4">
            <span className="label">Estimated Revenue</span>
            <div className="badge badge-primary dark:badge-secondary badge-lg text-lg px-6 py-4 badge-soft">
              ${kitfoxEstimate.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}