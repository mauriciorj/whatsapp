function formatDate(dateString: string) {
  const date = new Date(dateString); // Convert string to Date object
  // const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${month}/${day}`;
}

const getGroupedCounts: any = (data: any) => {
  if (!data) return null;
  const getReportPerDay: { [key: string]: number } = {};
  const getReportPerDeviceSize: { [key: string]: number } = {};
  const getReportPerDeviceSystem: { [key: string]: number } = {};
  const getReportPerCountryAndCity: {
    [key: string]: { [key: string]: number };
  } = {};

  data?.map((item: any) => {
    const city = item?.city || null;
    const country = item?.country || null;
    const deviceSize = item?.device_size || null;
    const deviceSystem = item?.device_system || null;
    const formatedDate = formatDate(item?.created_at);

    // Report Per Date
    if (formatedDate && getReportPerDay.hasOwnProperty(formatedDate)) {
      getReportPerDay[formatedDate] += 1;
    } else {
      getReportPerDay[formatedDate] = 1;
    }

    // Report Per Device Size
    if (deviceSize && getReportPerDeviceSize.hasOwnProperty(deviceSize)) {
      getReportPerDeviceSize[deviceSize] += 1;
    } else {
      getReportPerDeviceSize[deviceSize] = 1;
    }

    // Report Per Device System
    if (deviceSystem && getReportPerDeviceSystem.hasOwnProperty(deviceSystem)) {
      getReportPerDeviceSystem[deviceSystem] += 1;
    } else {
      getReportPerDeviceSystem[deviceSystem] = 1;
    }

    // Report Per Country and City
    if (city && country) {
      if (
        getReportPerCountryAndCity.hasOwnProperty(country) &&
        getReportPerCountryAndCity[country][city]
      ) {
        getReportPerCountryAndCity[country][city] += 1;
      } else {
        getReportPerCountryAndCity[country] = {
          ...getReportPerCountryAndCity[country],
          [city]: 1,
        };
      }
    }
  });

  const reportPerDay: any[] = [];
  const reportPerDeviceSize: any[] = [];
  const reportPerDeviceSystem: any[] = [];
  const reportPerCountryAndCity: any[] = [];

  // Transform the Report Per Date
  for (const [key, value] of Object.entries(getReportPerDay)) {
    reportPerDay.push({ date: key, clicks: value });
  }
  reportPerDay.sort(
    (a: { [key: string]: number }, b: { [key: string]: number }) =>
      a.date - b.date
  );

  // Transform the Report Per Device Size
  for (const [key, value] of Object.entries(getReportPerDeviceSize)) {
    reportPerDeviceSize.push({ device: key, clicks: value });
  }
  reportPerDeviceSize.sort(
    (a: { [key: string]: number }, b: { [key: string]: number }) =>
      b.clicks - a.clicks
  );

  // Transform the Report Per Device System
  for (const [key, value] of Object.entries(getReportPerDeviceSystem)) {
    reportPerDeviceSystem.push({ device: key, clicks: value });
  }
  reportPerDeviceSystem.sort(
    (a: { [key: string]: number }, b: { [key: string]: number }) =>
      b.clicks - a.clicks
  );

  // Transform the Report Per Country and City
  for (const [key, value] of Object.entries(getReportPerCountryAndCity)) {
    for (const [nestedKey, nestedValue] of Object.entries(value)) {
      reportPerCountryAndCity.push({
        city: nestedKey,
        clicks: nestedValue,
        country: key,
      });
    }
  }
  reportPerCountryAndCity.sort(
    (a: { [key: string]: number }, b: { [key: string]: number }) =>
      b.clicks - a.clicks
  );

  return {
    reportPerDay,
    reportPerDeviceSize,
    reportPerDeviceSystem,
    reportPerCountryAndCity,
  };
};

export default getGroupedCounts;
