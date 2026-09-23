import path from "node:path";
import { PrismaClient, PropertyType, ListingType, AreaUnit } from "../src/generated/prisma";
import { hashPassword } from "../src/lib/password";
import { slugify } from "../src/lib/utils";

const prisma = new PrismaClient({
  datasources: { db: { url: `file:${path.join(process.cwd(), "prisma", "dev.db")}` } },
});

const DEMO_PASSWORD = "Realster123!";

const agentsSeed = [
  {
    name: "Kavitha Subramanian",
    email: "kavitha@realster.com",
    title: "Land Specialist — Pollachi & Kinathukadavu",
    phone: "+91 422 555 0148",
    licenseNo: "TN-RERA-CBE-2218",
    bio: "Kavitha works the Pollachi–Kinathukadavu belt: coconut groves, dry agricultural parcels, and DTCP plots on the Palakkad road. She grew up in Udumalpet, so she reads Patta and FMB sketches before she ever talks price.",
  },
  {
    name: "Arun Rajendran",
    email: "arun@realster.com",
    title: "Industrial & layout plots — Sulur, Annur",
    phone: "+91 422 555 0173",
    licenseNo: "TN-RERA-CBE-4401",
    bio: "Arun covers the NH-544 and Sulur–Annur industrial corridor. Buyers come to him for road frontage, EB connection status, and whether a survey number actually sits inside the approved layout.",
  },
  {
    name: "Meera Palanisamy",
    email: "meera@realster.com",
    title: "Hill-side land — Mettupalayam & Karamadai",
    phone: "+91 422 555 0119",
    licenseNo: "TN-RERA-CBE-3187",
    bio: "Meera lists farm land and residential plots toward the Nilgiris foothills. Most of her walkthroughs start with water — open well, bore depth, and how the parcel sits against the Bhavani slope.",
  },
];

type SeedProperty = {
  title: string;
  description: string;
  price: number;
  listingType: ListingType;
  propertyType: PropertyType;
  bedrooms?: number;
  bathrooms?: number;
  areaSqft: number;
  areaUnit: AreaUnit;
  yearBuilt?: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  featured?: boolean;
  amenities: string;
  agentIndex: number;
  images: string[];
};

const img = (id: string) => `/images/properties/${id}.jpg`;

