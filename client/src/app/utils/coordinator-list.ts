// class for holding individual tournament sanctioning coordinator information
export class CoordinatorInfo {

  constructor (public firstName: string,
               public lastName: string,
               public streetAddress: string,
               public city: string,
               public state: string,
               public zipCode: number,
               public email: string,
               public phone: string,
               public region: string,
               public states: string []
               ) {
  }
};

// list of all coordinators
export const coordinatorList : CoordinatorInfo [] = [
  new CoordinatorInfo ("Larry", "Thoman",
  "918 Lake Park Dr.", "Gallatin", "TN", 37066,
  "ttrobotguru@gmail.com", "615-230-9251",
  "National",
  []),

  new CoordinatorInfo ("Edmund", "Suen",
  "215 Mott St. Apt. D-1", "New York", "NY", 10012,
  "esuen@optonline.net", "(347) 219-1896",
  "East",
  ["Connecticut", "Delaware", "Maine", "Maryland", "Massachusetts", "New Hampshire", "New Jersey", "New York", "Pennsylvania", "Rhode Island", "Vermont", "Virginia", "West Virginia"]),

  new CoordinatorInfo ("Ed", "Hogshead",
  "4525 Forest View Ave.", "Rockford", "IL", 61108,
  "ehogshead@landmarkbilling.com", "(815) 965-8505",
  "Midwest",
  ["Illinois", "Indiana", "Kentucky", "Michigan", "Ohio"]),

  new CoordinatorInfo ("John", "Miller",
  "1304 Emerson St.", "Denver", "CO", 80218,
  "john@urbanmicrofarm.us", "(517) 148-6060",
  "Mountain",
  ["Colorado", "Nebraska", "New Mexico", "Utah", "Wyoming"]),

  new CoordinatorInfo ("Mitch", "Seidenfeld",
  "16255 Jatos Cir.", "Lakeville", "MN", 55044,
  "mitch@tabletennismn.com", "(952) 892-7078",
  "North",
  ["Iowa", "Minnesota", "North Dakota", "South Dakota", "Wisconsin"]),

  new CoordinatorInfo ("Mitch", "Bednarz",
  "780 Commercial St. SE, Suite 300", "Salem", "OR", 97301,
  "ben@bcwebhost.net", "(503) 851-2941",
  "Northwest",
  ["Alaska", "Idaho", "Montana", "Oregon", "Washington"]),

  new CoordinatorInfo ("Ichiro", "Hashimoto",
  "20432 Elkwood Street", "Canoga Park", "CA", 91306,
  "ichiro.hashimoto@csun.edu", "(818) 700-0948",
  "Pacific",
  ["Arizona", "California", "Hawaii", "Nevada"]),

  new CoordinatorInfo ("Eugene", "Atha",
  "1608 Club Lane East", "Sherwood", "AR", 72120,
  "eatha@swbell.net", "(501) 835-5291",
  "South Central",
  ["Arkansas", "Kansas", "Louisiana", "Missouri", "Oklahoma", "Texas"]),

  new CoordinatorInfo ("Seemant", "Teotia",
  "1608 Club Lane East", "Sherwood", "AR", 72120,
  "seemant.teotia@gmail.com", "(501) 835-5291",
  "Southeast",
  ["Alabama", "Florida", "Georgia", "Mississippi", "North Carolina", "South Carolina", "Tennessee"])
];
