export function ListingTypeOptions() {
  return (
    <>
      <option value="">All types</option>
      <optgroup label="Land">
        <option value="PLOT">Residential plot</option>
        <option value="AGRICULTURAL">Agricultural land</option>
        <option value="FARM">Farm land</option>
        <option value="INDUSTRIAL">Industrial land</option>
        <option value="COMMERCIAL">Commercial plot</option>
      </optgroup>
      <optgroup label="Homes">
        <option value="HOUSE">House</option>
        <option value="APARTMENT">Apartment</option>
      </optgroup>
    </>
  );
}
