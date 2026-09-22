import path from "node:path";
import { PrismaClient, PropertyType, ListingType, PropertyStatus } from "../src/generated/prisma";
import { hashPassword } from "../src/lib/password";
import { slugify } from "../src/lib/utils";

const databaseUrl = `file:${path.join(process.cwd(), "prisma", "dev.db")}`;
const prisma = new PrismaClient({ datasources: { db: { url: databaseUrl } } });

const DEMO_PASSWORD = "Realster123!";

const agentsSeed = [
  {
    name: "Maria Chen",
    email: "maria@realster.com",
    title: "Senior Listing Agent",
    phone: "(512) 555-0148",
    licenseNo: "TX-RE-88231",
    bio: "Maria works primarily in Austin and the surrounding hill country, with a focus on new-construction and architect-designed homes. She spends most walkthroughs pointing out what a renovation would actually cost, not just what it would look like.",
  },
  {
    name: "Jordan Ellis",
    email: "jordan@realster.com",
    title: "Buyer's Agent",
    phone: "(303) 555-0173",
    licenseNo: "CO-RE-45092",
    bio: "Jordan represents buyers across Denver and Seattle, splitting time between the two markets. He came from a construction background before real estate, which shows up in how closely he reads inspection reports with clients.",
  },
  {
    name: "Priya Anand",
    email: "priya@realster.com",
    title: "Luxury Property Specialist",
    phone: "(305) 555-0119",
    licenseNo: "FL-RE-77104",
    bio: "Priya handles waterfront and estate listings in South Florida. Most of her clients are relocating from out of state, so she runs neighborhood tours before ever opening a lockbox.",
  },
];

type SeedProperty = {
  title: string;
  description: string;
  price: number;
  listingType: ListingType;
  propertyType: PropertyType;
  status?: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  yearBuilt: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  featured?: boolean;
  amenities: string;
  agentIndex: number;
  images: string[];
};

const img = (id: string) =>
  `/images/properties/${id}.jpg`;

