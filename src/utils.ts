
export const getOptions = (endpoint: string, params: object) => ({
  method: 'GET',
  url: `https://yt-api.p.rapidapi.com/${endpoint}`,
  params,
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_X_RAPID_API_KEY,
    'X-RapidAPI-Host': process.env.REACT_APP_X_RAPID_API_HOST,
  },
});

export const formatNumber = (num: number) =>
  Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(num);