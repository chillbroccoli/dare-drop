import { PrismaClient } from "@prisma/client";

import { PLATFORM } from "../src/constants/platform";

const prisma = new PrismaClient();

const streamers = [
  {
    id: "streamer_xqc",
    userId: "user123",
    name: "xQc",
    platform: PLATFORM.KICK,
    description:
      "Felix “xQc” Lengyel is a former professional Overwatch player for the Dallas Fuel and current content creator for Luminosity Gaming. After being released from the Fuel midway through the 2018 season, xQc turned his focus to streaming full-time and became the most watched Twitch streamer in 2020 and 2021. The Canadian star now streams a variety of games on Twitch to a massive audience of over 10.8 million followers.",
    imageUrl:
      "https://cdn-gpimp.nitrocdn.com/vTzoluTzZTLkHWokIofpiwxZUqCsFqqq/assets/images/optimized/rev-9f0df8c/wp-content/uploads/2022/06/xQcFeaturedImage-e1654726277850-300x300.png",
  },
  {
    userId: "user123",
    name: "tyler1",
    platform: PLATFORM.TWITCH,
    description:
      "Tyler Steinkamp, better known as tyler1, is an internet personality and streamer on Twitch. He is one of the most popular League of Legends online personalities with more than 5 million followers on Twitch. Steinkamp was banned from playing League of Legends from April 2016 to January 2018 for disruptive behavior towards other players, earning him the nickname of 'The Most Toxic Player in North America'.",
    imageUrl:
      "https://d1ki6hjeuoplax.cloudfront.net/images/_1200x630_crop_center-center_82_none/tyler1.jpg?mtime=1668606652",
  },
  {
    userId: "user123",
    name: "Theo Browne",
    platform: PLATFORM.YOUTUBE,
    description:
      "I make videos, dev tools, companies, and investments. Founder of @pingdotgg",
    imageUrl: "https://avatars.githubusercontent.com/u/6751787?v=4",
  },
  {
    userId: "user123",
    name: "moistcr1tikal",
    platform: PLATFORM.TWITCH,
    description:
      "Charlie White Jr., better known as penguinz0, is an American YouTuber, Twitch streamer, author, and podcaster. He is known for his YouTube Let's Play videos, often choosing horror-themed games. He is also known for his dry humor and comedic commentary. He is the author of the book Moist: A Memoir.",
    imageUrl:
      "https://assets.gamepur.com/wp-content/uploads/2021/10/09041621/moistcr1tikal.jpg",
  },
  {
    userId: "user123",
    name: "Ludwig",
    platform: PLATFORM.TWITCH,
    description:
      "Ludwig Ahgren is an American Twitch streamer, YouTuber, and esports commentator. He is best known for his live streams on Twitch, where he broadcasts video game-related content as well as non-video game-related content such as game shows, contests, and gambling. He is also known for his YouTube channel, where he uploads highlights from his Twitch streams.",
    imageUrl:
      "https://www.nme.com/wp-content/uploads/2021/03/Ludwig-Twitch-Streamer.jpg",
  },
];

export async function seed() {
  await prisma.vote.deleteMany();
  await prisma.streamer.deleteMany();

  const createStreamers = streamers.map((streamer) =>
    prisma.streamer.create({
      data: streamer,
    })
  );

  await prisma.$transaction(createStreamers);
}

seed()
  .then(async () => {
    // eslint-disable-next-line no-console
    console.log("Seeding complete 🌱");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
