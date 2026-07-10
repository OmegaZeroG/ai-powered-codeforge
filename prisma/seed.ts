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

  await prisma.problem.upsert({
    where: { slug: "contains-duplicate" },
    update: {},
    create: {
      title: "Contains Duplicate",
      slug: "contains-duplicate",
      statement:
        "Given an integer array `nums`, return `true` if any value appears at least twice in the array, and return `false` if every element is distinct.\n\nInput format: a single line with the array as space-separated integers.\nOutput format: `true` or `false`.",
      constraints: "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
      difficulty: "EASY",
      order: 2,
      topicId: topic.id,
      starterCode: {
        javascript:
          "function containsDuplicate(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(containsDuplicate(nums))",
        python:
          "def contains_duplicate(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(str(contains_duplicate(nums)).lower())",
      },
      testCases: {
        create: [
          { input: "1 2 3 1", expected: "true", isSample: true, order: 1 },
          { input: "1 2 3 4", expected: "false", isSample: true, order: 2 },
          {
            input: "1 1 1 3 3 4 3 2 4 2",
            expected: "true",
            isSample: false,
            order: 3,
          },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "best-time-to-buy-and-sell-stock" },
    update: {},
    create: {
      title: "Best Time to Buy and Sell Stock",
      slug: "best-time-to-buy-and-sell-stock",
      statement:
        "You are given an array `prices` where `prices[i]` is the price of a given stock on day `i`. You want to maximize your profit by choosing a single day to buy one stock and a different day in the future to sell that stock. Return the maximum profit you can achieve. Return `0` if no profit is possible.\n\nInput format: a single line with `prices` as space-separated integers.\nOutput format: a single integer, the maximum profit.",
      constraints: "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
      difficulty: "EASY",
      order: 3,
      topicId: topic.id,
      starterCode: {
        javascript:
          "function maxProfit(prices) {\n  // your code here\n}\n\nconst prices = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(maxProfit(prices))",
        python:
          "def max_profit(prices):\n    # your code here\n    pass\n\nimport sys\nprices = list(map(int, sys.stdin.readline().split()))\nprint(max_profit(prices))",
      },
      testCases: {
        create: [
          {
            input: "7 1 5 3 6 4",
            expected: "5",
            isSample: true,
            order: 1,
          },
          {
            input: "7 6 4 3 1",
            expected: "0",
            isSample: true,
            order: 2,
          },
          { input: "2 4 1", expected: "2", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "maximum-subarray" },
    update: {},
    create: {
      title: "Maximum Subarray",
      slug: "maximum-subarray",
      statement:
        "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum, and return its sum.\n\nInput format: a single line with `nums` as space-separated integers.\nOutput format: a single integer, the largest subarray sum.",
      constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
      difficulty: "MEDIUM",
      order: 4,
      topicId: topic.id,
      starterCode: {
        javascript:
          "function maxSubArray(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(maxSubArray(nums))",
        python:
          "def max_sub_array(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(max_sub_array(nums))",
      },
      testCases: {
        create: [
          {
            input: "-2 1 -3 4 -1 2 1 -5 4",
            expected: "6",
            isSample: true,
            order: 1,
          },
          { input: "1", expected: "1", isSample: true, order: 2 },
          {
            input: "5 4 -1 7 8",
            expected: "23",
            isSample: false,
            order: 3,
          },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "product-of-array-except-self" },
    update: {},
    create: {
      title: "Product of Array Except Self",
      slug: "product-of-array-except-self",
      statement:
        "Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nYou must write an algorithm that runs in O(n) time without using the division operation.\n\nInput format: a single line with `nums` as space-separated integers.\nOutput format: the resulting array as space-separated integers.",
      constraints:
        "2 <= nums.length <= 10^5\n-30 <= nums[i] <= 30\nThe product of any prefix or suffix of nums fits in a 32-bit integer.",
      difficulty: "MEDIUM",
      order: 5,
      topicId: topic.id,
      starterCode: {
        javascript:
          "function productExceptSelf(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(productExceptSelf(nums).join(' '))",
        python:
          "def product_except_self(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(*product_except_self(nums))",
      },
      testCases: {
        create: [
          {
            input: "1 2 3 4",
            expected: "24 12 8 6",
            isSample: true,
            order: 1,
          },
          {
            input: "-1 1 0 -3 3",
            expected: "0 0 9 0 0",
            isSample: true,
            order: 2,
          },
          { input: "2 3", expected: "3 2", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "longest-consecutive-sequence" },
    update: {},
    create: {
      title: "Longest Consecutive Sequence",
      slug: "longest-consecutive-sequence",
      statement:
        "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in O(n) time.\n\nInput format: a single line with `nums` as space-separated integers.\nOutput format: a single integer, the length of the longest consecutive sequence.",
      constraints: "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
      difficulty: "HARD",
      order: 6,
      topicId: topic.id,
      starterCode: {
        javascript:
          "function longestConsecutive(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(longestConsecutive(nums))",
        python:
          "def longest_consecutive(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(longest_consecutive(nums))",
      },
      testCases: {
        create: [
          {
            input: "100 4 200 1 3 2",
            expected: "4",
            isSample: true,
            order: 1,
          },
          {
            input: "0 3 7 2 5 8 4 6 0 1",
            expected: "9",
            isSample: true,
            order: 2,
          },
          {
            input: "1 2 0 1",
            expected: "3",
            isSample: false,
            order: 3,
          },
        ],
      },
    },
  });

  console.log("Seeded topic 'arrays' with 6 problems");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
