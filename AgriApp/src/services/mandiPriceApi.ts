import mandiApi from './mandiApi';

export type MandiPriceParams = {
  district: string;
  market: string;
  days: number;
};

export const getMandiPrices = async ({
  district,
  market,
  days,
}: MandiPriceParams) => {
  const res = await mandiApi.get('/api/v1/mandi/kg', {
    params: {
      district,
      market,
      days,
    },
  });

  return res.data; // full response
};

export const mapMandiPricesToChart = (apiResponse: any) => {
  const priceData = apiResponse?.data ?? [];

  return {
    labels: priceData.map((item: any) =>
      new Date(item.date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
      })
    ),
    datasets: [
      {
        data: priceData.map((item: any) => item.pred_price_kg),
      },
    ],
  };
};
