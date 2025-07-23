export const fetchCurrencyNames = async (): Promise<string[]> => {
   try {
      const response = await fetch('https://bonum-back-production.up.railway.app/api/currencies');
      if (!response.ok) {
         throw new Error('Failed to fetch currencies');
      }

      const data = await response.json();
      return data.map((currency: { name: string }) => currency.name);
   } catch (error) {
      console.error('Error fetching currency names:', error);
      throw new Error('Failed to fetch currency names');
   }
};