const propertiesSeed: SeedProperty[] = [
  {
    title: "Modern Hillside Retreat",
    description:
      "A glass-walled hillside home framed by mature oaks, with a great room that opens straight onto the kitchen and covered terrace. The primary suite sits on its own wing with a walk-in closet and soaking tub; two additional bedrooms share a bath upstairs, and a flexible fourth room works as an office or guest suite. Wide-plank white oak floors run throughout, and the kitchen has a waterfall-edge island, gas range, and full-height pantry.",
    price: 1245000,
    listingType: "SALE",
    propertyType: "HOUSE",
    bedrooms: 4,
    bathrooms: 3,
    areaSqft: 3120,
    yearBuilt: 2019,
    address: "2140 Comanche Trail",
    city: "Austin",
    state: "TX",
    zip: "78746",
    featured: true,
    amenities: "Hillside views, Covered terrace, Gas range, Walk-in pantry, Attached 2-car garage, Owned solar panels",
    agentIndex: 0,
    images: [img("1568605114967-8130f3a36994"), img("1600585152220-90363fe7e115"), img("1600566753086-00f18fb6b3ea"), img("1615873968403-89e068629265")],
  },
  {
    title: "Sunlit Colonial Estate",
    description:
      "Set back from the street behind a wrap-around porch, this colonial has the floor plan buyers keep asking for: formal living and dining rooms up front, an eat-in kitchen and family room at the back, and five bedrooms upstairs including a primary with a renovated en-suite. The finished basement adds a sixth living space with a wet bar, and the fenced backyard backs onto green space with no rear neighbors.",
    price: 875000,
    listingType: "SALE",
    propertyType: "HOUSE",
    bedrooms: 5,
    bathrooms: 4,
    areaSqft: 3480,
    yearBuilt: 1998,
    address: "884 Birchwood Lane",
    city: "Denver",
    state: "CO",
    zip: "80209",
    amenities: "Wrap-around porch, Finished basement, Wet bar, Fenced backyard, No rear neighbors, Attached garage",
    agentIndex: 1,
    images: [img("1570129477492-45c003edd2be"), img("1502672260266-1c1ef2d93688"), img("1512918728675-ed5a9ecdebfd"), img("1615529182904-14819c35db37")],
  },
  {
    title: "The Meridian Rooftop Pool Villa",
    description:
      "A two-story villa built around an infinity-edge rooftop pool with skyline views, this Meridian-area property pairs a double-height living room with a chef's kitchen that opens onto a covered lanai. The lower level holds a media room and a junior suite, while the remaining bedrooms sit upstairs, including a primary suite with a private balcony and a dual-vanity bath finished in Calacatta marble.",
    price: 2650000,
    listingType: "SALE",
    propertyType: "HOUSE",
    bedrooms: 5,
    bathrooms: 5,
    areaSqft: 4850,
    yearBuilt: 2021,
    address: "1220 Meridian Court",
    city: "Miami",
    state: "FL",
    zip: "33133",
    featured: true,
    amenities: "Rooftop infinity pool, Skyline views, Media room, Smart home controls, Covered lanai, Impact windows",
    agentIndex: 2,
    images: [img("1580587771525-78b9dba3b914"), img("1600607687939-ce8a6c25118c"), img("1524230572899-a752b3835840"), img("1600585152220-90363fe7e115")],
  },
  {
    title: "Cedar Grove Craftsman",
    description:
      "This 1932 craftsman keeps its original coved ceilings, built-in bookcases, and leaded glass windows, updated with a rewired electrical panel, new plumbing, and a kitchen remodel finished last year. The covered front porch looks out over a row of cedars, and a detached studio in back is currently used as a home office with its own heat and internet line.",
    price: 968000,
    listingType: "SALE",
    propertyType: "HOUSE",
    bedrooms: 4,
    bathrooms: 3,
    areaSqft: 2680,
    yearBuilt: 1932,
    address: "4417 Cedar Grove Ave",
    city: "Seattle",
    state: "WA",
    zip: "98115",
    amenities: "Original built-ins, Detached studio, Covered front porch, Updated kitchen, Mature cedar trees, Off-street parking",
    agentIndex: 0,
    images: [img("1571939228382-b2f2b585ce15"), img("1554995207-c18c203602cb"), img("1600210492486-724fe5c67fb0"), img("1512918728675-ed5a9ecdebfd")],
  },
  {
    title: "Downtown Skyline Residences #402",
    description:
      "Unit 402 sits on the fourth floor of Skyline Residences with floor-to-ceiling windows facing the courtyard pool. Both bedrooms fit a queen bed and a full dresser, the kitchen has quartz counters and a gas range, and the building includes a fitness center, package room, and resident lounge on the ground floor.",
    price: 3200,
    listingType: "RENT",
    propertyType: "APARTMENT",
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1180,
    yearBuilt: 2015,
    address: "700 N State Street, Unit 402",
    city: "Chicago",
    state: "IL",
    zip: "60654",
    amenities: "In-unit washer/dryer, Courtyard pool, Fitness center, Package room, Assigned parking available, Pet-friendly",
    agentIndex: 1,
    images: [img("1568084680786-a84f91d1153c"), img("1598928506311-c55ded91a20c"), img("1600585152220-90363fe7e115"), img("1493809842364-78817add7ffb")],
  },
  {
    title: "Palma Vista Condos #12B",
    description:
      "Unit 12B faces the courtyard gardens rather than the parking side of Palma Vista, so the living room and both guest bedrooms stay quiet through the day. The primary bedroom has a walk-in closet and an en-suite with a frameless glass shower, and the building's amenities include a resort-style pool, two guest suites for visiting family, and a 24-hour front desk.",
    price: 610000,
    listingType: "SALE",
    propertyType: "CONDO",
    bedrooms: 3,
    bathrooms: 2,
    areaSqft: 1540,
    yearBuilt: 2017,
    address: "9820 Palma Vista Way, Unit 12B",
    city: "Miami",
    state: "FL",
    zip: "33176",
    amenities: "Courtyard-facing unit, Resort-style pool, 24-hour front desk, Guest suites, Covered parking, Storage unit included",
    agentIndex: 2,
    images: [img("1580041065738-e72023775cdc"), img("1615873968403-89e068629265"), img("1615529182904-14819c35db37"), img("1600585152220-90363fe7e115")],
  },
  {
    title: "Ironwood Modern Build",
    description:
      "A new-construction build finished in board-formed concrete and cedar siding, Ironwood was designed around a central stair that separates the public and private wings. The main level is one open volume for kitchen, dining, and living, and a folding glass wall along the back turns the patio into an extension of that same room in warmer months.",
    price: 1120000,
    listingType: "SALE",
    propertyType: "HOUSE",
    bedrooms: 3,
    bathrooms: 3,
    areaSqft: 2390,
    yearBuilt: 2023,
    address: "615 Ironwood Terrace",
    city: "Portland",
    state: "OR",
    zip: "97210",
    featured: true,
    amenities: "New construction, Folding glass wall, Radiant floor heat, EV charger rough-in, Covered patio, Builder warranty remaining",
    agentIndex: 0,
    images: [img("1600563438938-a9a27216b4f5"), img("1600607687939-ce8a6c25118c"), img("1600566753086-00f18fb6b3ea"), img("1600210492486-724fe5c67fb0")],
  },
  {
    title: "Twilight Glass Estate",
    description:
      "Positioned to catch desert sunsets from nearly every room, this estate wraps a courtyard pool with disappearing glass walls on three sides. The primary wing is set apart from the four guest bedrooms, with its own fireplace, dual walk-in closets, and a bath finished in book-matched stone. A separate casita by the pool works as a gym, guest suite, or home office.",
    price: 3150000,
    listingType: "SALE",
    propertyType: "HOUSE",
    bedrooms: 5,
    bathrooms: 6,
    areaSqft: 5200,
    yearBuilt: 2020,
    address: "7710 Camelback Vista Dr",
    city: "Scottsdale",
    state: "AZ",
    zip: "85253",
    featured: true,
    amenities: "Disappearing glass walls, Courtyard pool, Detached casita, Wine room, Whole-home generator, Gated drive",
    agentIndex: 1,
    images: [img("1613490493576-7fde63acd811"), img("1524230572899-a752b3835840"), img("1502672260266-1c1ef2d93688"), img("1512918728675-ed5a9ecdebfd")],
  },
  {
    title: "Birchwood Family Home",
    description:
      "A straightforward, well-kept rental on a quiet cul-de-sac, Birchwood has a fenced yard for kids or pets, an attached two-car garage, and a kitchen that was updated with new counters and appliances last year. The finished lower level works as a playroom, home gym, or fourth bedroom.",
    price: 3400,
    listingType: "RENT",
    propertyType: "HOUSE",
    bedrooms: 4,
    bathrooms: 3,
    areaSqft: 2050,
    yearBuilt: 2005,
    address: "3390 Birchwood Cul-de-Sac",
    city: "Denver",
    state: "CO",
    zip: "80238",
    amenities: "Fenced yard, Attached garage, Updated kitchen, Finished lower level, Central air, Washer/dryer included",
    agentIndex: 2,
    images: [img("1592595896616-c37162298647"), img("1554995207-c18c203602cb"), img("1598928506311-c55ded91a20c"), img("1493809842364-78817add7ffb")],
  },
  {
    title: "Onyx Line Modern Build",
    description:
      "Wrapped in dark standing-seam metal with warm wood accents at the entry, Onyx Line reads as a single sculptural volume from the street. Inside, a split staircase separates a ground-floor guest suite from the main living areas, and the kitchen's oversized island doubles as the only seating most nights, with a formal dining nook reserved for the rest.",
    price: 1485000,
    listingType: "SALE",
    propertyType: "HOUSE",
    bedrooms: 4,
    bathrooms: 4,
    areaSqft: 3340,
    yearBuilt: 2022,
    address: "3105 Onyx Line Drive",
    city: "Austin",
    state: "TX",
    zip: "78704",
    featured: true,
    amenities: "Standing-seam metal roof, Ground-floor guest suite, Oversized kitchen island, Tankless water heater, Xeriscaped yard, EV charger",
    agentIndex: 0,
    images: [img("1600585154526-990dced4db0d"), img("1600607687939-ce8a6c25118c"), img("1600566753086-00f18fb6b3ea"), img("1615873968403-89e068629265")],
  },
  {
    title: "Vantage Point Modern",
    description:
      "Clad in warm cedar and black metal panels, Vantage Point sits on a corner lot with unobstructed mountain views from the second-floor primary suite. The main level is split between a formal entry and an open kitchen-dining-living space anchored by a linear gas fireplace, and a mudroom off the garage keeps ski gear and bikes out of the main hallway.",
    price: 1050000,
    listingType: "SALE",
    propertyType: "HOUSE",
    bedrooms: 4,
    bathrooms: 3,
    areaSqft: 2910,
    yearBuilt: 2021,
    address: "1288 Vantage Point Rd",
    city: "Denver",
    state: "CO",
    zip: "80214",
    amenities: "Mountain views, Linear gas fireplace, Mudroom, Attached 2-car garage, Xeriscaped front yard, Tankless water heater",
    agentIndex: 1,
    images: [img("1600047509807-ba8f99d2cdde"), img("1600585152220-90363fe7e115"), img("1615529182904-14819c35db37"), img("1600210492486-724fe5c67fb0")],
  },
  {
    title: "Cul-de-Sac Bungalow",
    description:
      "A single-story bungalow on a quiet cul-de-sac, this rental keeps its original hardwood floors and trim while adding updated wiring and a new roof. The detached one-car garage and long gravel driveway give room for a second vehicle or storage, and the fenced backyard gets afternoon sun for a garden bed or two.",
    price: 2650,
    listingType: "RENT",
    propertyType: "HOUSE",
    bedrooms: 3,
    bathrooms: 2,
    areaSqft: 1240,
    yearBuilt: 1948,
    address: "512 Willow Court",
    city: "Seattle",
    state: "WA",
    zip: "98103",
    amenities: "Original hardwood floors, Detached garage, Fenced backyard, New roof, Gas stove, Street parking permit included",
    agentIndex: 2,
    images: [img("1449844908441-8829872d2607"), img("1598928506311-c55ded91a20c"), img("1554995207-c18c203602cb"), img("1512918728675-ed5a9ecdebfd")],
  },
  {
    title: "Lakeside Modern Pool House",
    description:
      "Set on a flat lot that steps down to a lap pool and covered outdoor kitchen, this house was designed with the entertaining spaces at the back and bedrooms tucked toward the street for privacy. Sliding glass doors run the full width of the living room, and a bunk room off the pool deck sleeps four for weekend guests.",
    price: 1890000,
    listingType: "SALE",
    propertyType: "HOUSE",
    bedrooms: 4,
    bathrooms: 4,
    areaSqft: 3600,
    yearBuilt: 2018,
    address: "2260 Lakeshore Bend",
    city: "Austin",
    state: "TX",
    zip: "78732",
    amenities: "Lap pool, Outdoor kitchen, Bunk room, Full-width sliding doors, Owned solar panels, EV charger",
    agentIndex: 0,
    images: [img("1512917774080-9991f1c4c750"), img("1600607687939-ce8a6c25118c"), img("1600566753086-00f18fb6b3ea"), img("1615873968403-89e068629265")],
  },
  {
    title: "Sable Point Cottage",
    description:
      "A compact, single-story cottage built to Passive House standards, Sable Point stays warm through Portland winters on a fraction of the energy bills of comparable homes nearby. The open kitchen and living area lead out to a covered side porch, and both bedrooms sit at the quiet back of the lot away from the street.",
    price: 685000,
    listingType: "SALE",
    propertyType: "HOUSE",
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1180,
    yearBuilt: 2016,
    address: "918 Sable Point Way",
    city: "Portland",
    state: "OR",
    zip: "97202",
    amenities: "Passive House construction, Covered side porch, Triple-pane windows, Heat-pump HVAC, Rain garden, Bike storage",
    agentIndex: 1,
    images: [img("1523217582562-09d0def993a6"), img("1598928506311-c55ded91a20c"), img("1600210492486-724fe5c67fb0"), img("1493809842364-78817add7ffb")],
  },
  {
    title: "Palm Breeze Estate",
    description:
      "Palm Breeze sits on a corner lot behind a gated motor court, with a pool and summer kitchen shielded from the street by mature royal palms. The kitchen opens directly onto the pool deck through a folding glass wall, and a detached one-bedroom guest house over the garage has its own kitchenette and entrance.",
    price: 2290000,
    listingType: "SALE",
    propertyType: "HOUSE",
    bedrooms: 5,
    bathrooms: 4,
    areaSqft: 4120,
    yearBuilt: 2019,
    address: "455 Palm Breeze Cir",
    city: "Miami",
    state: "FL",
    zip: "33156",
    featured: true,
    amenities: "Gated motor court, Pool and summer kitchen, Detached guest house, Folding glass wall, Impact windows, Irrigation system",
    agentIndex: 2,
    images: [img("1600596542815-ffad4c1539a9"), img("1524230572899-a752b3835840"), img("1502672260266-1c1ef2d93688"), img("1615529182904-14819c35db37")],
  },
];

async function main() {
  console.log("Seeding Realster demo data...");

  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();
  await prisma.agent.deleteMany();

  const passwordHash = await hashPassword(DEMO_PASSWORD);

  const createdAgents = [];
  for (const agent of agentsSeed) {
    const created = await prisma.agent.create({
      data: { ...agent, passwordHash },
    });
    createdAgents.push(created);
  }

  for (const property of propertiesSeed) {
    const baseSlug = slugify(property.title);
    let slug = baseSlug;
    let attempt = 1;
    while (await prisma.property.findUnique({ where: { slug } })) {
      attempt += 1;
      slug = `${baseSlug}-${attempt}`;
    }

    const { agentIndex, images, ...data } = property;
    await prisma.property.create({
      data: {
        ...data,
        slug,
        agentId: createdAgents[agentIndex].id,
        images: {
          create: images.map((url, index) => ({
            url,
            alt: `${property.title} — photo ${index + 1}`,
            position: index,
          })),
        },
      },
    });
  }

  console.log(`Created ${createdAgents.length} agents and ${propertiesSeed.length} properties.`);
  console.log(`Demo agent login: ${agentsSeed[0].email} / ${DEMO_PASSWORD}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
