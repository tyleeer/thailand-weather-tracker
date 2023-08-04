export const regions = [
  "All regions",
  "Northern",
  "Northeastern",
  "Western",
  "Central",
  "Eastern",
  "Southern",
];

export const Northern = [
  "Chiang Mai",
  "Chiang Rai",
  "Lampang",
  "Lamphun",
  "Mae Hong Son",
  "Nan",
  "Phayao",
  "Phrae",
  "Uttaradit",
];

export const Northern_province = Northern.sort((a, b) =>
  a > b ? 1 : b > a ? -1 : 0
);

export const Northeastern = [
  "Amnat Charoen",
  "Bueng Kan",
  "Buriram",
  "Chaiyaphum",
  "Kalasin",
  "Khon Kaen",
  "Loei",
  "Maha Sarakham",
  "Mukdahan",
  "Nakhon Phanom",
  "Nakhon Ratchasima",
  "Nong Bua Lamphu",
  "Nong Khai",
  "Roi Et",
  "Sakon Nakhon",
  "Sisaket",
  "Surin",
  "Ubon Ratchathani",
  "Udon Thani",
  "Yasothon",
];

export const Northeastern_province = Northeastern.sort((a, b) =>
  a > b ? 1 : b > a ? -1 : 0
);

export const Western = [
  "Kanchanaburi",
  "Phetchaburi",
  "Prachuap Khiri Khan",
  "Ratchaburi",
  "Tak",
];
export const Western_province = Western.sort((a, b) =>
  a > b ? 1 : b > a ? -1 : 0
);

export const Central = [
  "Ang Thong",
  "Bangkok",
  "Chai Nat",
  "Kamphaeng Phet",
  "Lopburi",
  "Nakhon Nayok",
  "Nakhon Pathom",
  "Nakhon Sawan",
  "Nonthaburi",
  "Pathum Thani",
  "Phetchabun",
  "Phichit",
  "Phitsanulok",
  "Phra Nakhon Si Ayutthaya",
  "Samut Prakan",
  "Samut Sakhon",
  "Samut Songkhram",
  "Saraburi",
  "Sing Buri",
  "Sukhothai",
  "Suphan Buri",
  "Uthai Thani",
];

export const Central_province = Central.sort((a, b) =>
  a > b ? 1 : b > a ? -1 : 0
);

export const Eastern = [
  "Chachoengsao",
  "Chanthaburi",
  "Chonburi",
  "Prachinburi",
  "Rayong",
  "Sa Kaeo",
  "Trat",
];

export const Eastern_province = Eastern.sort((a, b) =>
  a > b ? 1 : b > a ? -1 : 0
);

export const Southern = [
  "Chumphon",
  "Krabi",
  "Nakhon Si Thammarat",
  "Narathiwat",
  "Pattani",
  "Phang Nga",
  "Phatthalung",
  "Phuket",
  "Ranong",
  "Satun",
  "Songkhla",
  "Surat Thani",
  "Trang",
  "Yala",
];

export const Southern_province = Southern.sort((a, b) =>
  a > b ? 1 : b > a ? -1 : 0
);

type test = [string, string, string, string];

export const test_province: test = ["Bangkok", "Chiang Mai", "Krabi", "Rayong"];

export const all_province = Northern_province.concat(Northeastern_province)
  .concat(Eastern_province)
  .concat(Western_province)
  .concat(Central_province)
  .concat(Southern_province)
  .sort((a, b) => (a > b ? 1 : b > a ? -1 : 0));

type regionType = {
  name: string;
  province: string[];
};

export const regionStore: regionType[] = [
  {
    name: "Northern",
    province: Northern,
  },
  {
    name: "Northeastern",
    province: Northeastern,
  },
  {
    name: "Eastern",
    province: Eastern,
  },
  {
    name: "Western",
    province: Western,
  },
  {
    name: "Central",
    province: Central,
  },
  {
    name: "Southern",
    province: Southern,
  },
  {
    name: "All regions",
    province: all_province,
  },
];

// console.log(all_province);
// console.log("all_province", all_province.length);
// console.log(all_province.sort((a, b) => (a > b ? 1 : b > a ? -1 : 0))); // ascending
// console.log(all_province.sort((a, b) => (a > b ? -1 : b > a ? 1 : 0))); // descending