const propertiesSeed: SeedProperty[] = [
  {
    title: "12-cent DTCP plot, Kalapatti",
    description:
      "A rectangular 12-cent residential plot inside an approved DTCP layout off Kalapatti Main Road. 30-ft internal road, storm-water drain already laid, and EB pole at the corner. Suitable for an independent house or a pair of row houses. Patta and FMB available with the listing agent.",
    price: 96_00_000,
    listingType: "SALE",
    propertyType: "PLOT",
    areaSqft: 12,
    areaUnit: "CENTS",
    address: "Plot 18, Sri Nagar Layout, Kalapatti",
    city: "Kalapatti",
    state: "Tamil Nadu",
    zip: "641048",
    featured: true,
    amenities: "DTCP approved, 30-ft road, EB pole on site, Storm-water drain, Clear Patta, Compound-ready",
    agentIndex: 1,
    images: [img("1582407947304-fd86f028f716"), img("1416879595882-3373a0480b5b"), img("1500382017468-9049fed747ef")],
  },
  {
    title: "2-acre coconut grove, Pollachi",
    description:
      "Bearing coconut grove on the Pollachi–Palakkad road, about 8 km from Pollachi bus stand. Open well plus a working 4-inch bore. Trees are mixed age — roughly two-thirds yielding. Approach is a tar road that can take a tractor-trailer. Title is a single survey number; no partition pending.",
    price: 1_85_00_000,
    listingType: "SALE",
    propertyType: "AGRICULTURAL",
    areaSqft: 2,
    areaUnit: "ACRES",
    address: "S.F. No. 214/2, Servakaranpalayam",
    city: "Pollachi",
    state: "Tamil Nadu",
    zip: "642001",
    featured: true,
    amenities: "Bearing coconut, Open well, Working bore, Tar-road access, Single survey number, Tractor access",
    agentIndex: 0,
    images: [img("1559827260-dc66d52bef19"), img("1560493676-04071c5f467b"), img("1574943320219-553eb213f72d"), img("1464226184884-fa280b87c399")],
  },
  {
    title: "1.5-acre industrial land, Sulur",
    description:
      "Level industrial parcel on the Sulur–Kangeyam stretch, 4 km from Sulur Air Force Station and close to the NH-544 service road. 40-ft frontage, three-phase line on the opposite side of the road, and no HT line crossing the plot. Suitable for a warehouse or light manufacturing shed.",
    price: 3_40_00_000,
    listingType: "SALE",
    propertyType: "INDUSTRIAL",
    areaSqft: 150,
    areaUnit: "CENTS",
    address: "S.F. No. 88/1B, Kangeyam Road",
    city: "Sulur",
    state: "Tamil Nadu",
    zip: "641402",
    featured: true,
    amenities: "40-ft frontage, Level ground, Near NH-544, Three-phase nearby, No HT crossing, Warehouse-ready",
    agentIndex: 1,
    images: [img("1582407947304-fd86f028f716"), img("1625246333195-78d9c38ad449"), img("1469474968028-56623f02e42e")],
  },
  {
    title: "6-cent corner plot, Thudiyalur",
    description:
      "Corner plot in a developed layout off Thudiyalur–Kavundampalayam Road. Both frontages are black-topped. Underground drainage and street lights are already in. Walking distance to the main bus route. Good for a compact two-storey house.",
    price: 58_00_000,
    listingType: "SALE",
    propertyType: "PLOT",
    areaSqft: 6,
    areaUnit: "CENTS",
    address: "Plot 7, Ganga Nagar, Thudiyalur",
    city: "Thudiyalur",
    state: "Tamil Nadu",
    zip: "641034",
    amenities: "Corner plot, Dual frontage, Underground drainage, Street lights, Bus route nearby, Clear title",
    agentIndex: 1,
    images: [img("1416879595882-3373a0480b5b"), img("1582407947304-fd86f028f716"), img("1500382017468-9049fed747ef")],
  },
  {
    title: "4-acre dry agricultural land, Kinathukadavu",
    description:
      "Dry agricultural land off the Coimbatore–Pollachi highway near Kinathukadavu. Red soil, currently under seasonal millet. A 6-inch bore was sunk two years ago and yields in the second summer month. Fencing is half-done on the eastern side. No conversion applied — sold as agricultural.",
    price: 1_20_00_000,
    listingType: "SALE",
    propertyType: "AGRICULTURAL",
    areaSqft: 4,
    areaUnit: "ACRES",
    address: "S.F. No. 156/3, Nallattipalayam",
    city: "Kinathukadavu",
    state: "Tamil Nadu",
    zip: "642109",
    featured: true,
    amenities: "Red soil, 6-inch bore, Highway access, Seasonal crop, Partial fencing, Agricultural title",
    agentIndex: 0,
    images: [img("1625246333195-78d9c38ad449"), img("1464226184884-fa280b87c399"), img("1574943320219-553eb213f72d"), img("1500382017468-9049fed747ef")],
  },
  {
    title: "Hill-view farm, Karamadai",
    description:
      "Three-acre farm facing the Nilgiris foothills, 6 km from Karamadai town. Mix of coconut, banana, and a small vegetable patch. Two open wells — one perennial. A tiled farmhouse of about 800 sq.ft sits at the higher end of the parcel and is sold with the land.",
    price: 2_15_00_000,
    listingType: "SALE",
    propertyType: "FARM",
    areaSqft: 3,
    areaUnit: "ACRES",
    address: "S.F. No. 42/2, Thekkampatti",
    city: "Karamadai",
    state: "Tamil Nadu",
    zip: "641104",
    featured: true,
    amenities: "Hill view, Two open wells, Coconut and banana, Small farmhouse, Perennial water, Fenced on three sides",
    agentIndex: 2,
    images: [img("1469474968028-56623f02e42e"), img("1470071459604-3b5ec3a7fe05"), img("1559827260-dc66d52bef19"), img("1472214103451-9374bd1c798e")],
  },
  {
    title: "10-cent layout plot, Annur",
    description:
      "DTCP-approved 10-cent plot in a quiet layout off the Annur–Mettupalayam road. Avenue trees are already planted. Water connection from the layout sump. 20 minutes to the Annur SIPCOT gate. Title is individual Patta in the seller's name.",
    price: 42_00_000,
    listingType: "SALE",
    propertyType: "PLOT",
    areaSqft: 10,
    areaUnit: "CENTS",
    address: "Plot 31, Bharathi Nagar, Annur",
    city: "Annur",
    state: "Tamil Nadu",
    zip: "641653",
    amenities: "DTCP approved, Layout sump, Avenue trees, Individual Patta, Near SIPCOT, 30-ft road",
    agentIndex: 1,
    images: [img("1500382017468-9049fed747ef"), img("1582407947304-fd86f028f716"), img("1416879595882-3373a0480b5b")],
  },
  {
    title: "8-cent plot, Vadavalli foothills",
    description:
      "Sloping 8-cent residential plot on the Vadavalli–Thondamuthur side, with a western view toward the reserved forest. Approach is a concrete lane from Marudhamalai Road. Building plan will need a retaining wall on the downhill edge — the agent has a rough estimate from a local mason.",
    price: 72_00_000,
    listingType: "SALE",
    propertyType: "PLOT",
    areaSqft: 8,
    areaUnit: "CENTS",
    address: "Site 4, Kanuvai Extension, Vadavalli",
    city: "Vadavalli",
    state: "Tamil Nadu",
    zip: "641041",
    amenities: "Forest-edge view, Concrete lane, Quiet pocket, Clear Patta, West-facing slope, House-site use",
    agentIndex: 2,
    images: [img("1542601906990-b4d3fb778b09"), img("1470071459604-3b5ec3a7fe05"), img("1469474968028-56623f02e42e")],
  },
  {
    title: "Commercial plot on Avinashi Road, Peelamedu",
    description:
      "40-ft frontage commercial plot on a service road off Avinashi Road, Peelamedu. Currently a vacant site with a temporary compound. Suitable for a showroom or office with parking in front. Zoning is commercial as per the local body extract attached to the listing.",
    price: 4_80_00_000,
    listingType: "SALE",
    propertyType: "COMMERCIAL",
    areaSqft: 9,
    areaUnit: "CENTS",
    address: "Site 2, Service Road, Peelamedu",
    city: "Peelamedu",
    state: "Tamil Nadu",
    zip: "641004",
    featured: true,
    amenities: "Avinashi Road access, 40-ft frontage, Commercial zoning, Compounded, Parking depth, Clear title",
    agentIndex: 1,
    images: [img("1582407947304-fd86f028f716"), img("1416879595882-3373a0480b5b"), img("1625246333195-78d9c38ad449")],
  },
  {
    title: "1-acre banana farm, Chettipalayam",
    description:
      "Irrigated banana farm south of Chettipalayam, fed by a 5-inch bore and drip lines already laid. Current crop is Nendran, planted last season. A farm road runs along the western boundary. Sold as agricultural land — conversion is the buyer's responsibility.",
    price: 78_00_000,
    listingType: "SALE",
    propertyType: "FARM",
    areaSqft: 1,
    areaUnit: "ACRES",
    address: "S.F. No. 73/4, Chettipalayam",
    city: "Chettipalayam",
    state: "Tamil Nadu",
    zip: "641201",
    amenities: "Drip irrigation, Working bore, Standing banana, Farm road, Agricultural title, Level land",
    agentIndex: 0,
    images: [img("1574943320219-553eb213f72d"), img("1560493676-04071c5f467b"), img("1464226184884-fa280b87c399")],
  },
  {
    title: "18-cent plot, Malumichampatti",
    description:
      "Large 18-cent plot near the Malumichampatti bypass, useful if you want a house plus a small garden or home-office block. Layout is LPA approved. Street is 40 ft, so a car porch on both sides is possible. Drainage and EB are live.",
    price: 1_05_00_000,
    listingType: "SALE",
    propertyType: "PLOT",
    areaSqft: 18,
    areaUnit: "CENTS",
    address: "Plot 12, Sowbagya Garden, Malumichampatti",
    city: "Malumichampatti",
    state: "Tamil Nadu",
    zip: "641050",
    amenities: "LPA approved, 40-ft street, Live EB, Drainage, Extra garden depth, Clear Patta",
    agentIndex: 0,
    images: [img("1500382017468-9049fed747ef"), img("1416879595882-3373a0480b5b"), img("1582407947304-fd86f028f716")],
  },
  {
    title: "50-cent agricultural parcel, Ettimadai",
    description:
      "Half-acre agricultural parcel behind Ettimadai railway station, with a seasonal stream on the southern edge. Currently fallow. Access is a 12-ft katcha road from the village; the panchayat has sanctioned a concrete stretch this year. Sold strictly as agricultural land.",
    price: 38_00_000,
    listingType: "SALE",
    propertyType: "AGRICULTURAL",
    areaSqft: 50,
    areaUnit: "CENTS",
    address: "S.F. No. 19/1, Ettimadai Village",
    city: "Ettimadai",
    state: "Tamil Nadu",
    zip: "641105",
    amenities: "Seasonal stream, Fallow now, Village access, Agricultural title, Quiet pocket, Near railway station",
    agentIndex: 2,
    images: [img("1472214103451-9374bd1c798e"), img("1625246333195-78d9c38ad449"), img("1542601906990-b4d3fb778b09")],
  },
  {
    title: "Industrial land near NH-544, Eachanari",
    description:
      "Seventy-five cents of industrial-use land just off the Eachanari–Madukkarai service road. High-tension line is two parcels away, not overhead. The site was previously used as an open timber yard, so the ground is compacted. Good for a logistics yard or fabrication unit.",
    price: 2_60_00_000,
    listingType: "SALE",
    propertyType: "INDUSTRIAL",
    areaSqft: 75,
    areaUnit: "CENTS",
    address: "S.F. No. 201/6, Eachanari",
    city: "Eachanari",
    state: "Tamil Nadu",
    zip: "641021",
    amenities: "Compacted ground, Near NH-544, No overhead HT, Previous yard use, 30-ft access, Industrial-use extract",
    agentIndex: 1,
    images: [img("1582407947304-fd86f028f716"), img("1469474968028-56623f02e42e"), img("1625246333195-78d9c38ad449")],
  },
  {
    title: "Mettupalayam farm with well, Odanthurai",
    description:
      "Two-acre farm on the Mettupalayam–Kothagiri ghat approach, cooler than the city by a few degrees most evenings. Perennial open well, a few silver oak along the western fence, and a small shed. Buyers usually come for weekend farming rather than commercial yield.",
    price: 1_48_00_000,
    listingType: "SALE",
    propertyType: "FARM",
    areaSqft: 2,
    areaUnit: "ACRES",
    address: "S.F. No. 11/5, Odanthurai",
    city: "Mettupalayam",
    state: "Tamil Nadu",
    zip: "641301",
    amenities: "Perennial well, Hill-approach climate, Silver oak fence, Small shed, Weekend-farm use, Clear title",
    agentIndex: 2,
    images: [img("1470071459604-3b5ec3a7fe05"), img("1542601906990-b4d3fb778b09"), img("1469474968028-56623f02e42e"), img("1559827260-dc66d52bef19")],
  },
  {
    title: "Independent house, Perur",
    description:
      "A 3-bedroom independent house on a 4-cent site near Perur Patteeswarar Temple road. Ground plus first floor, sit-out facing east, and parking for one car. Listed because the owner is moving to a farm they already bought through Realster — land is still the main book of business here.",
    price: 89_00_000,
    listingType: "SALE",
    propertyType: "HOUSE",
    bedrooms: 3,
    bathrooms: 3,
    areaSqft: 4,
    areaUnit: "CENTS",
    yearBuilt: 2014,
    address: "14, South Car Street extension, Perur",
    city: "Perur",
    state: "Tamil Nadu",
    zip: "641010",
    amenities: "3 BHK, East sit-out, Car park, Compounded, Near temple road, Independent house",
    agentIndex: 0,
    images: [img("1568605114967-8130f3a36994"), img("1570129477492-45c003edd2be"), img("1507525428034-b723cf961d3e")],
  },
];

async function main() {
  console.log("Seeding Realster Coimbatore land listings...");

  await prisma.propertyImage.deleteMany();
  await prisma.property.deleteMany();
  await prisma.agent.deleteMany();

  const passwordHash = await hashPassword(DEMO_PASSWORD);
  const createdAgents = [];
  for (const agent of agentsSeed) {
    createdAgents.push(await prisma.agent.create({ data: { ...agent, passwordHash } }));
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

  console.log(`Created ${createdAgents.length} agents and ${propertiesSeed.length} listings.`);
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
