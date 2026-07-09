import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const topic = await prisma.topic.upsert({
    where: { slug: "arrays" },
    update: {},
    create: {
      name: "Arrays",
      slug: "arrays",
      description: "Foundational problems on arrays and hashing.",
      order: 1,
    },
  });

  await prisma.problem.upsert({
    where: { slug: "two-sum" },
    update: {},
    create: {
      title: "Two Sum",
      slug: "two-sum",
      statement:
        "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input has exactly one solution, and you may not use the same element twice.\n\nInput format: first line is the array as space-separated integers, second line is the target.\nOutput format: the two indices, space-separated, in ascending order.",
      constraints: "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9",
      difficulty: "EASY",
      order: 1,
      topicId: topic.id,
      starterCode: {
        javascript:
          "function twoSum(nums, target) {\n  // your code here\n}\n\nconst [nums, target] = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst arr = nums.split(' ').map(Number)\nconst t = Number(target)\nconsole.log(twoSum(arr, t).join(' '))",
        python:
          "def two_sum(nums, target):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\narr = list(map(int, lines[0].split()))\ntarget = int(lines[1])\nprint(*two_sum(arr, target))",
      },
      testCases: {
        create: [
          {
            input: "2 7 11 15\n9",
            expected: "0 1",
            isSample: true,
            order: 1,
          },
          {
            input: "3 2 4\n6",
            expected: "1 2",
            isSample: true,
            order: 2,
          },
          {
            input: "3 3\n6",
            expected: "0 1",
            isSample: false,
            order: 3,
          },
        ],
      },
    },
  });

  console.log("Seeded topic 'arrays' and problem 'two-sum'");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
