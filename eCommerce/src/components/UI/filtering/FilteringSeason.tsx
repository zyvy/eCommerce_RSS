import React, { useState } from 'react';

interface FilterBySeasonProps {
  onSeasonChange: (season: string) => void;
}

function FilterSeason({ onSeasonChange }: FilterBySeasonProps) {
  const [selectedSeason, setSelectedSeason] = useState<string>('');

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedSeason(selectedValue);
    onSeasonChange(selectedValue);
  };

  return (
    <div>
      <label htmlFor="seasonFilter">
        by Season:
        <select id="seasonFilter" value={selectedSeason} onChange={handleSeasonChange}>
          <option value="">Select Season</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
          <option value="Autumn">Autumn</option>
          <option value="Winter">Winter</option>
        </select>
      </label>
    </div>
  );
}

export default FilterSeason;
