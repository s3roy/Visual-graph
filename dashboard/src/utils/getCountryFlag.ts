import axios from 'axios';

const getCountryFlags = async (countries: any) => {
  const flagUrls = [];
  for (const country of countries) {
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/name/${country}`
      );
      const flagUrl = response.data[0].flags.png; // get the first flag URL
      flagUrls.push(flagUrl);
    } catch (error) {
      console.error(`Failed to get the flag for ${country}: ${error}`);
    }
  }
  return flagUrls;
};

export default getCountryFlags;
