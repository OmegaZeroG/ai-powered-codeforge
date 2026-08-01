import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  const topic = await prisma.topic.upsert({
    where: { slug: "arrays" },
    update: {
      name: "Arrays",
      slug: "arrays",
      description: "Foundational problems on arrays and hashing.",
      order: 1,
    },
    create: {
      name: "Arrays",
      slug: "arrays",
      description: "Foundational problems on arrays and hashing.",
      order: 1,
    },
  });

  await prisma.problem.upsert({
    where: { slug: "two-sum" },
    update: {
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
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // your code here\n    return {};\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    int target = stoi(line2);\n    vector<int> res = twoSum(nums, target);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        python:
          "def two_sum(nums, target):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\narr = list(map(int, lines[0].split()))\ntarget = int(lines[1])\nprint(*two_sum(arr, target))",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int[] twoSum(int[] nums, int target) {\n        // your code here\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);\n        int target = Integer.parseInt(sc.nextLine().trim());\n        int[] res = twoSum(nums, target);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < res.length; i++) {\n            if (i > 0) sb.append(\" \");\n            sb.append(res[i]);\n        }\n        System.out.println(sb.toString());\n    }\n}",
      },
      testCases: {
        deleteMany: {},
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
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& nums, int target) {\n    // your code here\n    return {};\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    int target = stoi(line2);\n    vector<int> res = twoSum(nums, target);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        python:
          "def two_sum(nums, target):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\narr = list(map(int, lines[0].split()))\ntarget = int(lines[1])\nprint(*two_sum(arr, target))",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int[] twoSum(int[] nums, int target) {\n        // your code here\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);\n        int target = Integer.parseInt(sc.nextLine().trim());\n        int[] res = twoSum(nums, target);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < res.length; i++) {\n            if (i > 0) sb.append(\" \");\n            sb.append(res[i]);\n        }\n        System.out.println(sb.toString());\n    }\n}",
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
    update: {
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
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool containsDuplicate(vector<int>& nums) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << (containsDuplicate(nums) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static boolean containsDuplicate(int[] nums) {\n        // your code here\n        return false;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(containsDuplicate(nums) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def contains_duplicate(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(str(contains_duplicate(nums)).lower())",
      },
      testCases: {
        deleteMany: {},
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
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool containsDuplicate(vector<int>& nums) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << (containsDuplicate(nums) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static boolean containsDuplicate(int[] nums) {\n        // your code here\n        return false;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(containsDuplicate(nums) ? \"true\" : \"false\");\n    }\n}",
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
    update: {
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
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint maxProfit(vector<int>& prices) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> prices;\n    int x;\n    while (ss >> x) prices.push_back(x);\n    cout << maxProfit(prices) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int maxProfit(int[] prices) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] prices = parseInts(br.readLine());\n        System.out.println(maxProfit(prices));\n    }\n}",
        python:
          "def max_profit(prices):\n    # your code here\n    pass\n\nimport sys\nprices = list(map(int, sys.stdin.readline().split()))\nprint(max_profit(prices))",
      },
      testCases: {
        deleteMany: {},
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
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint maxProfit(vector<int>& prices) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> prices;\n    int x;\n    while (ss >> x) prices.push_back(x);\n    cout << maxProfit(prices) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int maxProfit(int[] prices) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] prices = parseInts(br.readLine());\n        System.out.println(maxProfit(prices));\n    }\n}",
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
    update: {
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
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint maxSubArray(vector<int>& nums) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << maxSubArray(nums) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int maxSubArray(int[] nums) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(maxSubArray(nums));\n    }\n}",
        python:
          "def max_sub_array(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(max_sub_array(nums))",
      },
      testCases: {
        deleteMany: {},
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
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint maxSubArray(vector<int>& nums) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << maxSubArray(nums) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int maxSubArray(int[] nums) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(maxSubArray(nums));\n    }\n}",
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
    update: {
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
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> productExceptSelf(vector<int>& nums) {\n    // your code here\n    return {};\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    vector<int> res = productExceptSelf(nums);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int[] productExceptSelf(int[] nums) {\n        // your code here\n        return new int[]{};\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(join(productExceptSelf(nums)));\n    }\n}",
        python:
          "def product_except_self(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(*product_except_self(nums))",
      },
      testCases: {
        deleteMany: {},
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
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> productExceptSelf(vector<int>& nums) {\n    // your code here\n    return {};\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    vector<int> res = productExceptSelf(nums);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int[] productExceptSelf(int[] nums) {\n        // your code here\n        return new int[]{};\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(join(productExceptSelf(nums)));\n    }\n}",
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
    update: {
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
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint longestConsecutive(vector<int>& nums) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << longestConsecutive(nums) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int longestConsecutive(int[] nums) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(longestConsecutive(nums));\n    }\n}",
        python:
          "def longest_consecutive(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(longest_consecutive(nums))",
      },
      testCases: {
        deleteMany: {},
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
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint longestConsecutive(vector<int>& nums) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << longestConsecutive(nums) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int longestConsecutive(int[] nums) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(longestConsecutive(nums));\n    }\n}",
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

  const twoPointers = await prisma.topic.upsert({
    where: { slug: "two-pointers" },
    update: {
      name: "Two Pointers",
      slug: "two-pointers",
      description: "Problems solved by moving two indices toward or away from each other.",
      order: 2,
    },
    create: {
      name: "Two Pointers",
      slug: "two-pointers",
      description: "Problems solved by moving two indices toward or away from each other.",
      order: 2,
    },
  });

  await prisma.problem.upsert({
    where: { slug: "valid-palindrome" },
    update: {
      title: "Valid Palindrome",
      slug: "valid-palindrome",
      statement:
        "Given a string `s`, return `true` if it is a palindrome after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, and `false` otherwise.\n\nInput format: a single line containing the string `s`.\nOutput format: `true` or `false`.",
      constraints: "1 <= s.length <= 2 * 10^5\ns consists of printable ASCII characters.",
      difficulty: "EASY",
      order: 1,
      topicId: twoPointers.id,
      starterCode: {
        javascript:
          "function isPalindrome(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').trim()\nconsole.log(isPalindrome(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool isPalindrome(string s) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << (isPalindrome(s) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static boolean isPalindrome(String s) {\n        // your code here\n        return false;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        System.out.println(isPalindrome(s) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def is_palindrome(s):\n    # your code here\n    pass\n\nimport sys\ns = sys.stdin.readline().rstrip('\\n')\nprint(str(is_palindrome(s)).lower())",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "A man, a plan, a canal: Panama", expected: "true", isSample: true, order: 1 },
          { input: "race a car", expected: "false", isSample: true, order: 2 },
          { input: "0P", expected: "false", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Valid Palindrome",
      slug: "valid-palindrome",
      statement:
        "Given a string `s`, return `true` if it is a palindrome after converting all uppercase letters to lowercase and removing all non-alphanumeric characters, and `false` otherwise.\n\nInput format: a single line containing the string `s`.\nOutput format: `true` or `false`.",
      constraints: "1 <= s.length <= 2 * 10^5\ns consists of printable ASCII characters.",
      difficulty: "EASY",
      order: 1,
      topicId: twoPointers.id,
      starterCode: {
        javascript:
          "function isPalindrome(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').trim()\nconsole.log(isPalindrome(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool isPalindrome(string s) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << (isPalindrome(s) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static boolean isPalindrome(String s) {\n        // your code here\n        return false;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        System.out.println(isPalindrome(s) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def is_palindrome(s):\n    # your code here\n    pass\n\nimport sys\ns = sys.stdin.readline().rstrip('\\n')\nprint(str(is_palindrome(s)).lower())",
      },
      testCases: {
        create: [
          { input: "A man, a plan, a canal: Panama", expected: "true", isSample: true, order: 1 },
          { input: "race a car", expected: "false", isSample: true, order: 2 },
          { input: "0P", expected: "false", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "two-sum-ii-input-array-is-sorted" },
    update: {
      title: "Two Sum II - Input Array Is Sorted",
      slug: "two-sum-ii-input-array-is-sorted",
      statement:
        "Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number. Return the indices of the two numbers (1-indexed) as `index1 < index2`.\n\nYou may assume each input has exactly one solution, and you may not use the same element twice.\n\nInput format: first line is `numbers` as space-separated integers, second line is `target`.\nOutput format: the two 1-indexed positions, space-separated, in ascending order.",
      constraints:
        "2 <= numbers.length <= 3 * 10^4\n-1000 <= numbers[i] <= 1000\nnumbers is sorted in non-decreasing order.",
      difficulty: "EASY",
      order: 2,
      topicId: twoPointers.id,
      starterCode: {
        javascript:
          "function twoSum(numbers, target) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst numbers = lines[0].split(' ').map(Number)\nconst target = Number(lines[1])\nconsole.log(twoSum(numbers, target).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& numbers, int target) {\n    // your code here\n    return {};\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> numbers;\n    int x;\n    while (ss >> x) numbers.push_back(x);\n    int target = stoi(line2);\n    vector<int> res = twoSum(numbers, target);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int[] twoSum(int[] numbers, int target) {\n        // your code here\n        return new int[]{};\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] numbers = parseInts(br.readLine());\n        int target = Integer.parseInt(br.readLine().trim());\n        System.out.println(join(twoSum(numbers, target)));\n    }\n}",
        python:
          "def two_sum(numbers, target):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnumbers = list(map(int, lines[0].split()))\ntarget = int(lines[1])\nprint(*two_sum(numbers, target))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "2 7 11 15\n9", expected: "1 2", isSample: true, order: 1 },
          { input: "2 3 4\n6", expected: "1 3", isSample: true, order: 2 },
          { input: "-1 0\n-1", expected: "1 2", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Two Sum II - Input Array Is Sorted",
      slug: "two-sum-ii-input-array-is-sorted",
      statement:
        "Given a 1-indexed array of integers `numbers` that is already sorted in non-decreasing order, find two numbers such that they add up to a specific `target` number. Return the indices of the two numbers (1-indexed) as `index1 < index2`.\n\nYou may assume each input has exactly one solution, and you may not use the same element twice.\n\nInput format: first line is `numbers` as space-separated integers, second line is `target`.\nOutput format: the two 1-indexed positions, space-separated, in ascending order.",
      constraints:
        "2 <= numbers.length <= 3 * 10^4\n-1000 <= numbers[i] <= 1000\nnumbers is sorted in non-decreasing order.",
      difficulty: "EASY",
      order: 2,
      topicId: twoPointers.id,
      starterCode: {
        javascript:
          "function twoSum(numbers, target) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst numbers = lines[0].split(' ').map(Number)\nconst target = Number(lines[1])\nconsole.log(twoSum(numbers, target).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> twoSum(vector<int>& numbers, int target) {\n    // your code here\n    return {};\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> numbers;\n    int x;\n    while (ss >> x) numbers.push_back(x);\n    int target = stoi(line2);\n    vector<int> res = twoSum(numbers, target);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int[] twoSum(int[] numbers, int target) {\n        // your code here\n        return new int[]{};\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] numbers = parseInts(br.readLine());\n        int target = Integer.parseInt(br.readLine().trim());\n        System.out.println(join(twoSum(numbers, target)));\n    }\n}",
        python:
          "def two_sum(numbers, target):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnumbers = list(map(int, lines[0].split()))\ntarget = int(lines[1])\nprint(*two_sum(numbers, target))",
      },
      testCases: {
        create: [
          { input: "2 7 11 15\n9", expected: "1 2", isSample: true, order: 1 },
          { input: "2 3 4\n6", expected: "1 3", isSample: true, order: 2 },
          { input: "-1 0\n-1", expected: "1 2", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "container-with-most-water" },
    update: {
      title: "Container With Most Water",
      slug: "container-with-most-water",
      statement:
        "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of line `i` are `(i, 0)` and `(i, height[i])`. Find two lines that, together with the x-axis, form a container that holds the most water. Return the maximum amount of water a container can store.\n\nInput format: a single line with `height` as space-separated integers.\nOutput format: a single integer, the maximum area.",
      constraints: "2 <= height.length <= 10^5\n0 <= height[i] <= 10^4",
      difficulty: "MEDIUM",
      order: 3,
      topicId: twoPointers.id,
      starterCode: {
        javascript:
          "function maxArea(height) {\n  // your code here\n}\n\nconst height = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(maxArea(height))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint maxArea(vector<int>& height) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> height;\n    int x;\n    while (ss >> x) height.push_back(x);\n    cout << maxArea(height) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int maxArea(int[] height) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] height = parseInts(br.readLine());\n        System.out.println(maxArea(height));\n    }\n}",
        python:
          "def max_area(height):\n    # your code here\n    pass\n\nimport sys\nheight = list(map(int, sys.stdin.readline().split()))\nprint(max_area(height))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "1 8 6 2 5 4 8 3 7", expected: "49", isSample: true, order: 1 },
          { input: "1 1", expected: "1", isSample: true, order: 2 },
          { input: "4 3 2 1 4", expected: "16", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Container With Most Water",
      slug: "container-with-most-water",
      statement:
        "You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of line `i` are `(i, 0)` and `(i, height[i])`. Find two lines that, together with the x-axis, form a container that holds the most water. Return the maximum amount of water a container can store.\n\nInput format: a single line with `height` as space-separated integers.\nOutput format: a single integer, the maximum area.",
      constraints: "2 <= height.length <= 10^5\n0 <= height[i] <= 10^4",
      difficulty: "MEDIUM",
      order: 3,
      topicId: twoPointers.id,
      starterCode: {
        javascript:
          "function maxArea(height) {\n  // your code here\n}\n\nconst height = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(maxArea(height))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint maxArea(vector<int>& height) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> height;\n    int x;\n    while (ss >> x) height.push_back(x);\n    cout << maxArea(height) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int maxArea(int[] height) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] height = parseInts(br.readLine());\n        System.out.println(maxArea(height));\n    }\n}",
        python:
          "def max_area(height):\n    # your code here\n    pass\n\nimport sys\nheight = list(map(int, sys.stdin.readline().split()))\nprint(max_area(height))",
      },
      testCases: {
        create: [
          { input: "1 8 6 2 5 4 8 3 7", expected: "49", isSample: true, order: 1 },
          { input: "1 1", expected: "1", isSample: true, order: 2 },
          { input: "4 3 2 1 4", expected: "16", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "3sum" },
    update: {
      title: "3Sum",
      slug: "3sum",
      statement:
        "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. The result must not contain duplicate triplets.\n\nOutput format: print each triplet on its own line with its values space-separated in ascending order; order the triplets by ascending first value, then ascending second value. If there are no such triplets, print nothing.\n\nInput format: a single line with `nums` as space-separated integers.",
      constraints: "3 <= nums.length <= 3000\n-10^5 <= nums[i] <= 10^5",
      difficulty: "MEDIUM",
      order: 4,
      topicId: twoPointers.id,
      starterCode: {
        javascript:
          "function threeSum(nums) {\n  // your code here — return an array of triplet arrays, e.g. [[-1,-1,2],[-1,0,1]]\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconst result = threeSum(nums)\nconsole.log(result.map(t => t.join(' ')).join('\\n'))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<vector<int>> threeSum(vector<int>& nums) {\n    // your code here — return a vector of triplet vectors, e.g. {{-1,-1,2},{-1,0,1}}\n    return {};\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    vector<vector<int>> result = threeSum(nums);\n    for (size_t i = 0; i < result.size(); i++) {\n        for (size_t j = 0; j < result[i].size(); j++) cout << result[i][j] << (j + 1 < result[i].size() ? \" \" : \"\");\n        if (i + 1 < result.size()) cout << \"\\n\";\n    }\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static List<List<Integer>> threeSum(int[] nums) {\n        // your code here — return a list of triplets, e.g. [[-1,-1,2],[-1,0,1]]\n        return new ArrayList<>();\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        List<List<Integer>> result = threeSum(nums);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < result.size(); i++) {\n            List<Integer> t = result.get(i);\n            for (int j = 0; j < t.size(); j++) { if (j > 0) sb.append(\" \"); sb.append(t.get(j)); }\n            if (i + 1 < result.size()) sb.append(\"\\n\");\n        }\n        System.out.println(sb.toString());\n    }\n}",
        python:
          "def three_sum(nums):\n    # your code here — return a list of triplet lists, e.g. [[-1,-1,2],[-1,0,1]]\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nresult = three_sum(nums)\nprint('\\n'.join(' '.join(map(str, t)) for t in result))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "-1 0 1 2 -1 -4", expected: "-1 -1 2\n-1 0 1", isSample: true, order: 1 },
          { input: "0 1 1", expected: "", isSample: true, order: 2 },
          { input: "0 0 0", expected: "0 0 0", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "3Sum",
      slug: "3sum",
      statement:
        "Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, `j != k`, and `nums[i] + nums[j] + nums[k] == 0`. The result must not contain duplicate triplets.\n\nOutput format: print each triplet on its own line with its values space-separated in ascending order; order the triplets by ascending first value, then ascending second value. If there are no such triplets, print nothing.\n\nInput format: a single line with `nums` as space-separated integers.",
      constraints: "3 <= nums.length <= 3000\n-10^5 <= nums[i] <= 10^5",
      difficulty: "MEDIUM",
      order: 4,
      topicId: twoPointers.id,
      starterCode: {
        javascript:
          "function threeSum(nums) {\n  // your code here — return an array of triplet arrays, e.g. [[-1,-1,2],[-1,0,1]]\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconst result = threeSum(nums)\nconsole.log(result.map(t => t.join(' ')).join('\\n'))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<vector<int>> threeSum(vector<int>& nums) {\n    // your code here — return a vector of triplet vectors, e.g. {{-1,-1,2},{-1,0,1}}\n    return {};\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    vector<vector<int>> result = threeSum(nums);\n    for (size_t i = 0; i < result.size(); i++) {\n        for (size_t j = 0; j < result[i].size(); j++) cout << result[i][j] << (j + 1 < result[i].size() ? \" \" : \"\");\n        if (i + 1 < result.size()) cout << \"\\n\";\n    }\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static List<List<Integer>> threeSum(int[] nums) {\n        // your code here — return a list of triplets, e.g. [[-1,-1,2],[-1,0,1]]\n        return new ArrayList<>();\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        List<List<Integer>> result = threeSum(nums);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < result.size(); i++) {\n            List<Integer> t = result.get(i);\n            for (int j = 0; j < t.size(); j++) { if (j > 0) sb.append(\" \"); sb.append(t.get(j)); }\n            if (i + 1 < result.size()) sb.append(\"\\n\");\n        }\n        System.out.println(sb.toString());\n    }\n}",
        python:
          "def three_sum(nums):\n    # your code here — return a list of triplet lists, e.g. [[-1,-1,2],[-1,0,1]]\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nresult = three_sum(nums)\nprint('\\n'.join(' '.join(map(str, t)) for t in result))",
      },
      testCases: {
        create: [
          { input: "-1 0 1 2 -1 -4", expected: "-1 -1 2\n-1 0 1", isSample: true, order: 1 },
          { input: "0 1 1", expected: "", isSample: true, order: 2 },
          { input: "0 0 0", expected: "0 0 0", isSample: false, order: 3 },
        ],
      },
    },
  });

  const slidingWindow = await prisma.topic.upsert({
    where: { slug: "sliding-window" },
    update: {
      name: "Sliding Window",
      slug: "sliding-window",
      description: "Problems solved by maintaining a variable- or fixed-size window over the input.",
      order: 3,
    },
    create: {
      name: "Sliding Window",
      slug: "sliding-window",
      description: "Problems solved by maintaining a variable- or fixed-size window over the input.",
      order: 3,
    },
  });

  await prisma.problem.upsert({
    where: { slug: "maximum-sum-subarray-of-size-k" },
    update: {
      title: "Maximum Sum Subarray of Size K",
      slug: "maximum-sum-subarray-of-size-k",
      statement:
        "Given an integer array `nums` and an integer `k`, find the maximum sum of any contiguous subarray of length `k`.\n\nInput format: first line is `nums` as space-separated integers, second line is `k`.\nOutput format: a single integer, the maximum sum.",
      constraints: "1 <= k <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
      difficulty: "EASY",
      order: 1,
      topicId: slidingWindow.id,
      starterCode: {
        javascript:
          "function maxSumSubarray(nums, k) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst nums = lines[0].split(' ').map(Number)\nconst k = Number(lines[1])\nconsole.log(maxSumSubarray(nums, k))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint maxSumSubarray(vector<int>& nums, int k) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    int k = stoi(line2);\n    cout << maxSumSubarray(nums, k) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int maxSumSubarray(int[] nums, int k) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        int k = Integer.parseInt(br.readLine().trim());\n        System.out.println(maxSumSubarray(nums, k));\n    }\n}",
        python:
          "def max_sum_subarray(nums, k):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnums = list(map(int, lines[0].split()))\nk = int(lines[1])\nprint(max_sum_subarray(nums, k))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "2 1 5 1 3 2\n3", expected: "9", isSample: true, order: 1 },
          { input: "2 3 4 1 5\n2", expected: "7", isSample: true, order: 2 },
          { input: "1 1 1 1 1\n4", expected: "4", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Maximum Sum Subarray of Size K",
      slug: "maximum-sum-subarray-of-size-k",
      statement:
        "Given an integer array `nums` and an integer `k`, find the maximum sum of any contiguous subarray of length `k`.\n\nInput format: first line is `nums` as space-separated integers, second line is `k`.\nOutput format: a single integer, the maximum sum.",
      constraints: "1 <= k <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
      difficulty: "EASY",
      order: 1,
      topicId: slidingWindow.id,
      starterCode: {
        javascript:
          "function maxSumSubarray(nums, k) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst nums = lines[0].split(' ').map(Number)\nconst k = Number(lines[1])\nconsole.log(maxSumSubarray(nums, k))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint maxSumSubarray(vector<int>& nums, int k) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    int k = stoi(line2);\n    cout << maxSumSubarray(nums, k) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int maxSumSubarray(int[] nums, int k) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        int k = Integer.parseInt(br.readLine().trim());\n        System.out.println(maxSumSubarray(nums, k));\n    }\n}",
        python:
          "def max_sum_subarray(nums, k):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnums = list(map(int, lines[0].split()))\nk = int(lines[1])\nprint(max_sum_subarray(nums, k))",
      },
      testCases: {
        create: [
          { input: "2 1 5 1 3 2\n3", expected: "9", isSample: true, order: 1 },
          { input: "2 3 4 1 5\n2", expected: "7", isSample: true, order: 2 },
          { input: "1 1 1 1 1\n4", expected: "4", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "longest-substring-without-repeating-characters" },
    update: {
      title: "Longest Substring Without Repeating Characters",
      slug: "longest-substring-without-repeating-characters",
      statement:
        "Given a string `s`, find the length of the longest substring without repeating characters.\n\nInput format: a single line containing the string `s`.\nOutput format: a single integer, the length of the longest substring without repeating characters.",
      constraints: "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols, and spaces.",
      difficulty: "MEDIUM",
      order: 2,
      topicId: slidingWindow.id,
      starterCode: {
        javascript:
          "function lengthOfLongestSubstring(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').replace(/\\n$/, '')\nconsole.log(lengthOfLongestSubstring(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint lengthOfLongestSubstring(string s) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << lengthOfLongestSubstring(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int lengthOfLongestSubstring(String s) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        System.out.println(lengthOfLongestSubstring(s));\n    }\n}",
        python:
          "def length_of_longest_substring(s):\n    # your code here\n    pass\n\nimport sys\ns = sys.stdin.readline().rstrip('\\n')\nprint(length_of_longest_substring(s))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "abcabcbb", expected: "3", isSample: true, order: 1 },
          { input: "bbbbb", expected: "1", isSample: true, order: 2 },
          { input: "pwwkew", expected: "3", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Longest Substring Without Repeating Characters",
      slug: "longest-substring-without-repeating-characters",
      statement:
        "Given a string `s`, find the length of the longest substring without repeating characters.\n\nInput format: a single line containing the string `s`.\nOutput format: a single integer, the length of the longest substring without repeating characters.",
      constraints: "0 <= s.length <= 5 * 10^4\ns consists of English letters, digits, symbols, and spaces.",
      difficulty: "MEDIUM",
      order: 2,
      topicId: slidingWindow.id,
      starterCode: {
        javascript:
          "function lengthOfLongestSubstring(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').replace(/\\n$/, '')\nconsole.log(lengthOfLongestSubstring(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint lengthOfLongestSubstring(string s) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << lengthOfLongestSubstring(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int lengthOfLongestSubstring(String s) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        System.out.println(lengthOfLongestSubstring(s));\n    }\n}",
        python:
          "def length_of_longest_substring(s):\n    # your code here\n    pass\n\nimport sys\ns = sys.stdin.readline().rstrip('\\n')\nprint(length_of_longest_substring(s))",
      },
      testCases: {
        create: [
          { input: "abcabcbb", expected: "3", isSample: true, order: 1 },
          { input: "bbbbb", expected: "1", isSample: true, order: 2 },
          { input: "pwwkew", expected: "3", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "minimum-size-subarray-sum" },
    update: {
      title: "Minimum Size Subarray Sum",
      slug: "minimum-size-subarray-sum",
      statement:
        "Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a contiguous subarray of which the sum is greater than or equal to `target`. If there is no such subarray, return `0` instead.\n\nInput format: first line is `target`, second line is `nums` as space-separated integers.\nOutput format: a single integer, the minimal length (or `0` if none exists).",
      constraints: "1 <= target <= 10^9\n1 <= nums.length <= 10^5\n1 <= nums[i] <= 10^4",
      difficulty: "MEDIUM",
      order: 3,
      topicId: slidingWindow.id,
      starterCode: {
        javascript:
          "function minSubArrayLen(target, nums) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst target = Number(lines[0])\nconst nums = lines[1].split(' ').map(Number)\nconsole.log(minSubArrayLen(target, nums))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint minSubArrayLen(int target, vector<int>& nums) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    int target = stoi(line1);\n    stringstream ss(line2);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << minSubArrayLen(target, nums) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int minSubArrayLen(int target, int[] nums) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int target = Integer.parseInt(br.readLine().trim());\n        int[] nums = parseInts(br.readLine());\n        System.out.println(minSubArrayLen(target, nums));\n    }\n}",
        python:
          "def min_sub_array_len(target, nums):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ntarget = int(lines[0])\nnums = list(map(int, lines[1].split()))\nprint(min_sub_array_len(target, nums))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "7\n2 3 1 2 4 3", expected: "2", isSample: true, order: 1 },
          { input: "4\n1 4 4", expected: "1", isSample: true, order: 2 },
          { input: "11\n1 1 1 1 1 1 1 1", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Minimum Size Subarray Sum",
      slug: "minimum-size-subarray-sum",
      statement:
        "Given an array of positive integers `nums` and a positive integer `target`, return the minimal length of a contiguous subarray of which the sum is greater than or equal to `target`. If there is no such subarray, return `0` instead.\n\nInput format: first line is `target`, second line is `nums` as space-separated integers.\nOutput format: a single integer, the minimal length (or `0` if none exists).",
      constraints: "1 <= target <= 10^9\n1 <= nums.length <= 10^5\n1 <= nums[i] <= 10^4",
      difficulty: "MEDIUM",
      order: 3,
      topicId: slidingWindow.id,
      starterCode: {
        javascript:
          "function minSubArrayLen(target, nums) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst target = Number(lines[0])\nconst nums = lines[1].split(' ').map(Number)\nconsole.log(minSubArrayLen(target, nums))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint minSubArrayLen(int target, vector<int>& nums) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    int target = stoi(line1);\n    stringstream ss(line2);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << minSubArrayLen(target, nums) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int minSubArrayLen(int target, int[] nums) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int target = Integer.parseInt(br.readLine().trim());\n        int[] nums = parseInts(br.readLine());\n        System.out.println(minSubArrayLen(target, nums));\n    }\n}",
        python:
          "def min_sub_array_len(target, nums):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ntarget = int(lines[0])\nnums = list(map(int, lines[1].split()))\nprint(min_sub_array_len(target, nums))",
      },
      testCases: {
        create: [
          { input: "7\n2 3 1 2 4 3", expected: "2", isSample: true, order: 1 },
          { input: "4\n1 4 4", expected: "1", isSample: true, order: 2 },
          { input: "11\n1 1 1 1 1 1 1 1", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "longest-repeating-character-replacement" },
    update: {
      title: "Longest Repeating Character Replacement",
      slug: "longest-repeating-character-replacement",
      statement:
        "You are given a string `s` consisting of only uppercase English letters and an integer `k`. You can choose up to `k` characters of the string and replace them with any uppercase English letter. Return the length of the longest substring containing the same letter you can get after performing at most `k` replacements.\n\nInput format: first line is the string `s`, second line is the integer `k`.\nOutput format: a single integer, the length of the longest such substring.",
      constraints: "1 <= s.length <= 10^5\ns consists of only uppercase English letters.\n0 <= k <= s.length",
      difficulty: "HARD",
      order: 4,
      topicId: slidingWindow.id,
      starterCode: {
        javascript:
          "function characterReplacement(s, k) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst s = lines[0]\nconst k = Number(lines[1])\nconsole.log(characterReplacement(s, k))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint characterReplacement(string s, int k) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string s, line2;\n    getline(cin, s);\n    getline(cin, line2);\n    int k = stoi(line2);\n    cout << characterReplacement(s, k) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int characterReplacement(String s, int k) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        int k = Integer.parseInt(br.readLine().trim());\n        System.out.println(characterReplacement(s, k));\n    }\n}",
        python:
          "def character_replacement(s, k):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ns = lines[0]\nk = int(lines[1])\nprint(character_replacement(s, k))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "ABAB\n2", expected: "4", isSample: true, order: 1 },
          { input: "AABABBA\n1", expected: "4", isSample: true, order: 2 },
          { input: "ABCDE\n1", expected: "2", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Longest Repeating Character Replacement",
      slug: "longest-repeating-character-replacement",
      statement:
        "You are given a string `s` consisting of only uppercase English letters and an integer `k`. You can choose up to `k` characters of the string and replace them with any uppercase English letter. Return the length of the longest substring containing the same letter you can get after performing at most `k` replacements.\n\nInput format: first line is the string `s`, second line is the integer `k`.\nOutput format: a single integer, the length of the longest such substring.",
      constraints: "1 <= s.length <= 10^5\ns consists of only uppercase English letters.\n0 <= k <= s.length",
      difficulty: "HARD",
      order: 4,
      topicId: slidingWindow.id,
      starterCode: {
        javascript:
          "function characterReplacement(s, k) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst s = lines[0]\nconst k = Number(lines[1])\nconsole.log(characterReplacement(s, k))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint characterReplacement(string s, int k) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string s, line2;\n    getline(cin, s);\n    getline(cin, line2);\n    int k = stoi(line2);\n    cout << characterReplacement(s, k) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int characterReplacement(String s, int k) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        int k = Integer.parseInt(br.readLine().trim());\n        System.out.println(characterReplacement(s, k));\n    }\n}",
        python:
          "def character_replacement(s, k):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ns = lines[0]\nk = int(lines[1])\nprint(character_replacement(s, k))",
      },
      testCases: {
        create: [
          { input: "ABAB\n2", expected: "4", isSample: true, order: 1 },
          { input: "AABABBA\n1", expected: "4", isSample: true, order: 2 },
          { input: "ABCDE\n1", expected: "2", isSample: false, order: 3 },
        ],
      },
    },
  });

  const binarySearch = await prisma.topic.upsert({
    where: { slug: "binary-search" },
    update: {
      name: "Binary Search",
      slug: "binary-search",
      description: "Problems solved by repeatedly halving a sorted search space.",
      order: 4,
    },
    create: {
      name: "Binary Search",
      slug: "binary-search",
      description: "Problems solved by repeatedly halving a sorted search space.",
      order: 4,
    },
  });

  await prisma.problem.upsert({
    where: { slug: "binary-search" },
    update: {
      title: "Binary Search",
      slug: "binary-search",
      statement:
        "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, return its index. Otherwise, return `-1`.\n\nInput format: first line is `nums` as space-separated integers, second line is `target`.\nOutput format: a single integer, the index of `target`, or `-1` if not found.",
      constraints:
        "1 <= nums.length <= 10^4\n-10^4 < nums[i], target < 10^4\nAll integers in nums are unique, sorted in ascending order.",
      difficulty: "EASY",
      order: 1,
      topicId: binarySearch.id,
      starterCode: {
        javascript:
          "function search(nums, target) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst nums = lines[0].split(' ').map(Number)\nconst target = Number(lines[1])\nconsole.log(search(nums, target))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint search(vector<int>& nums, int target) {\n    // your code here\n    return -1;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    int target = stoi(line2);\n    cout << search(nums, target) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int search(int[] nums, int target) {\n        // your code here\n        return -1;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        int target = Integer.parseInt(br.readLine().trim());\n        System.out.println(search(nums, target));\n    }\n}",
        python:
          "def search(nums, target):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnums = list(map(int, lines[0].split()))\ntarget = int(lines[1])\nprint(search(nums, target))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "-1 0 3 5 9 12\n9", expected: "4", isSample: true, order: 1 },
          { input: "-1 0 3 5 9 12\n2", expected: "-1", isSample: true, order: 2 },
          { input: "5\n5", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Binary Search",
      slug: "binary-search",
      statement:
        "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, return its index. Otherwise, return `-1`.\n\nInput format: first line is `nums` as space-separated integers, second line is `target`.\nOutput format: a single integer, the index of `target`, or `-1` if not found.",
      constraints:
        "1 <= nums.length <= 10^4\n-10^4 < nums[i], target < 10^4\nAll integers in nums are unique, sorted in ascending order.",
      difficulty: "EASY",
      order: 1,
      topicId: binarySearch.id,
      starterCode: {
        javascript:
          "function search(nums, target) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst nums = lines[0].split(' ').map(Number)\nconst target = Number(lines[1])\nconsole.log(search(nums, target))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint search(vector<int>& nums, int target) {\n    // your code here\n    return -1;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    int target = stoi(line2);\n    cout << search(nums, target) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int search(int[] nums, int target) {\n        // your code here\n        return -1;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        int target = Integer.parseInt(br.readLine().trim());\n        System.out.println(search(nums, target));\n    }\n}",
        python:
          "def search(nums, target):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnums = list(map(int, lines[0].split()))\ntarget = int(lines[1])\nprint(search(nums, target))",
      },
      testCases: {
        create: [
          { input: "-1 0 3 5 9 12\n9", expected: "4", isSample: true, order: 1 },
          { input: "-1 0 3 5 9 12\n2", expected: "-1", isSample: true, order: 2 },
          { input: "5\n5", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "search-insert-position" },
    update: {
      title: "Search Insert Position",
      slug: "search-insert-position",
      statement:
        "Given a sorted array of distinct integers `nums` and a target value `target`, return the index if the target is found. If not, return the index where it would be if it were inserted in order.\n\nInput format: first line is `nums` as space-separated integers, second line is `target`.\nOutput format: a single integer, the index.",
      constraints:
        "1 <= nums.length <= 10^4\n-10^4 <= nums[i] <= 10^4\nnums contains distinct values sorted in ascending order.\n-10^4 <= target <= 10^4",
      difficulty: "EASY",
      order: 2,
      topicId: binarySearch.id,
      starterCode: {
        javascript:
          "function searchInsert(nums, target) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst nums = lines[0].split(' ').map(Number)\nconst target = Number(lines[1])\nconsole.log(searchInsert(nums, target))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint searchInsert(vector<int>& nums, int target) {\n    // your code here\n    return -1;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    int target = stoi(line2);\n    cout << searchInsert(nums, target) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int searchInsert(int[] nums, int target) {\n        // your code here\n        return -1;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        int target = Integer.parseInt(br.readLine().trim());\n        System.out.println(searchInsert(nums, target));\n    }\n}",
        python:
          "def search_insert(nums, target):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnums = list(map(int, lines[0].split()))\ntarget = int(lines[1])\nprint(search_insert(nums, target))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "1 3 5 6\n5", expected: "2", isSample: true, order: 1 },
          { input: "1 3 5 6\n2", expected: "1", isSample: true, order: 2 },
          { input: "1 3 5 6\n7", expected: "4", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Search Insert Position",
      slug: "search-insert-position",
      statement:
        "Given a sorted array of distinct integers `nums` and a target value `target`, return the index if the target is found. If not, return the index where it would be if it were inserted in order.\n\nInput format: first line is `nums` as space-separated integers, second line is `target`.\nOutput format: a single integer, the index.",
      constraints:
        "1 <= nums.length <= 10^4\n-10^4 <= nums[i] <= 10^4\nnums contains distinct values sorted in ascending order.\n-10^4 <= target <= 10^4",
      difficulty: "EASY",
      order: 2,
      topicId: binarySearch.id,
      starterCode: {
        javascript:
          "function searchInsert(nums, target) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst nums = lines[0].split(' ').map(Number)\nconst target = Number(lines[1])\nconsole.log(searchInsert(nums, target))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint searchInsert(vector<int>& nums, int target) {\n    // your code here\n    return -1;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    int target = stoi(line2);\n    cout << searchInsert(nums, target) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int searchInsert(int[] nums, int target) {\n        // your code here\n        return -1;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        int target = Integer.parseInt(br.readLine().trim());\n        System.out.println(searchInsert(nums, target));\n    }\n}",
        python:
          "def search_insert(nums, target):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnums = list(map(int, lines[0].split()))\ntarget = int(lines[1])\nprint(search_insert(nums, target))",
      },
      testCases: {
        create: [
          { input: "1 3 5 6\n5", expected: "2", isSample: true, order: 1 },
          { input: "1 3 5 6\n2", expected: "1", isSample: true, order: 2 },
          { input: "1 3 5 6\n7", expected: "4", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "search-in-rotated-sorted-array" },
    update: {
      title: "Search in Rotated Sorted Array",
      slug: "search-in-rotated-sorted-array",
      statement:
        "There is an integer array `nums` sorted in ascending order (with distinct values), rotated at an unknown pivot. Given the rotated array `nums` and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not.\n\nInput format: first line is `nums` as space-separated integers, second line is `target`.\nOutput format: a single integer, the index of `target`, or `-1` if not found.",
      constraints:
        "1 <= nums.length <= 5000\n-10^4 <= nums[i] <= 10^4\nAll values of nums are unique.\nnums is an ascending array that is possibly rotated.\n-10^4 <= target <= 10^4",
      difficulty: "MEDIUM",
      order: 3,
      topicId: binarySearch.id,
      starterCode: {
        javascript:
          "function search(nums, target) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst nums = lines[0].split(' ').map(Number)\nconst target = Number(lines[1])\nconsole.log(search(nums, target))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint search(vector<int>& nums, int target) {\n    // your code here\n    return -1;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    int target = stoi(line2);\n    cout << search(nums, target) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int search(int[] nums, int target) {\n        // your code here\n        return -1;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        int target = Integer.parseInt(br.readLine().trim());\n        System.out.println(search(nums, target));\n    }\n}",
        python:
          "def search(nums, target):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnums = list(map(int, lines[0].split()))\ntarget = int(lines[1])\nprint(search(nums, target))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "4 5 6 7 0 1 2\n0", expected: "4", isSample: true, order: 1 },
          { input: "4 5 6 7 0 1 2\n3", expected: "-1", isSample: true, order: 2 },
          { input: "1\n0", expected: "-1", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Search in Rotated Sorted Array",
      slug: "search-in-rotated-sorted-array",
      statement:
        "There is an integer array `nums` sorted in ascending order (with distinct values), rotated at an unknown pivot. Given the rotated array `nums` and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not.\n\nInput format: first line is `nums` as space-separated integers, second line is `target`.\nOutput format: a single integer, the index of `target`, or `-1` if not found.",
      constraints:
        "1 <= nums.length <= 5000\n-10^4 <= nums[i] <= 10^4\nAll values of nums are unique.\nnums is an ascending array that is possibly rotated.\n-10^4 <= target <= 10^4",
      difficulty: "MEDIUM",
      order: 3,
      topicId: binarySearch.id,
      starterCode: {
        javascript:
          "function search(nums, target) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst nums = lines[0].split(' ').map(Number)\nconst target = Number(lines[1])\nconsole.log(search(nums, target))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint search(vector<int>& nums, int target) {\n    // your code here\n    return -1;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    int target = stoi(line2);\n    cout << search(nums, target) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int search(int[] nums, int target) {\n        // your code here\n        return -1;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        int target = Integer.parseInt(br.readLine().trim());\n        System.out.println(search(nums, target));\n    }\n}",
        python:
          "def search(nums, target):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnums = list(map(int, lines[0].split()))\ntarget = int(lines[1])\nprint(search(nums, target))",
      },
      testCases: {
        create: [
          { input: "4 5 6 7 0 1 2\n0", expected: "4", isSample: true, order: 1 },
          { input: "4 5 6 7 0 1 2\n3", expected: "-1", isSample: true, order: 2 },
          { input: "1\n0", expected: "-1", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "find-minimum-in-rotated-sorted-array" },
    update: {
      title: "Find Minimum in Rotated Sorted Array",
      slug: "find-minimum-in-rotated-sorted-array",
      statement:
        "Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. Given the rotated sorted array `nums` of unique elements, return the minimum element of this array.\n\nInput format: a single line with `nums` as space-separated integers.\nOutput format: a single integer, the minimum element.",
      constraints:
        "1 <= nums.length <= 5000\n-5000 <= nums[i] <= 5000\nAll integers of nums are unique.\nnums is sorted and rotated between 1 and n times.",
      difficulty: "MEDIUM",
      order: 4,
      topicId: binarySearch.id,
      starterCode: {
        javascript:
          "function findMin(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(findMin(nums))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint findMin(vector<int>& nums) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << findMin(nums) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int findMin(int[] nums) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(findMin(nums));\n    }\n}",
        python:
          "def find_min(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(find_min(nums))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "3 4 5 1 2", expected: "1", isSample: true, order: 1 },
          { input: "4 5 6 7 0 1 2", expected: "0", isSample: true, order: 2 },
          { input: "11 13 15 17", expected: "11", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Find Minimum in Rotated Sorted Array",
      slug: "find-minimum-in-rotated-sorted-array",
      statement:
        "Suppose an array of length `n` sorted in ascending order is rotated between `1` and `n` times. Given the rotated sorted array `nums` of unique elements, return the minimum element of this array.\n\nInput format: a single line with `nums` as space-separated integers.\nOutput format: a single integer, the minimum element.",
      constraints:
        "1 <= nums.length <= 5000\n-5000 <= nums[i] <= 5000\nAll integers of nums are unique.\nnums is sorted and rotated between 1 and n times.",
      difficulty: "MEDIUM",
      order: 4,
      topicId: binarySearch.id,
      starterCode: {
        javascript:
          "function findMin(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(findMin(nums))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint findMin(vector<int>& nums) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << findMin(nums) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int findMin(int[] nums) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(findMin(nums));\n    }\n}",
        python:
          "def find_min(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(find_min(nums))",
      },
      testCases: {
        create: [
          { input: "3 4 5 1 2", expected: "1", isSample: true, order: 1 },
          { input: "4 5 6 7 0 1 2", expected: "0", isSample: true, order: 2 },
          { input: "11 13 15 17", expected: "11", isSample: false, order: 3 },
        ],
      },
    },
  });

  const linkedLists = await prisma.topic.upsert({
    where: { slug: "linked-lists" },
    update: {
      name: "Linked Lists",
      slug: "linked-lists",
      description:
        "Singly linked list problems. Lists are given/returned as arrays of node values from head to tail; starter code builds/reads the actual linked list for you.",
      order: 5,
    },
    create: {
      name: "Linked Lists",
      slug: "linked-lists",
      description:
        "Singly linked list problems. Lists are given/returned as arrays of node values from head to tail; starter code builds/reads the actual linked list for you.",
      order: 5,
    },
  });

  await prisma.problem.upsert({
    where: { slug: "reverse-linked-list" },
    update: {
      title: "Reverse Linked List",
      slug: "reverse-linked-list",
      statement:
        "Given the `head` of a singly linked list (represented here as an array of values from head to tail), reverse the list, and return the resulting array from head to tail.\n\nInput format: a single line with the list values as space-separated integers.\nOutput format: the reversed list values, space-separated.",
      constraints: "0 <= list length <= 5000\n-5000 <= node value <= 5000",
      difficulty: "EASY",
      order: 1,
      topicId: linkedLists.id,
      starterCode: {
        javascript:
          "class ListNode {\n  constructor(val, next = null) {\n    this.val = val\n    this.next = next\n  }\n}\nfunction arrayToList(arr) {\n  const dummy = new ListNode(0)\n  let cur = dummy\n  for (const v of arr) {\n    cur.next = new ListNode(v)\n    cur = cur.next\n  }\n  return dummy.next\n}\nfunction listToArray(head) {\n  const res = []\n  while (head) {\n    res.push(head.val)\n    head = head.next\n  }\n  return res\n}\n\nfunction reverseList(head) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').filter(x => x.length).map(Number)\nconst head = arrayToList(nums)\nconsole.log(listToArray(reverseList(head)).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* arrayToList(vector<int>& arr) {\n    ListNode dummy(0);\n    ListNode* cur = &dummy;\n    for (int v : arr) {\n        cur->next = new ListNode(v);\n        cur = cur->next;\n    }\n    return dummy.next;\n}\n\nvector<int> listToArray(ListNode* head) {\n    vector<int> res;\n    while (head) {\n        res.push_back(head->val);\n        head = head->next;\n    }\n    return res;\n}\n\nListNode* reverseList(ListNode* head) {\n    // your code here\n    return nullptr;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> arr;\n    int x;\n    while (ss >> x) arr.push_back(x);\n    ListNode* head = arrayToList(arr);\n    vector<int> res = listToArray(reverseList(head));\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x){ val = x; } }\n    static ListNode arrayToList(int[] arr) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        for (int v : arr) { cur.next = new ListNode(v); cur = cur.next; }\n        return dummy.next;\n    }\n    static int[] listToArray(ListNode head) {\n        ArrayList<Integer> res = new ArrayList<>();\n        while (head != null) { res.add(head.val); head = head.next; }\n        int[] a = new int[res.size()];\n        for (int i = 0; i < a.length; i++) a[i] = res.get(i);\n        return a;\n    }\n    static ListNode reverseList(ListNode head) {\n        // your code here\n        return null;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] arr = parseInts(br.readLine());\n        int[] res = listToArray(reverseList(arrayToList(arr)));\n        System.out.println(join(res));\n    }\n}",
        python:
          "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef array_to_list(arr):\n    dummy = ListNode()\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef list_to_array(head):\n    res = []\n    while head:\n        res.append(head.val)\n        head = head.next\n    return res\n\ndef reverse_list(head):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nhead = array_to_list(nums)\nprint(*list_to_array(reverse_list(head)))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "1 2 3 4 5", expected: "5 4 3 2 1", isSample: true, order: 1 },
          { input: "1 2", expected: "2 1", isSample: true, order: 2 },
          { input: "1", expected: "1", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Reverse Linked List",
      slug: "reverse-linked-list",
      statement:
        "Given the `head` of a singly linked list (represented here as an array of values from head to tail), reverse the list, and return the resulting array from head to tail.\n\nInput format: a single line with the list values as space-separated integers.\nOutput format: the reversed list values, space-separated.",
      constraints: "0 <= list length <= 5000\n-5000 <= node value <= 5000",
      difficulty: "EASY",
      order: 1,
      topicId: linkedLists.id,
      starterCode: {
        javascript:
          "class ListNode {\n  constructor(val, next = null) {\n    this.val = val\n    this.next = next\n  }\n}\nfunction arrayToList(arr) {\n  const dummy = new ListNode(0)\n  let cur = dummy\n  for (const v of arr) {\n    cur.next = new ListNode(v)\n    cur = cur.next\n  }\n  return dummy.next\n}\nfunction listToArray(head) {\n  const res = []\n  while (head) {\n    res.push(head.val)\n    head = head.next\n  }\n  return res\n}\n\nfunction reverseList(head) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').filter(x => x.length).map(Number)\nconst head = arrayToList(nums)\nconsole.log(listToArray(reverseList(head)).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* arrayToList(vector<int>& arr) {\n    ListNode dummy(0);\n    ListNode* cur = &dummy;\n    for (int v : arr) {\n        cur->next = new ListNode(v);\n        cur = cur->next;\n    }\n    return dummy.next;\n}\n\nvector<int> listToArray(ListNode* head) {\n    vector<int> res;\n    while (head) {\n        res.push_back(head->val);\n        head = head->next;\n    }\n    return res;\n}\n\nListNode* reverseList(ListNode* head) {\n    // your code here\n    return nullptr;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> arr;\n    int x;\n    while (ss >> x) arr.push_back(x);\n    ListNode* head = arrayToList(arr);\n    vector<int> res = listToArray(reverseList(head));\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x){ val = x; } }\n    static ListNode arrayToList(int[] arr) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        for (int v : arr) { cur.next = new ListNode(v); cur = cur.next; }\n        return dummy.next;\n    }\n    static int[] listToArray(ListNode head) {\n        ArrayList<Integer> res = new ArrayList<>();\n        while (head != null) { res.add(head.val); head = head.next; }\n        int[] a = new int[res.size()];\n        for (int i = 0; i < a.length; i++) a[i] = res.get(i);\n        return a;\n    }\n    static ListNode reverseList(ListNode head) {\n        // your code here\n        return null;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] arr = parseInts(br.readLine());\n        int[] res = listToArray(reverseList(arrayToList(arr)));\n        System.out.println(join(res));\n    }\n}",
        python:
          "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef array_to_list(arr):\n    dummy = ListNode()\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef list_to_array(head):\n    res = []\n    while head:\n        res.append(head.val)\n        head = head.next\n    return res\n\ndef reverse_list(head):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nhead = array_to_list(nums)\nprint(*list_to_array(reverse_list(head)))",
      },
      testCases: {
        create: [
          { input: "1 2 3 4 5", expected: "5 4 3 2 1", isSample: true, order: 1 },
          { input: "1 2", expected: "2 1", isSample: true, order: 2 },
          { input: "1", expected: "1", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "merge-two-sorted-lists" },
    update: {
      title: "Merge Two Sorted Lists",
      slug: "merge-two-sorted-lists",
      statement:
        "You are given the heads of two sorted linked lists `list1` and `list2` (each represented as an array of values from head to tail). Merge the two lists into one sorted list and return the resulting array from head to tail.\n\nInput format: first line is `list1` as space-separated integers, second line is `list2` as space-separated integers.\nOutput format: the merged sorted list, space-separated.",
      constraints:
        "1 <= list1.length, list2.length <= 50\n-100 <= node value <= 100\nBoth list1 and list2 are sorted in non-decreasing order.",
      difficulty: "EASY",
      order: 2,
      topicId: linkedLists.id,
      starterCode: {
        javascript:
          "class ListNode {\n  constructor(val, next = null) {\n    this.val = val\n    this.next = next\n  }\n}\nfunction arrayToList(arr) {\n  const dummy = new ListNode(0)\n  let cur = dummy\n  for (const v of arr) {\n    cur.next = new ListNode(v)\n    cur = cur.next\n  }\n  return dummy.next\n}\nfunction listToArray(head) {\n  const res = []\n  while (head) {\n    res.push(head.val)\n    head = head.next\n  }\n  return res\n}\n\nfunction mergeTwoLists(l1, l2) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst l1 = arrayToList(lines[0].split(' ').map(Number))\nconst l2 = arrayToList(lines[1].split(' ').map(Number))\nconsole.log(listToArray(mergeTwoLists(l1, l2)).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* arrayToList(vector<int>& arr) {\n    ListNode dummy(0);\n    ListNode* cur = &dummy;\n    for (int v : arr) {\n        cur->next = new ListNode(v);\n        cur = cur->next;\n    }\n    return dummy.next;\n}\n\nvector<int> listToArray(ListNode* head) {\n    vector<int> res;\n    while (head) {\n        res.push_back(head->val);\n        head = head->next;\n    }\n    return res;\n}\n\nListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n    // your code here\n    return nullptr;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss1(line1), ss2(line2);\n    vector<int> a1, a2;\n    int x;\n    while (ss1 >> x) a1.push_back(x);\n    while (ss2 >> x) a2.push_back(x);\n    ListNode* l1 = arrayToList(a1);\n    ListNode* l2 = arrayToList(a2);\n    vector<int> res = listToArray(mergeTwoLists(l1, l2));\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x){ val = x; } }\n    static ListNode arrayToList(int[] arr) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        for (int v : arr) { cur.next = new ListNode(v); cur = cur.next; }\n        return dummy.next;\n    }\n    static int[] listToArray(ListNode head) {\n        ArrayList<Integer> res = new ArrayList<>();\n        while (head != null) { res.add(head.val); head = head.next; }\n        int[] a = new int[res.size()];\n        for (int i = 0; i < a.length; i++) a[i] = res.get(i);\n        return a;\n    }\n    static ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        // your code here\n        return null;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] a1 = parseInts(br.readLine());\n        int[] a2 = parseInts(br.readLine());\n        int[] res = listToArray(mergeTwoLists(arrayToList(a1), arrayToList(a2)));\n        System.out.println(join(res));\n    }\n}",
        python:
          "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef array_to_list(arr):\n    dummy = ListNode()\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef list_to_array(head):\n    res = []\n    while head:\n        res.append(head.val)\n        head = head.next\n    return res\n\ndef merge_two_lists(l1, l2):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nl1 = array_to_list(list(map(int, lines[0].split())))\nl2 = array_to_list(list(map(int, lines[1].split())))\nprint(*list_to_array(merge_two_lists(l1, l2)))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "1 2 4\n1 3 4", expected: "1 1 2 3 4 4", isSample: true, order: 1 },
          { input: "1 1 2\n3 4", expected: "1 1 2 3 4", isSample: true, order: 2 },
          { input: "5\n1 2 4", expected: "1 2 4 5", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Merge Two Sorted Lists",
      slug: "merge-two-sorted-lists",
      statement:
        "You are given the heads of two sorted linked lists `list1` and `list2` (each represented as an array of values from head to tail). Merge the two lists into one sorted list and return the resulting array from head to tail.\n\nInput format: first line is `list1` as space-separated integers, second line is `list2` as space-separated integers.\nOutput format: the merged sorted list, space-separated.",
      constraints:
        "1 <= list1.length, list2.length <= 50\n-100 <= node value <= 100\nBoth list1 and list2 are sorted in non-decreasing order.",
      difficulty: "EASY",
      order: 2,
      topicId: linkedLists.id,
      starterCode: {
        javascript:
          "class ListNode {\n  constructor(val, next = null) {\n    this.val = val\n    this.next = next\n  }\n}\nfunction arrayToList(arr) {\n  const dummy = new ListNode(0)\n  let cur = dummy\n  for (const v of arr) {\n    cur.next = new ListNode(v)\n    cur = cur.next\n  }\n  return dummy.next\n}\nfunction listToArray(head) {\n  const res = []\n  while (head) {\n    res.push(head.val)\n    head = head.next\n  }\n  return res\n}\n\nfunction mergeTwoLists(l1, l2) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst l1 = arrayToList(lines[0].split(' ').map(Number))\nconst l2 = arrayToList(lines[1].split(' ').map(Number))\nconsole.log(listToArray(mergeTwoLists(l1, l2)).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* arrayToList(vector<int>& arr) {\n    ListNode dummy(0);\n    ListNode* cur = &dummy;\n    for (int v : arr) {\n        cur->next = new ListNode(v);\n        cur = cur->next;\n    }\n    return dummy.next;\n}\n\nvector<int> listToArray(ListNode* head) {\n    vector<int> res;\n    while (head) {\n        res.push_back(head->val);\n        head = head->next;\n    }\n    return res;\n}\n\nListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n    // your code here\n    return nullptr;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss1(line1), ss2(line2);\n    vector<int> a1, a2;\n    int x;\n    while (ss1 >> x) a1.push_back(x);\n    while (ss2 >> x) a2.push_back(x);\n    ListNode* l1 = arrayToList(a1);\n    ListNode* l2 = arrayToList(a2);\n    vector<int> res = listToArray(mergeTwoLists(l1, l2));\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x){ val = x; } }\n    static ListNode arrayToList(int[] arr) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        for (int v : arr) { cur.next = new ListNode(v); cur = cur.next; }\n        return dummy.next;\n    }\n    static int[] listToArray(ListNode head) {\n        ArrayList<Integer> res = new ArrayList<>();\n        while (head != null) { res.add(head.val); head = head.next; }\n        int[] a = new int[res.size()];\n        for (int i = 0; i < a.length; i++) a[i] = res.get(i);\n        return a;\n    }\n    static ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        // your code here\n        return null;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] a1 = parseInts(br.readLine());\n        int[] a2 = parseInts(br.readLine());\n        int[] res = listToArray(mergeTwoLists(arrayToList(a1), arrayToList(a2)));\n        System.out.println(join(res));\n    }\n}",
        python:
          "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef array_to_list(arr):\n    dummy = ListNode()\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef list_to_array(head):\n    res = []\n    while head:\n        res.append(head.val)\n        head = head.next\n    return res\n\ndef merge_two_lists(l1, l2):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nl1 = array_to_list(list(map(int, lines[0].split())))\nl2 = array_to_list(list(map(int, lines[1].split())))\nprint(*list_to_array(merge_two_lists(l1, l2)))",
      },
      testCases: {
        create: [
          { input: "1 2 4\n1 3 4", expected: "1 1 2 3 4 4", isSample: true, order: 1 },
          { input: "1 1 2\n3 4", expected: "1 1 2 3 4", isSample: true, order: 2 },
          { input: "5\n1 2 4", expected: "1 2 4 5", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "linked-list-cycle" },
    update: {
      title: "Linked List Cycle",
      slug: "linked-list-cycle",
      statement:
        "Given the head of a linked list (represented as an array of values), and an integer `pos` denoting the index (0-indexed) of the node that the tail's `next` pointer connects to in order to form a cycle (`pos = -1` means no cycle), return `true` if there is a cycle in the linked list, otherwise return `false`.\n\nInput format: first line is the list values as space-separated integers, second line is `pos`.\nOutput format: `true` or `false`.",
      constraints: "1 <= list length <= 10^4\n-10^5 <= node value <= 10^5\n-1 <= pos < list length",
      difficulty: "EASY",
      order: 3,
      topicId: linkedLists.id,
      starterCode: {
        javascript:
          "class ListNode {\n  constructor(val, next = null) {\n    this.val = val\n    this.next = next\n  }\n}\nfunction buildCycleList(arr, pos) {\n  const nodes = arr.map(v => new ListNode(v))\n  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1]\n  if (pos >= 0) nodes[nodes.length - 1].next = nodes[pos]\n  return nodes[0]\n}\n\nfunction hasCycle(head) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst arr = lines[0].split(' ').map(Number)\nconst pos = Number(lines[1])\nconst head = buildCycleList(arr, pos)\nconsole.log(hasCycle(head))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* buildCycleList(vector<int>& arr, int pos) {\n    vector<ListNode*> nodes;\n    for (int v : arr) nodes.push_back(new ListNode(v));\n    for (size_t i = 0; i + 1 < nodes.size(); i++) nodes[i]->next = nodes[i + 1];\n    if (pos >= 0) nodes.back()->next = nodes[pos];\n    return nodes.empty() ? nullptr : nodes[0];\n}\n\nbool hasCycle(ListNode* head) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> arr;\n    int x;\n    while (ss >> x) arr.push_back(x);\n    int pos = stoi(line2);\n    ListNode* head = buildCycleList(arr, pos);\n    cout << (hasCycle(head) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x){ val = x; } }\n    static ListNode arrayToList(int[] arr) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        for (int v : arr) { cur.next = new ListNode(v); cur = cur.next; }\n        return dummy.next;\n    }\n    static int[] listToArray(ListNode head) {\n        ArrayList<Integer> res = new ArrayList<>();\n        while (head != null) { res.add(head.val); head = head.next; }\n        int[] a = new int[res.size()];\n        for (int i = 0; i < a.length; i++) a[i] = res.get(i);\n        return a;\n    }\n    static ListNode buildCycleList(int[] arr, int pos) {\n        if (arr.length == 0) return null;\n        ListNode[] nodes = new ListNode[arr.length];\n        for (int i = 0; i < arr.length; i++) nodes[i] = new ListNode(arr[i]);\n        for (int i = 0; i + 1 < arr.length; i++) nodes[i].next = nodes[i + 1];\n        if (pos >= 0) nodes[arr.length - 1].next = nodes[pos];\n        return nodes[0];\n    }\n    static boolean hasCycle(ListNode head) {\n        // your code here\n        return false;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] arr = parseInts(br.readLine());\n        int pos = Integer.parseInt(br.readLine().trim());\n        System.out.println(hasCycle(buildCycleList(arr, pos)) ? \"true\" : \"false\");\n    }\n}",
        python:
          "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef build_cycle_list(arr, pos):\n    nodes = [ListNode(v) for v in arr]\n    for i in range(len(nodes) - 1):\n        nodes[i].next = nodes[i + 1]\n    if pos >= 0:\n        nodes[-1].next = nodes[pos]\n    return nodes[0]\n\ndef has_cycle(head):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\narr = list(map(int, lines[0].split()))\npos = int(lines[1])\nhead = build_cycle_list(arr, pos)\nprint(str(has_cycle(head)).lower())",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "3 2 0 -4\n1", expected: "true", isSample: true, order: 1 },
          { input: "1\n-1", expected: "false", isSample: true, order: 2 },
          { input: "1 2\n0", expected: "true", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Linked List Cycle",
      slug: "linked-list-cycle",
      statement:
        "Given the head of a linked list (represented as an array of values), and an integer `pos` denoting the index (0-indexed) of the node that the tail's `next` pointer connects to in order to form a cycle (`pos = -1` means no cycle), return `true` if there is a cycle in the linked list, otherwise return `false`.\n\nInput format: first line is the list values as space-separated integers, second line is `pos`.\nOutput format: `true` or `false`.",
      constraints: "1 <= list length <= 10^4\n-10^5 <= node value <= 10^5\n-1 <= pos < list length",
      difficulty: "EASY",
      order: 3,
      topicId: linkedLists.id,
      starterCode: {
        javascript:
          "class ListNode {\n  constructor(val, next = null) {\n    this.val = val\n    this.next = next\n  }\n}\nfunction buildCycleList(arr, pos) {\n  const nodes = arr.map(v => new ListNode(v))\n  for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1]\n  if (pos >= 0) nodes[nodes.length - 1].next = nodes[pos]\n  return nodes[0]\n}\n\nfunction hasCycle(head) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst arr = lines[0].split(' ').map(Number)\nconst pos = Number(lines[1])\nconst head = buildCycleList(arr, pos)\nconsole.log(hasCycle(head))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* buildCycleList(vector<int>& arr, int pos) {\n    vector<ListNode*> nodes;\n    for (int v : arr) nodes.push_back(new ListNode(v));\n    for (size_t i = 0; i + 1 < nodes.size(); i++) nodes[i]->next = nodes[i + 1];\n    if (pos >= 0) nodes.back()->next = nodes[pos];\n    return nodes.empty() ? nullptr : nodes[0];\n}\n\nbool hasCycle(ListNode* head) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> arr;\n    int x;\n    while (ss >> x) arr.push_back(x);\n    int pos = stoi(line2);\n    ListNode* head = buildCycleList(arr, pos);\n    cout << (hasCycle(head) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x){ val = x; } }\n    static ListNode arrayToList(int[] arr) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        for (int v : arr) { cur.next = new ListNode(v); cur = cur.next; }\n        return dummy.next;\n    }\n    static int[] listToArray(ListNode head) {\n        ArrayList<Integer> res = new ArrayList<>();\n        while (head != null) { res.add(head.val); head = head.next; }\n        int[] a = new int[res.size()];\n        for (int i = 0; i < a.length; i++) a[i] = res.get(i);\n        return a;\n    }\n    static ListNode buildCycleList(int[] arr, int pos) {\n        if (arr.length == 0) return null;\n        ListNode[] nodes = new ListNode[arr.length];\n        for (int i = 0; i < arr.length; i++) nodes[i] = new ListNode(arr[i]);\n        for (int i = 0; i + 1 < arr.length; i++) nodes[i].next = nodes[i + 1];\n        if (pos >= 0) nodes[arr.length - 1].next = nodes[pos];\n        return nodes[0];\n    }\n    static boolean hasCycle(ListNode head) {\n        // your code here\n        return false;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] arr = parseInts(br.readLine());\n        int pos = Integer.parseInt(br.readLine().trim());\n        System.out.println(hasCycle(buildCycleList(arr, pos)) ? \"true\" : \"false\");\n    }\n}",
        python:
          "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef build_cycle_list(arr, pos):\n    nodes = [ListNode(v) for v in arr]\n    for i in range(len(nodes) - 1):\n        nodes[i].next = nodes[i + 1]\n    if pos >= 0:\n        nodes[-1].next = nodes[pos]\n    return nodes[0]\n\ndef has_cycle(head):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\narr = list(map(int, lines[0].split()))\npos = int(lines[1])\nhead = build_cycle_list(arr, pos)\nprint(str(has_cycle(head)).lower())",
      },
      testCases: {
        create: [
          { input: "3 2 0 -4\n1", expected: "true", isSample: true, order: 1 },
          { input: "1\n-1", expected: "false", isSample: true, order: 2 },
          { input: "1 2\n0", expected: "true", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "remove-nth-node-from-end-of-list" },
    update: {
      title: "Remove Nth Node From End of List",
      slug: "remove-nth-node-from-end-of-list",
      statement:
        "Given the head of a linked list (represented as an array of values), remove the `n`-th node from the end of the list and return the resulting array from head to tail.\n\nInput format: first line is the list values as space-separated integers, second line is `n`.\nOutput format: the resulting list values, space-separated (empty line if the result is an empty list).",
      constraints: "1 <= list length <= 30\n0 <= node value <= 100\n1 <= n <= list length",
      difficulty: "MEDIUM",
      order: 4,
      topicId: linkedLists.id,
      starterCode: {
        javascript:
          "class ListNode {\n  constructor(val, next = null) {\n    this.val = val\n    this.next = next\n  }\n}\nfunction arrayToList(arr) {\n  const dummy = new ListNode(0)\n  let cur = dummy\n  for (const v of arr) {\n    cur.next = new ListNode(v)\n    cur = cur.next\n  }\n  return dummy.next\n}\nfunction listToArray(head) {\n  const res = []\n  while (head) {\n    res.push(head.val)\n    head = head.next\n  }\n  return res\n}\n\nfunction removeNthFromEnd(head, n) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst arr = lines[0].split(' ').map(Number)\nconst n = Number(lines[1])\nconst head = arrayToList(arr)\nconsole.log(listToArray(removeNthFromEnd(head, n)).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* arrayToList(vector<int>& arr) {\n    ListNode dummy(0);\n    ListNode* cur = &dummy;\n    for (int v : arr) {\n        cur->next = new ListNode(v);\n        cur = cur->next;\n    }\n    return dummy.next;\n}\n\nvector<int> listToArray(ListNode* head) {\n    vector<int> res;\n    while (head) {\n        res.push_back(head->val);\n        head = head->next;\n    }\n    return res;\n}\n\nListNode* removeNthFromEnd(ListNode* head, int n) {\n    // your code here\n    return head;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> arr;\n    int x;\n    while (ss >> x) arr.push_back(x);\n    int n = stoi(line2);\n    ListNode* head = arrayToList(arr);\n    vector<int> res = listToArray(removeNthFromEnd(head, n));\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x){ val = x; } }\n    static ListNode arrayToList(int[] arr) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        for (int v : arr) { cur.next = new ListNode(v); cur = cur.next; }\n        return dummy.next;\n    }\n    static int[] listToArray(ListNode head) {\n        ArrayList<Integer> res = new ArrayList<>();\n        while (head != null) { res.add(head.val); head = head.next; }\n        int[] a = new int[res.size()];\n        for (int i = 0; i < a.length; i++) a[i] = res.get(i);\n        return a;\n    }\n    static ListNode removeNthFromEnd(ListNode head, int n) {\n        // your code here\n        return head;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] arr = parseInts(br.readLine());\n        int n = Integer.parseInt(br.readLine().trim());\n        int[] res = listToArray(removeNthFromEnd(arrayToList(arr), n));\n        System.out.println(join(res));\n    }\n}",
        python:
          "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef array_to_list(arr):\n    dummy = ListNode()\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef list_to_array(head):\n    res = []\n    while head:\n        res.append(head.val)\n        head = head.next\n    return res\n\ndef remove_nth_from_end(head, n):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\narr = list(map(int, lines[0].split()))\nn = int(lines[1])\nhead = array_to_list(arr)\nprint(*list_to_array(remove_nth_from_end(head, n)))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "1 2 3 4 5\n2", expected: "1 2 3 5", isSample: true, order: 1 },
          { input: "1 2\n1", expected: "1", isSample: true, order: 2 },
          { input: "1\n1", expected: "", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Remove Nth Node From End of List",
      slug: "remove-nth-node-from-end-of-list",
      statement:
        "Given the head of a linked list (represented as an array of values), remove the `n`-th node from the end of the list and return the resulting array from head to tail.\n\nInput format: first line is the list values as space-separated integers, second line is `n`.\nOutput format: the resulting list values, space-separated (empty line if the result is an empty list).",
      constraints: "1 <= list length <= 30\n0 <= node value <= 100\n1 <= n <= list length",
      difficulty: "MEDIUM",
      order: 4,
      topicId: linkedLists.id,
      starterCode: {
        javascript:
          "class ListNode {\n  constructor(val, next = null) {\n    this.val = val\n    this.next = next\n  }\n}\nfunction arrayToList(arr) {\n  const dummy = new ListNode(0)\n  let cur = dummy\n  for (const v of arr) {\n    cur.next = new ListNode(v)\n    cur = cur.next\n  }\n  return dummy.next\n}\nfunction listToArray(head) {\n  const res = []\n  while (head) {\n    res.push(head.val)\n    head = head.next\n  }\n  return res\n}\n\nfunction removeNthFromEnd(head, n) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst arr = lines[0].split(' ').map(Number)\nconst n = Number(lines[1])\nconst head = arrayToList(arr)\nconsole.log(listToArray(removeNthFromEnd(head, n)).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* arrayToList(vector<int>& arr) {\n    ListNode dummy(0);\n    ListNode* cur = &dummy;\n    for (int v : arr) {\n        cur->next = new ListNode(v);\n        cur = cur->next;\n    }\n    return dummy.next;\n}\n\nvector<int> listToArray(ListNode* head) {\n    vector<int> res;\n    while (head) {\n        res.push_back(head->val);\n        head = head->next;\n    }\n    return res;\n}\n\nListNode* removeNthFromEnd(ListNode* head, int n) {\n    // your code here\n    return head;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> arr;\n    int x;\n    while (ss >> x) arr.push_back(x);\n    int n = stoi(line2);\n    ListNode* head = arrayToList(arr);\n    vector<int> res = listToArray(removeNthFromEnd(head, n));\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x){ val = x; } }\n    static ListNode arrayToList(int[] arr) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        for (int v : arr) { cur.next = new ListNode(v); cur = cur.next; }\n        return dummy.next;\n    }\n    static int[] listToArray(ListNode head) {\n        ArrayList<Integer> res = new ArrayList<>();\n        while (head != null) { res.add(head.val); head = head.next; }\n        int[] a = new int[res.size()];\n        for (int i = 0; i < a.length; i++) a[i] = res.get(i);\n        return a;\n    }\n    static ListNode removeNthFromEnd(ListNode head, int n) {\n        // your code here\n        return head;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] arr = parseInts(br.readLine());\n        int n = Integer.parseInt(br.readLine().trim());\n        int[] res = listToArray(removeNthFromEnd(arrayToList(arr), n));\n        System.out.println(join(res));\n    }\n}",
        python:
          "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef array_to_list(arr):\n    dummy = ListNode()\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef list_to_array(head):\n    res = []\n    while head:\n        res.append(head.val)\n        head = head.next\n    return res\n\ndef remove_nth_from_end(head, n):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\narr = list(map(int, lines[0].split()))\nn = int(lines[1])\nhead = array_to_list(arr)\nprint(*list_to_array(remove_nth_from_end(head, n)))",
      },
      testCases: {
        create: [
          { input: "1 2 3 4 5\n2", expected: "1 2 3 5", isSample: true, order: 1 },
          { input: "1 2\n1", expected: "1", isSample: true, order: 2 },
          { input: "1\n1", expected: "", isSample: false, order: 3 },
        ],
      },
    },
  });

  const stackTopic = await prisma.topic.upsert({
    where: { slug: "stack" },
    update: {
      name: "Stack",
      slug: "stack",
      description: "Problems solved with a last-in-first-out stack.",
      order: 6,
    },
    create: {
      name: "Stack",
      slug: "stack",
      description: "Problems solved with a last-in-first-out stack.",
      order: 6,
    },
  });

  await prisma.problem.upsert({
    where: { slug: "valid-parentheses" },
    update: {
      title: "Valid Parentheses",
      slug: "valid-parentheses",
      statement:
        "Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.\n\nInput format: a single line containing the string `s`.\nOutput format: `true` or `false`.",
      constraints: "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'.",
      difficulty: "EASY",
      order: 1,
      topicId: stackTopic.id,
      starterCode: {
        javascript:
          "function isValid(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').trim()\nconsole.log(isValid(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool isValid(string s) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << (isValid(s) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static boolean isValid(String s) {\n        // your code here\n        return false;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        System.out.println(isValid(s) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def is_valid(s):\n    # your code here\n    pass\n\nimport sys\ns = sys.stdin.readline().strip()\nprint(str(is_valid(s)).lower())",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "()[]{}", expected: "true", isSample: true, order: 1 },
          { input: "(]", expected: "false", isSample: true, order: 2 },
          { input: "([)]", expected: "false", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Valid Parentheses",
      slug: "valid-parentheses",
      statement:
        "Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid. An input string is valid if open brackets are closed by the same type of brackets and in the correct order.\n\nInput format: a single line containing the string `s`.\nOutput format: `true` or `false`.",
      constraints: "1 <= s.length <= 10^4\ns consists of parentheses only '()[]{}'.",
      difficulty: "EASY",
      order: 1,
      topicId: stackTopic.id,
      starterCode: {
        javascript:
          "function isValid(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').trim()\nconsole.log(isValid(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool isValid(string s) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << (isValid(s) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static boolean isValid(String s) {\n        // your code here\n        return false;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        System.out.println(isValid(s) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def is_valid(s):\n    # your code here\n    pass\n\nimport sys\ns = sys.stdin.readline().strip()\nprint(str(is_valid(s)).lower())",
      },
      testCases: {
        create: [
          { input: "()[]{}", expected: "true", isSample: true, order: 1 },
          { input: "(]", expected: "false", isSample: true, order: 2 },
          { input: "([)]", expected: "false", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "evaluate-reverse-polish-notation" },
    update: {
      title: "Evaluate Reverse Polish Notation",
      slug: "evaluate-reverse-polish-notation",
      statement:
        "Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are `+`, `-`, `*`, and `/`. Division between two integers should truncate toward zero.\n\nInput format: a single line with the space-separated tokens.\nOutput format: a single integer, the result of the expression.",
      constraints:
        "1 <= number of tokens <= 10^4\nEach operand may be an integer or another expression's result.\nThe result and intermediate values fit in a 32-bit integer.",
      difficulty: "MEDIUM",
      order: 2,
      topicId: stackTopic.id,
      starterCode: {
        javascript:
          "function evalRPN(tokens) {\n  // your code here\n}\n\nconst tokens = require('fs').readFileSync(0, 'utf8').trim().split(' ')\nconsole.log(evalRPN(tokens))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint evalRPN(vector<string>& tokens) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<string> tokens;\n    string tok;\n    while (ss >> tok) tokens.push_back(tok);\n    cout << evalRPN(tokens) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int evalRPN(String[] tokens) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String __line = br.readLine();\n        String[] tokens = (__line == null || __line.trim().isEmpty()) ? new String[]{} : __line.trim().split(\" +\");\n        System.out.println(evalRPN(tokens));\n    }\n}",
        python:
          "def eval_rpn(tokens):\n    # your code here\n    pass\n\nimport sys\ntokens = sys.stdin.readline().split()\nprint(eval_rpn(tokens))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "2 1 + 3 *", expected: "9", isSample: true, order: 1 },
          { input: "4 13 5 / +", expected: "6", isSample: true, order: 2 },
          { input: "10 6 9 3 + -11 * / * 17 + 5 +", expected: "22", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Evaluate Reverse Polish Notation",
      slug: "evaluate-reverse-polish-notation",
      statement:
        "Evaluate the value of an arithmetic expression in Reverse Polish Notation. Valid operators are `+`, `-`, `*`, and `/`. Division between two integers should truncate toward zero.\n\nInput format: a single line with the space-separated tokens.\nOutput format: a single integer, the result of the expression.",
      constraints:
        "1 <= number of tokens <= 10^4\nEach operand may be an integer or another expression's result.\nThe result and intermediate values fit in a 32-bit integer.",
      difficulty: "MEDIUM",
      order: 2,
      topicId: stackTopic.id,
      starterCode: {
        javascript:
          "function evalRPN(tokens) {\n  // your code here\n}\n\nconst tokens = require('fs').readFileSync(0, 'utf8').trim().split(' ')\nconsole.log(evalRPN(tokens))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint evalRPN(vector<string>& tokens) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<string> tokens;\n    string tok;\n    while (ss >> tok) tokens.push_back(tok);\n    cout << evalRPN(tokens) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int evalRPN(String[] tokens) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String __line = br.readLine();\n        String[] tokens = (__line == null || __line.trim().isEmpty()) ? new String[]{} : __line.trim().split(\" +\");\n        System.out.println(evalRPN(tokens));\n    }\n}",
        python:
          "def eval_rpn(tokens):\n    # your code here\n    pass\n\nimport sys\ntokens = sys.stdin.readline().split()\nprint(eval_rpn(tokens))",
      },
      testCases: {
        create: [
          { input: "2 1 + 3 *", expected: "9", isSample: true, order: 1 },
          { input: "4 13 5 / +", expected: "6", isSample: true, order: 2 },
          { input: "10 6 9 3 + -11 * / * 17 + 5 +", expected: "22", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "daily-temperatures" },
    update: {
      title: "Daily Temperatures",
      slug: "daily-temperatures",
      statement:
        "Given an array of integers `temperatures` representing daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after day `i` to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0`.\n\nInput format: a single line with `temperatures` as space-separated integers.\nOutput format: the resulting array as space-separated integers.",
      constraints: "1 <= temperatures.length <= 10^5\n30 <= temperatures[i] <= 100",
      difficulty: "MEDIUM",
      order: 3,
      topicId: stackTopic.id,
      starterCode: {
        javascript:
          "function dailyTemperatures(temperatures) {\n  // your code here\n}\n\nconst temperatures = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(dailyTemperatures(temperatures).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> dailyTemperatures(vector<int>& temperatures) {\n    // your code here\n    return {};\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> temperatures;\n    int x;\n    while (ss >> x) temperatures.push_back(x);\n    vector<int> res = dailyTemperatures(temperatures);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int[] dailyTemperatures(int[] temperatures) {\n        // your code here\n        return new int[]{};\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] temperatures = parseInts(br.readLine());\n        System.out.println(join(dailyTemperatures(temperatures)));\n    }\n}",
        python:
          "def daily_temperatures(temperatures):\n    # your code here\n    pass\n\nimport sys\ntemperatures = list(map(int, sys.stdin.readline().split()))\nprint(*daily_temperatures(temperatures))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "73 74 75 71 69 72 76 73", expected: "1 1 4 2 1 1 0 0", isSample: true, order: 1 },
          { input: "30 40 50 60", expected: "1 1 1 0", isSample: true, order: 2 },
          { input: "30 60 90", expected: "1 1 0", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Daily Temperatures",
      slug: "daily-temperatures",
      statement:
        "Given an array of integers `temperatures` representing daily temperatures, return an array `answer` such that `answer[i]` is the number of days you have to wait after day `i` to get a warmer temperature. If there is no future day for which this is possible, keep `answer[i] == 0`.\n\nInput format: a single line with `temperatures` as space-separated integers.\nOutput format: the resulting array as space-separated integers.",
      constraints: "1 <= temperatures.length <= 10^5\n30 <= temperatures[i] <= 100",
      difficulty: "MEDIUM",
      order: 3,
      topicId: stackTopic.id,
      starterCode: {
        javascript:
          "function dailyTemperatures(temperatures) {\n  // your code here\n}\n\nconst temperatures = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(dailyTemperatures(temperatures).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> dailyTemperatures(vector<int>& temperatures) {\n    // your code here\n    return {};\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> temperatures;\n    int x;\n    while (ss >> x) temperatures.push_back(x);\n    vector<int> res = dailyTemperatures(temperatures);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int[] dailyTemperatures(int[] temperatures) {\n        // your code here\n        return new int[]{};\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] temperatures = parseInts(br.readLine());\n        System.out.println(join(dailyTemperatures(temperatures)));\n    }\n}",
        python:
          "def daily_temperatures(temperatures):\n    # your code here\n    pass\n\nimport sys\ntemperatures = list(map(int, sys.stdin.readline().split()))\nprint(*daily_temperatures(temperatures))",
      },
      testCases: {
        create: [
          { input: "73 74 75 71 69 72 76 73", expected: "1 1 4 2 1 1 0 0", isSample: true, order: 1 },
          { input: "30 40 50 60", expected: "1 1 1 0", isSample: true, order: 2 },
          { input: "30 60 90", expected: "1 1 0", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "next-greater-element-i" },
    update: {
      title: "Next Greater Element I",
      slug: "next-greater-element-i",
      statement:
        "You are given two distinct 0-indexed integer arrays `nums1` and `nums2`, where `nums1` is a subset of `nums2`. For each `nums1[i]`, find the index of `nums1[i]` in `nums2` and determine the next greater element of `nums1[i]` in `nums2` to the right of that index. If it does not exist, use `-1`.\n\nInput format: first line is `nums1` as space-separated integers, second line is `nums2` as space-separated integers.\nOutput format: the resulting array, one value per element of `nums1`, space-separated.",
      constraints:
        "1 <= nums1.length <= nums2.length <= 1000\n0 <= nums1[i], nums2[i] <= 10^4\nAll integers in nums1 and nums2 are unique.\nAll integers of nums1 also appear in nums2.",
      difficulty: "EASY",
      order: 4,
      topicId: stackTopic.id,
      starterCode: {
        javascript:
          "function nextGreaterElement(nums1, nums2) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst nums1 = lines[0].split(' ').map(Number)\nconst nums2 = lines[1].split(' ').map(Number)\nconsole.log(nextGreaterElement(nums1, nums2).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {\n    // your code here\n    return {};\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss1(line1), ss2(line2);\n    vector<int> nums1, nums2;\n    int x;\n    while (ss1 >> x) nums1.push_back(x);\n    while (ss2 >> x) nums2.push_back(x);\n    vector<int> res = nextGreaterElement(nums1, nums2);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int[] nextGreaterElement(int[] nums1, int[] nums2) {\n        // your code here\n        return new int[]{};\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums1 = parseInts(br.readLine());\n        int[] nums2 = parseInts(br.readLine());\n        System.out.println(join(nextGreaterElement(nums1, nums2)));\n    }\n}",
        python:
          "def next_greater_element(nums1, nums2):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnums1 = list(map(int, lines[0].split()))\nnums2 = list(map(int, lines[1].split()))\nprint(*next_greater_element(nums1, nums2))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "4 1 2\n1 3 4 2", expected: "-1 3 -1", isSample: true, order: 1 },
          { input: "2 4\n1 2 3 4", expected: "3 -1", isSample: true, order: 2 },
          { input: "4 2\n4 1 2 3", expected: "-1 3", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Next Greater Element I",
      slug: "next-greater-element-i",
      statement:
        "You are given two distinct 0-indexed integer arrays `nums1` and `nums2`, where `nums1` is a subset of `nums2`. For each `nums1[i]`, find the index of `nums1[i]` in `nums2` and determine the next greater element of `nums1[i]` in `nums2` to the right of that index. If it does not exist, use `-1`.\n\nInput format: first line is `nums1` as space-separated integers, second line is `nums2` as space-separated integers.\nOutput format: the resulting array, one value per element of `nums1`, space-separated.",
      constraints:
        "1 <= nums1.length <= nums2.length <= 1000\n0 <= nums1[i], nums2[i] <= 10^4\nAll integers in nums1 and nums2 are unique.\nAll integers of nums1 also appear in nums2.",
      difficulty: "EASY",
      order: 4,
      topicId: stackTopic.id,
      starterCode: {
        javascript:
          "function nextGreaterElement(nums1, nums2) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst nums1 = lines[0].split(' ').map(Number)\nconst nums2 = lines[1].split(' ').map(Number)\nconsole.log(nextGreaterElement(nums1, nums2).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {\n    // your code here\n    return {};\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss1(line1), ss2(line2);\n    vector<int> nums1, nums2;\n    int x;\n    while (ss1 >> x) nums1.push_back(x);\n    while (ss2 >> x) nums2.push_back(x);\n    vector<int> res = nextGreaterElement(nums1, nums2);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int[] nextGreaterElement(int[] nums1, int[] nums2) {\n        // your code here\n        return new int[]{};\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums1 = parseInts(br.readLine());\n        int[] nums2 = parseInts(br.readLine());\n        System.out.println(join(nextGreaterElement(nums1, nums2)));\n    }\n}",
        python:
          "def next_greater_element(nums1, nums2):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnums1 = list(map(int, lines[0].split()))\nnums2 = list(map(int, lines[1].split()))\nprint(*next_greater_element(nums1, nums2))",
      },
      testCases: {
        create: [
          { input: "4 1 2\n1 3 4 2", expected: "-1 3 -1", isSample: true, order: 1 },
          { input: "2 4\n1 2 3 4", expected: "3 -1", isSample: true, order: 2 },
          { input: "4 2\n4 1 2 3", expected: "-1 3", isSample: false, order: 3 },
        ],
      },
    },
  });

  const trees = await prisma.topic.upsert({
    where: { slug: "trees" },
    update: {
      name: "Trees",
      slug: "trees",
      description:
        "Binary tree problems. Trees are given/returned as level-order arrays with 'null' marking missing children; starter code builds/serializes the actual tree for you.",
      order: 7,
    },
    create: {
      name: "Trees",
      slug: "trees",
      description:
        "Binary tree problems. Trees are given/returned as level-order arrays with 'null' marking missing children; starter code builds/serializes the actual tree for you.",
      order: 7,
    },
  });

  await prisma.problem.upsert({
    where: { slug: "maximum-depth-of-binary-tree" },
    update: {
      title: "Maximum Depth of Binary Tree",
      slug: "maximum-depth-of-binary-tree",
      statement:
        "Given the `root` of a binary tree (represented as a level-order array where `null` marks a missing child), return its maximum depth. The maximum depth is the number of nodes along the longest path from the root down to the farthest leaf node.\n\nInput format: a single line with the tree as space-separated tokens (integers and the literal `null`).\nOutput format: a single integer, the maximum depth.",
      constraints: "1 <= number of nodes <= 10^4\n-100 <= node value <= 100",
      difficulty: "EASY",
      order: 1,
      topicId: trees.id,
      starterCode: {
        javascript:
          "class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val\n    this.left = left\n    this.right = right\n  }\n}\nfunction buildTree(tokens) {\n  if (tokens.length === 0 || tokens[0] === 'null') return null\n  const root = new TreeNode(Number(tokens[0]))\n  const queue = [root]\n  let i = 1\n  while (queue.length && i < tokens.length) {\n    const node = queue.shift()\n    if (i < tokens.length) {\n      const leftVal = tokens[i++]\n      if (leftVal !== 'null') {\n        node.left = new TreeNode(Number(leftVal))\n        queue.push(node.left)\n      }\n    }\n    if (i < tokens.length) {\n      const rightVal = tokens[i++]\n      if (rightVal !== 'null') {\n        node.right = new TreeNode(Number(rightVal))\n        queue.push(node.right)\n      }\n    }\n  }\n  return root\n}\n\nfunction maxDepth(root) {\n  // your code here\n}\n\nconst tokens = require('fs').readFileSync(0, 'utf8').trim().split(' ')\nconst root = buildTree(tokens)\nconsole.log(maxDepth(root))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* buildTree(vector<string>& tokens) {\n    if (tokens.empty() || tokens[0] == \"null\") return nullptr;\n    TreeNode* root = new TreeNode(stoi(tokens[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < tokens.size()) {\n        TreeNode* node = q.front(); q.pop();\n        if (i < tokens.size()) {\n            string leftVal = tokens[i++];\n            if (leftVal != \"null\") {\n                node->left = new TreeNode(stoi(leftVal));\n                q.push(node->left);\n            }\n        }\n        if (i < tokens.size()) {\n            string rightVal = tokens[i++];\n            if (rightVal != \"null\") {\n                node->right = new TreeNode(stoi(rightVal));\n                q.push(node->right);\n            }\n        }\n    }\n    return root;\n}\n\nint maxDepth(TreeNode* root) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<string> tokens;\n    string tok;\n    while (ss >> tok) tokens.push_back(tok);\n    TreeNode* root = buildTree(tokens);\n    cout << maxDepth(root) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x){ val = x; } }\n    static TreeNode buildTree(String[] tokens) {\n        if (tokens.length == 0 || tokens[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        int i = 1;\n        while (!q.isEmpty() && i < tokens.length) {\n            TreeNode node = q.poll();\n            if (i < tokens.length) { String lv = tokens[i++]; if (!lv.equals(\"null\")) { node.left = new TreeNode(Integer.parseInt(lv)); q.add(node.left); } }\n            if (i < tokens.length) { String rv = tokens[i++]; if (!rv.equals(\"null\")) { node.right = new TreeNode(Integer.parseInt(rv)); q.add(node.right); } }\n        }\n        return root;\n    }\n    static int maxDepth(TreeNode root) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String __line = br.readLine();\n        String[] tokens = (__line == null || __line.trim().isEmpty()) ? new String[]{} : __line.trim().split(\" +\");\n        System.out.println(maxDepth(buildTree(tokens)));\n    }\n}",
        python:
          "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef build_tree(tokens):\n    if not tokens or tokens[0] == 'null':\n        return None\n    root = TreeNode(int(tokens[0]))\n    queue = [root]\n    i = 1\n    while queue and i < len(tokens):\n        node = queue.pop(0)\n        if i < len(tokens):\n            left_val = tokens[i]\n            i += 1\n            if left_val != 'null':\n                node.left = TreeNode(int(left_val))\n                queue.append(node.left)\n        if i < len(tokens):\n            right_val = tokens[i]\n            i += 1\n            if right_val != 'null':\n                node.right = TreeNode(int(right_val))\n                queue.append(node.right)\n    return root\n\ndef max_depth(root):\n    # your code here\n    pass\n\nimport sys\ntokens = sys.stdin.readline().split()\nroot = build_tree(tokens)\nprint(max_depth(root))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "3 9 20 null null 15 7", expected: "3", isSample: true, order: 1 },
          { input: "1 null 2", expected: "2", isSample: true, order: 2 },
          { input: "1", expected: "1", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Maximum Depth of Binary Tree",
      slug: "maximum-depth-of-binary-tree",
      statement:
        "Given the `root` of a binary tree (represented as a level-order array where `null` marks a missing child), return its maximum depth. The maximum depth is the number of nodes along the longest path from the root down to the farthest leaf node.\n\nInput format: a single line with the tree as space-separated tokens (integers and the literal `null`).\nOutput format: a single integer, the maximum depth.",
      constraints: "1 <= number of nodes <= 10^4\n-100 <= node value <= 100",
      difficulty: "EASY",
      order: 1,
      topicId: trees.id,
      starterCode: {
        javascript:
          "class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val\n    this.left = left\n    this.right = right\n  }\n}\nfunction buildTree(tokens) {\n  if (tokens.length === 0 || tokens[0] === 'null') return null\n  const root = new TreeNode(Number(tokens[0]))\n  const queue = [root]\n  let i = 1\n  while (queue.length && i < tokens.length) {\n    const node = queue.shift()\n    if (i < tokens.length) {\n      const leftVal = tokens[i++]\n      if (leftVal !== 'null') {\n        node.left = new TreeNode(Number(leftVal))\n        queue.push(node.left)\n      }\n    }\n    if (i < tokens.length) {\n      const rightVal = tokens[i++]\n      if (rightVal !== 'null') {\n        node.right = new TreeNode(Number(rightVal))\n        queue.push(node.right)\n      }\n    }\n  }\n  return root\n}\n\nfunction maxDepth(root) {\n  // your code here\n}\n\nconst tokens = require('fs').readFileSync(0, 'utf8').trim().split(' ')\nconst root = buildTree(tokens)\nconsole.log(maxDepth(root))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* buildTree(vector<string>& tokens) {\n    if (tokens.empty() || tokens[0] == \"null\") return nullptr;\n    TreeNode* root = new TreeNode(stoi(tokens[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < tokens.size()) {\n        TreeNode* node = q.front(); q.pop();\n        if (i < tokens.size()) {\n            string leftVal = tokens[i++];\n            if (leftVal != \"null\") {\n                node->left = new TreeNode(stoi(leftVal));\n                q.push(node->left);\n            }\n        }\n        if (i < tokens.size()) {\n            string rightVal = tokens[i++];\n            if (rightVal != \"null\") {\n                node->right = new TreeNode(stoi(rightVal));\n                q.push(node->right);\n            }\n        }\n    }\n    return root;\n}\n\nint maxDepth(TreeNode* root) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<string> tokens;\n    string tok;\n    while (ss >> tok) tokens.push_back(tok);\n    TreeNode* root = buildTree(tokens);\n    cout << maxDepth(root) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x){ val = x; } }\n    static TreeNode buildTree(String[] tokens) {\n        if (tokens.length == 0 || tokens[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        int i = 1;\n        while (!q.isEmpty() && i < tokens.length) {\n            TreeNode node = q.poll();\n            if (i < tokens.length) { String lv = tokens[i++]; if (!lv.equals(\"null\")) { node.left = new TreeNode(Integer.parseInt(lv)); q.add(node.left); } }\n            if (i < tokens.length) { String rv = tokens[i++]; if (!rv.equals(\"null\")) { node.right = new TreeNode(Integer.parseInt(rv)); q.add(node.right); } }\n        }\n        return root;\n    }\n    static int maxDepth(TreeNode root) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String __line = br.readLine();\n        String[] tokens = (__line == null || __line.trim().isEmpty()) ? new String[]{} : __line.trim().split(\" +\");\n        System.out.println(maxDepth(buildTree(tokens)));\n    }\n}",
        python:
          "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef build_tree(tokens):\n    if not tokens or tokens[0] == 'null':\n        return None\n    root = TreeNode(int(tokens[0]))\n    queue = [root]\n    i = 1\n    while queue and i < len(tokens):\n        node = queue.pop(0)\n        if i < len(tokens):\n            left_val = tokens[i]\n            i += 1\n            if left_val != 'null':\n                node.left = TreeNode(int(left_val))\n                queue.append(node.left)\n        if i < len(tokens):\n            right_val = tokens[i]\n            i += 1\n            if right_val != 'null':\n                node.right = TreeNode(int(right_val))\n                queue.append(node.right)\n    return root\n\ndef max_depth(root):\n    # your code here\n    pass\n\nimport sys\ntokens = sys.stdin.readline().split()\nroot = build_tree(tokens)\nprint(max_depth(root))",
      },
      testCases: {
        create: [
          { input: "3 9 20 null null 15 7", expected: "3", isSample: true, order: 1 },
          { input: "1 null 2", expected: "2", isSample: true, order: 2 },
          { input: "1", expected: "1", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "invert-binary-tree" },
    update: {
      title: "Invert Binary Tree",
      slug: "invert-binary-tree",
      statement:
        "Given the `root` of a binary tree (represented as a level-order array where `null` marks a missing child), invert the tree (swap every left and right child) and return the resulting tree.\n\nInput format: a single line with the tree as space-separated tokens (integers and the literal `null`).\nOutput format: the inverted tree serialized level-order the same way (space-separated tokens, `null` for missing children, trailing `null`s omitted).",
      constraints: "0 <= number of nodes <= 100\n-100 <= node value <= 100",
      difficulty: "EASY",
      order: 2,
      topicId: trees.id,
      starterCode: {
        javascript:
          "class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val\n    this.left = left\n    this.right = right\n  }\n}\nfunction buildTree(tokens) {\n  if (tokens.length === 0 || tokens[0] === 'null') return null\n  const root = new TreeNode(Number(tokens[0]))\n  const queue = [root]\n  let i = 1\n  while (queue.length && i < tokens.length) {\n    const node = queue.shift()\n    if (i < tokens.length) {\n      const leftVal = tokens[i++]\n      if (leftVal !== 'null') {\n        node.left = new TreeNode(Number(leftVal))\n        queue.push(node.left)\n      }\n    }\n    if (i < tokens.length) {\n      const rightVal = tokens[i++]\n      if (rightVal !== 'null') {\n        node.right = new TreeNode(Number(rightVal))\n        queue.push(node.right)\n      }\n    }\n  }\n  return root\n}\nfunction serializeTree(root) {\n  if (!root) return []\n  const result = [String(root.val)]\n  const queue = [root]\n  while (queue.length) {\n    const node = queue.shift()\n    if (node.left) { result.push(String(node.left.val)); queue.push(node.left) }\n    else result.push('null')\n    if (node.right) { result.push(String(node.right.val)); queue.push(node.right) }\n    else result.push('null')\n  }\n  while (result.length && result[result.length - 1] === 'null') result.pop()\n  return result\n}\n\nfunction invertTree(root) {\n  // your code here\n}\n\nconst tokens = require('fs').readFileSync(0, 'utf8').trim().split(' ')\nconst root = buildTree(tokens)\nconsole.log(serializeTree(invertTree(root)).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* buildTree(vector<string>& tokens) {\n    if (tokens.empty() || tokens[0] == \"null\") return nullptr;\n    TreeNode* root = new TreeNode(stoi(tokens[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < tokens.size()) {\n        TreeNode* node = q.front(); q.pop();\n        if (i < tokens.size()) {\n            string leftVal = tokens[i++];\n            if (leftVal != \"null\") {\n                node->left = new TreeNode(stoi(leftVal));\n                q.push(node->left);\n            }\n        }\n        if (i < tokens.size()) {\n            string rightVal = tokens[i++];\n            if (rightVal != \"null\") {\n                node->right = new TreeNode(stoi(rightVal));\n                q.push(node->right);\n            }\n        }\n    }\n    return root;\n}\n\nvector<string> serializeTree(TreeNode* root) {\n    if (!root) return {};\n    vector<string> result;\n    result.push_back(to_string(root->val));\n    queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        TreeNode* node = q.front(); q.pop();\n        if (node->left) { result.push_back(to_string(node->left->val)); q.push(node->left); }\n        else result.push_back(\"null\");\n        if (node->right) { result.push_back(to_string(node->right->val)); q.push(node->right); }\n        else result.push_back(\"null\");\n    }\n    while (!result.empty() && result.back() == \"null\") result.pop_back();\n    return result;\n}\n\nTreeNode* invertTree(TreeNode* root) {\n    // your code here\n    return root;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<string> tokens;\n    string tok;\n    while (ss >> tok) tokens.push_back(tok);\n    TreeNode* root = buildTree(tokens);\n    vector<string> res = serializeTree(invertTree(root));\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x){ val = x; } }\n    static TreeNode buildTree(String[] tokens) {\n        if (tokens.length == 0 || tokens[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        int i = 1;\n        while (!q.isEmpty() && i < tokens.length) {\n            TreeNode node = q.poll();\n            if (i < tokens.length) { String lv = tokens[i++]; if (!lv.equals(\"null\")) { node.left = new TreeNode(Integer.parseInt(lv)); q.add(node.left); } }\n            if (i < tokens.length) { String rv = tokens[i++]; if (!rv.equals(\"null\")) { node.right = new TreeNode(Integer.parseInt(rv)); q.add(node.right); } }\n        }\n        return root;\n    }\n    static List<String> serializeTree(TreeNode root) {\n        List<String> result = new ArrayList<>();\n        if (root == null) return result;\n        result.add(String.valueOf(root.val));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        while (!q.isEmpty()) {\n            TreeNode node = q.poll();\n            if (node.left != null) { result.add(String.valueOf(node.left.val)); q.add(node.left); } else result.add(\"null\");\n            if (node.right != null) { result.add(String.valueOf(node.right.val)); q.add(node.right); } else result.add(\"null\");\n        }\n        while (!result.isEmpty() && result.get(result.size() - 1).equals(\"null\")) result.remove(result.size() - 1);\n        return result;\n    }\n    static TreeNode invertTree(TreeNode root) {\n        // your code here\n        return root;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String __line = br.readLine();\n        String[] tokens = (__line == null || __line.trim().isEmpty()) ? new String[]{} : __line.trim().split(\" +\");\n        List<String> res = serializeTree(invertTree(buildTree(tokens)));\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < res.size(); i++) { if (i > 0) sb.append(\" \"); sb.append(res.get(i)); }\n        System.out.println(sb.toString());\n    }\n}",
        python:
          "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef build_tree(tokens):\n    if not tokens or tokens[0] == 'null':\n        return None\n    root = TreeNode(int(tokens[0]))\n    queue = [root]\n    i = 1\n    while queue and i < len(tokens):\n        node = queue.pop(0)\n        if i < len(tokens):\n            left_val = tokens[i]\n            i += 1\n            if left_val != 'null':\n                node.left = TreeNode(int(left_val))\n                queue.append(node.left)\n        if i < len(tokens):\n            right_val = tokens[i]\n            i += 1\n            if right_val != 'null':\n                node.right = TreeNode(int(right_val))\n                queue.append(node.right)\n    return root\n\ndef serialize_tree(root):\n    if not root:\n        return []\n    result = [str(root.val)]\n    queue = [root]\n    while queue:\n        node = queue.pop(0)\n        if node.left:\n            result.append(str(node.left.val))\n            queue.append(node.left)\n        else:\n            result.append('null')\n        if node.right:\n            result.append(str(node.right.val))\n            queue.append(node.right)\n        else:\n            result.append('null')\n    while result and result[-1] == 'null':\n        result.pop()\n    return result\n\ndef invert_tree(root):\n    # your code here\n    pass\n\nimport sys\ntokens = sys.stdin.readline().split()\nroot = build_tree(tokens)\nprint(*serialize_tree(invert_tree(root)))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "4 2 7 1 3 6 9", expected: "4 7 2 9 6 3 1", isSample: true, order: 1 },
          { input: "2 1 3", expected: "2 3 1", isSample: true, order: 2 },
          { input: "1", expected: "1", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Invert Binary Tree",
      slug: "invert-binary-tree",
      statement:
        "Given the `root` of a binary tree (represented as a level-order array where `null` marks a missing child), invert the tree (swap every left and right child) and return the resulting tree.\n\nInput format: a single line with the tree as space-separated tokens (integers and the literal `null`).\nOutput format: the inverted tree serialized level-order the same way (space-separated tokens, `null` for missing children, trailing `null`s omitted).",
      constraints: "0 <= number of nodes <= 100\n-100 <= node value <= 100",
      difficulty: "EASY",
      order: 2,
      topicId: trees.id,
      starterCode: {
        javascript:
          "class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val\n    this.left = left\n    this.right = right\n  }\n}\nfunction buildTree(tokens) {\n  if (tokens.length === 0 || tokens[0] === 'null') return null\n  const root = new TreeNode(Number(tokens[0]))\n  const queue = [root]\n  let i = 1\n  while (queue.length && i < tokens.length) {\n    const node = queue.shift()\n    if (i < tokens.length) {\n      const leftVal = tokens[i++]\n      if (leftVal !== 'null') {\n        node.left = new TreeNode(Number(leftVal))\n        queue.push(node.left)\n      }\n    }\n    if (i < tokens.length) {\n      const rightVal = tokens[i++]\n      if (rightVal !== 'null') {\n        node.right = new TreeNode(Number(rightVal))\n        queue.push(node.right)\n      }\n    }\n  }\n  return root\n}\nfunction serializeTree(root) {\n  if (!root) return []\n  const result = [String(root.val)]\n  const queue = [root]\n  while (queue.length) {\n    const node = queue.shift()\n    if (node.left) { result.push(String(node.left.val)); queue.push(node.left) }\n    else result.push('null')\n    if (node.right) { result.push(String(node.right.val)); queue.push(node.right) }\n    else result.push('null')\n  }\n  while (result.length && result[result.length - 1] === 'null') result.pop()\n  return result\n}\n\nfunction invertTree(root) {\n  // your code here\n}\n\nconst tokens = require('fs').readFileSync(0, 'utf8').trim().split(' ')\nconst root = buildTree(tokens)\nconsole.log(serializeTree(invertTree(root)).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* buildTree(vector<string>& tokens) {\n    if (tokens.empty() || tokens[0] == \"null\") return nullptr;\n    TreeNode* root = new TreeNode(stoi(tokens[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < tokens.size()) {\n        TreeNode* node = q.front(); q.pop();\n        if (i < tokens.size()) {\n            string leftVal = tokens[i++];\n            if (leftVal != \"null\") {\n                node->left = new TreeNode(stoi(leftVal));\n                q.push(node->left);\n            }\n        }\n        if (i < tokens.size()) {\n            string rightVal = tokens[i++];\n            if (rightVal != \"null\") {\n                node->right = new TreeNode(stoi(rightVal));\n                q.push(node->right);\n            }\n        }\n    }\n    return root;\n}\n\nvector<string> serializeTree(TreeNode* root) {\n    if (!root) return {};\n    vector<string> result;\n    result.push_back(to_string(root->val));\n    queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        TreeNode* node = q.front(); q.pop();\n        if (node->left) { result.push_back(to_string(node->left->val)); q.push(node->left); }\n        else result.push_back(\"null\");\n        if (node->right) { result.push_back(to_string(node->right->val)); q.push(node->right); }\n        else result.push_back(\"null\");\n    }\n    while (!result.empty() && result.back() == \"null\") result.pop_back();\n    return result;\n}\n\nTreeNode* invertTree(TreeNode* root) {\n    // your code here\n    return root;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<string> tokens;\n    string tok;\n    while (ss >> tok) tokens.push_back(tok);\n    TreeNode* root = buildTree(tokens);\n    vector<string> res = serializeTree(invertTree(root));\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x){ val = x; } }\n    static TreeNode buildTree(String[] tokens) {\n        if (tokens.length == 0 || tokens[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        int i = 1;\n        while (!q.isEmpty() && i < tokens.length) {\n            TreeNode node = q.poll();\n            if (i < tokens.length) { String lv = tokens[i++]; if (!lv.equals(\"null\")) { node.left = new TreeNode(Integer.parseInt(lv)); q.add(node.left); } }\n            if (i < tokens.length) { String rv = tokens[i++]; if (!rv.equals(\"null\")) { node.right = new TreeNode(Integer.parseInt(rv)); q.add(node.right); } }\n        }\n        return root;\n    }\n    static List<String> serializeTree(TreeNode root) {\n        List<String> result = new ArrayList<>();\n        if (root == null) return result;\n        result.add(String.valueOf(root.val));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        while (!q.isEmpty()) {\n            TreeNode node = q.poll();\n            if (node.left != null) { result.add(String.valueOf(node.left.val)); q.add(node.left); } else result.add(\"null\");\n            if (node.right != null) { result.add(String.valueOf(node.right.val)); q.add(node.right); } else result.add(\"null\");\n        }\n        while (!result.isEmpty() && result.get(result.size() - 1).equals(\"null\")) result.remove(result.size() - 1);\n        return result;\n    }\n    static TreeNode invertTree(TreeNode root) {\n        // your code here\n        return root;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String __line = br.readLine();\n        String[] tokens = (__line == null || __line.trim().isEmpty()) ? new String[]{} : __line.trim().split(\" +\");\n        List<String> res = serializeTree(invertTree(buildTree(tokens)));\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < res.size(); i++) { if (i > 0) sb.append(\" \"); sb.append(res.get(i)); }\n        System.out.println(sb.toString());\n    }\n}",
        python:
          "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef build_tree(tokens):\n    if not tokens or tokens[0] == 'null':\n        return None\n    root = TreeNode(int(tokens[0]))\n    queue = [root]\n    i = 1\n    while queue and i < len(tokens):\n        node = queue.pop(0)\n        if i < len(tokens):\n            left_val = tokens[i]\n            i += 1\n            if left_val != 'null':\n                node.left = TreeNode(int(left_val))\n                queue.append(node.left)\n        if i < len(tokens):\n            right_val = tokens[i]\n            i += 1\n            if right_val != 'null':\n                node.right = TreeNode(int(right_val))\n                queue.append(node.right)\n    return root\n\ndef serialize_tree(root):\n    if not root:\n        return []\n    result = [str(root.val)]\n    queue = [root]\n    while queue:\n        node = queue.pop(0)\n        if node.left:\n            result.append(str(node.left.val))\n            queue.append(node.left)\n        else:\n            result.append('null')\n        if node.right:\n            result.append(str(node.right.val))\n            queue.append(node.right)\n        else:\n            result.append('null')\n    while result and result[-1] == 'null':\n        result.pop()\n    return result\n\ndef invert_tree(root):\n    # your code here\n    pass\n\nimport sys\ntokens = sys.stdin.readline().split()\nroot = build_tree(tokens)\nprint(*serialize_tree(invert_tree(root)))",
      },
      testCases: {
        create: [
          { input: "4 2 7 1 3 6 9", expected: "4 7 2 9 6 3 1", isSample: true, order: 1 },
          { input: "2 1 3", expected: "2 3 1", isSample: true, order: 2 },
          { input: "1", expected: "1", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "validate-binary-search-tree" },
    update: {
      title: "Validate Binary Search Tree",
      slug: "validate-binary-search-tree",
      statement:
        "Given the `root` of a binary tree (represented as a level-order array where `null` marks a missing child), determine if it is a valid binary search tree. A valid BST has, for every node, all values in its left subtree strictly less than the node's value and all values in its right subtree strictly greater.\n\nInput format: a single line with the tree as space-separated tokens (integers and the literal `null`).\nOutput format: `true` or `false`.",
      constraints: "1 <= number of nodes <= 10^4\n-2^31 <= node value <= 2^31 - 1",
      difficulty: "MEDIUM",
      order: 3,
      topicId: trees.id,
      starterCode: {
        javascript:
          "class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val\n    this.left = left\n    this.right = right\n  }\n}\nfunction buildTree(tokens) {\n  if (tokens.length === 0 || tokens[0] === 'null') return null\n  const root = new TreeNode(Number(tokens[0]))\n  const queue = [root]\n  let i = 1\n  while (queue.length && i < tokens.length) {\n    const node = queue.shift()\n    if (i < tokens.length) {\n      const leftVal = tokens[i++]\n      if (leftVal !== 'null') {\n        node.left = new TreeNode(Number(leftVal))\n        queue.push(node.left)\n      }\n    }\n    if (i < tokens.length) {\n      const rightVal = tokens[i++]\n      if (rightVal !== 'null') {\n        node.right = new TreeNode(Number(rightVal))\n        queue.push(node.right)\n      }\n    }\n  }\n  return root\n}\n\nfunction isValidBST(root) {\n  // your code here\n}\n\nconst tokens = require('fs').readFileSync(0, 'utf8').trim().split(' ')\nconst root = buildTree(tokens)\nconsole.log(isValidBST(root))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* buildTree(vector<string>& tokens) {\n    if (tokens.empty() || tokens[0] == \"null\") return nullptr;\n    TreeNode* root = new TreeNode(stoi(tokens[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < tokens.size()) {\n        TreeNode* node = q.front(); q.pop();\n        if (i < tokens.size()) {\n            string leftVal = tokens[i++];\n            if (leftVal != \"null\") {\n                node->left = new TreeNode(stoi(leftVal));\n                q.push(node->left);\n            }\n        }\n        if (i < tokens.size()) {\n            string rightVal = tokens[i++];\n            if (rightVal != \"null\") {\n                node->right = new TreeNode(stoi(rightVal));\n                q.push(node->right);\n            }\n        }\n    }\n    return root;\n}\n\nbool isValidBST(TreeNode* root) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<string> tokens;\n    string tok;\n    while (ss >> tok) tokens.push_back(tok);\n    TreeNode* root = buildTree(tokens);\n    cout << (isValidBST(root) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x){ val = x; } }\n    static TreeNode buildTree(String[] tokens) {\n        if (tokens.length == 0 || tokens[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        int i = 1;\n        while (!q.isEmpty() && i < tokens.length) {\n            TreeNode node = q.poll();\n            if (i < tokens.length) { String lv = tokens[i++]; if (!lv.equals(\"null\")) { node.left = new TreeNode(Integer.parseInt(lv)); q.add(node.left); } }\n            if (i < tokens.length) { String rv = tokens[i++]; if (!rv.equals(\"null\")) { node.right = new TreeNode(Integer.parseInt(rv)); q.add(node.right); } }\n        }\n        return root;\n    }\n    static boolean isValidBST(TreeNode root) {\n        // your code here\n        return false;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String __line = br.readLine();\n        String[] tokens = (__line == null || __line.trim().isEmpty()) ? new String[]{} : __line.trim().split(\" +\");\n        System.out.println(isValidBST(buildTree(tokens)) ? \"true\" : \"false\");\n    }\n}",
        python:
          "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef build_tree(tokens):\n    if not tokens or tokens[0] == 'null':\n        return None\n    root = TreeNode(int(tokens[0]))\n    queue = [root]\n    i = 1\n    while queue and i < len(tokens):\n        node = queue.pop(0)\n        if i < len(tokens):\n            left_val = tokens[i]\n            i += 1\n            if left_val != 'null':\n                node.left = TreeNode(int(left_val))\n                queue.append(node.left)\n        if i < len(tokens):\n            right_val = tokens[i]\n            i += 1\n            if right_val != 'null':\n                node.right = TreeNode(int(right_val))\n                queue.append(node.right)\n    return root\n\ndef is_valid_bst(root):\n    # your code here\n    pass\n\nimport sys\ntokens = sys.stdin.readline().split()\nroot = build_tree(tokens)\nprint(str(is_valid_bst(root)).lower())",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "2 1 3", expected: "true", isSample: true, order: 1 },
          { input: "5 1 4 null null 3 6", expected: "false", isSample: true, order: 2 },
          { input: "1 1", expected: "false", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Validate Binary Search Tree",
      slug: "validate-binary-search-tree",
      statement:
        "Given the `root` of a binary tree (represented as a level-order array where `null` marks a missing child), determine if it is a valid binary search tree. A valid BST has, for every node, all values in its left subtree strictly less than the node's value and all values in its right subtree strictly greater.\n\nInput format: a single line with the tree as space-separated tokens (integers and the literal `null`).\nOutput format: `true` or `false`.",
      constraints: "1 <= number of nodes <= 10^4\n-2^31 <= node value <= 2^31 - 1",
      difficulty: "MEDIUM",
      order: 3,
      topicId: trees.id,
      starterCode: {
        javascript:
          "class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val\n    this.left = left\n    this.right = right\n  }\n}\nfunction buildTree(tokens) {\n  if (tokens.length === 0 || tokens[0] === 'null') return null\n  const root = new TreeNode(Number(tokens[0]))\n  const queue = [root]\n  let i = 1\n  while (queue.length && i < tokens.length) {\n    const node = queue.shift()\n    if (i < tokens.length) {\n      const leftVal = tokens[i++]\n      if (leftVal !== 'null') {\n        node.left = new TreeNode(Number(leftVal))\n        queue.push(node.left)\n      }\n    }\n    if (i < tokens.length) {\n      const rightVal = tokens[i++]\n      if (rightVal !== 'null') {\n        node.right = new TreeNode(Number(rightVal))\n        queue.push(node.right)\n      }\n    }\n  }\n  return root\n}\n\nfunction isValidBST(root) {\n  // your code here\n}\n\nconst tokens = require('fs').readFileSync(0, 'utf8').trim().split(' ')\nconst root = buildTree(tokens)\nconsole.log(isValidBST(root))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* buildTree(vector<string>& tokens) {\n    if (tokens.empty() || tokens[0] == \"null\") return nullptr;\n    TreeNode* root = new TreeNode(stoi(tokens[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < tokens.size()) {\n        TreeNode* node = q.front(); q.pop();\n        if (i < tokens.size()) {\n            string leftVal = tokens[i++];\n            if (leftVal != \"null\") {\n                node->left = new TreeNode(stoi(leftVal));\n                q.push(node->left);\n            }\n        }\n        if (i < tokens.size()) {\n            string rightVal = tokens[i++];\n            if (rightVal != \"null\") {\n                node->right = new TreeNode(stoi(rightVal));\n                q.push(node->right);\n            }\n        }\n    }\n    return root;\n}\n\nbool isValidBST(TreeNode* root) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<string> tokens;\n    string tok;\n    while (ss >> tok) tokens.push_back(tok);\n    TreeNode* root = buildTree(tokens);\n    cout << (isValidBST(root) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x){ val = x; } }\n    static TreeNode buildTree(String[] tokens) {\n        if (tokens.length == 0 || tokens[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        int i = 1;\n        while (!q.isEmpty() && i < tokens.length) {\n            TreeNode node = q.poll();\n            if (i < tokens.length) { String lv = tokens[i++]; if (!lv.equals(\"null\")) { node.left = new TreeNode(Integer.parseInt(lv)); q.add(node.left); } }\n            if (i < tokens.length) { String rv = tokens[i++]; if (!rv.equals(\"null\")) { node.right = new TreeNode(Integer.parseInt(rv)); q.add(node.right); } }\n        }\n        return root;\n    }\n    static boolean isValidBST(TreeNode root) {\n        // your code here\n        return false;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String __line = br.readLine();\n        String[] tokens = (__line == null || __line.trim().isEmpty()) ? new String[]{} : __line.trim().split(\" +\");\n        System.out.println(isValidBST(buildTree(tokens)) ? \"true\" : \"false\");\n    }\n}",
        python:
          "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef build_tree(tokens):\n    if not tokens or tokens[0] == 'null':\n        return None\n    root = TreeNode(int(tokens[0]))\n    queue = [root]\n    i = 1\n    while queue and i < len(tokens):\n        node = queue.pop(0)\n        if i < len(tokens):\n            left_val = tokens[i]\n            i += 1\n            if left_val != 'null':\n                node.left = TreeNode(int(left_val))\n                queue.append(node.left)\n        if i < len(tokens):\n            right_val = tokens[i]\n            i += 1\n            if right_val != 'null':\n                node.right = TreeNode(int(right_val))\n                queue.append(node.right)\n    return root\n\ndef is_valid_bst(root):\n    # your code here\n    pass\n\nimport sys\ntokens = sys.stdin.readline().split()\nroot = build_tree(tokens)\nprint(str(is_valid_bst(root)).lower())",
      },
      testCases: {
        create: [
          { input: "2 1 3", expected: "true", isSample: true, order: 1 },
          { input: "5 1 4 null null 3 6", expected: "false", isSample: true, order: 2 },
          { input: "1 1", expected: "false", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "lowest-common-ancestor-of-a-binary-search-tree" },
    update: {
      title: "Lowest Common Ancestor of a Binary Search Tree",
      slug: "lowest-common-ancestor-of-a-binary-search-tree",
      statement:
        "Given the `root` of a binary search tree (represented as a level-order array where `null` marks a missing child) and two node values `p` and `q` that both exist in the tree, return the value of their lowest common ancestor. A node can be a descendant of itself.\n\nInput format: first line is the tree as space-separated tokens (integers and the literal `null`), second line is `p`, third line is `q`.\nOutput format: a single integer, the value of the lowest common ancestor.",
      constraints: "2 <= number of nodes <= 10^5\n-10^9 <= node value <= 10^9\nAll node values are unique. p and q both exist in the tree.",
      difficulty: "MEDIUM",
      order: 4,
      topicId: trees.id,
      starterCode: {
        javascript:
          "class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val\n    this.left = left\n    this.right = right\n  }\n}\nfunction buildTree(tokens) {\n  if (tokens.length === 0 || tokens[0] === 'null') return null\n  const root = new TreeNode(Number(tokens[0]))\n  const queue = [root]\n  let i = 1\n  while (queue.length && i < tokens.length) {\n    const node = queue.shift()\n    if (i < tokens.length) {\n      const leftVal = tokens[i++]\n      if (leftVal !== 'null') {\n        node.left = new TreeNode(Number(leftVal))\n        queue.push(node.left)\n      }\n    }\n    if (i < tokens.length) {\n      const rightVal = tokens[i++]\n      if (rightVal !== 'null') {\n        node.right = new TreeNode(Number(rightVal))\n        queue.push(node.right)\n      }\n    }\n  }\n  return root\n}\n\nfunction lowestCommonAncestor(root, p, q) {\n  // your code here — p and q are numbers; return the TreeNode that is the LCA\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst root = buildTree(lines[0].split(' '))\nconst p = Number(lines[1])\nconst q = Number(lines[2])\nconsole.log(lowestCommonAncestor(root, p, q).val)",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* buildTree(vector<string>& tokens) {\n    if (tokens.empty() || tokens[0] == \"null\") return nullptr;\n    TreeNode* root = new TreeNode(stoi(tokens[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < tokens.size()) {\n        TreeNode* node = q.front(); q.pop();\n        if (i < tokens.size()) {\n            string leftVal = tokens[i++];\n            if (leftVal != \"null\") {\n                node->left = new TreeNode(stoi(leftVal));\n                q.push(node->left);\n            }\n        }\n        if (i < tokens.size()) {\n            string rightVal = tokens[i++];\n            if (rightVal != \"null\") {\n                node->right = new TreeNode(stoi(rightVal));\n                q.push(node->right);\n            }\n        }\n    }\n    return root;\n}\n\nTreeNode* lowestCommonAncestor(TreeNode* root, int p, int q) {\n    // your code here\n    return nullptr;\n}\n\nint main() {\n    string line1, line2, line3;\n    getline(cin, line1);\n    getline(cin, line2);\n    getline(cin, line3);\n    stringstream ss(line1);\n    vector<string> tokens;\n    string tok;\n    while (ss >> tok) tokens.push_back(tok);\n    TreeNode* root = buildTree(tokens);\n    int p = stoi(line2);\n    int q = stoi(line3);\n    cout << lowestCommonAncestor(root, p, q)->val << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x){ val = x; } }\n    static TreeNode buildTree(String[] tokens) {\n        if (tokens.length == 0 || tokens[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        int i = 1;\n        while (!q.isEmpty() && i < tokens.length) {\n            TreeNode node = q.poll();\n            if (i < tokens.length) { String lv = tokens[i++]; if (!lv.equals(\"null\")) { node.left = new TreeNode(Integer.parseInt(lv)); q.add(node.left); } }\n            if (i < tokens.length) { String rv = tokens[i++]; if (!rv.equals(\"null\")) { node.right = new TreeNode(Integer.parseInt(rv)); q.add(node.right); } }\n        }\n        return root;\n    }\n    static TreeNode lowestCommonAncestor(TreeNode root, int p, int q) {\n        // your code here\n        return null;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String __line = br.readLine();\n        String[] tokens = (__line == null || __line.trim().isEmpty()) ? new String[]{} : __line.trim().split(\" +\");\n        TreeNode root = buildTree(tokens);\n        int p = Integer.parseInt(br.readLine().trim());\n        int q = Integer.parseInt(br.readLine().trim());\n        System.out.println(lowestCommonAncestor(root, p, q).val);\n    }\n}",
        python:
          "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef build_tree(tokens):\n    if not tokens or tokens[0] == 'null':\n        return None\n    root = TreeNode(int(tokens[0]))\n    queue = [root]\n    i = 1\n    while queue and i < len(tokens):\n        node = queue.pop(0)\n        if i < len(tokens):\n            left_val = tokens[i]\n            i += 1\n            if left_val != 'null':\n                node.left = TreeNode(int(left_val))\n                queue.append(node.left)\n        if i < len(tokens):\n            right_val = tokens[i]\n            i += 1\n            if right_val != 'null':\n                node.right = TreeNode(int(right_val))\n                queue.append(node.right)\n    return root\n\ndef lowest_common_ancestor(root, p, q):\n    # your code here — p and q are ints; return the TreeNode that is the LCA\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nroot = build_tree(lines[0].split())\np = int(lines[1])\nq = int(lines[2])\nprint(lowest_common_ancestor(root, p, q).val)",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "6 2 8 0 4 7 9 null null 3 5\n2\n8", expected: "6", isSample: true, order: 1 },
          { input: "6 2 8 0 4 7 9 null null 3 5\n2\n4", expected: "2", isSample: true, order: 2 },
          { input: "2 1\n1\n2", expected: "2", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Lowest Common Ancestor of a Binary Search Tree",
      slug: "lowest-common-ancestor-of-a-binary-search-tree",
      statement:
        "Given the `root` of a binary search tree (represented as a level-order array where `null` marks a missing child) and two node values `p` and `q` that both exist in the tree, return the value of their lowest common ancestor. A node can be a descendant of itself.\n\nInput format: first line is the tree as space-separated tokens (integers and the literal `null`), second line is `p`, third line is `q`.\nOutput format: a single integer, the value of the lowest common ancestor.",
      constraints: "2 <= number of nodes <= 10^5\n-10^9 <= node value <= 10^9\nAll node values are unique. p and q both exist in the tree.",
      difficulty: "MEDIUM",
      order: 4,
      topicId: trees.id,
      starterCode: {
        javascript:
          "class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val\n    this.left = left\n    this.right = right\n  }\n}\nfunction buildTree(tokens) {\n  if (tokens.length === 0 || tokens[0] === 'null') return null\n  const root = new TreeNode(Number(tokens[0]))\n  const queue = [root]\n  let i = 1\n  while (queue.length && i < tokens.length) {\n    const node = queue.shift()\n    if (i < tokens.length) {\n      const leftVal = tokens[i++]\n      if (leftVal !== 'null') {\n        node.left = new TreeNode(Number(leftVal))\n        queue.push(node.left)\n      }\n    }\n    if (i < tokens.length) {\n      const rightVal = tokens[i++]\n      if (rightVal !== 'null') {\n        node.right = new TreeNode(Number(rightVal))\n        queue.push(node.right)\n      }\n    }\n  }\n  return root\n}\n\nfunction lowestCommonAncestor(root, p, q) {\n  // your code here — p and q are numbers; return the TreeNode that is the LCA\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst root = buildTree(lines[0].split(' '))\nconst p = Number(lines[1])\nconst q = Number(lines[2])\nconsole.log(lowestCommonAncestor(root, p, q).val)",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* buildTree(vector<string>& tokens) {\n    if (tokens.empty() || tokens[0] == \"null\") return nullptr;\n    TreeNode* root = new TreeNode(stoi(tokens[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < tokens.size()) {\n        TreeNode* node = q.front(); q.pop();\n        if (i < tokens.size()) {\n            string leftVal = tokens[i++];\n            if (leftVal != \"null\") {\n                node->left = new TreeNode(stoi(leftVal));\n                q.push(node->left);\n            }\n        }\n        if (i < tokens.size()) {\n            string rightVal = tokens[i++];\n            if (rightVal != \"null\") {\n                node->right = new TreeNode(stoi(rightVal));\n                q.push(node->right);\n            }\n        }\n    }\n    return root;\n}\n\nTreeNode* lowestCommonAncestor(TreeNode* root, int p, int q) {\n    // your code here\n    return nullptr;\n}\n\nint main() {\n    string line1, line2, line3;\n    getline(cin, line1);\n    getline(cin, line2);\n    getline(cin, line3);\n    stringstream ss(line1);\n    vector<string> tokens;\n    string tok;\n    while (ss >> tok) tokens.push_back(tok);\n    TreeNode* root = buildTree(tokens);\n    int p = stoi(line2);\n    int q = stoi(line3);\n    cout << lowestCommonAncestor(root, p, q)->val << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x){ val = x; } }\n    static TreeNode buildTree(String[] tokens) {\n        if (tokens.length == 0 || tokens[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        int i = 1;\n        while (!q.isEmpty() && i < tokens.length) {\n            TreeNode node = q.poll();\n            if (i < tokens.length) { String lv = tokens[i++]; if (!lv.equals(\"null\")) { node.left = new TreeNode(Integer.parseInt(lv)); q.add(node.left); } }\n            if (i < tokens.length) { String rv = tokens[i++]; if (!rv.equals(\"null\")) { node.right = new TreeNode(Integer.parseInt(rv)); q.add(node.right); } }\n        }\n        return root;\n    }\n    static TreeNode lowestCommonAncestor(TreeNode root, int p, int q) {\n        // your code here\n        return null;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String __line = br.readLine();\n        String[] tokens = (__line == null || __line.trim().isEmpty()) ? new String[]{} : __line.trim().split(\" +\");\n        TreeNode root = buildTree(tokens);\n        int p = Integer.parseInt(br.readLine().trim());\n        int q = Integer.parseInt(br.readLine().trim());\n        System.out.println(lowestCommonAncestor(root, p, q).val);\n    }\n}",
        python:
          "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef build_tree(tokens):\n    if not tokens or tokens[0] == 'null':\n        return None\n    root = TreeNode(int(tokens[0]))\n    queue = [root]\n    i = 1\n    while queue and i < len(tokens):\n        node = queue.pop(0)\n        if i < len(tokens):\n            left_val = tokens[i]\n            i += 1\n            if left_val != 'null':\n                node.left = TreeNode(int(left_val))\n                queue.append(node.left)\n        if i < len(tokens):\n            right_val = tokens[i]\n            i += 1\n            if right_val != 'null':\n                node.right = TreeNode(int(right_val))\n                queue.append(node.right)\n    return root\n\ndef lowest_common_ancestor(root, p, q):\n    # your code here — p and q are ints; return the TreeNode that is the LCA\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nroot = build_tree(lines[0].split())\np = int(lines[1])\nq = int(lines[2])\nprint(lowest_common_ancestor(root, p, q).val)",
      },
      testCases: {
        create: [
          { input: "6 2 8 0 4 7 9 null null 3 5\n2\n8", expected: "6", isSample: true, order: 1 },
          { input: "6 2 8 0 4 7 9 null null 3 5\n2\n4", expected: "2", isSample: true, order: 2 },
          { input: "2 1\n1\n2", expected: "2", isSample: false, order: 3 },
        ],
      },
    },
  });

  const heaps = await prisma.topic.upsert({
    where: { slug: "heaps" },
    update: {
      name: "Heaps",
      slug: "heaps",
      description: "Problems solved with a priority queue / heap.",
      order: 8,
    },
    create: {
      name: "Heaps",
      slug: "heaps",
      description: "Problems solved with a priority queue / heap.",
      order: 8,
    },
  });

  await prisma.problem.upsert({
    where: { slug: "kth-largest-element-in-an-array" },
    update: {
      title: "Kth Largest Element in an Array",
      slug: "kth-largest-element-in-an-array",
      statement:
        "Given an integer array `nums` and an integer `k`, return the `k`-th largest element in the array (the `k`-th largest in sorted order, not the `k`-th distinct element).\n\nInput format: first line is `nums` as space-separated integers, second line is `k`.\nOutput format: a single integer, the `k`-th largest element.",
      constraints: "1 <= k <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
      difficulty: "MEDIUM",
      order: 1,
      topicId: heaps.id,
      starterCode: {
        javascript:
          "function findKthLargest(nums, k) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst nums = lines[0].split(' ').map(Number)\nconst k = Number(lines[1])\nconsole.log(findKthLargest(nums, k))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint findKthLargest(vector<int>& nums, int k) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    int k = stoi(line2);\n    cout << findKthLargest(nums, k) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int findKthLargest(int[] nums, int k) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        int k = Integer.parseInt(br.readLine().trim());\n        System.out.println(findKthLargest(nums, k));\n    }\n}",
        python:
          "def find_kth_largest(nums, k):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnums = list(map(int, lines[0].split()))\nk = int(lines[1])\nprint(find_kth_largest(nums, k))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "3 2 1 5 6 4\n2", expected: "5", isSample: true, order: 1 },
          { input: "3 2 3 1 2 4 5 5 6\n4", expected: "4", isSample: true, order: 2 },
          { input: "1\n1", expected: "1", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Kth Largest Element in an Array",
      slug: "kth-largest-element-in-an-array",
      statement:
        "Given an integer array `nums` and an integer `k`, return the `k`-th largest element in the array (the `k`-th largest in sorted order, not the `k`-th distinct element).\n\nInput format: first line is `nums` as space-separated integers, second line is `k`.\nOutput format: a single integer, the `k`-th largest element.",
      constraints: "1 <= k <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
      difficulty: "MEDIUM",
      order: 1,
      topicId: heaps.id,
      starterCode: {
        javascript:
          "function findKthLargest(nums, k) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst nums = lines[0].split(' ').map(Number)\nconst k = Number(lines[1])\nconsole.log(findKthLargest(nums, k))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint findKthLargest(vector<int>& nums, int k) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    int k = stoi(line2);\n    cout << findKthLargest(nums, k) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int findKthLargest(int[] nums, int k) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        int k = Integer.parseInt(br.readLine().trim());\n        System.out.println(findKthLargest(nums, k));\n    }\n}",
        python:
          "def find_kth_largest(nums, k):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnums = list(map(int, lines[0].split()))\nk = int(lines[1])\nprint(find_kth_largest(nums, k))",
      },
      testCases: {
        create: [
          { input: "3 2 1 5 6 4\n2", expected: "5", isSample: true, order: 1 },
          { input: "3 2 3 1 2 4 5 5 6\n4", expected: "4", isSample: true, order: 2 },
          { input: "1\n1", expected: "1", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "last-stone-weight" },
    update: {
      title: "Last Stone Weight",
      slug: "last-stone-weight",
      statement:
        "You are given an array of integers `stones` where `stones[i]` is the weight of the `i`-th stone. Repeatedly choose the two heaviest stones and smash them together: if the weights are equal, both stones are destroyed; otherwise the lighter stone is destroyed and the heavier stone's new weight is the difference. Return the weight of the last remaining stone, or `0` if none remain.\n\nInput format: a single line with `stones` as space-separated integers.\nOutput format: a single integer, the weight of the last stone (or `0`).",
      constraints: "1 <= stones.length <= 30\n1 <= stones[i] <= 1000",
      difficulty: "EASY",
      order: 2,
      topicId: heaps.id,
      starterCode: {
        javascript:
          "function lastStoneWeight(stones) {\n  // your code here\n}\n\nconst stones = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(lastStoneWeight(stones))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint lastStoneWeight(vector<int>& stones) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> stones;\n    int x;\n    while (ss >> x) stones.push_back(x);\n    cout << lastStoneWeight(stones) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int lastStoneWeight(int[] stones) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] stones = parseInts(br.readLine());\n        System.out.println(lastStoneWeight(stones));\n    }\n}",
        python:
          "def last_stone_weight(stones):\n    # your code here\n    pass\n\nimport sys\nstones = list(map(int, sys.stdin.readline().split()))\nprint(last_stone_weight(stones))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "2 7 4 1 8 1", expected: "1", isSample: true, order: 1 },
          { input: "1", expected: "1", isSample: true, order: 2 },
          { input: "1 1", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Last Stone Weight",
      slug: "last-stone-weight",
      statement:
        "You are given an array of integers `stones` where `stones[i]` is the weight of the `i`-th stone. Repeatedly choose the two heaviest stones and smash them together: if the weights are equal, both stones are destroyed; otherwise the lighter stone is destroyed and the heavier stone's new weight is the difference. Return the weight of the last remaining stone, or `0` if none remain.\n\nInput format: a single line with `stones` as space-separated integers.\nOutput format: a single integer, the weight of the last stone (or `0`).",
      constraints: "1 <= stones.length <= 30\n1 <= stones[i] <= 1000",
      difficulty: "EASY",
      order: 2,
      topicId: heaps.id,
      starterCode: {
        javascript:
          "function lastStoneWeight(stones) {\n  // your code here\n}\n\nconst stones = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(lastStoneWeight(stones))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint lastStoneWeight(vector<int>& stones) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> stones;\n    int x;\n    while (ss >> x) stones.push_back(x);\n    cout << lastStoneWeight(stones) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int lastStoneWeight(int[] stones) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] stones = parseInts(br.readLine());\n        System.out.println(lastStoneWeight(stones));\n    }\n}",
        python:
          "def last_stone_weight(stones):\n    # your code here\n    pass\n\nimport sys\nstones = list(map(int, sys.stdin.readline().split()))\nprint(last_stone_weight(stones))",
      },
      testCases: {
        create: [
          { input: "2 7 4 1 8 1", expected: "1", isSample: true, order: 1 },
          { input: "1", expected: "1", isSample: true, order: 2 },
          { input: "1 1", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "top-k-frequent-elements" },
    update: {
      title: "Top K Frequent Elements",
      slug: "top-k-frequent-elements",
      statement:
        "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. Order the result by descending frequency; if two elements have the same frequency, break the tie by ascending value.\n\nInput format: first line is `nums` as space-separated integers, second line is `k`.\nOutput format: the `k` elements, space-separated, in the order described above.",
      constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4\n1 <= k <= number of distinct elements in nums",
      difficulty: "MEDIUM",
      order: 3,
      topicId: heaps.id,
      starterCode: {
        javascript:
          "function topKFrequent(nums, k) {\n  // your code here — remember the tie-break: descending frequency, then ascending value\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst nums = lines[0].split(' ').map(Number)\nconst k = Number(lines[1])\nconsole.log(topKFrequent(nums, k).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> topKFrequent(vector<int>& nums, int k) {\n    // your code here — remember the tie-break: descending frequency, then ascending value\n    return {};\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    int k = stoi(line2);\n    vector<int> res = topKFrequent(nums, k);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int[] topKFrequent(int[] nums, int k) {\n        // your code here — tie-break: descending frequency, then ascending value\n        return new int[]{};\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        int k = Integer.parseInt(br.readLine().trim());\n        System.out.println(join(topKFrequent(nums, k)));\n    }\n}",
        python:
          "def top_k_frequent(nums, k):\n    # your code here — remember the tie-break: descending frequency, then ascending value\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnums = list(map(int, lines[0].split()))\nk = int(lines[1])\nprint(*top_k_frequent(nums, k))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "1 1 1 2 2 3\n2", expected: "1 2", isSample: true, order: 1 },
          { input: "1\n1", expected: "1", isSample: true, order: 2 },
          { input: "4 1 1 2 2 3 3\n2", expected: "1 2", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Top K Frequent Elements",
      slug: "top-k-frequent-elements",
      statement:
        "Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. Order the result by descending frequency; if two elements have the same frequency, break the tie by ascending value.\n\nInput format: first line is `nums` as space-separated integers, second line is `k`.\nOutput format: the `k` elements, space-separated, in the order described above.",
      constraints: "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4\n1 <= k <= number of distinct elements in nums",
      difficulty: "MEDIUM",
      order: 3,
      topicId: heaps.id,
      starterCode: {
        javascript:
          "function topKFrequent(nums, k) {\n  // your code here — remember the tie-break: descending frequency, then ascending value\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst nums = lines[0].split(' ').map(Number)\nconst k = Number(lines[1])\nconsole.log(topKFrequent(nums, k).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> topKFrequent(vector<int>& nums, int k) {\n    // your code here — remember the tie-break: descending frequency, then ascending value\n    return {};\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    int k = stoi(line2);\n    vector<int> res = topKFrequent(nums, k);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int[] topKFrequent(int[] nums, int k) {\n        // your code here — tie-break: descending frequency, then ascending value\n        return new int[]{};\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        int k = Integer.parseInt(br.readLine().trim());\n        System.out.println(join(topKFrequent(nums, k)));\n    }\n}",
        python:
          "def top_k_frequent(nums, k):\n    # your code here — remember the tie-break: descending frequency, then ascending value\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnums = list(map(int, lines[0].split()))\nk = int(lines[1])\nprint(*top_k_frequent(nums, k))",
      },
      testCases: {
        create: [
          { input: "1 1 1 2 2 3\n2", expected: "1 2", isSample: true, order: 1 },
          { input: "1\n1", expected: "1", isSample: true, order: 2 },
          { input: "4 1 1 2 2 3 3\n2", expected: "1 2", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "task-scheduler" },
    update: {
      title: "Task Scheduler",
      slug: "task-scheduler",
      statement:
        "You are given an array of characters `tasks` representing CPU tasks and a non-negative integer `n` representing the cooldown period between two occurrences of the same task. Return the minimum number of time intervals required to finish all the tasks.\n\nInput format: first line is `tasks` as space-separated single characters, second line is `n`.\nOutput format: a single integer, the minimum number of intervals.",
      constraints: "1 <= tasks.length <= 10^4\ntasks[i] is an uppercase English letter.\n0 <= n <= 100",
      difficulty: "MEDIUM",
      order: 4,
      topicId: heaps.id,
      starterCode: {
        javascript:
          "function leastInterval(tasks, n) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst tasks = lines[0].split(' ')\nconst n = Number(lines[1])\nconsole.log(leastInterval(tasks, n))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint leastInterval(vector<char>& tasks, int n) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<char> tasks;\n    string tok;\n    while (ss >> tok) tasks.push_back(tok[0]);\n    int n = stoi(line2);\n    cout << leastInterval(tasks, n) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int leastInterval(char[] tasks, int n) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String __l = br.readLine();\n        String[] parts = (__l == null || __l.trim().isEmpty()) ? new String[]{} : __l.trim().split(\" +\");\n        char[] tasks = new char[parts.length];\n        for (int i = 0; i < parts.length; i++) tasks[i] = parts[i].charAt(0);\n        int n = Integer.parseInt(br.readLine().trim());\n        System.out.println(leastInterval(tasks, n));\n    }\n}",
        python:
          "def least_interval(tasks, n):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ntasks = lines[0].split()\nn = int(lines[1])\nprint(least_interval(tasks, n))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "A A A B B B\n2", expected: "8", isSample: true, order: 1 },
          { input: "A C A B D B\n1", expected: "6", isSample: true, order: 2 },
          { input: "A A A B B B\n0", expected: "6", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Task Scheduler",
      slug: "task-scheduler",
      statement:
        "You are given an array of characters `tasks` representing CPU tasks and a non-negative integer `n` representing the cooldown period between two occurrences of the same task. Return the minimum number of time intervals required to finish all the tasks.\n\nInput format: first line is `tasks` as space-separated single characters, second line is `n`.\nOutput format: a single integer, the minimum number of intervals.",
      constraints: "1 <= tasks.length <= 10^4\ntasks[i] is an uppercase English letter.\n0 <= n <= 100",
      difficulty: "MEDIUM",
      order: 4,
      topicId: heaps.id,
      starterCode: {
        javascript:
          "function leastInterval(tasks, n) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst tasks = lines[0].split(' ')\nconst n = Number(lines[1])\nconsole.log(leastInterval(tasks, n))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint leastInterval(vector<char>& tasks, int n) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<char> tasks;\n    string tok;\n    while (ss >> tok) tasks.push_back(tok[0]);\n    int n = stoi(line2);\n    cout << leastInterval(tasks, n) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int leastInterval(char[] tasks, int n) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String __l = br.readLine();\n        String[] parts = (__l == null || __l.trim().isEmpty()) ? new String[]{} : __l.trim().split(\" +\");\n        char[] tasks = new char[parts.length];\n        for (int i = 0; i < parts.length; i++) tasks[i] = parts[i].charAt(0);\n        int n = Integer.parseInt(br.readLine().trim());\n        System.out.println(leastInterval(tasks, n));\n    }\n}",
        python:
          "def least_interval(tasks, n):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ntasks = lines[0].split()\nn = int(lines[1])\nprint(least_interval(tasks, n))",
      },
      testCases: {
        create: [
          { input: "A A A B B B\n2", expected: "8", isSample: true, order: 1 },
          { input: "A C A B D B\n1", expected: "6", isSample: true, order: 2 },
          { input: "A A A B B B\n0", expected: "6", isSample: false, order: 3 },
        ],
      },
    },
  });

  const dynamicProgramming = await prisma.topic.upsert({
    where: { slug: "dynamic-programming" },
    update: {
      name: "Dynamic Programming",
      slug: "dynamic-programming",
      description: "Problems solved by breaking them into overlapping subproblems.",
      order: 9,
    },
    create: {
      name: "Dynamic Programming",
      slug: "dynamic-programming",
      description: "Problems solved by breaking them into overlapping subproblems.",
      order: 9,
    },
  });

  await prisma.problem.upsert({
    where: { slug: "climbing-stairs" },
    update: {
      title: "Climbing Stairs",
      slug: "climbing-stairs",
      statement:
        "You are climbing a staircase that takes `n` steps to reach the top. Each time you can climb either 1 or 2 steps. In how many distinct ways can you climb to the top?\n\nInput format: a single line with the integer `n`.\nOutput format: a single integer, the number of distinct ways.",
      constraints: "1 <= n <= 45",
      difficulty: "EASY",
      order: 1,
      topicId: dynamicProgramming.id,
      starterCode: {
        javascript:
          "function climbStairs(n) {\n  // your code here\n}\n\nconst n = Number(require('fs').readFileSync(0, 'utf8').trim())\nconsole.log(climbStairs(n))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint climbStairs(int n) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    int n = stoi(line);\n    cout << climbStairs(n) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int climbStairs(int n) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n        System.out.println(climbStairs(n));\n    }\n}",
        python:
          "def climb_stairs(n):\n    # your code here\n    pass\n\nimport sys\nn = int(sys.stdin.readline())\nprint(climb_stairs(n))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "2", expected: "2", isSample: true, order: 1 },
          { input: "3", expected: "3", isSample: true, order: 2 },
          { input: "5", expected: "8", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Climbing Stairs",
      slug: "climbing-stairs",
      statement:
        "You are climbing a staircase that takes `n` steps to reach the top. Each time you can climb either 1 or 2 steps. In how many distinct ways can you climb to the top?\n\nInput format: a single line with the integer `n`.\nOutput format: a single integer, the number of distinct ways.",
      constraints: "1 <= n <= 45",
      difficulty: "EASY",
      order: 1,
      topicId: dynamicProgramming.id,
      starterCode: {
        javascript:
          "function climbStairs(n) {\n  // your code here\n}\n\nconst n = Number(require('fs').readFileSync(0, 'utf8').trim())\nconsole.log(climbStairs(n))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint climbStairs(int n) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    int n = stoi(line);\n    cout << climbStairs(n) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int climbStairs(int n) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n        System.out.println(climbStairs(n));\n    }\n}",
        python:
          "def climb_stairs(n):\n    # your code here\n    pass\n\nimport sys\nn = int(sys.stdin.readline())\nprint(climb_stairs(n))",
      },
      testCases: {
        create: [
          { input: "2", expected: "2", isSample: true, order: 1 },
          { input: "3", expected: "3", isSample: true, order: 2 },
          { input: "5", expected: "8", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "house-robber" },
    update: {
      title: "House Robber",
      slug: "house-robber",
      statement:
        "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, given by the array `nums`. You cannot rob two adjacent houses (doing so triggers an alarm). Return the maximum amount of money you can rob without robbing two adjacent houses.\n\nInput format: a single line with `nums` as space-separated integers.\nOutput format: a single integer, the maximum amount of money.",
      constraints: "1 <= nums.length <= 100\n0 <= nums[i] <= 400",
      difficulty: "MEDIUM",
      order: 2,
      topicId: dynamicProgramming.id,
      starterCode: {
        javascript:
          "function rob(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(rob(nums))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint rob(vector<int>& nums) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << rob(nums) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int rob(int[] nums) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(rob(nums));\n    }\n}",
        python:
          "def rob(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(rob(nums))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "1 2 3 1", expected: "4", isSample: true, order: 1 },
          { input: "2 7 9 3 1", expected: "12", isSample: true, order: 2 },
          { input: "2 1 1 2", expected: "4", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "House Robber",
      slug: "house-robber",
      statement:
        "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, given by the array `nums`. You cannot rob two adjacent houses (doing so triggers an alarm). Return the maximum amount of money you can rob without robbing two adjacent houses.\n\nInput format: a single line with `nums` as space-separated integers.\nOutput format: a single integer, the maximum amount of money.",
      constraints: "1 <= nums.length <= 100\n0 <= nums[i] <= 400",
      difficulty: "MEDIUM",
      order: 2,
      topicId: dynamicProgramming.id,
      starterCode: {
        javascript:
          "function rob(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(rob(nums))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint rob(vector<int>& nums) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << rob(nums) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int rob(int[] nums) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(rob(nums));\n    }\n}",
        python:
          "def rob(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(rob(nums))",
      },
      testCases: {
        create: [
          { input: "1 2 3 1", expected: "4", isSample: true, order: 1 },
          { input: "2 7 9 3 1", expected: "12", isSample: true, order: 2 },
          { input: "2 1 1 2", expected: "4", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "coin-change" },
    update: {
      title: "Coin Change",
      slug: "coin-change",
      statement:
        "You are given an array of coin denominations `coins` and an integer `amount`. Return the fewest number of coins needed to make up that amount. If the amount cannot be made up by any combination of coins, return `-1`. You may assume an unlimited supply of each coin.\n\nInput format: first line is `coins` as space-separated integers, second line is `amount`.\nOutput format: a single integer, the fewest number of coins (or `-1`).",
      constraints: "1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4",
      difficulty: "MEDIUM",
      order: 3,
      topicId: dynamicProgramming.id,
      starterCode: {
        javascript:
          "function coinChange(coins, amount) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst coins = lines[0].split(' ').map(Number)\nconst amount = Number(lines[1])\nconsole.log(coinChange(coins, amount))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint coinChange(vector<int>& coins, int amount) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> coins;\n    int x;\n    while (ss >> x) coins.push_back(x);\n    int amount = stoi(line2);\n    cout << coinChange(coins, amount) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int coinChange(int[] coins, int amount) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] coins = parseInts(br.readLine());\n        int amount = Integer.parseInt(br.readLine().trim());\n        System.out.println(coinChange(coins, amount));\n    }\n}",
        python:
          "def coin_change(coins, amount):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ncoins = list(map(int, lines[0].split()))\namount = int(lines[1])\nprint(coin_change(coins, amount))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "1 2 5\n11", expected: "3", isSample: true, order: 1 },
          { input: "2\n3", expected: "-1", isSample: true, order: 2 },
          { input: "1\n0", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Coin Change",
      slug: "coin-change",
      statement:
        "You are given an array of coin denominations `coins` and an integer `amount`. Return the fewest number of coins needed to make up that amount. If the amount cannot be made up by any combination of coins, return `-1`. You may assume an unlimited supply of each coin.\n\nInput format: first line is `coins` as space-separated integers, second line is `amount`.\nOutput format: a single integer, the fewest number of coins (or `-1`).",
      constraints: "1 <= coins.length <= 12\n1 <= coins[i] <= 2^31 - 1\n0 <= amount <= 10^4",
      difficulty: "MEDIUM",
      order: 3,
      topicId: dynamicProgramming.id,
      starterCode: {
        javascript:
          "function coinChange(coins, amount) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst coins = lines[0].split(' ').map(Number)\nconst amount = Number(lines[1])\nconsole.log(coinChange(coins, amount))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint coinChange(vector<int>& coins, int amount) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> coins;\n    int x;\n    while (ss >> x) coins.push_back(x);\n    int amount = stoi(line2);\n    cout << coinChange(coins, amount) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int coinChange(int[] coins, int amount) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] coins = parseInts(br.readLine());\n        int amount = Integer.parseInt(br.readLine().trim());\n        System.out.println(coinChange(coins, amount));\n    }\n}",
        python:
          "def coin_change(coins, amount):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ncoins = list(map(int, lines[0].split()))\namount = int(lines[1])\nprint(coin_change(coins, amount))",
      },
      testCases: {
        create: [
          { input: "1 2 5\n11", expected: "3", isSample: true, order: 1 },
          { input: "2\n3", expected: "-1", isSample: true, order: 2 },
          { input: "1\n0", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "longest-increasing-subsequence" },
    update: {
      title: "Longest Increasing Subsequence",
      slug: "longest-increasing-subsequence",
      statement:
        "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.\n\nInput format: a single line with `nums` as space-separated integers.\nOutput format: a single integer, the length of the longest strictly increasing subsequence.",
      constraints: "1 <= nums.length <= 2500\n-10^4 <= nums[i] <= 10^4",
      difficulty: "MEDIUM",
      order: 4,
      topicId: dynamicProgramming.id,
      starterCode: {
        javascript:
          "function lengthOfLIS(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(lengthOfLIS(nums))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint lengthOfLIS(vector<int>& nums) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << lengthOfLIS(nums) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int lengthOfLIS(int[] nums) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(lengthOfLIS(nums));\n    }\n}",
        python:
          "def length_of_lis(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(length_of_lis(nums))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "10 9 2 5 3 7 101 18", expected: "4", isSample: true, order: 1 },
          { input: "0 1 0 3 2 3", expected: "4", isSample: true, order: 2 },
          { input: "7 7 7 7", expected: "1", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Longest Increasing Subsequence",
      slug: "longest-increasing-subsequence",
      statement:
        "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.\n\nInput format: a single line with `nums` as space-separated integers.\nOutput format: a single integer, the length of the longest strictly increasing subsequence.",
      constraints: "1 <= nums.length <= 2500\n-10^4 <= nums[i] <= 10^4",
      difficulty: "MEDIUM",
      order: 4,
      topicId: dynamicProgramming.id,
      starterCode: {
        javascript:
          "function lengthOfLIS(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(lengthOfLIS(nums))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint lengthOfLIS(vector<int>& nums) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << lengthOfLIS(nums) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int lengthOfLIS(int[] nums) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(lengthOfLIS(nums));\n    }\n}",
        python:
          "def length_of_lis(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(length_of_lis(nums))",
      },
      testCases: {
        create: [
          { input: "10 9 2 5 3 7 101 18", expected: "4", isSample: true, order: 1 },
          { input: "0 1 0 3 2 3", expected: "4", isSample: true, order: 2 },
          { input: "7 7 7 7", expected: "1", isSample: false, order: 3 },
        ],
      },
    },
  });

  const strings = await prisma.topic.upsert({
    where: { slug: "strings" },
    update: {
      name: "Strings",
      slug: "strings",
      description: "Classic string manipulation, parsing, and pattern-matching problems.",
      order: 10,
    },
    create: {
      name: "Strings",
      slug: "strings",
      description: "Classic string manipulation, parsing, and pattern-matching problems.",
      order: 10,
    },
  });

  await prisma.problem.upsert({
    where: { slug: "valid-anagram" },
    update: {
      title: "Valid Anagram",
      slug: "valid-anagram",
      statement:
        "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise. An anagram is formed by rearranging the letters of a word using all the original letters exactly once.\n\nInput format: two lines, `s` then `t`.\nOutput format: `true` or `false`.",
      constraints: "1 <= s.length, t.length <= 5 * 10^4\ns and t consist of lowercase English letters only.",
      difficulty: "EASY",
      order: 1,
      topicId: strings.id,
      starterCode: {
        javascript:
          "function isAnagram(s, t) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst s = lines[0]\nconst t = lines[1]\nconsole.log(isAnagram(s, t))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool isAnagram(string s, string t) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string s, t;\n    getline(cin, s);\n    getline(cin, t);\n    cout << (isAnagram(s, t) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static boolean isAnagram(String s, String t) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        String t = br.readLine();\n        System.out.println(isAnagram(s, t) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def is_anagram(s, t):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ns = lines[0]\nt = lines[1]\nprint(str(is_anagram(s, t)).lower())",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "anagram\nnagaram", expected: "true", isSample: true, order: 1 },
          { input: "rat\ncar", expected: "false", isSample: true, order: 2 },
          { input: "a\nab", expected: "false", isSample: false, order: 3 },
          { input: "aacc\nccac", expected: "false", isSample: false, order: 4 },
        ],
      },
    },
    create: {
      title: "Valid Anagram",
      slug: "valid-anagram",
      statement:
        "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise. An anagram is formed by rearranging the letters of a word using all the original letters exactly once.\n\nInput format: two lines, `s` then `t`.\nOutput format: `true` or `false`.",
      constraints: "1 <= s.length, t.length <= 5 * 10^4\ns and t consist of lowercase English letters only.",
      difficulty: "EASY",
      order: 1,
      topicId: strings.id,
      starterCode: {
        javascript:
          "function isAnagram(s, t) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst s = lines[0]\nconst t = lines[1]\nconsole.log(isAnagram(s, t))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool isAnagram(string s, string t) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string s, t;\n    getline(cin, s);\n    getline(cin, t);\n    cout << (isAnagram(s, t) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static boolean isAnagram(String s, String t) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        String t = br.readLine();\n        System.out.println(isAnagram(s, t) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def is_anagram(s, t):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ns = lines[0]\nt = lines[1]\nprint(str(is_anagram(s, t)).lower())",
      },
      testCases: {
        create: [
          { input: "anagram\nnagaram", expected: "true", isSample: true, order: 1 },
          { input: "rat\ncar", expected: "false", isSample: true, order: 2 },
          { input: "a\nab", expected: "false", isSample: false, order: 3 },
          { input: "aacc\nccac", expected: "false", isSample: false, order: 4 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "reverse-words-in-a-string" },
    update: {
      title: "Reverse Words in a String",
      slug: "reverse-words-in-a-string",
      statement:
        "Given an input string `s`, reverse the order of the words.\n\nA word is a sequence of non-space characters. Words in `s` may be separated by more than one space, and `s` may have leading or trailing spaces. Return a string with the words in reverse order, joined by a single space, with no leading or trailing spaces.\n\nInput format: a single line containing `s`.\nOutput format: the words of `s` in reverse order, single-space separated.",
      constraints: "1 <= s.length <= 10^4\ns contains English letters, digits, and spaces ' '.\ns contains at least one word.",
      difficulty: "EASY",
      order: 2,
      topicId: strings.id,
      starterCode: {
        javascript:
          "function reverseWords(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').split('\\n')[0]\nconsole.log(reverseWords(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstring reverseWords(string s) {\n    // your code here\n    return \"\";\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << reverseWords(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static String reverseWords(String s) {\n        // your code here\n        return \"\";\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        System.out.println(reverseWords(s));\n    }\n}",
        python:
          "def reverse_words(s):\n    # your code here\n    pass\n\nimport sys\ns = sys.stdin.readline().rstrip('\\n')\nprint(reverse_words(s))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "the sky is blue", expected: "blue is sky the", isSample: true, order: 1 },
          { input: "  hello   world  ", expected: "world hello", isSample: true, order: 2 },
          { input: "a good   example", expected: "example good a", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Reverse Words in a String",
      slug: "reverse-words-in-a-string",
      statement:
        "Given an input string `s`, reverse the order of the words.\n\nA word is a sequence of non-space characters. Words in `s` may be separated by more than one space, and `s` may have leading or trailing spaces. Return a string with the words in reverse order, joined by a single space, with no leading or trailing spaces.\n\nInput format: a single line containing `s`.\nOutput format: the words of `s` in reverse order, single-space separated.",
      constraints: "1 <= s.length <= 10^4\ns contains English letters, digits, and spaces ' '.\ns contains at least one word.",
      difficulty: "EASY",
      order: 2,
      topicId: strings.id,
      starterCode: {
        javascript:
          "function reverseWords(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').split('\\n')[0]\nconsole.log(reverseWords(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstring reverseWords(string s) {\n    // your code here\n    return \"\";\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << reverseWords(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static String reverseWords(String s) {\n        // your code here\n        return \"\";\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        System.out.println(reverseWords(s));\n    }\n}",
        python:
          "def reverse_words(s):\n    # your code here\n    pass\n\nimport sys\ns = sys.stdin.readline().rstrip('\\n')\nprint(reverse_words(s))",
      },
      testCases: {
        create: [
          { input: "the sky is blue", expected: "blue is sky the", isSample: true, order: 1 },
          { input: "  hello   world  ", expected: "world hello", isSample: true, order: 2 },
          { input: "a good   example", expected: "example good a", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "first-unique-character-in-a-string" },
    update: {
      title: "First Unique Character in a String",
      slug: "first-unique-character-in-a-string",
      statement:
        "Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return `-1`.\n\nInput format: a single line containing `s`.\nOutput format: a single integer, the 0-based index of the first non-repeating character, or `-1`.",
      constraints: "1 <= s.length <= 10^5\ns consists of only lowercase English letters.",
      difficulty: "EASY",
      order: 3,
      topicId: strings.id,
      starterCode: {
        javascript:
          "function firstUniqChar(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').split('\\n')[0]\nconsole.log(firstUniqChar(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint firstUniqChar(string s) {\n    // your code here\n    return -1;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << firstUniqChar(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int firstUniqChar(String s) {\n        // your code here\n        return -1;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        System.out.println(firstUniqChar(s));\n    }\n}",
        python:
          "def first_uniq_char(s):\n    # your code here\n    pass\n\nimport sys\ns = sys.stdin.readline().rstrip('\\n')\nprint(first_uniq_char(s))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "leetcode", expected: "0", isSample: true, order: 1 },
          { input: "loveleetcode", expected: "2", isSample: true, order: 2 },
          { input: "aabb", expected: "-1", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "First Unique Character in a String",
      slug: "first-unique-character-in-a-string",
      statement:
        "Given a string `s`, find the first non-repeating character in it and return its index. If it does not exist, return `-1`.\n\nInput format: a single line containing `s`.\nOutput format: a single integer, the 0-based index of the first non-repeating character, or `-1`.",
      constraints: "1 <= s.length <= 10^5\ns consists of only lowercase English letters.",
      difficulty: "EASY",
      order: 3,
      topicId: strings.id,
      starterCode: {
        javascript:
          "function firstUniqChar(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').split('\\n')[0]\nconsole.log(firstUniqChar(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint firstUniqChar(string s) {\n    // your code here\n    return -1;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << firstUniqChar(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int firstUniqChar(String s) {\n        // your code here\n        return -1;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        System.out.println(firstUniqChar(s));\n    }\n}",
        python:
          "def first_uniq_char(s):\n    # your code here\n    pass\n\nimport sys\ns = sys.stdin.readline().rstrip('\\n')\nprint(first_uniq_char(s))",
      },
      testCases: {
        create: [
          { input: "leetcode", expected: "0", isSample: true, order: 1 },
          { input: "loveleetcode", expected: "2", isSample: true, order: 2 },
          { input: "aabb", expected: "-1", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "longest-common-prefix" },
    update: {
      title: "Longest Common Prefix",
      slug: "longest-common-prefix",
      statement:
        "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.\n\nInput format: first line is `n`, the number of strings, followed by `n` lines each containing one string.\nOutput format: the longest common prefix (may be an empty line).",
      constraints: "1 <= n <= 200\n0 <= strs[i].length <= 200\nstrs[i] consists of only lowercase English letters (if non-empty).",
      difficulty: "MEDIUM",
      order: 4,
      topicId: strings.id,
      starterCode: {
        javascript:
          "function longestCommonPrefix(strs) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst n = parseInt(lines[0])\nconst strs = lines.slice(1, 1 + n)\nconsole.log(longestCommonPrefix(strs))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstring longestCommonPrefix(vector<string>& strs) {\n    // your code here\n    return \"\";\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cin.ignore();\n    vector<string> strs(n);\n    for (int i = 0; i < n; i++) getline(cin, strs[i]);\n    cout << longestCommonPrefix(strs) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static String longestCommonPrefix(String[] strs) {\n        // your code here\n        return \"\";\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n        String[] strs = new String[n];\n        for (int i = 0; i < n; i++) strs[i] = br.readLine();\n        System.out.println(longestCommonPrefix(strs));\n    }\n}",
        python:
          "def longest_common_prefix(strs):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nn = int(lines[0])\nstrs = lines[1:1+n]\nprint(longest_common_prefix(strs))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "3\nflower\nflow\nflight", expected: "fl", isSample: true, order: 1 },
          { input: "3\ndog\nracecar\ncar", expected: "", isSample: true, order: 2 },
          { input: "2\ninterspecies\ninterstellar", expected: "inters", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Longest Common Prefix",
      slug: "longest-common-prefix",
      statement:
        "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.\n\nInput format: first line is `n`, the number of strings, followed by `n` lines each containing one string.\nOutput format: the longest common prefix (may be an empty line).",
      constraints: "1 <= n <= 200\n0 <= strs[i].length <= 200\nstrs[i] consists of only lowercase English letters (if non-empty).",
      difficulty: "MEDIUM",
      order: 4,
      topicId: strings.id,
      starterCode: {
        javascript:
          "function longestCommonPrefix(strs) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst n = parseInt(lines[0])\nconst strs = lines.slice(1, 1 + n)\nconsole.log(longestCommonPrefix(strs))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstring longestCommonPrefix(vector<string>& strs) {\n    // your code here\n    return \"\";\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cin.ignore();\n    vector<string> strs(n);\n    for (int i = 0; i < n; i++) getline(cin, strs[i]);\n    cout << longestCommonPrefix(strs) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static String longestCommonPrefix(String[] strs) {\n        // your code here\n        return \"\";\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int n = Integer.parseInt(br.readLine().trim());\n        String[] strs = new String[n];\n        for (int i = 0; i < n; i++) strs[i] = br.readLine();\n        System.out.println(longestCommonPrefix(strs));\n    }\n}",
        python:
          "def longest_common_prefix(strs):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nn = int(lines[0])\nstrs = lines[1:1+n]\nprint(longest_common_prefix(strs))",
      },
      testCases: {
        create: [
          { input: "3\nflower\nflow\nflight", expected: "fl", isSample: true, order: 1 },
          { input: "3\ndog\nracecar\ncar", expected: "", isSample: true, order: 2 },
          { input: "2\ninterspecies\ninterstellar", expected: "inters", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "string-to-integer-atoi" },
    update: {
      title: "String to Integer (atoi)",
      slug: "string-to-integer-atoi",
      statement:
        "Implement the `myAtoi(s)` function, which converts a string to a 32-bit signed integer.\n\nThe algorithm: skip leading whitespace, then an optional `+`/`-` sign, then read digits until a non-digit character. Ignore everything after the digits. If no digits are read, return 0. Clamp the result to the 32-bit signed integer range `[-2147483648, 2147483647]`.\n\nInput format: a single line containing `s`.\nOutput format: a single integer.",
      constraints: "0 <= s.length <= 200\ns consists of English letters, digits, ' ', '+', '-', and '.'.",
      difficulty: "MEDIUM",
      order: 5,
      topicId: strings.id,
      starterCode: {
        javascript:
          "function myAtoi(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').split('\\n')[0]\nconsole.log(myAtoi(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint myAtoi(string s) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << myAtoi(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int myAtoi(String s) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        System.out.println(myAtoi(s));\n    }\n}",
        python:
          "def my_atoi(s):\n    # your code here\n    pass\n\nimport sys\ns = sys.stdin.readline().rstrip('\\n')\nprint(my_atoi(s))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "42", expected: "42", isSample: true, order: 1 },
          { input: "   -42", expected: "-42", isSample: true, order: 2 },
          { input: "4193 with words", expected: "4193", isSample: false, order: 3 },
          { input: "words and 987", expected: "0", isSample: false, order: 4 },
          { input: "-91283472332", expected: "-2147483648", isSample: false, order: 5 },
        ],
      },
    },
    create: {
      title: "String to Integer (atoi)",
      slug: "string-to-integer-atoi",
      statement:
        "Implement the `myAtoi(s)` function, which converts a string to a 32-bit signed integer.\n\nThe algorithm: skip leading whitespace, then an optional `+`/`-` sign, then read digits until a non-digit character. Ignore everything after the digits. If no digits are read, return 0. Clamp the result to the 32-bit signed integer range `[-2147483648, 2147483647]`.\n\nInput format: a single line containing `s`.\nOutput format: a single integer.",
      constraints: "0 <= s.length <= 200\ns consists of English letters, digits, ' ', '+', '-', and '.'.",
      difficulty: "MEDIUM",
      order: 5,
      topicId: strings.id,
      starterCode: {
        javascript:
          "function myAtoi(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').split('\\n')[0]\nconsole.log(myAtoi(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint myAtoi(string s) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << myAtoi(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int myAtoi(String s) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        System.out.println(myAtoi(s));\n    }\n}",
        python:
          "def my_atoi(s):\n    # your code here\n    pass\n\nimport sys\ns = sys.stdin.readline().rstrip('\\n')\nprint(my_atoi(s))",
      },
      testCases: {
        create: [
          { input: "42", expected: "42", isSample: true, order: 1 },
          { input: "   -42", expected: "-42", isSample: true, order: 2 },
          { input: "4193 with words", expected: "4193", isSample: false, order: 3 },
          { input: "words and 987", expected: "0", isSample: false, order: 4 },
          { input: "-91283472332", expected: "-2147483648", isSample: false, order: 5 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "zigzag-conversion" },
    update: {
      title: "Zigzag Conversion",
      slug: "zigzag-conversion",
      statement:
        "The string `s` is written in a zigzag pattern on `numRows` rows, then read row by row to produce the output.\n\nFor example `\"PAYPALISHIRING\"` with `numRows = 3` is arranged as:\n```\nP   A   H   N\nA P L S I I G\nY   I   R\n```\nand read row by row gives `\"PAHNAPLSIIGYIR\"`.\n\nInput format: two lines, `s` then `numRows`.\nOutput format: the zigzag-converted string.",
      constraints: "1 <= s.length <= 1000\n1 <= numRows <= 1000",
      difficulty: "MEDIUM",
      order: 6,
      topicId: strings.id,
      starterCode: {
        javascript:
          "function convert(s, numRows) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst s = lines[0]\nconst numRows = parseInt(lines[1])\nconsole.log(convert(s, numRows))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstring convert(string s, int numRows) {\n    // your code here\n    return \"\";\n}\n\nint main() {\n    string s, line2;\n    getline(cin, s);\n    getline(cin, line2);\n    int numRows = stoi(line2);\n    cout << convert(s, numRows) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static String convert(String s, int numRows) {\n        // your code here\n        return \"\";\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        int numRows = Integer.parseInt(br.readLine().trim());\n        System.out.println(convert(s, numRows));\n    }\n}",
        python:
          "def convert(s, num_rows):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ns = lines[0]\nnum_rows = int(lines[1])\nprint(convert(s, num_rows))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "PAYPALISHIRING\n3", expected: "PAHNAPLSIIGYIR", isSample: true, order: 1 },
          { input: "PAYPALISHIRING\n4", expected: "PINALSIGYAHRPI", isSample: true, order: 2 },
          { input: "PAYPALISHIRING\n1", expected: "PAYPALISHIRING", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Zigzag Conversion",
      slug: "zigzag-conversion",
      statement:
        "The string `s` is written in a zigzag pattern on `numRows` rows, then read row by row to produce the output.\n\nFor example `\"PAYPALISHIRING\"` with `numRows = 3` is arranged as:\n```\nP   A   H   N\nA P L S I I G\nY   I   R\n```\nand read row by row gives `\"PAHNAPLSIIGYIR\"`.\n\nInput format: two lines, `s` then `numRows`.\nOutput format: the zigzag-converted string.",
      constraints: "1 <= s.length <= 1000\n1 <= numRows <= 1000",
      difficulty: "MEDIUM",
      order: 6,
      topicId: strings.id,
      starterCode: {
        javascript:
          "function convert(s, numRows) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst s = lines[0]\nconst numRows = parseInt(lines[1])\nconsole.log(convert(s, numRows))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstring convert(string s, int numRows) {\n    // your code here\n    return \"\";\n}\n\nint main() {\n    string s, line2;\n    getline(cin, s);\n    getline(cin, line2);\n    int numRows = stoi(line2);\n    cout << convert(s, numRows) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static String convert(String s, int numRows) {\n        // your code here\n        return \"\";\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        int numRows = Integer.parseInt(br.readLine().trim());\n        System.out.println(convert(s, numRows));\n    }\n}",
        python:
          "def convert(s, num_rows):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ns = lines[0]\nnum_rows = int(lines[1])\nprint(convert(s, num_rows))",
      },
      testCases: {
        create: [
          { input: "PAYPALISHIRING\n3", expected: "PAHNAPLSIIGYIR", isSample: true, order: 1 },
          { input: "PAYPALISHIRING\n4", expected: "PINALSIGYAHRPI", isSample: true, order: 2 },
          { input: "PAYPALISHIRING\n1", expected: "PAYPALISHIRING", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "multiply-strings" },
    update: {
      title: "Multiply Strings",
      slug: "multiply-strings",
      statement:
        "Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2`, also represented as a string.\n\nInput format: two lines, `num1` then `num2`.\nOutput format: the product as a string, with no leading zeros (unless the result is `0`).",
      constraints: "1 <= num1.length, num2.length <= 200\nnum1 and num2 consist of digits only and do not have leading zeros, except the number 0 itself.",
      difficulty: "MEDIUM",
      order: 7,
      topicId: strings.id,
      starterCode: {
        javascript:
          "function multiply(num1, num2) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst num1 = lines[0]\nconst num2 = lines[1]\nconsole.log(multiply(num1, num2))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstring multiply(string num1, string num2) {\n    // your code here\n    return \"0\";\n}\n\nint main() {\n    string num1, num2;\n    getline(cin, num1);\n    getline(cin, num2);\n    cout << multiply(num1, num2) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static String multiply(String num1, String num2) {\n        // your code here\n        return \"0\";\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String num1 = br.readLine();\n        String num2 = br.readLine();\n        System.out.println(multiply(num1, num2));\n    }\n}",
        python:
          "def multiply(num1, num2):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnum1 = lines[0]\nnum2 = lines[1]\nprint(multiply(num1, num2))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "2\n3", expected: "6", isSample: true, order: 1 },
          { input: "123\n456", expected: "56088", isSample: true, order: 2 },
          { input: "0\n12345", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Multiply Strings",
      slug: "multiply-strings",
      statement:
        "Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2`, also represented as a string.\n\nInput format: two lines, `num1` then `num2`.\nOutput format: the product as a string, with no leading zeros (unless the result is `0`).",
      constraints: "1 <= num1.length, num2.length <= 200\nnum1 and num2 consist of digits only and do not have leading zeros, except the number 0 itself.",
      difficulty: "MEDIUM",
      order: 7,
      topicId: strings.id,
      starterCode: {
        javascript:
          "function multiply(num1, num2) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst num1 = lines[0]\nconst num2 = lines[1]\nconsole.log(multiply(num1, num2))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstring multiply(string num1, string num2) {\n    // your code here\n    return \"0\";\n}\n\nint main() {\n    string num1, num2;\n    getline(cin, num1);\n    getline(cin, num2);\n    cout << multiply(num1, num2) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static String multiply(String num1, String num2) {\n        // your code here\n        return \"0\";\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String num1 = br.readLine();\n        String num2 = br.readLine();\n        System.out.println(multiply(num1, num2));\n    }\n}",
        python:
          "def multiply(num1, num2):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnum1 = lines[0]\nnum2 = lines[1]\nprint(multiply(num1, num2))",
      },
      testCases: {
        create: [
          { input: "2\n3", expected: "6", isSample: true, order: 1 },
          { input: "123\n456", expected: "56088", isSample: true, order: 2 },
          { input: "0\n12345", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "regular-expression-matching" },
    update: {
      title: "Regular Expression Matching",
      slug: "regular-expression-matching",
      statement:
        "Given a string `s` and a pattern `p`, implement regular expression matching with support for `.` and `*` where:\n- `.` matches any single character.\n- `*` matches zero or more of the preceding element.\n\nThe matching should cover the **entire** input string (not partial).\n\nInput format: two lines, `s` then `p`.\nOutput format: `true` or `false`.",
      constraints: "1 <= s.length <= 20\n1 <= p.length <= 20\ns consists of lowercase English letters.\np consists of lowercase English letters, '.', and '*'.\nIt is guaranteed every '*' is preceded by a valid character.",
      difficulty: "HARD",
      order: 8,
      topicId: strings.id,
      starterCode: {
        javascript:
          "function isMatch(s, p) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst s = lines[0]\nconst p = lines[1]\nconsole.log(isMatch(s, p))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool isMatch(string s, string p) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string s, p;\n    getline(cin, s);\n    getline(cin, p);\n    cout << (isMatch(s, p) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static boolean isMatch(String s, String p) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        String p = br.readLine();\n        System.out.println(isMatch(s, p) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def is_match(s, p):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ns = lines[0]\np = lines[1]\nprint(str(is_match(s, p)).lower())",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "aa\na", expected: "false", isSample: true, order: 1 },
          { input: "aa\na*", expected: "true", isSample: true, order: 2 },
          { input: "ab\n.*", expected: "true", isSample: false, order: 3 },
          { input: "mississippi\nmis*is*p*.", expected: "false", isSample: false, order: 4 },
          { input: "aab\nc*a*b", expected: "true", isSample: false, order: 5 },
        ],
      },
    },
    create: {
      title: "Regular Expression Matching",
      slug: "regular-expression-matching",
      statement:
        "Given a string `s` and a pattern `p`, implement regular expression matching with support for `.` and `*` where:\n- `.` matches any single character.\n- `*` matches zero or more of the preceding element.\n\nThe matching should cover the **entire** input string (not partial).\n\nInput format: two lines, `s` then `p`.\nOutput format: `true` or `false`.",
      constraints: "1 <= s.length <= 20\n1 <= p.length <= 20\ns consists of lowercase English letters.\np consists of lowercase English letters, '.', and '*'.\nIt is guaranteed every '*' is preceded by a valid character.",
      difficulty: "HARD",
      order: 8,
      topicId: strings.id,
      starterCode: {
        javascript:
          "function isMatch(s, p) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst s = lines[0]\nconst p = lines[1]\nconsole.log(isMatch(s, p))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool isMatch(string s, string p) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string s, p;\n    getline(cin, s);\n    getline(cin, p);\n    cout << (isMatch(s, p) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static boolean isMatch(String s, String p) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        String p = br.readLine();\n        System.out.println(isMatch(s, p) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def is_match(s, p):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ns = lines[0]\np = lines[1]\nprint(str(is_match(s, p)).lower())",
      },
      testCases: {
        create: [
          { input: "aa\na", expected: "false", isSample: true, order: 1 },
          { input: "aa\na*", expected: "true", isSample: true, order: 2 },
          { input: "ab\n.*", expected: "true", isSample: false, order: 3 },
          { input: "mississippi\nmis*is*p*.", expected: "false", isSample: false, order: 4 },
          { input: "aab\nc*a*b", expected: "true", isSample: false, order: 5 },
        ],
      },
    },
  });

  const bitManipulation = await prisma.topic.upsert({
    where: { slug: "bit-manipulation" },
    update: {
      name: "Bit Manipulation",
      slug: "bit-manipulation",
      description: "Problems solved with bitwise tricks — XOR, shifts, and bit counting.",
      order: 14,
    },
    create: {
      name: "Bit Manipulation",
      slug: "bit-manipulation",
      description: "Problems solved with bitwise tricks — XOR, shifts, and bit counting.",
      order: 14,
    },
  });

  await prisma.problem.upsert({
    where: { slug: "number-of-1-bits" },
    update: {
      title: "Number of 1 Bits",
      slug: "number-of-1-bits",
      statement:
        "Given an integer `n`, return the number of set bits (`1`s) in its 32-bit unsigned binary representation. This is also known as the Hamming weight.\n\nInput format: a single line containing `n`.\nOutput format: a single integer, the count of set bits.",
      constraints: "0 <= n <= 2^32 - 1",
      difficulty: "EASY",
      order: 1,
      topicId: bitManipulation.id,
      starterCode: {
        javascript:
          "function hammingWeight(n) {\n  // your code here\n}\n\nconst n = Number(require('fs').readFileSync(0, 'utf8').trim())\nconsole.log(hammingWeight(n))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint hammingWeight(long long n) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    long long n;\n    cin >> n;\n    cout << hammingWeight(n) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int hammingWeight(long n) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = Long.parseLong(sc.nextLine().trim());\n        System.out.println(hammingWeight(n));\n    }\n}",
        python:
          "def hamming_weight(n):\n    # your code here\n    pass\n\nn = int(input())\nprint(hamming_weight(n))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "11", expected: "3", isSample: true, order: 1 },
          { input: "128", expected: "1", isSample: true, order: 2 },
          { input: "4294967293", expected: "31", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Number of 1 Bits",
      slug: "number-of-1-bits",
      statement:
        "Given an integer `n`, return the number of set bits (`1`s) in its 32-bit unsigned binary representation. This is also known as the Hamming weight.\n\nInput format: a single line containing `n`.\nOutput format: a single integer, the count of set bits.",
      constraints: "0 <= n <= 2^32 - 1",
      difficulty: "EASY",
      order: 1,
      topicId: bitManipulation.id,
      starterCode: {
        javascript:
          "function hammingWeight(n) {\n  // your code here\n}\n\nconst n = Number(require('fs').readFileSync(0, 'utf8').trim())\nconsole.log(hammingWeight(n))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint hammingWeight(long long n) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    long long n;\n    cin >> n;\n    cout << hammingWeight(n) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int hammingWeight(long n) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = Long.parseLong(sc.nextLine().trim());\n        System.out.println(hammingWeight(n));\n    }\n}",
        python:
          "def hamming_weight(n):\n    # your code here\n    pass\n\nn = int(input())\nprint(hamming_weight(n))",
      },
      testCases: {
        create: [
          { input: "11", expected: "3", isSample: true, order: 1 },
          { input: "128", expected: "1", isSample: true, order: 2 },
          { input: "4294967293", expected: "31", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "single-number" },
    update: {
      title: "Single Number",
      slug: "single-number",
      statement:
        "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one, in O(n) time and O(1) extra space.\n\nInput format: a single line with `nums` as space-separated integers.\nOutput format: a single integer, the element that appears only once.",
      constraints: "1 <= nums.length <= 3 * 10^4\n-3 * 10^4 <= nums[i] <= 3 * 10^4\nEvery element appears exactly twice except for one, which appears exactly once.",
      difficulty: "EASY",
      order: 2,
      topicId: bitManipulation.id,
      starterCode: {
        javascript:
          "function singleNumber(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(singleNumber(nums))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint singleNumber(vector<int>& nums) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << singleNumber(nums) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int singleNumber(int[] nums) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(singleNumber(nums));\n    }\n}",
        python:
          "def single_number(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(single_number(nums))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "2 2 1", expected: "1", isSample: true, order: 1 },
          { input: "4 1 2 1 2", expected: "4", isSample: true, order: 2 },
          { input: "1", expected: "1", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Single Number",
      slug: "single-number",
      statement:
        "Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one, in O(n) time and O(1) extra space.\n\nInput format: a single line with `nums` as space-separated integers.\nOutput format: a single integer, the element that appears only once.",
      constraints: "1 <= nums.length <= 3 * 10^4\n-3 * 10^4 <= nums[i] <= 3 * 10^4\nEvery element appears exactly twice except for one, which appears exactly once.",
      difficulty: "EASY",
      order: 2,
      topicId: bitManipulation.id,
      starterCode: {
        javascript:
          "function singleNumber(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(singleNumber(nums))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint singleNumber(vector<int>& nums) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << singleNumber(nums) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int singleNumber(int[] nums) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(singleNumber(nums));\n    }\n}",
        python:
          "def single_number(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(single_number(nums))",
      },
      testCases: {
        create: [
          { input: "2 2 1", expected: "1", isSample: true, order: 1 },
          { input: "4 1 2 1 2", expected: "4", isSample: true, order: 2 },
          { input: "1", expected: "1", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "reverse-bits" },
    update: {
      title: "Reverse Bits",
      slug: "reverse-bits",
      statement:
        "Given a 32-bit unsigned integer `n`, reverse its bits and return the resulting 32-bit unsigned integer.\n\nInput format: a single line containing `n`.\nOutput format: a single integer, the bit-reversed value.",
      constraints: "0 <= n <= 2^32 - 1",
      difficulty: "EASY",
      order: 3,
      topicId: bitManipulation.id,
      starterCode: {
        javascript:
          "function reverseBits(n) {\n  // your code here\n}\n\nconst n = Number(require('fs').readFileSync(0, 'utf8').trim())\nconsole.log(reverseBits(n))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nlong long reverseBits(long long n) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    long long n;\n    cin >> n;\n    cout << reverseBits(n) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static long reverseBits(long n) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = Long.parseLong(sc.nextLine().trim());\n        System.out.println(reverseBits(n));\n    }\n}",
        python:
          "def reverse_bits(n):\n    # your code here\n    pass\n\nn = int(input())\nprint(reverse_bits(n))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "43261596", expected: "964176192", isSample: true, order: 1 },
          { input: "1", expected: "2147483648", isSample: true, order: 2 },
          { input: "4294967293", expected: "3221225471", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Reverse Bits",
      slug: "reverse-bits",
      statement:
        "Given a 32-bit unsigned integer `n`, reverse its bits and return the resulting 32-bit unsigned integer.\n\nInput format: a single line containing `n`.\nOutput format: a single integer, the bit-reversed value.",
      constraints: "0 <= n <= 2^32 - 1",
      difficulty: "EASY",
      order: 3,
      topicId: bitManipulation.id,
      starterCode: {
        javascript:
          "function reverseBits(n) {\n  // your code here\n}\n\nconst n = Number(require('fs').readFileSync(0, 'utf8').trim())\nconsole.log(reverseBits(n))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nlong long reverseBits(long long n) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    long long n;\n    cin >> n;\n    cout << reverseBits(n) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static long reverseBits(long n) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = Long.parseLong(sc.nextLine().trim());\n        System.out.println(reverseBits(n));\n    }\n}",
        python:
          "def reverse_bits(n):\n    # your code here\n    pass\n\nn = int(input())\nprint(reverse_bits(n))",
      },
      testCases: {
        create: [
          { input: "43261596", expected: "964176192", isSample: true, order: 1 },
          { input: "1", expected: "2147483648", isSample: true, order: 2 },
          { input: "4294967293", expected: "3221225471", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "counting-bits" },
    update: {
      title: "Counting Bits",
      slug: "counting-bits",
      statement:
        "Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (`0 <= i <= n`), `ans[i]` is the number of `1`s in the binary representation of `i`.\n\nInput format: a single line containing `n`.\nOutput format: `n + 1` space-separated integers, `ans[0]` through `ans[n]`.",
      constraints: "0 <= n <= 10^5",
      difficulty: "MEDIUM",
      order: 4,
      topicId: bitManipulation.id,
      starterCode: {
        javascript:
          "function countBits(n) {\n  // your code here\n}\n\nconst n = Number(require('fs').readFileSync(0, 'utf8').trim())\nconsole.log(countBits(n).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> countBits(int n) {\n    // your code here\n    return {};\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> res = countBits(n);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int[] countBits(int n) {\n        // your code here\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = Integer.parseInt(sc.nextLine().trim());\n        int[] res = countBits(n);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < res.length; i++) {\n            if (i > 0) sb.append(\" \");\n            sb.append(res[i]);\n        }\n        System.out.println(sb.toString());\n    }\n}",
        python:
          "def count_bits(n):\n    # your code here\n    pass\n\nn = int(input())\nprint(' '.join(map(str, count_bits(n))))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "2", expected: "0 1 1", isSample: true, order: 1 },
          { input: "5", expected: "0 1 1 2 1 2", isSample: true, order: 2 },
          { input: "0", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Counting Bits",
      slug: "counting-bits",
      statement:
        "Given an integer `n`, return an array `ans` of length `n + 1` such that for each `i` (`0 <= i <= n`), `ans[i]` is the number of `1`s in the binary representation of `i`.\n\nInput format: a single line containing `n`.\nOutput format: `n + 1` space-separated integers, `ans[0]` through `ans[n]`.",
      constraints: "0 <= n <= 10^5",
      difficulty: "MEDIUM",
      order: 4,
      topicId: bitManipulation.id,
      starterCode: {
        javascript:
          "function countBits(n) {\n  // your code here\n}\n\nconst n = Number(require('fs').readFileSync(0, 'utf8').trim())\nconsole.log(countBits(n).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> countBits(int n) {\n    // your code here\n    return {};\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> res = countBits(n);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int[] countBits(int n) {\n        // your code here\n        return new int[]{};\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = Integer.parseInt(sc.nextLine().trim());\n        int[] res = countBits(n);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < res.length; i++) {\n            if (i > 0) sb.append(\" \");\n            sb.append(res[i]);\n        }\n        System.out.println(sb.toString());\n    }\n}",
        python:
          "def count_bits(n):\n    # your code here\n    pass\n\nn = int(input())\nprint(' '.join(map(str, count_bits(n))))",
      },
      testCases: {
        create: [
          { input: "2", expected: "0 1 1", isSample: true, order: 1 },
          { input: "5", expected: "0 1 1 2 1 2", isSample: true, order: 2 },
          { input: "0", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "missing-number" },
    update: {
      title: "Missing Number",
      slug: "missing-number",
      statement:
        "Given an array `nums` containing `n` distinct numbers taken from the range `[0, n]`, return the one number in that range that is missing from the array.\n\nInput format: a single line with `nums` as space-separated integers.\nOutput format: a single integer, the missing number.",
      constraints: "1 <= n <= 10^4\nnums.length == n\n0 <= nums[i] <= n\nAll values in nums are distinct.",
      difficulty: "MEDIUM",
      order: 5,
      topicId: bitManipulation.id,
      starterCode: {
        javascript:
          "function missingNumber(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(missingNumber(nums))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint missingNumber(vector<int>& nums) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << missingNumber(nums) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int missingNumber(int[] nums) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(missingNumber(nums));\n    }\n}",
        python:
          "def missing_number(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(missing_number(nums))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "3 0 1", expected: "2", isSample: true, order: 1 },
          { input: "0 1", expected: "2", isSample: true, order: 2 },
          { input: "9 6 4 2 3 5 7 0 1", expected: "8", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Missing Number",
      slug: "missing-number",
      statement:
        "Given an array `nums` containing `n` distinct numbers taken from the range `[0, n]`, return the one number in that range that is missing from the array.\n\nInput format: a single line with `nums` as space-separated integers.\nOutput format: a single integer, the missing number.",
      constraints: "1 <= n <= 10^4\nnums.length == n\n0 <= nums[i] <= n\nAll values in nums are distinct.",
      difficulty: "MEDIUM",
      order: 5,
      topicId: bitManipulation.id,
      starterCode: {
        javascript:
          "function missingNumber(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(missingNumber(nums))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint missingNumber(vector<int>& nums) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << missingNumber(nums) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int missingNumber(int[] nums) {\n        // your code here\n        return 0;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] nums = parseInts(br.readLine());\n        System.out.println(missingNumber(nums));\n    }\n}",
        python:
          "def missing_number(nums):\n    # your code here\n    pass\n\nimport sys\nnums = list(map(int, sys.stdin.readline().split()))\nprint(missing_number(nums))",
      },
      testCases: {
        create: [
          { input: "3 0 1", expected: "2", isSample: true, order: 1 },
          { input: "0 1", expected: "2", isSample: true, order: 2 },
          { input: "9 6 4 2 3 5 7 0 1", expected: "8", isSample: false, order: 3 },
        ],
      },
    },
  });

  const graphs = await prisma.topic.upsert({
    where: { slug: "graphs" },
    update: {
      name: "Graphs",
      slug: "graphs",
      description: "Traversal, connectivity, shortest paths, and topological ordering.",
      order: 11,
    },
    create: {
      name: "Graphs",
      slug: "graphs",
      description: "Traversal, connectivity, shortest paths, and topological ordering.",
      order: 11,
    },
  });

  await prisma.problem.upsert({
    where: { slug: "find-if-path-exists-in-graph" },
    update: {
      title: "Find if Path Exists in Graph",
      slug: "find-if-path-exists-in-graph",
      statement:
        "Given `n` nodes labeled `0` to `n - 1` and a list of undirected `edges`, determine if there is a valid path from `source` to `destination`.\n\nInput format: first line `n`, second line `m` (number of edges), then `m` lines each `u v` (an edge), then a final line `source destination`.\nOutput format: `true` or `false`.",
      constraints: "1 <= n <= 2 * 10^5\n0 <= edges.length <= 2 * 10^5\nThere are no self-loops or repeated edges.",
      difficulty: "EASY",
      order: 1,
      topicId: graphs.id,
      starterCode: {
        javascript:
          "function validPath(n, edges, source, destination) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nlet idx = 0\nconst n = parseInt(lines[idx++])\nconst m = parseInt(lines[idx++])\nconst edges = []\nfor (let i = 0; i < m; i++) {\n  const [u, v] = lines[idx++].split(' ').map(Number)\n  edges.push([u, v])\n}\nconst [source, destination] = lines[idx++].split(' ').map(Number)\nconsole.log(validPath(n, edges, source, destination))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool validPath(int n, vector<pair<int,int>>& edges, int source, int destination) {\n    // your code here\n    return false;\n}\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<pair<int,int>> edges(m);\n    for (int i = 0; i < m; i++) cin >> edges[i].first >> edges[i].second;\n    int source, destination;\n    cin >> source >> destination;\n    cout << (validPath(n, edges, source, destination) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static boolean validPath(int n, int[][] edges, int source, int destination) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        int[][] edges = new int[m][2];\n        for (int i = 0; i < m; i++) {\n            edges[i][0] = sc.nextInt();\n            edges[i][1] = sc.nextInt();\n        }\n        int source = sc.nextInt();\n        int destination = sc.nextInt();\n        System.out.println(validPath(n, edges, source, destination) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def valid_path(n, edges, source, destination):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nidx = 0\nn = int(lines[idx]); idx += 1\nm = int(lines[idx]); idx += 1\nedges = []\nfor _ in range(m):\n    u, v = map(int, lines[idx].split()); idx += 1\n    edges.append([u, v])\nsource, destination = map(int, lines[idx].split())\nprint(str(valid_path(n, edges, source, destination)).lower())",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "3\n2\n0 1\n1 2\n0 2", expected: "true", isSample: true, order: 1 },
          { input: "6\n4\n0 1\n0 2\n3 5\n5 4\n0 5", expected: "false", isSample: true, order: 2 },
          { input: "1\n0\n0 0", expected: "true", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Find if Path Exists in Graph",
      slug: "find-if-path-exists-in-graph",
      statement:
        "Given `n` nodes labeled `0` to `n - 1` and a list of undirected `edges`, determine if there is a valid path from `source` to `destination`.\n\nInput format: first line `n`, second line `m` (number of edges), then `m` lines each `u v` (an edge), then a final line `source destination`.\nOutput format: `true` or `false`.",
      constraints: "1 <= n <= 2 * 10^5\n0 <= edges.length <= 2 * 10^5\nThere are no self-loops or repeated edges.",
      difficulty: "EASY",
      order: 1,
      topicId: graphs.id,
      starterCode: {
        javascript:
          "function validPath(n, edges, source, destination) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nlet idx = 0\nconst n = parseInt(lines[idx++])\nconst m = parseInt(lines[idx++])\nconst edges = []\nfor (let i = 0; i < m; i++) {\n  const [u, v] = lines[idx++].split(' ').map(Number)\n  edges.push([u, v])\n}\nconst [source, destination] = lines[idx++].split(' ').map(Number)\nconsole.log(validPath(n, edges, source, destination))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool validPath(int n, vector<pair<int,int>>& edges, int source, int destination) {\n    // your code here\n    return false;\n}\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<pair<int,int>> edges(m);\n    for (int i = 0; i < m; i++) cin >> edges[i].first >> edges[i].second;\n    int source, destination;\n    cin >> source >> destination;\n    cout << (validPath(n, edges, source, destination) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static boolean validPath(int n, int[][] edges, int source, int destination) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        int[][] edges = new int[m][2];\n        for (int i = 0; i < m; i++) {\n            edges[i][0] = sc.nextInt();\n            edges[i][1] = sc.nextInt();\n        }\n        int source = sc.nextInt();\n        int destination = sc.nextInt();\n        System.out.println(validPath(n, edges, source, destination) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def valid_path(n, edges, source, destination):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nidx = 0\nn = int(lines[idx]); idx += 1\nm = int(lines[idx]); idx += 1\nedges = []\nfor _ in range(m):\n    u, v = map(int, lines[idx].split()); idx += 1\n    edges.append([u, v])\nsource, destination = map(int, lines[idx].split())\nprint(str(valid_path(n, edges, source, destination)).lower())",
      },
      testCases: {
        create: [
          { input: "3\n2\n0 1\n1 2\n0 2", expected: "true", isSample: true, order: 1 },
          { input: "6\n4\n0 1\n0 2\n3 5\n5 4\n0 5", expected: "false", isSample: true, order: 2 },
          { input: "1\n0\n0 0", expected: "true", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "number-of-islands" },
    update: {
      title: "Number of Islands",
      slug: "number-of-islands",
      statement:
        "Given an `r x c` binary grid representing a map of `1`s (land) and `0`s (water), return the number of islands. An island is surrounded by water and formed by connecting adjacent land horizontally or vertically.\n\nInput format: first line `r c`, then `r` lines each a string of `c` characters ('0' or '1').\nOutput format: a single integer, the number of islands.",
      constraints: "1 <= r, c <= 300",
      difficulty: "MEDIUM",
      order: 2,
      topicId: graphs.id,
      starterCode: {
        javascript:
          "function numIslands(grid) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst [r, c] = lines[0].split(' ').map(Number)\nconst grid = []\nfor (let i = 0; i < r; i++) grid.push(lines[1 + i].split(''))\nconsole.log(numIslands(grid))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint numIslands(vector<string>& grid) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int r, c;\n    cin >> r >> c;\n    vector<string> grid(r);\n    for (int i = 0; i < r; i++) cin >> grid[i];\n    cout << numIslands(grid) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int numIslands(String[] grid) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        String[] grid = new String[r];\n        for (int i = 0; i < r; i++) grid[i] = sc.next();\n        System.out.println(numIslands(grid));\n    }\n}",
        python:
          "def num_islands(grid):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nr, c = map(int, lines[0].split())\ngrid = [list(lines[1+i]) for i in range(r)]\nprint(num_islands(grid))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "4 5\n11110\n11010\n11000\n00000", expected: "1", isSample: true, order: 1 },
          { input: "4 5\n11000\n11000\n00100\n00011", expected: "3", isSample: true, order: 2 },
          { input: "1 1\n0", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Number of Islands",
      slug: "number-of-islands",
      statement:
        "Given an `r x c` binary grid representing a map of `1`s (land) and `0`s (water), return the number of islands. An island is surrounded by water and formed by connecting adjacent land horizontally or vertically.\n\nInput format: first line `r c`, then `r` lines each a string of `c` characters ('0' or '1').\nOutput format: a single integer, the number of islands.",
      constraints: "1 <= r, c <= 300",
      difficulty: "MEDIUM",
      order: 2,
      topicId: graphs.id,
      starterCode: {
        javascript:
          "function numIslands(grid) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst [r, c] = lines[0].split(' ').map(Number)\nconst grid = []\nfor (let i = 0; i < r; i++) grid.push(lines[1 + i].split(''))\nconsole.log(numIslands(grid))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint numIslands(vector<string>& grid) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int r, c;\n    cin >> r >> c;\n    vector<string> grid(r);\n    for (int i = 0; i < r; i++) cin >> grid[i];\n    cout << numIslands(grid) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int numIslands(String[] grid) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        String[] grid = new String[r];\n        for (int i = 0; i < r; i++) grid[i] = sc.next();\n        System.out.println(numIslands(grid));\n    }\n}",
        python:
          "def num_islands(grid):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nr, c = map(int, lines[0].split())\ngrid = [list(lines[1+i]) for i in range(r)]\nprint(num_islands(grid))",
      },
      testCases: {
        create: [
          { input: "4 5\n11110\n11010\n11000\n00000", expected: "1", isSample: true, order: 1 },
          { input: "4 5\n11000\n11000\n00100\n00011", expected: "3", isSample: true, order: 2 },
          { input: "1 1\n0", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "number-of-provinces" },
    update: {
      title: "Number of Provinces",
      slug: "number-of-provinces",
      statement:
        "There are `n` cities. `isConnected[i][j] = '1'` if the `i`th and `j`th cities are directly connected, and `'0'` otherwise. A province is a group of directly or indirectly connected cities. Return the total number of provinces.\n\nInput format: first line `n`, then `n` lines each a string of `n` characters ('0' or '1') — the adjacency matrix.\nOutput format: a single integer, the number of provinces.",
      constraints: "1 <= n <= 200\nisConnected[i][i] == '1' for every i\nisConnected[i][j] == isConnected[j][i]",
      difficulty: "MEDIUM",
      order: 3,
      topicId: graphs.id,
      starterCode: {
        javascript:
          "function findCircleNum(isConnected) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst n = parseInt(lines[0])\nconst isConnected = []\nfor (let i = 0; i < n; i++) isConnected.push(lines[1 + i].split(''))\nconsole.log(findCircleNum(isConnected))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint findCircleNum(vector<string>& isConnected) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<string> isConnected(n);\n    for (int i = 0; i < n; i++) cin >> isConnected[i];\n    cout << findCircleNum(isConnected) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int findCircleNum(String[] isConnected) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        String[] isConnected = new String[n];\n        for (int i = 0; i < n; i++) isConnected[i] = sc.next();\n        System.out.println(findCircleNum(isConnected));\n    }\n}",
        python:
          "def find_circle_num(is_connected):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nn = int(lines[0])\nis_connected = [lines[1+i] for i in range(n)]\nprint(find_circle_num(is_connected))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "3\n110\n110\n001", expected: "2", isSample: true, order: 1 },
          { input: "3\n100\n010\n001", expected: "3", isSample: true, order: 2 },
        ],
      },
    },
    create: {
      title: "Number of Provinces",
      slug: "number-of-provinces",
      statement:
        "There are `n` cities. `isConnected[i][j] = '1'` if the `i`th and `j`th cities are directly connected, and `'0'` otherwise. A province is a group of directly or indirectly connected cities. Return the total number of provinces.\n\nInput format: first line `n`, then `n` lines each a string of `n` characters ('0' or '1') — the adjacency matrix.\nOutput format: a single integer, the number of provinces.",
      constraints: "1 <= n <= 200\nisConnected[i][i] == '1' for every i\nisConnected[i][j] == isConnected[j][i]",
      difficulty: "MEDIUM",
      order: 3,
      topicId: graphs.id,
      starterCode: {
        javascript:
          "function findCircleNum(isConnected) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst n = parseInt(lines[0])\nconst isConnected = []\nfor (let i = 0; i < n; i++) isConnected.push(lines[1 + i].split(''))\nconsole.log(findCircleNum(isConnected))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint findCircleNum(vector<string>& isConnected) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<string> isConnected(n);\n    for (int i = 0; i < n; i++) cin >> isConnected[i];\n    cout << findCircleNum(isConnected) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int findCircleNum(String[] isConnected) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        String[] isConnected = new String[n];\n        for (int i = 0; i < n; i++) isConnected[i] = sc.next();\n        System.out.println(findCircleNum(isConnected));\n    }\n}",
        python:
          "def find_circle_num(is_connected):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nn = int(lines[0])\nis_connected = [lines[1+i] for i in range(n)]\nprint(find_circle_num(is_connected))",
      },
      testCases: {
        create: [
          { input: "3\n110\n110\n001", expected: "2", isSample: true, order: 1 },
          { input: "3\n100\n010\n001", expected: "3", isSample: true, order: 2 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "course-schedule" },
    update: {
      title: "Course Schedule",
      slug: "course-schedule",
      statement:
        "There are `numCourses` courses labeled `0` to `numCourses - 1`. Some courses have prerequisites, given as pairs `[a, b]` meaning you must take course `b` before course `a`. Return `true` if you can finish all courses, or `false` if there is a cycle.\n\nInput format: first line `numCourses`, second line the number of prerequisite pairs, then that many lines each `a b`.\nOutput format: `true` or `false`.",
      constraints: "1 <= numCourses <= 2000\n0 <= prerequisites.length <= 5000",
      difficulty: "MEDIUM",
      order: 4,
      topicId: graphs.id,
      starterCode: {
        javascript:
          "function canFinish(numCourses, prerequisites) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nlet idx = 0\nconst numCourses = parseInt(lines[idx++])\nconst numPrereq = parseInt(lines[idx++])\nconst prerequisites = []\nfor (let i = 0; i < numPrereq; i++) {\n  const [a, b] = lines[idx++].split(' ').map(Number)\n  prerequisites.push([a, b])\n}\nconsole.log(canFinish(numCourses, prerequisites))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool canFinish(int numCourses, vector<pair<int,int>>& prerequisites) {\n    // your code here\n    return false;\n}\n\nint main() {\n    int numCourses, numPrereq;\n    cin >> numCourses >> numPrereq;\n    vector<pair<int,int>> prerequisites(numPrereq);\n    for (int i = 0; i < numPrereq; i++) cin >> prerequisites[i].first >> prerequisites[i].second;\n    cout << (canFinish(numCourses, prerequisites) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static boolean canFinish(int numCourses, int[][] prerequisites) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int numCourses = sc.nextInt();\n        int numPrereq = sc.nextInt();\n        int[][] prerequisites = new int[numPrereq][2];\n        for (int i = 0; i < numPrereq; i++) {\n            prerequisites[i][0] = sc.nextInt();\n            prerequisites[i][1] = sc.nextInt();\n        }\n        System.out.println(canFinish(numCourses, prerequisites) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def can_finish(num_courses, prerequisites):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nidx = 0\nnum_courses = int(lines[idx]); idx += 1\nnum_prereq = int(lines[idx]); idx += 1\nprerequisites = []\nfor _ in range(num_prereq):\n    a, b = map(int, lines[idx].split()); idx += 1\n    prerequisites.append([a, b])\nprint(str(can_finish(num_courses, prerequisites)).lower())",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "2\n1\n1 0", expected: "true", isSample: true, order: 1 },
          { input: "2\n2\n1 0\n0 1", expected: "false", isSample: true, order: 2 },
          { input: "1\n0", expected: "true", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Course Schedule",
      slug: "course-schedule",
      statement:
        "There are `numCourses` courses labeled `0` to `numCourses - 1`. Some courses have prerequisites, given as pairs `[a, b]` meaning you must take course `b` before course `a`. Return `true` if you can finish all courses, or `false` if there is a cycle.\n\nInput format: first line `numCourses`, second line the number of prerequisite pairs, then that many lines each `a b`.\nOutput format: `true` or `false`.",
      constraints: "1 <= numCourses <= 2000\n0 <= prerequisites.length <= 5000",
      difficulty: "MEDIUM",
      order: 4,
      topicId: graphs.id,
      starterCode: {
        javascript:
          "function canFinish(numCourses, prerequisites) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nlet idx = 0\nconst numCourses = parseInt(lines[idx++])\nconst numPrereq = parseInt(lines[idx++])\nconst prerequisites = []\nfor (let i = 0; i < numPrereq; i++) {\n  const [a, b] = lines[idx++].split(' ').map(Number)\n  prerequisites.push([a, b])\n}\nconsole.log(canFinish(numCourses, prerequisites))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool canFinish(int numCourses, vector<pair<int,int>>& prerequisites) {\n    // your code here\n    return false;\n}\n\nint main() {\n    int numCourses, numPrereq;\n    cin >> numCourses >> numPrereq;\n    vector<pair<int,int>> prerequisites(numPrereq);\n    for (int i = 0; i < numPrereq; i++) cin >> prerequisites[i].first >> prerequisites[i].second;\n    cout << (canFinish(numCourses, prerequisites) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static boolean canFinish(int numCourses, int[][] prerequisites) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int numCourses = sc.nextInt();\n        int numPrereq = sc.nextInt();\n        int[][] prerequisites = new int[numPrereq][2];\n        for (int i = 0; i < numPrereq; i++) {\n            prerequisites[i][0] = sc.nextInt();\n            prerequisites[i][1] = sc.nextInt();\n        }\n        System.out.println(canFinish(numCourses, prerequisites) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def can_finish(num_courses, prerequisites):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nidx = 0\nnum_courses = int(lines[idx]); idx += 1\nnum_prereq = int(lines[idx]); idx += 1\nprerequisites = []\nfor _ in range(num_prereq):\n    a, b = map(int, lines[idx].split()); idx += 1\n    prerequisites.append([a, b])\nprint(str(can_finish(num_courses, prerequisites)).lower())",
      },
      testCases: {
        create: [
          { input: "2\n1\n1 0", expected: "true", isSample: true, order: 1 },
          { input: "2\n2\n1 0\n0 1", expected: "false", isSample: true, order: 2 },
          { input: "1\n0", expected: "true", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "rotting-oranges" },
    update: {
      title: "Rotting Oranges",
      slug: "rotting-oranges",
      statement:
        "You are given an `r x c` grid where each cell is `0` (empty), `1` (fresh orange), or `2` (rotten orange). Every minute, any fresh orange adjacent (4-directionally) to a rotten orange becomes rotten. Return the minimum number of minutes until no cell has a fresh orange, or `-1` if impossible.\n\nInput format: first line `r c`, then `r` lines each a string of `c` digits ('0', '1', or '2').\nOutput format: a single integer, the number of minutes, or `-1`.",
      constraints: "1 <= r, c <= 10",
      difficulty: "MEDIUM",
      order: 5,
      topicId: graphs.id,
      starterCode: {
        javascript:
          "function orangesRotting(grid) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst [r, c] = lines[0].split(' ').map(Number)\nconst grid = []\nfor (let i = 0; i < r; i++) grid.push(lines[1 + i].split('').map(Number))\nconsole.log(orangesRotting(grid))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint orangesRotting(vector<vector<int>>& grid) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int r, c;\n    cin >> r >> c;\n    vector<vector<int>> grid(r, vector<int>(c));\n    for (int i = 0; i < r; i++) {\n        string row;\n        cin >> row;\n        for (int j = 0; j < c; j++) grid[i][j] = row[j] - '0';\n    }\n    cout << orangesRotting(grid) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int orangesRotting(int[][] grid) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        int[][] grid = new int[r][c];\n        for (int i = 0; i < r; i++) {\n            String row = sc.next();\n            for (int j = 0; j < c; j++) grid[i][j] = row.charAt(j) - '0';\n        }\n        System.out.println(orangesRotting(grid));\n    }\n}",
        python:
          "def oranges_rotting(grid):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nr, c = map(int, lines[0].split())\ngrid = [[int(ch) for ch in lines[1+i]] for i in range(r)]\nprint(oranges_rotting(grid))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "3 3\n211\n110\n011", expected: "4", isSample: true, order: 1 },
          { input: "3 3\n211\n011\n101", expected: "-1", isSample: true, order: 2 },
          { input: "1 1\n0", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Rotting Oranges",
      slug: "rotting-oranges",
      statement:
        "You are given an `r x c` grid where each cell is `0` (empty), `1` (fresh orange), or `2` (rotten orange). Every minute, any fresh orange adjacent (4-directionally) to a rotten orange becomes rotten. Return the minimum number of minutes until no cell has a fresh orange, or `-1` if impossible.\n\nInput format: first line `r c`, then `r` lines each a string of `c` digits ('0', '1', or '2').\nOutput format: a single integer, the number of minutes, or `-1`.",
      constraints: "1 <= r, c <= 10",
      difficulty: "MEDIUM",
      order: 5,
      topicId: graphs.id,
      starterCode: {
        javascript:
          "function orangesRotting(grid) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst [r, c] = lines[0].split(' ').map(Number)\nconst grid = []\nfor (let i = 0; i < r; i++) grid.push(lines[1 + i].split('').map(Number))\nconsole.log(orangesRotting(grid))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint orangesRotting(vector<vector<int>>& grid) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int r, c;\n    cin >> r >> c;\n    vector<vector<int>> grid(r, vector<int>(c));\n    for (int i = 0; i < r; i++) {\n        string row;\n        cin >> row;\n        for (int j = 0; j < c; j++) grid[i][j] = row[j] - '0';\n    }\n    cout << orangesRotting(grid) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int orangesRotting(int[][] grid) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        int[][] grid = new int[r][c];\n        for (int i = 0; i < r; i++) {\n            String row = sc.next();\n            for (int j = 0; j < c; j++) grid[i][j] = row.charAt(j) - '0';\n        }\n        System.out.println(orangesRotting(grid));\n    }\n}",
        python:
          "def oranges_rotting(grid):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nr, c = map(int, lines[0].split())\ngrid = [[int(ch) for ch in lines[1+i]] for i in range(r)]\nprint(oranges_rotting(grid))",
      },
      testCases: {
        create: [
          { input: "3 3\n211\n110\n011", expected: "4", isSample: true, order: 1 },
          { input: "3 3\n211\n011\n101", expected: "-1", isSample: true, order: 2 },
          { input: "1 1\n0", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "network-delay-time" },
    update: {
      title: "Network Delay Time",
      slug: "network-delay-time",
      statement:
        "There are `n` network nodes labeled `1` to `n`. `times[i] = (u, v, w)` means it takes `w` time for a signal to travel from node `u` to node `v`. Send a signal from node `k`. Return the minimum time for all `n` nodes to receive the signal, or `-1` if impossible.\n\nInput format: first line `n`, second line `k`, third line `m` (number of edges), then `m` lines each `u v w`.\nOutput format: a single integer, the minimum time, or `-1`.",
      constraints: "1 <= n <= 100\n1 <= m <= 6000\n1 <= u, v <= n\n0 <= w <= 100",
      difficulty: "HARD",
      order: 6,
      topicId: graphs.id,
      starterCode: {
        javascript:
          "function networkDelayTime(times, n, k) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nlet idx = 0\nconst n = parseInt(lines[idx++])\nconst k = parseInt(lines[idx++])\nconst m = parseInt(lines[idx++])\nconst times = []\nfor (let i = 0; i < m; i++) {\n  const [u, v, w] = lines[idx++].split(' ').map(Number)\n  times.push([u, v, w])\n}\nconsole.log(networkDelayTime(times, n, k))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint networkDelayTime(vector<vector<int>>& times, int n, int k) {\n    // your code here\n    return -1;\n}\n\nint main() {\n    int n, k, m;\n    cin >> n >> k >> m;\n    vector<vector<int>> times(m, vector<int>(3));\n    for (int i = 0; i < m; i++) cin >> times[i][0] >> times[i][1] >> times[i][2];\n    cout << networkDelayTime(times, n, k) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int networkDelayTime(int[][] times, int n, int k) {\n        // your code here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int m = sc.nextInt();\n        int[][] times = new int[m][3];\n        for (int i = 0; i < m; i++) {\n            times[i][0] = sc.nextInt();\n            times[i][1] = sc.nextInt();\n            times[i][2] = sc.nextInt();\n        }\n        System.out.println(networkDelayTime(times, n, k));\n    }\n}",
        python:
          "def network_delay_time(times, n, k):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nidx = 0\nn = int(lines[idx]); idx += 1\nk = int(lines[idx]); idx += 1\nm = int(lines[idx]); idx += 1\ntimes = []\nfor _ in range(m):\n    u, v, w = map(int, lines[idx].split()); idx += 1\n    times.append([u, v, w])\nprint(network_delay_time(times, n, k))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "4\n2\n3\n2 1 1\n2 3 1\n3 4 1", expected: "2", isSample: true, order: 1 },
          { input: "2\n1\n1\n1 2 1", expected: "1", isSample: true, order: 2 },
          { input: "2\n2\n1\n1 2 1", expected: "-1", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Network Delay Time",
      slug: "network-delay-time",
      statement:
        "There are `n` network nodes labeled `1` to `n`. `times[i] = (u, v, w)` means it takes `w` time for a signal to travel from node `u` to node `v`. Send a signal from node `k`. Return the minimum time for all `n` nodes to receive the signal, or `-1` if impossible.\n\nInput format: first line `n`, second line `k`, third line `m` (number of edges), then `m` lines each `u v w`.\nOutput format: a single integer, the minimum time, or `-1`.",
      constraints: "1 <= n <= 100\n1 <= m <= 6000\n1 <= u, v <= n\n0 <= w <= 100",
      difficulty: "HARD",
      order: 6,
      topicId: graphs.id,
      starterCode: {
        javascript:
          "function networkDelayTime(times, n, k) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nlet idx = 0\nconst n = parseInt(lines[idx++])\nconst k = parseInt(lines[idx++])\nconst m = parseInt(lines[idx++])\nconst times = []\nfor (let i = 0; i < m; i++) {\n  const [u, v, w] = lines[idx++].split(' ').map(Number)\n  times.push([u, v, w])\n}\nconsole.log(networkDelayTime(times, n, k))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint networkDelayTime(vector<vector<int>>& times, int n, int k) {\n    // your code here\n    return -1;\n}\n\nint main() {\n    int n, k, m;\n    cin >> n >> k >> m;\n    vector<vector<int>> times(m, vector<int>(3));\n    for (int i = 0; i < m; i++) cin >> times[i][0] >> times[i][1] >> times[i][2];\n    cout << networkDelayTime(times, n, k) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int networkDelayTime(int[][] times, int n, int k) {\n        // your code here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int k = sc.nextInt();\n        int m = sc.nextInt();\n        int[][] times = new int[m][3];\n        for (int i = 0; i < m; i++) {\n            times[i][0] = sc.nextInt();\n            times[i][1] = sc.nextInt();\n            times[i][2] = sc.nextInt();\n        }\n        System.out.println(networkDelayTime(times, n, k));\n    }\n}",
        python:
          "def network_delay_time(times, n, k):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nidx = 0\nn = int(lines[idx]); idx += 1\nk = int(lines[idx]); idx += 1\nm = int(lines[idx]); idx += 1\ntimes = []\nfor _ in range(m):\n    u, v, w = map(int, lines[idx].split()); idx += 1\n    times.append([u, v, w])\nprint(network_delay_time(times, n, k))",
      },
      testCases: {
        create: [
          { input: "4\n2\n3\n2 1 1\n2 3 1\n3 4 1", expected: "2", isSample: true, order: 1 },
          { input: "2\n1\n1\n1 2 1", expected: "1", isSample: true, order: 2 },
          { input: "2\n2\n1\n1 2 1", expected: "-1", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "cheapest-flights-within-k-stops" },
    update: {
      title: "Cheapest Flights Within K Stops",
      slug: "cheapest-flights-within-k-stops",
      statement:
        "There are `n` cities connected by flights, `flights[i] = (from, to, price)`. Given `src`, `dst`, and `k` (max number of stops), return the cheapest price from `src` to `dst` with at most `k` stops, or `-1` if there is no such route.\n\nInput format: first line `n`, second line `m` (number of flights), then `m` lines each `from to price`, then a final line `src dst k`.\nOutput format: a single integer, the cheapest price, or `-1`.",
      constraints: "1 <= n <= 100\n0 <= flights.length <= (n * (n - 1) / 2)\n0 <= src, dst < n\n0 <= k < n",
      difficulty: "HARD",
      order: 7,
      topicId: graphs.id,
      starterCode: {
        javascript:
          "function findCheapestPrice(n, flights, src, dst, k) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nlet idx = 0\nconst n = parseInt(lines[idx++])\nconst m = parseInt(lines[idx++])\nconst flights = []\nfor (let i = 0; i < m; i++) {\n  const [u, v, w] = lines[idx++].split(' ').map(Number)\n  flights.push([u, v, w])\n}\nconst [src, dst, k] = lines[idx++].split(' ').map(Number)\nconsole.log(findCheapestPrice(n, flights, src, dst, k))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {\n    // your code here\n    return -1;\n}\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> flights(m, vector<int>(3));\n    for (int i = 0; i < m; i++) cin >> flights[i][0] >> flights[i][1] >> flights[i][2];\n    int src, dst, k;\n    cin >> src >> dst >> k;\n    cout << findCheapestPrice(n, flights, src, dst, k) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n        // your code here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        int[][] flights = new int[m][3];\n        for (int i = 0; i < m; i++) {\n            flights[i][0] = sc.nextInt();\n            flights[i][1] = sc.nextInt();\n            flights[i][2] = sc.nextInt();\n        }\n        int src = sc.nextInt();\n        int dst = sc.nextInt();\n        int k = sc.nextInt();\n        System.out.println(findCheapestPrice(n, flights, src, dst, k));\n    }\n}",
        python:
          "def find_cheapest_price(n, flights, src, dst, k):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nidx = 0\nn = int(lines[idx]); idx += 1\nm = int(lines[idx]); idx += 1\nflights = []\nfor _ in range(m):\n    u, v, w = map(int, lines[idx].split()); idx += 1\n    flights.append([u, v, w])\nsrc, dst, k = map(int, lines[idx].split())\nprint(find_cheapest_price(n, flights, src, dst, k))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "4\n5\n0 1 100\n1 2 100\n2 0 100\n1 3 600\n2 3 200\n0 3 1", expected: "700", isSample: true, order: 1 },
          { input: "3\n3\n0 1 100\n1 2 100\n0 2 500\n0 2 1", expected: "200", isSample: true, order: 2 },
          { input: "3\n3\n0 1 100\n1 2 100\n0 2 500\n0 2 0", expected: "500", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Cheapest Flights Within K Stops",
      slug: "cheapest-flights-within-k-stops",
      statement:
        "There are `n` cities connected by flights, `flights[i] = (from, to, price)`. Given `src`, `dst`, and `k` (max number of stops), return the cheapest price from `src` to `dst` with at most `k` stops, or `-1` if there is no such route.\n\nInput format: first line `n`, second line `m` (number of flights), then `m` lines each `from to price`, then a final line `src dst k`.\nOutput format: a single integer, the cheapest price, or `-1`.",
      constraints: "1 <= n <= 100\n0 <= flights.length <= (n * (n - 1) / 2)\n0 <= src, dst < n\n0 <= k < n",
      difficulty: "HARD",
      order: 7,
      topicId: graphs.id,
      starterCode: {
        javascript:
          "function findCheapestPrice(n, flights, src, dst, k) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nlet idx = 0\nconst n = parseInt(lines[idx++])\nconst m = parseInt(lines[idx++])\nconst flights = []\nfor (let i = 0; i < m; i++) {\n  const [u, v, w] = lines[idx++].split(' ').map(Number)\n  flights.push([u, v, w])\n}\nconst [src, dst, k] = lines[idx++].split(' ').map(Number)\nconsole.log(findCheapestPrice(n, flights, src, dst, k))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {\n    // your code here\n    return -1;\n}\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> flights(m, vector<int>(3));\n    for (int i = 0; i < m; i++) cin >> flights[i][0] >> flights[i][1] >> flights[i][2];\n    int src, dst, k;\n    cin >> src >> dst >> k;\n    cout << findCheapestPrice(n, flights, src, dst, k) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n        // your code here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int m = sc.nextInt();\n        int[][] flights = new int[m][3];\n        for (int i = 0; i < m; i++) {\n            flights[i][0] = sc.nextInt();\n            flights[i][1] = sc.nextInt();\n            flights[i][2] = sc.nextInt();\n        }\n        int src = sc.nextInt();\n        int dst = sc.nextInt();\n        int k = sc.nextInt();\n        System.out.println(findCheapestPrice(n, flights, src, dst, k));\n    }\n}",
        python:
          "def find_cheapest_price(n, flights, src, dst, k):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nidx = 0\nn = int(lines[idx]); idx += 1\nm = int(lines[idx]); idx += 1\nflights = []\nfor _ in range(m):\n    u, v, w = map(int, lines[idx].split()); idx += 1\n    flights.append([u, v, w])\nsrc, dst, k = map(int, lines[idx].split())\nprint(find_cheapest_price(n, flights, src, dst, k))",
      },
      testCases: {
        create: [
          { input: "4\n5\n0 1 100\n1 2 100\n2 0 100\n1 3 600\n2 3 200\n0 3 1", expected: "700", isSample: true, order: 1 },
          { input: "3\n3\n0 1 100\n1 2 100\n0 2 500\n0 2 1", expected: "200", isSample: true, order: 2 },
          { input: "3\n3\n0 1 100\n1 2 100\n0 2 500\n0 2 0", expected: "500", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "word-ladder" },
    update: {
      title: "Word Ladder",
      slug: "word-ladder",
      statement:
        "Given two words `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord` (inclusive of both), changing only one letter at a time, with every intermediate word present in `wordList`. Return `0` if no such sequence exists.\n\nInput format: first line `beginWord`, second line `endWord`, third line `n` (size of `wordList`), then `n` lines each one word.\nOutput format: a single integer, the length of the shortest sequence, or `0`.",
      constraints: "1 <= beginWord.length <= 10\nendWord.length == beginWord.length\n1 <= n <= 5000\nAll words consist of lowercase English letters.",
      difficulty: "HARD",
      order: 8,
      topicId: graphs.id,
      starterCode: {
        javascript:
          "function ladderLength(beginWord, endWord, wordList) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nlet idx = 0\nconst beginWord = lines[idx++]\nconst endWord = lines[idx++]\nconst n = parseInt(lines[idx++])\nconst wordList = []\nfor (let i = 0; i < n; i++) wordList.push(lines[idx++])\nconsole.log(ladderLength(beginWord, endWord, wordList))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string beginWord, endWord;\n    cin >> beginWord >> endWord;\n    int n;\n    cin >> n;\n    vector<string> wordList(n);\n    for (int i = 0; i < n; i++) cin >> wordList[i];\n    cout << ladderLength(beginWord, endWord, wordList) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String beginWord = sc.next();\n        String endWord = sc.next();\n        int n = sc.nextInt();\n        List<String> wordList = new ArrayList<>();\n        for (int i = 0; i < n; i++) wordList.add(sc.next());\n        System.out.println(ladderLength(beginWord, endWord, wordList));\n    }\n}",
        python:
          "def ladder_length(begin_word, end_word, word_list):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nidx = 0\nbegin_word = lines[idx]; idx += 1\nend_word = lines[idx]; idx += 1\nn = int(lines[idx]); idx += 1\nword_list = [lines[idx+i] for i in range(n)]\nprint(ladder_length(begin_word, end_word, word_list))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "hit\ncog\n6\nhot\ndot\ndog\nlot\nlog\ncog", expected: "5", isSample: true, order: 1 },
          { input: "hit\ncog\n5\nhot\ndot\ndog\nlot\nlog", expected: "0", isSample: true, order: 2 },
          { input: "a\nc\n3\na\nb\nc", expected: "2", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Word Ladder",
      slug: "word-ladder",
      statement:
        "Given two words `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the shortest transformation sequence from `beginWord` to `endWord` (inclusive of both), changing only one letter at a time, with every intermediate word present in `wordList`. Return `0` if no such sequence exists.\n\nInput format: first line `beginWord`, second line `endWord`, third line `n` (size of `wordList`), then `n` lines each one word.\nOutput format: a single integer, the length of the shortest sequence, or `0`.",
      constraints: "1 <= beginWord.length <= 10\nendWord.length == beginWord.length\n1 <= n <= 5000\nAll words consist of lowercase English letters.",
      difficulty: "HARD",
      order: 8,
      topicId: graphs.id,
      starterCode: {
        javascript:
          "function ladderLength(beginWord, endWord, wordList) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nlet idx = 0\nconst beginWord = lines[idx++]\nconst endWord = lines[idx++]\nconst n = parseInt(lines[idx++])\nconst wordList = []\nfor (let i = 0; i < n; i++) wordList.push(lines[idx++])\nconsole.log(ladderLength(beginWord, endWord, wordList))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string beginWord, endWord;\n    cin >> beginWord >> endWord;\n    int n;\n    cin >> n;\n    vector<string> wordList(n);\n    for (int i = 0; i < n; i++) cin >> wordList[i];\n    cout << ladderLength(beginWord, endWord, wordList) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String beginWord = sc.next();\n        String endWord = sc.next();\n        int n = sc.nextInt();\n        List<String> wordList = new ArrayList<>();\n        for (int i = 0; i < n; i++) wordList.add(sc.next());\n        System.out.println(ladderLength(beginWord, endWord, wordList));\n    }\n}",
        python:
          "def ladder_length(begin_word, end_word, word_list):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nidx = 0\nbegin_word = lines[idx]; idx += 1\nend_word = lines[idx]; idx += 1\nn = int(lines[idx]); idx += 1\nword_list = [lines[idx+i] for i in range(n)]\nprint(ladder_length(begin_word, end_word, word_list))",
      },
      testCases: {
        create: [
          { input: "hit\ncog\n6\nhot\ndot\ndog\nlot\nlog\ncog", expected: "5", isSample: true, order: 1 },
          { input: "hit\ncog\n5\nhot\ndot\ndog\nlot\nlog", expected: "0", isSample: true, order: 2 },
          { input: "a\nc\n3\na\nb\nc", expected: "2", isSample: false, order: 3 },
        ],
      },
    },
  });

  const backtracking = await prisma.topic.upsert({
    where: { slug: "backtracking" },
    update: {
      name: "Backtracking",
      slug: "backtracking",
      description: "Exhaustive search with pruning — build a candidate, backtrack when it fails.",
      order: 12,
    },
    create: {
      name: "Backtracking",
      slug: "backtracking",
      description: "Exhaustive search with pruning — build a candidate, backtrack when it fails.",
      order: 12,
    },
  });

  await prisma.problem.upsert({
    where: { slug: "word-search" },
    update: {
      title: "Word Search",
      slug: "word-search",
      statement:
        "Given an `r x c` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word can be constructed from letters of sequentially adjacent cells (horizontally or vertically), where the same cell may not be used more than once.\n\nInput format: first line `r c`, then `r` lines each a string of `c` characters (the board), then a final line with `word`.\nOutput format: `true` or `false`.",
      constraints: "1 <= r, c <= 6\n1 <= word.length <= 15\nboard and word consist of uppercase English letters.",
      difficulty: "MEDIUM",
      order: 1,
      topicId: backtracking.id,
      starterCode: {
        javascript:
          "function exist(board, word) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst [r, c] = lines[0].split(' ').map(Number)\nconst board = []\nfor (let i = 0; i < r; i++) board.push(lines[1 + i].split(''))\nconst word = lines[1 + r]\nconsole.log(exist(board, word))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool exist(vector<string>& board, string word) {\n    // your code here\n    return false;\n}\n\nint main() {\n    int r, c;\n    cin >> r >> c;\n    vector<string> board(r);\n    for (int i = 0; i < r; i++) cin >> board[i];\n    string word;\n    cin >> word;\n    cout << (exist(board, word) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static boolean exist(String[] board, String word) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        String[] board = new String[r];\n        for (int i = 0; i < r; i++) board[i] = sc.next();\n        String word = sc.next();\n        System.out.println(exist(board, word) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def exist(board, word):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nr, c = map(int, lines[0].split())\nboard = [list(lines[1+i]) for i in range(r)]\nword = lines[1+r]\nprint(str(exist(board, word)).lower())",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "3 4\nABCE\nSFCS\nADEE\nABCCED", expected: "true", isSample: true, order: 1 },
          { input: "3 4\nABCE\nSFCS\nADEE\nSEE", expected: "true", isSample: true, order: 2 },
          { input: "3 4\nABCE\nSFCS\nADEE\nABCB", expected: "false", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Word Search",
      slug: "word-search",
      statement:
        "Given an `r x c` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word can be constructed from letters of sequentially adjacent cells (horizontally or vertically), where the same cell may not be used more than once.\n\nInput format: first line `r c`, then `r` lines each a string of `c` characters (the board), then a final line with `word`.\nOutput format: `true` or `false`.",
      constraints: "1 <= r, c <= 6\n1 <= word.length <= 15\nboard and word consist of uppercase English letters.",
      difficulty: "MEDIUM",
      order: 1,
      topicId: backtracking.id,
      starterCode: {
        javascript:
          "function exist(board, word) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst [r, c] = lines[0].split(' ').map(Number)\nconst board = []\nfor (let i = 0; i < r; i++) board.push(lines[1 + i].split(''))\nconst word = lines[1 + r]\nconsole.log(exist(board, word))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool exist(vector<string>& board, string word) {\n    // your code here\n    return false;\n}\n\nint main() {\n    int r, c;\n    cin >> r >> c;\n    vector<string> board(r);\n    for (int i = 0; i < r; i++) cin >> board[i];\n    string word;\n    cin >> word;\n    cout << (exist(board, word) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static boolean exist(String[] board, String word) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int r = sc.nextInt();\n        int c = sc.nextInt();\n        String[] board = new String[r];\n        for (int i = 0; i < r; i++) board[i] = sc.next();\n        String word = sc.next();\n        System.out.println(exist(board, word) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def exist(board, word):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nr, c = map(int, lines[0].split())\nboard = [list(lines[1+i]) for i in range(r)]\nword = lines[1+r]\nprint(str(exist(board, word)).lower())",
      },
      testCases: {
        create: [
          { input: "3 4\nABCE\nSFCS\nADEE\nABCCED", expected: "true", isSample: true, order: 1 },
          { input: "3 4\nABCE\nSFCS\nADEE\nSEE", expected: "true", isSample: true, order: 2 },
          { input: "3 4\nABCE\nSFCS\nADEE\nABCB", expected: "false", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "word-break" },
    update: {
      title: "Word Break",
      slug: "word-break",
      statement:
        "Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words. The same word may be reused multiple times.\n\nInput format: first line `s`, second line `n` (size of `wordDict`), then `n` lines each one word.\nOutput format: `true` or `false`.",
      constraints: "1 <= s.length <= 300\n1 <= n <= 1000\nAll strings consist of lowercase English letters.",
      difficulty: "MEDIUM",
      order: 2,
      topicId: backtracking.id,
      starterCode: {
        javascript:
          "function wordBreak(s, wordDict) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nlet idx = 0\nconst s = lines[idx++]\nconst n = parseInt(lines[idx++])\nconst wordDict = []\nfor (let i = 0; i < n; i++) wordDict.push(lines[idx++])\nconsole.log(wordBreak(s, wordDict))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool wordBreak(string s, vector<string>& wordDict) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string s;\n    cin >> s;\n    int n;\n    cin >> n;\n    vector<string> wordDict(n);\n    for (int i = 0; i < n; i++) cin >> wordDict[i];\n    cout << (wordBreak(s, wordDict) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static boolean wordBreak(String s, List<String> wordDict) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int n = sc.nextInt();\n        List<String> wordDict = new ArrayList<>();\n        for (int i = 0; i < n; i++) wordDict.add(sc.next());\n        System.out.println(wordBreak(s, wordDict) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def word_break(s, word_dict):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nidx = 0\ns = lines[idx]; idx += 1\nn = int(lines[idx]); idx += 1\nword_dict = [lines[idx+i] for i in range(n)]\nprint(str(word_break(s, word_dict)).lower())",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "leetcode\n2\nleet\ncode", expected: "true", isSample: true, order: 1 },
          { input: "applepenapple\n2\napple\npen", expected: "true", isSample: true, order: 2 },
          { input: "catsandog\n5\ncats\ndog\nsand\nand\ncat", expected: "false", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Word Break",
      slug: "word-break",
      statement:
        "Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words. The same word may be reused multiple times.\n\nInput format: first line `s`, second line `n` (size of `wordDict`), then `n` lines each one word.\nOutput format: `true` or `false`.",
      constraints: "1 <= s.length <= 300\n1 <= n <= 1000\nAll strings consist of lowercase English letters.",
      difficulty: "MEDIUM",
      order: 2,
      topicId: backtracking.id,
      starterCode: {
        javascript:
          "function wordBreak(s, wordDict) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nlet idx = 0\nconst s = lines[idx++]\nconst n = parseInt(lines[idx++])\nconst wordDict = []\nfor (let i = 0; i < n; i++) wordDict.push(lines[idx++])\nconsole.log(wordBreak(s, wordDict))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool wordBreak(string s, vector<string>& wordDict) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string s;\n    cin >> s;\n    int n;\n    cin >> n;\n    vector<string> wordDict(n);\n    for (int i = 0; i < n; i++) cin >> wordDict[i];\n    cout << (wordBreak(s, wordDict) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static boolean wordBreak(String s, List<String> wordDict) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        int n = sc.nextInt();\n        List<String> wordDict = new ArrayList<>();\n        for (int i = 0; i < n; i++) wordDict.add(sc.next());\n        System.out.println(wordBreak(s, wordDict) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def word_break(s, word_dict):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nidx = 0\ns = lines[idx]; idx += 1\nn = int(lines[idx]); idx += 1\nword_dict = [lines[idx+i] for i in range(n)]\nprint(str(word_break(s, word_dict)).lower())",
      },
      testCases: {
        create: [
          { input: "leetcode\n2\nleet\ncode", expected: "true", isSample: true, order: 1 },
          { input: "applepenapple\n2\napple\npen", expected: "true", isSample: true, order: 2 },
          { input: "catsandog\n5\ncats\ndog\nsand\nand\ncat", expected: "false", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "combination-sum-count" },
    update: {
      title: "Combination Sum Count",
      slug: "combination-sum-count",
      statement:
        "Given a list of distinct positive integers `candidates` and a target integer `target`, return the number of unique combinations of `candidates` (each number may be chosen an unlimited number of times) that sum to `target`. Two combinations are the same if they have the same multiset of numbers.\n\nInput format: first line `n` (size of `candidates`), second line `candidates` as space-separated integers, third line `target`.\nOutput format: a single integer, the number of unique combinations.",
      constraints: "1 <= candidates.length <= 30\n2 <= candidates[i] <= 40\nAll elements of candidates are distinct.\n1 <= target <= 40",
      difficulty: "MEDIUM",
      order: 3,
      topicId: backtracking.id,
      starterCode: {
        javascript:
          "function combinationSumCount(candidates, target) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nlet idx = 0\nconst n = parseInt(lines[idx++])\nconst candidates = lines[idx++].split(' ').map(Number)\nconst target = parseInt(lines[idx++])\nconsole.log(combinationSumCount(candidates, target))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint combinationSumCount(vector<int>& candidates, int target) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> candidates(n);\n    for (int i = 0; i < n; i++) cin >> candidates[i];\n    int target;\n    cin >> target;\n    cout << combinationSumCount(candidates, target) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int combinationSumCount(int[] candidates, int target) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] candidates = new int[n];\n        for (int i = 0; i < n; i++) candidates[i] = sc.nextInt();\n        int target = sc.nextInt();\n        System.out.println(combinationSumCount(candidates, target));\n    }\n}",
        python:
          "def combination_sum_count(candidates, target):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nidx = 0\nn = int(lines[idx]); idx += 1\ncandidates = list(map(int, lines[idx].split())); idx += 1\ntarget = int(lines[idx])\nprint(combination_sum_count(candidates, target))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "4\n2 3 6 7\n7", expected: "2", isSample: true, order: 1 },
          { input: "3\n2 3 5\n8", expected: "3", isSample: true, order: 2 },
          { input: "1\n2\n1", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Combination Sum Count",
      slug: "combination-sum-count",
      statement:
        "Given a list of distinct positive integers `candidates` and a target integer `target`, return the number of unique combinations of `candidates` (each number may be chosen an unlimited number of times) that sum to `target`. Two combinations are the same if they have the same multiset of numbers.\n\nInput format: first line `n` (size of `candidates`), second line `candidates` as space-separated integers, third line `target`.\nOutput format: a single integer, the number of unique combinations.",
      constraints: "1 <= candidates.length <= 30\n2 <= candidates[i] <= 40\nAll elements of candidates are distinct.\n1 <= target <= 40",
      difficulty: "MEDIUM",
      order: 3,
      topicId: backtracking.id,
      starterCode: {
        javascript:
          "function combinationSumCount(candidates, target) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nlet idx = 0\nconst n = parseInt(lines[idx++])\nconst candidates = lines[idx++].split(' ').map(Number)\nconst target = parseInt(lines[idx++])\nconsole.log(combinationSumCount(candidates, target))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint combinationSumCount(vector<int>& candidates, int target) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<int> candidates(n);\n    for (int i = 0; i < n; i++) cin >> candidates[i];\n    int target;\n    cin >> target;\n    cout << combinationSumCount(candidates, target) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int combinationSumCount(int[] candidates, int target) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[] candidates = new int[n];\n        for (int i = 0; i < n; i++) candidates[i] = sc.nextInt();\n        int target = sc.nextInt();\n        System.out.println(combinationSumCount(candidates, target));\n    }\n}",
        python:
          "def combination_sum_count(candidates, target):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nidx = 0\nn = int(lines[idx]); idx += 1\ncandidates = list(map(int, lines[idx].split())); idx += 1\ntarget = int(lines[idx])\nprint(combination_sum_count(candidates, target))",
      },
      testCases: {
        create: [
          { input: "4\n2 3 6 7\n7", expected: "2", isSample: true, order: 1 },
          { input: "3\n2 3 5\n8", expected: "3", isSample: true, order: 2 },
          { input: "1\n2\n1", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "n-queens-ii" },
    update: {
      title: "N-Queens II",
      slug: "n-queens-ii",
      statement:
        "The `n`-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other. Given `n`, return the number of distinct solutions.\n\nInput format: a single line containing `n`.\nOutput format: a single integer, the number of distinct solutions.",
      constraints: "1 <= n <= 9",
      difficulty: "HARD",
      order: 4,
      topicId: backtracking.id,
      starterCode: {
        javascript:
          "function totalNQueens(n) {\n  // your code here\n}\n\nconst n = Number(require('fs').readFileSync(0, 'utf8').trim())\nconsole.log(totalNQueens(n))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint totalNQueens(int n) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << totalNQueens(n) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int totalNQueens(int n) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = Integer.parseInt(sc.nextLine().trim());\n        System.out.println(totalNQueens(n));\n    }\n}",
        python:
          "def total_n_queens(n):\n    # your code here\n    pass\n\nn = int(input())\nprint(total_n_queens(n))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "4", expected: "2", isSample: true, order: 1 },
          { input: "1", expected: "1", isSample: true, order: 2 },
          { input: "2", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "N-Queens II",
      slug: "n-queens-ii",
      statement:
        "The `n`-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other. Given `n`, return the number of distinct solutions.\n\nInput format: a single line containing `n`.\nOutput format: a single integer, the number of distinct solutions.",
      constraints: "1 <= n <= 9",
      difficulty: "HARD",
      order: 4,
      topicId: backtracking.id,
      starterCode: {
        javascript:
          "function totalNQueens(n) {\n  // your code here\n}\n\nconst n = Number(require('fs').readFileSync(0, 'utf8').trim())\nconsole.log(totalNQueens(n))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint totalNQueens(int n) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    cout << totalNQueens(n) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int totalNQueens(int n) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = Integer.parseInt(sc.nextLine().trim());\n        System.out.println(totalNQueens(n));\n    }\n}",
        python:
          "def total_n_queens(n):\n    # your code here\n    pass\n\nn = int(input())\nprint(total_n_queens(n))",
      },
      testCases: {
        create: [
          { input: "4", expected: "2", isSample: true, order: 1 },
          { input: "1", expected: "1", isSample: true, order: 2 },
          { input: "2", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "restore-ip-addresses-count" },
    update: {
      title: "Restore IP Addresses Count",
      slug: "restore-ip-addresses-count",
      statement:
        "A valid IP address consists of exactly four integers separated by single dots, each between `0` and `255`, with no leading zeros (unless the segment is exactly `\"0\"`). Given a string `s` containing only digits, return the number of ways to insert dots into `s` to form a valid IP address.\n\nInput format: a single line containing `s`.\nOutput format: a single integer, the number of valid IP addresses that can be formed.",
      constraints: "1 <= s.length <= 20\ns consists of digits only.",
      difficulty: "HARD",
      order: 5,
      topicId: backtracking.id,
      starterCode: {
        javascript:
          "function restoreIpCount(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').trim()\nconsole.log(restoreIpCount(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint restoreIpCount(string s) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string s;\n    cin >> s;\n    cout << restoreIpCount(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int restoreIpCount(String s) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        System.out.println(restoreIpCount(s));\n    }\n}",
        python:
          "def restore_ip_count(s):\n    # your code here\n    pass\n\ns = input()\nprint(restore_ip_count(s))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "25525511135", expected: "2", isSample: true, order: 1 },
          { input: "0000", expected: "1", isSample: true, order: 2 },
          { input: "101023", expected: "5", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Restore IP Addresses Count",
      slug: "restore-ip-addresses-count",
      statement:
        "A valid IP address consists of exactly four integers separated by single dots, each between `0` and `255`, with no leading zeros (unless the segment is exactly `\"0\"`). Given a string `s` containing only digits, return the number of ways to insert dots into `s` to form a valid IP address.\n\nInput format: a single line containing `s`.\nOutput format: a single integer, the number of valid IP addresses that can be formed.",
      constraints: "1 <= s.length <= 20\ns consists of digits only.",
      difficulty: "HARD",
      order: 5,
      topicId: backtracking.id,
      starterCode: {
        javascript:
          "function restoreIpCount(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').trim()\nconsole.log(restoreIpCount(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint restoreIpCount(string s) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string s;\n    cin >> s;\n    cout << restoreIpCount(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int restoreIpCount(String s) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        System.out.println(restoreIpCount(s));\n    }\n}",
        python:
          "def restore_ip_count(s):\n    # your code here\n    pass\n\ns = input()\nprint(restore_ip_count(s))",
      },
      testCases: {
        create: [
          { input: "25525511135", expected: "2", isSample: true, order: 1 },
          { input: "0000", expected: "1", isSample: true, order: 2 },
          { input: "101023", expected: "5", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "palindrome-partitioning-count" },
    update: {
      title: "Palindrome Partitioning Count",
      slug: "palindrome-partitioning-count",
      statement:
        "Given a string `s`, a partitioning of `s` is palindrome-valid if every substring in the partition is a palindrome. Return the number of ways to partition `s` such that every substring is a palindrome.\n\nInput format: a single line containing `s`.\nOutput format: a single integer, the number of valid partitions.",
      constraints: "1 <= s.length <= 16\ns consists of lowercase English letters only.",
      difficulty: "HARD",
      order: 6,
      topicId: backtracking.id,
      starterCode: {
        javascript:
          "function palindromePartitionCount(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').trim()\nconsole.log(palindromePartitionCount(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint palindromePartitionCount(string s) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string s;\n    cin >> s;\n    cout << palindromePartitionCount(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int palindromePartitionCount(String s) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        System.out.println(palindromePartitionCount(s));\n    }\n}",
        python:
          "def palindrome_partition_count(s):\n    # your code here\n    pass\n\ns = input()\nprint(palindrome_partition_count(s))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "aab", expected: "2", isSample: true, order: 1 },
          { input: "a", expected: "1", isSample: true, order: 2 },
          { input: "aabb", expected: "4", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Palindrome Partitioning Count",
      slug: "palindrome-partitioning-count",
      statement:
        "Given a string `s`, a partitioning of `s` is palindrome-valid if every substring in the partition is a palindrome. Return the number of ways to partition `s` such that every substring is a palindrome.\n\nInput format: a single line containing `s`.\nOutput format: a single integer, the number of valid partitions.",
      constraints: "1 <= s.length <= 16\ns consists of lowercase English letters only.",
      difficulty: "HARD",
      order: 6,
      topicId: backtracking.id,
      starterCode: {
        javascript:
          "function palindromePartitionCount(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').trim()\nconsole.log(palindromePartitionCount(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint palindromePartitionCount(string s) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string s;\n    cin >> s;\n    cout << palindromePartitionCount(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int palindromePartitionCount(String s) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        System.out.println(palindromePartitionCount(s));\n    }\n}",
        python:
          "def palindrome_partition_count(s):\n    # your code here\n    pass\n\ns = input()\nprint(palindrome_partition_count(s))",
      },
      testCases: {
        create: [
          { input: "aab", expected: "2", isSample: true, order: 1 },
          { input: "a", expected: "1", isSample: true, order: 2 },
          { input: "aabb", expected: "4", isSample: false, order: 3 },
        ],
      },
    },
  });

  const greedy = await prisma.topic.upsert({
    where: { slug: "greedy" },
    update: {
      name: "Greedy",
      slug: "greedy",
      description: "Make the locally optimal choice at each step and prove it leads to a global optimum.",
      order: 13,
    },
    create: {
      name: "Greedy",
      slug: "greedy",
      description: "Make the locally optimal choice at each step and prove it leads to a global optimum.",
      order: 13,
    },
  });

  await prisma.problem.upsert({
    where: { slug: "assign-cookies" },
    update: {
      title: "Assign Cookies",
      slug: "assign-cookies",
      statement:
        "You are given two integer arrays `g` and `s`. `g[i]` is the greed factor of the `i`-th child — the minimum cookie size that will content them. `s[j]` is the size of the `j`-th cookie. Each child can receive at most one cookie, and a cookie of size `s[j]` can only satisfy a child if `s[j] >= g[i]`. Return the maximum number of children you can content.\n\nInput format: first line is `g` as space-separated integers, second line is `s` as space-separated integers.\nOutput format: a single integer, the maximum number of content children.",
      constraints: "1 <= g.length, s.length <= 3 * 10^4\n1 <= g[i], s[j] <= 2^31 - 1",
      difficulty: "EASY",
      order: 1,
      topicId: greedy.id,
      starterCode: {
        javascript:
          "function assignCookies(g, s) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst g = lines[0].trim().split(' ').map(Number)\nconst s = lines[1].trim().split(' ').map(Number)\nconsole.log(assignCookies(g, s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint assignCookies(vector<int>& g, vector<int>& s) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss1(line1), ss2(line2);\n    vector<int> g, s;\n    int x;\n    while (ss1 >> x) g.push_back(x);\n    while (ss2 >> x) s.push_back(x);\n    cout << assignCookies(g, s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int assignCookies(int[] g, int[] s) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] gp = sc.nextLine().trim().split(\"\\\\s+\");\n        String[] sp = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] g = new int[gp.length];\n        for (int i = 0; i < gp.length; i++) g[i] = Integer.parseInt(gp[i]);\n        int[] s = new int[sp.length];\n        for (int i = 0; i < sp.length; i++) s[i] = Integer.parseInt(sp[i]);\n        System.out.println(assignCookies(g, s));\n    }\n}",
        python:
          "def assign_cookies(g, s):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ng = list(map(int, lines[0].split()))\ns = list(map(int, lines[1].split()))\nprint(assign_cookies(g, s))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "1 2 3\n1 1", expected: "1", isSample: true, order: 1 },
          { input: "1 2\n1 2 3", expected: "2", isSample: true, order: 2 },
          { input: "10 9 8 7\n5 6 7 8", expected: "2", isSample: false, order: 3 },
          { input: "5\n1 1 1", expected: "0", isSample: false, order: 4 },
        ],
      },
    },
    create: {
      title: "Assign Cookies",
      slug: "assign-cookies",
      statement:
        "You are given two integer arrays `g` and `s`. `g[i]` is the greed factor of the `i`-th child — the minimum cookie size that will content them. `s[j]` is the size of the `j`-th cookie. Each child can receive at most one cookie, and a cookie of size `s[j]` can only satisfy a child if `s[j] >= g[i]`. Return the maximum number of children you can content.\n\nInput format: first line is `g` as space-separated integers, second line is `s` as space-separated integers.\nOutput format: a single integer, the maximum number of content children.",
      constraints: "1 <= g.length, s.length <= 3 * 10^4\n1 <= g[i], s[j] <= 2^31 - 1",
      difficulty: "EASY",
      order: 1,
      topicId: greedy.id,
      starterCode: {
        javascript:
          "function assignCookies(g, s) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst g = lines[0].trim().split(' ').map(Number)\nconst s = lines[1].trim().split(' ').map(Number)\nconsole.log(assignCookies(g, s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint assignCookies(vector<int>& g, vector<int>& s) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss1(line1), ss2(line2);\n    vector<int> g, s;\n    int x;\n    while (ss1 >> x) g.push_back(x);\n    while (ss2 >> x) s.push_back(x);\n    cout << assignCookies(g, s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int assignCookies(int[] g, int[] s) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] gp = sc.nextLine().trim().split(\"\\\\s+\");\n        String[] sp = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] g = new int[gp.length];\n        for (int i = 0; i < gp.length; i++) g[i] = Integer.parseInt(gp[i]);\n        int[] s = new int[sp.length];\n        for (int i = 0; i < sp.length; i++) s[i] = Integer.parseInt(sp[i]);\n        System.out.println(assignCookies(g, s));\n    }\n}",
        python:
          "def assign_cookies(g, s):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ng = list(map(int, lines[0].split()))\ns = list(map(int, lines[1].split()))\nprint(assign_cookies(g, s))",
      },
      testCases: {
        create: [
          { input: "1 2 3\n1 1", expected: "1", isSample: true, order: 1 },
          { input: "1 2\n1 2 3", expected: "2", isSample: true, order: 2 },
          { input: "10 9 8 7\n5 6 7 8", expected: "2", isSample: false, order: 3 },
          { input: "5\n1 1 1", expected: "0", isSample: false, order: 4 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "lemonade-change" },
    update: {
      title: "Lemonade Change",
      slug: "lemonade-change",
      statement:
        "At a lemonade stand, each lemonade costs $5. Customers line up to buy from you, and each one pays with a $5, $10, or $20 bill, one bill per customer, in the given order. You must give each customer correct change, and you start with no bills at all. Return `true` if you can provide correct change to every customer, or `false` otherwise.\n\nInput format: a single line of space-separated integers, each either 5, 10, or 20 — the bills in the order customers arrive.\nOutput format: `true` or `false`.",
      constraints: "1 <= bills.length <= 10^5\nbills[i] is 5, 10, or 20.",
      difficulty: "EASY",
      order: 2,
      topicId: greedy.id,
      starterCode: {
        javascript:
          "function lemonadeChange(bills) {\n  // your code here\n}\n\nconst bills = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(lemonadeChange(bills))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool lemonadeChange(vector<int>& bills) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> bills;\n    int x;\n    while (ss >> x) bills.push_back(x);\n    cout << (lemonadeChange(bills) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static boolean lemonadeChange(int[] bills) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] bills = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) bills[i] = Integer.parseInt(parts[i]);\n        System.out.println(lemonadeChange(bills) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def lemonade_change(bills):\n    # your code here\n    pass\n\nbills = list(map(int, input().split()))\nprint(str(lemonade_change(bills)).lower())",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "5 5 5 10 20", expected: "true", isSample: true, order: 1 },
          { input: "5 5 10 10 20", expected: "false", isSample: true, order: 2 },
          { input: "5 5 10", expected: "true", isSample: false, order: 3 },
          { input: "10 10", expected: "false", isSample: false, order: 4 },
          { input: "5 5 5 5 20 5 5 5 5 20", expected: "true", isSample: false, order: 5 },
        ],
      },
    },
    create: {
      title: "Lemonade Change",
      slug: "lemonade-change",
      statement:
        "At a lemonade stand, each lemonade costs $5. Customers line up to buy from you, and each one pays with a $5, $10, or $20 bill, one bill per customer, in the given order. You must give each customer correct change, and you start with no bills at all. Return `true` if you can provide correct change to every customer, or `false` otherwise.\n\nInput format: a single line of space-separated integers, each either 5, 10, or 20 — the bills in the order customers arrive.\nOutput format: `true` or `false`.",
      constraints: "1 <= bills.length <= 10^5\nbills[i] is 5, 10, or 20.",
      difficulty: "EASY",
      order: 2,
      topicId: greedy.id,
      starterCode: {
        javascript:
          "function lemonadeChange(bills) {\n  // your code here\n}\n\nconst bills = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(lemonadeChange(bills))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool lemonadeChange(vector<int>& bills) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> bills;\n    int x;\n    while (ss >> x) bills.push_back(x);\n    cout << (lemonadeChange(bills) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static boolean lemonadeChange(int[] bills) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] bills = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) bills[i] = Integer.parseInt(parts[i]);\n        System.out.println(lemonadeChange(bills) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def lemonade_change(bills):\n    # your code here\n    pass\n\nbills = list(map(int, input().split()))\nprint(str(lemonade_change(bills)).lower())",
      },
      testCases: {
        create: [
          { input: "5 5 5 10 20", expected: "true", isSample: true, order: 1 },
          { input: "5 5 10 10 20", expected: "false", isSample: true, order: 2 },
          { input: "5 5 10", expected: "true", isSample: false, order: 3 },
          { input: "10 10", expected: "false", isSample: false, order: 4 },
          { input: "5 5 5 5 20 5 5 5 5 20", expected: "true", isSample: false, order: 5 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "jump-game" },
    update: {
      title: "Jump Game",
      slug: "jump-game",
      statement:
        "You are given an integer array `nums`. You are initially positioned at index `0`. Each element `nums[i]` is the maximum jump length from that position. Return `true` if you can reach the last index, or `false` otherwise.\n\nInput format: a single line of space-separated integers.\nOutput format: `true` or `false`.",
      constraints: "1 <= nums.length <= 10^4\n0 <= nums[i] <= 10^5",
      difficulty: "MEDIUM",
      order: 3,
      topicId: greedy.id,
      starterCode: {
        javascript:
          "function canJump(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(canJump(nums))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool canJump(vector<int>& nums) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << (canJump(nums) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static boolean canJump(int[] nums) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);\n        System.out.println(canJump(nums) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def can_jump(nums):\n    # your code here\n    pass\n\nnums = list(map(int, input().split()))\nprint(str(can_jump(nums)).lower())",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "2 3 1 1 4", expected: "true", isSample: true, order: 1 },
          { input: "3 2 1 0 4", expected: "false", isSample: true, order: 2 },
          { input: "0", expected: "true", isSample: false, order: 3 },
          { input: "0 1", expected: "false", isSample: false, order: 4 },
          { input: "2 0 0", expected: "true", isSample: false, order: 5 },
        ],
      },
    },
    create: {
      title: "Jump Game",
      slug: "jump-game",
      statement:
        "You are given an integer array `nums`. You are initially positioned at index `0`. Each element `nums[i]` is the maximum jump length from that position. Return `true` if you can reach the last index, or `false` otherwise.\n\nInput format: a single line of space-separated integers.\nOutput format: `true` or `false`.",
      constraints: "1 <= nums.length <= 10^4\n0 <= nums[i] <= 10^5",
      difficulty: "MEDIUM",
      order: 3,
      topicId: greedy.id,
      starterCode: {
        javascript:
          "function canJump(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(canJump(nums))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool canJump(vector<int>& nums) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    cout << (canJump(nums) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static boolean canJump(int[] nums) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);\n        System.out.println(canJump(nums) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def can_jump(nums):\n    # your code here\n    pass\n\nnums = list(map(int, input().split()))\nprint(str(can_jump(nums)).lower())",
      },
      testCases: {
        create: [
          { input: "2 3 1 1 4", expected: "true", isSample: true, order: 1 },
          { input: "3 2 1 0 4", expected: "false", isSample: true, order: 2 },
          { input: "0", expected: "true", isSample: false, order: 3 },
          { input: "0 1", expected: "false", isSample: false, order: 4 },
          { input: "2 0 0", expected: "true", isSample: false, order: 5 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "gas-station" },
    update: {
      title: "Gas Station",
      slug: "gas-station",
      statement:
        "There are `n` gas stations along a circular route, where the amount of gas at the `i`-th station is `gas[i]`. You have a car with an unlimited gas tank, and it costs `cost[i]` of gas to travel from station `i` to station `(i + 1) % n`. You begin the journey with an empty tank at one of the gas stations. Return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return `-1`. It is guaranteed that if a solution exists, it is unique.\n\nInput format: first line is `gas` as space-separated integers, second line is `cost` as space-separated integers.\nOutput format: a single integer, the starting index, or `-1`.",
      constraints: "1 <= n <= 10^5\ngas.length == cost.length == n\n0 <= gas[i], cost[i] <= 10^4",
      difficulty: "MEDIUM",
      order: 4,
      topicId: greedy.id,
      starterCode: {
        javascript:
          "function canCompleteCircuit(gas, cost) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst gas = lines[0].trim().split(' ').map(Number)\nconst cost = lines[1].trim().split(' ').map(Number)\nconsole.log(canCompleteCircuit(gas, cost))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n    // your code here\n    return -1;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss1(line1), ss2(line2);\n    vector<int> gas, cost;\n    int x;\n    while (ss1 >> x) gas.push_back(x);\n    while (ss2 >> x) cost.push_back(x);\n    cout << canCompleteCircuit(gas, cost) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int canCompleteCircuit(int[] gas, int[] cost) {\n        // your code here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] gp = sc.nextLine().trim().split(\"\\\\s+\");\n        String[] cp = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] gas = new int[gp.length];\n        for (int i = 0; i < gp.length; i++) gas[i] = Integer.parseInt(gp[i]);\n        int[] cost = new int[cp.length];\n        for (int i = 0; i < cp.length; i++) cost[i] = Integer.parseInt(cp[i]);\n        System.out.println(canCompleteCircuit(gas, cost));\n    }\n}",
        python:
          "def can_complete_circuit(gas, cost):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ngas = list(map(int, lines[0].split()))\ncost = list(map(int, lines[1].split()))\nprint(can_complete_circuit(gas, cost))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "1 2 3 4 5\n3 4 5 1 2", expected: "3", isSample: true, order: 1 },
          { input: "2 3 4\n3 4 3", expected: "-1", isSample: true, order: 2 },
          { input: "5 1 2 3 4\n4 4 1 5 1", expected: "4", isSample: false, order: 3 },
          { input: "3 3 4\n3 4 4", expected: "-1", isSample: false, order: 4 },
        ],
      },
    },
    create: {
      title: "Gas Station",
      slug: "gas-station",
      statement:
        "There are `n` gas stations along a circular route, where the amount of gas at the `i`-th station is `gas[i]`. You have a car with an unlimited gas tank, and it costs `cost[i]` of gas to travel from station `i` to station `(i + 1) % n`. You begin the journey with an empty tank at one of the gas stations. Return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return `-1`. It is guaranteed that if a solution exists, it is unique.\n\nInput format: first line is `gas` as space-separated integers, second line is `cost` as space-separated integers.\nOutput format: a single integer, the starting index, or `-1`.",
      constraints: "1 <= n <= 10^5\ngas.length == cost.length == n\n0 <= gas[i], cost[i] <= 10^4",
      difficulty: "MEDIUM",
      order: 4,
      topicId: greedy.id,
      starterCode: {
        javascript:
          "function canCompleteCircuit(gas, cost) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst gas = lines[0].trim().split(' ').map(Number)\nconst cost = lines[1].trim().split(' ').map(Number)\nconsole.log(canCompleteCircuit(gas, cost))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n    // your code here\n    return -1;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss1(line1), ss2(line2);\n    vector<int> gas, cost;\n    int x;\n    while (ss1 >> x) gas.push_back(x);\n    while (ss2 >> x) cost.push_back(x);\n    cout << canCompleteCircuit(gas, cost) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int canCompleteCircuit(int[] gas, int[] cost) {\n        // your code here\n        return -1;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] gp = sc.nextLine().trim().split(\"\\\\s+\");\n        String[] cp = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] gas = new int[gp.length];\n        for (int i = 0; i < gp.length; i++) gas[i] = Integer.parseInt(gp[i]);\n        int[] cost = new int[cp.length];\n        for (int i = 0; i < cp.length; i++) cost[i] = Integer.parseInt(cp[i]);\n        System.out.println(canCompleteCircuit(gas, cost));\n    }\n}",
        python:
          "def can_complete_circuit(gas, cost):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\ngas = list(map(int, lines[0].split()))\ncost = list(map(int, lines[1].split()))\nprint(can_complete_circuit(gas, cost))",
      },
      testCases: {
        create: [
          { input: "1 2 3 4 5\n3 4 5 1 2", expected: "3", isSample: true, order: 1 },
          { input: "2 3 4\n3 4 3", expected: "-1", isSample: true, order: 2 },
          { input: "5 1 2 3 4\n4 4 1 5 1", expected: "4", isSample: false, order: 3 },
          { input: "3 3 4\n3 4 4", expected: "-1", isSample: false, order: 4 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "non-overlapping-intervals" },
    update: {
      title: "Non-overlapping Intervals",
      slug: "non-overlapping-intervals",
      statement:
        "Given an array of intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.\n\nInput format: first line is `n`, the number of intervals; each of the next `n` lines contains two space-separated integers `start end`.\nOutput format: a single integer, the minimum number of intervals to remove.",
      constraints: "1 <= n <= 10^5\n-5 * 10^4 <= start_i < end_i <= 5 * 10^4",
      difficulty: "MEDIUM",
      order: 5,
      topicId: greedy.id,
      starterCode: {
        javascript:
          "function eraseOverlapIntervals(intervals) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst n = Number(lines[0])\nconst intervals = []\nfor (let i = 0; i < n; i++) intervals.push(lines[1 + i].trim().split(' ').map(Number))\nconsole.log(eraseOverlapIntervals(intervals))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint eraseOverlapIntervals(vector<pair<int,int>>& intervals) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<pair<int,int>> intervals(n);\n    for (int i = 0; i < n; i++) cin >> intervals[i].first >> intervals[i].second;\n    cout << eraseOverlapIntervals(intervals) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int eraseOverlapIntervals(int[][] intervals) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[][] intervals = new int[n][2];\n        for (int i = 0; i < n; i++) {\n            intervals[i][0] = sc.nextInt();\n            intervals[i][1] = sc.nextInt();\n        }\n        System.out.println(eraseOverlapIntervals(intervals));\n    }\n}",
        python:
          "def erase_overlap_intervals(intervals):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nn = int(lines[0])\nintervals = [list(map(int, lines[1 + i].split())) for i in range(n)]\nprint(erase_overlap_intervals(intervals))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "4\n1 2\n2 3\n3 4\n1 3", expected: "1", isSample: true, order: 1 },
          { input: "3\n1 2\n1 2\n1 2", expected: "2", isSample: true, order: 2 },
          { input: "2\n1 2\n2 3", expected: "0", isSample: false, order: 3 },
          { input: "1\n1 100", expected: "0", isSample: false, order: 4 },
        ],
      },
    },
    create: {
      title: "Non-overlapping Intervals",
      slug: "non-overlapping-intervals",
      statement:
        "Given an array of intervals `intervals` where `intervals[i] = [start_i, end_i]`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.\n\nInput format: first line is `n`, the number of intervals; each of the next `n` lines contains two space-separated integers `start end`.\nOutput format: a single integer, the minimum number of intervals to remove.",
      constraints: "1 <= n <= 10^5\n-5 * 10^4 <= start_i < end_i <= 5 * 10^4",
      difficulty: "MEDIUM",
      order: 5,
      topicId: greedy.id,
      starterCode: {
        javascript:
          "function eraseOverlapIntervals(intervals) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst n = Number(lines[0])\nconst intervals = []\nfor (let i = 0; i < n; i++) intervals.push(lines[1 + i].trim().split(' ').map(Number))\nconsole.log(eraseOverlapIntervals(intervals))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint eraseOverlapIntervals(vector<pair<int,int>>& intervals) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<pair<int,int>> intervals(n);\n    for (int i = 0; i < n; i++) cin >> intervals[i].first >> intervals[i].second;\n    cout << eraseOverlapIntervals(intervals) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int eraseOverlapIntervals(int[][] intervals) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[][] intervals = new int[n][2];\n        for (int i = 0; i < n; i++) {\n            intervals[i][0] = sc.nextInt();\n            intervals[i][1] = sc.nextInt();\n        }\n        System.out.println(eraseOverlapIntervals(intervals));\n    }\n}",
        python:
          "def erase_overlap_intervals(intervals):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nn = int(lines[0])\nintervals = [list(map(int, lines[1 + i].split())) for i in range(n)]\nprint(erase_overlap_intervals(intervals))",
      },
      testCases: {
        create: [
          { input: "4\n1 2\n2 3\n3 4\n1 3", expected: "1", isSample: true, order: 1 },
          { input: "3\n1 2\n1 2\n1 2", expected: "2", isSample: true, order: 2 },
          { input: "2\n1 2\n2 3", expected: "0", isSample: false, order: 3 },
          { input: "1\n1 100", expected: "0", isSample: false, order: 4 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "candy" },
    update: {
      title: "Candy",
      slug: "candy",
      statement:
        "There are `n` children standing in a line, each assigned a rating value given in the array `ratings`. You must give at least one candy to each child. Any child with a higher rating than an immediate neighbor must receive more candies than that neighbor. Return the minimum number of candies required to satisfy these requirements.\n\nInput format: a single line of space-separated integers, the ratings.\nOutput format: a single integer, the minimum total candies.",
      constraints: "1 <= n <= 2 * 10^4\n0 <= ratings[i] <= 2 * 10^4",
      difficulty: "HARD",
      order: 6,
      topicId: greedy.id,
      starterCode: {
        javascript:
          "function candy(ratings) {\n  // your code here\n}\n\nconst ratings = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(candy(ratings))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint candy(vector<int>& ratings) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> ratings;\n    int x;\n    while (ss >> x) ratings.push_back(x);\n    cout << candy(ratings) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int candy(int[] ratings) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] ratings = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) ratings[i] = Integer.parseInt(parts[i]);\n        System.out.println(candy(ratings));\n    }\n}",
        python:
          "def candy(ratings):\n    # your code here\n    pass\n\nratings = list(map(int, input().split()))\nprint(candy(ratings))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "1 0 2", expected: "5", isSample: true, order: 1 },
          { input: "1 2 2", expected: "4", isSample: true, order: 2 },
          { input: "1 3 2 2 1", expected: "7", isSample: false, order: 3 },
          { input: "1", expected: "1", isSample: false, order: 4 },
        ],
      },
    },
    create: {
      title: "Candy",
      slug: "candy",
      statement:
        "There are `n` children standing in a line, each assigned a rating value given in the array `ratings`. You must give at least one candy to each child. Any child with a higher rating than an immediate neighbor must receive more candies than that neighbor. Return the minimum number of candies required to satisfy these requirements.\n\nInput format: a single line of space-separated integers, the ratings.\nOutput format: a single integer, the minimum total candies.",
      constraints: "1 <= n <= 2 * 10^4\n0 <= ratings[i] <= 2 * 10^4",
      difficulty: "HARD",
      order: 6,
      topicId: greedy.id,
      starterCode: {
        javascript:
          "function candy(ratings) {\n  // your code here\n}\n\nconst ratings = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(candy(ratings))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint candy(vector<int>& ratings) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> ratings;\n    int x;\n    while (ss >> x) ratings.push_back(x);\n    cout << candy(ratings) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int candy(int[] ratings) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] ratings = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) ratings[i] = Integer.parseInt(parts[i]);\n        System.out.println(candy(ratings));\n    }\n}",
        python:
          "def candy(ratings):\n    # your code here\n    pass\n\nratings = list(map(int, input().split()))\nprint(candy(ratings))",
      },
      testCases: {
        create: [
          { input: "1 0 2", expected: "5", isSample: true, order: 1 },
          { input: "1 2 2", expected: "4", isSample: true, order: 2 },
          { input: "1 3 2 2 1", expected: "7", isSample: false, order: 3 },
          { input: "1", expected: "1", isSample: false, order: 4 },
        ],
      },
    },
  });

  const math = await prisma.topic.upsert({
    where: { slug: "math" },
    update: {
      name: "Math",
      slug: "math",
      description: "Number theory, arithmetic simulation, and formula-driven problems.",
      order: 14,
    },
    create: {
      name: "Math",
      slug: "math",
      description: "Number theory, arithmetic simulation, and formula-driven problems.",
      order: 14,
    },
  });

  await prisma.problem.upsert({
    where: { slug: "palindrome-number" },
    update: {
      title: "Palindrome Number",
      slug: "palindrome-number",
      statement:
        "Given an integer `x`, return `true` if `x` is a palindrome (reads the same forwards and backwards), or `false` otherwise. Negative numbers are never palindromes.\n\nInput format: a single line containing the integer `x`.\nOutput format: `true` or `false`.",
      constraints: "-2^31 <= x <= 2^31 - 1",
      difficulty: "EASY",
      order: 1,
      topicId: math.id,
      starterCode: {
        javascript:
          "function isPalindrome(x) {\n  // your code here\n}\n\nconst x = Number(require('fs').readFileSync(0, 'utf8').trim())\nconsole.log(isPalindrome(x))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool isPalindrome(long long x) {\n    // your code here\n    return false;\n}\n\nint main() {\n    long long x;\n    cin >> x;\n    cout << (isPalindrome(x) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static boolean isPalindrome(long x) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long x = Long.parseLong(sc.nextLine().trim());\n        System.out.println(isPalindrome(x) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def is_palindrome(x):\n    # your code here\n    pass\n\nx = int(input())\nprint(str(is_palindrome(x)).lower())",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "121", expected: "true", isSample: true, order: 1 },
          { input: "-121", expected: "false", isSample: true, order: 2 },
          { input: "10", expected: "false", isSample: false, order: 3 },
          { input: "0", expected: "true", isSample: false, order: 4 },
          { input: "12321", expected: "true", isSample: false, order: 5 },
        ],
      },
    },
    create: {
      title: "Palindrome Number",
      slug: "palindrome-number",
      statement:
        "Given an integer `x`, return `true` if `x` is a palindrome (reads the same forwards and backwards), or `false` otherwise. Negative numbers are never palindromes.\n\nInput format: a single line containing the integer `x`.\nOutput format: `true` or `false`.",
      constraints: "-2^31 <= x <= 2^31 - 1",
      difficulty: "EASY",
      order: 1,
      topicId: math.id,
      starterCode: {
        javascript:
          "function isPalindrome(x) {\n  // your code here\n}\n\nconst x = Number(require('fs').readFileSync(0, 'utf8').trim())\nconsole.log(isPalindrome(x))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool isPalindrome(long long x) {\n    // your code here\n    return false;\n}\n\nint main() {\n    long long x;\n    cin >> x;\n    cout << (isPalindrome(x) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static boolean isPalindrome(long x) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long x = Long.parseLong(sc.nextLine().trim());\n        System.out.println(isPalindrome(x) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def is_palindrome(x):\n    # your code here\n    pass\n\nx = int(input())\nprint(str(is_palindrome(x)).lower())",
      },
      testCases: {
        create: [
          { input: "121", expected: "true", isSample: true, order: 1 },
          { input: "-121", expected: "false", isSample: true, order: 2 },
          { input: "10", expected: "false", isSample: false, order: 3 },
          { input: "0", expected: "true", isSample: false, order: 4 },
          { input: "12321", expected: "true", isSample: false, order: 5 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "roman-to-integer" },
    update: {
      title: "Roman to Integer",
      slug: "roman-to-integer",
      statement:
        "Roman numerals are represented by seven symbols: `I` (1), `V` (5), `X` (10), `L` (50), `C` (100), `D` (500), and `M` (1000). Usually symbols are placed largest to smallest, but six subtractive combinations exist (`IV`=4, `IX`=9, `XL`=40, `XC`=90, `CD`=400, `CM`=900). Given a roman numeral string, convert it to an integer.\n\nInput format: a single line containing the roman numeral.\nOutput format: a single integer.",
      constraints: "1 <= s.length <= 15\ns contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M') and is a valid roman numeral in the range [1, 3999].",
      difficulty: "EASY",
      order: 2,
      topicId: math.id,
      starterCode: {
        javascript:
          "function romanToInt(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').trim()\nconsole.log(romanToInt(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint romanToInt(string s) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string s;\n    cin >> s;\n    cout << romanToInt(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int romanToInt(String s) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        System.out.println(romanToInt(s));\n    }\n}",
        python:
          "def roman_to_int(s):\n    # your code here\n    pass\n\ns = input().strip()\nprint(roman_to_int(s))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "III", expected: "3", isSample: true, order: 1 },
          { input: "LVIII", expected: "58", isSample: true, order: 2 },
          { input: "MCMXCIV", expected: "1994", isSample: false, order: 3 },
          { input: "IX", expected: "9", isSample: false, order: 4 },
          { input: "IV", expected: "4", isSample: false, order: 5 },
        ],
      },
    },
    create: {
      title: "Roman to Integer",
      slug: "roman-to-integer",
      statement:
        "Roman numerals are represented by seven symbols: `I` (1), `V` (5), `X` (10), `L` (50), `C` (100), `D` (500), and `M` (1000). Usually symbols are placed largest to smallest, but six subtractive combinations exist (`IV`=4, `IX`=9, `XL`=40, `XC`=90, `CD`=400, `CM`=900). Given a roman numeral string, convert it to an integer.\n\nInput format: a single line containing the roman numeral.\nOutput format: a single integer.",
      constraints: "1 <= s.length <= 15\ns contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M') and is a valid roman numeral in the range [1, 3999].",
      difficulty: "EASY",
      order: 2,
      topicId: math.id,
      starterCode: {
        javascript:
          "function romanToInt(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').trim()\nconsole.log(romanToInt(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint romanToInt(string s) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string s;\n    cin >> s;\n    cout << romanToInt(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int romanToInt(String s) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        System.out.println(romanToInt(s));\n    }\n}",
        python:
          "def roman_to_int(s):\n    # your code here\n    pass\n\ns = input().strip()\nprint(roman_to_int(s))",
      },
      testCases: {
        create: [
          { input: "III", expected: "3", isSample: true, order: 1 },
          { input: "LVIII", expected: "58", isSample: true, order: 2 },
          { input: "MCMXCIV", expected: "1994", isSample: false, order: 3 },
          { input: "IX", expected: "9", isSample: false, order: 4 },
          { input: "IV", expected: "4", isSample: false, order: 5 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "powx-n" },
    update: {
      title: "Pow(x, n)",
      slug: "powx-n",
      statement:
        "Implement `pow(x, n)`, which calculates `x` raised to the power `n` (i.e., `x^n`). `n` may be negative, in which case the result is `1 / x^(-n)`.\n\nInput format: first line is the float `x`, second line is the integer `n`.\nOutput format: the result formatted to exactly 5 decimal places.",
      constraints: "-100.0 < x < 100.0\n-2^31 <= n <= 2^31 - 1\nn is an integer and either x is not zero or n > 0.",
      difficulty: "MEDIUM",
      order: 3,
      topicId: math.id,
      starterCode: {
        javascript:
          "function myPow(x, n) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst x = Number(lines[0])\nconst n = Number(lines[1])\nconsole.log(myPow(x, n).toFixed(5))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\ndouble myPow(double x, int n) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    double x;\n    int n;\n    cin >> x >> n;\n    cout << fixed << setprecision(5) << myPow(x, n) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static double myPow(double x, int n) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        double x = Double.parseDouble(sc.nextLine().trim());\n        int n = Integer.parseInt(sc.nextLine().trim());\n        System.out.printf(\"%.5f%n\", myPow(x, n));\n    }\n}",
        python:
          "def my_pow(x, n):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nx = float(lines[0])\nn = int(lines[1])\nprint('%.5f' % my_pow(x, n))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "2.00000\n10", expected: "1024.00000", isSample: true, order: 1 },
          { input: "2.10000\n3", expected: "9.26100", isSample: true, order: 2 },
          { input: "2.00000\n-2", expected: "0.25000", isSample: false, order: 3 },
          { input: "1.00000\n0", expected: "1.00000", isSample: false, order: 4 },
          { input: "0.50000\n4", expected: "0.06250", isSample: false, order: 5 },
        ],
      },
    },
    create: {
      title: "Pow(x, n)",
      slug: "powx-n",
      statement:
        "Implement `pow(x, n)`, which calculates `x` raised to the power `n` (i.e., `x^n`). `n` may be negative, in which case the result is `1 / x^(-n)`.\n\nInput format: first line is the float `x`, second line is the integer `n`.\nOutput format: the result formatted to exactly 5 decimal places.",
      constraints: "-100.0 < x < 100.0\n-2^31 <= n <= 2^31 - 1\nn is an integer and either x is not zero or n > 0.",
      difficulty: "MEDIUM",
      order: 3,
      topicId: math.id,
      starterCode: {
        javascript:
          "function myPow(x, n) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst x = Number(lines[0])\nconst n = Number(lines[1])\nconsole.log(myPow(x, n).toFixed(5))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\ndouble myPow(double x, int n) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    double x;\n    int n;\n    cin >> x >> n;\n    cout << fixed << setprecision(5) << myPow(x, n) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static double myPow(double x, int n) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        double x = Double.parseDouble(sc.nextLine().trim());\n        int n = Integer.parseInt(sc.nextLine().trim());\n        System.out.printf(\"%.5f%n\", myPow(x, n));\n    }\n}",
        python:
          "def my_pow(x, n):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nx = float(lines[0])\nn = int(lines[1])\nprint('%.5f' % my_pow(x, n))",
      },
      testCases: {
        create: [
          { input: "2.00000\n10", expected: "1024.00000", isSample: true, order: 1 },
          { input: "2.10000\n3", expected: "9.26100", isSample: true, order: 2 },
          { input: "2.00000\n-2", expected: "0.25000", isSample: false, order: 3 },
          { input: "1.00000\n0", expected: "1.00000", isSample: false, order: 4 },
          { input: "0.50000\n4", expected: "0.06250", isSample: false, order: 5 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "integer-to-roman" },
    update: {
      title: "Integer to Roman",
      slug: "integer-to-roman",
      statement:
        "Given an integer `num`, convert it to a roman numeral. Roman numerals are represented by seven symbols: `I` (1), `V` (5), `X` (10), `L` (50), `C` (100), `D` (500), and `M` (1000), using the standard subtractive notation (`IV`=4, `IX`=9, `XL`=40, `XC`=90, `CD`=400, `CM`=900).\n\nInput format: a single line containing the integer `num`.\nOutput format: a single line containing the roman numeral.",
      constraints: "1 <= num <= 3999",
      difficulty: "MEDIUM",
      order: 4,
      topicId: math.id,
      starterCode: {
        javascript:
          "function intToRoman(num) {\n  // your code here\n}\n\nconst num = Number(require('fs').readFileSync(0, 'utf8').trim())\nconsole.log(intToRoman(num))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstring intToRoman(int num) {\n    // your code here\n    return \"\";\n}\n\nint main() {\n    int num;\n    cin >> num;\n    cout << intToRoman(num) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static String intToRoman(int num) {\n        // your code here\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int num = sc.nextInt();\n        System.out.println(intToRoman(num));\n    }\n}",
        python:
          "def int_to_roman(num):\n    # your code here\n    pass\n\nnum = int(input())\nprint(int_to_roman(num))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "3", expected: "III", isSample: true, order: 1 },
          { input: "58", expected: "LVIII", isSample: true, order: 2 },
          { input: "1994", expected: "MCMXCIV", isSample: false, order: 3 },
          { input: "9", expected: "IX", isSample: false, order: 4 },
          { input: "3999", expected: "MMMCMXCIX", isSample: false, order: 5 },
        ],
      },
    },
    create: {
      title: "Integer to Roman",
      slug: "integer-to-roman",
      statement:
        "Given an integer `num`, convert it to a roman numeral. Roman numerals are represented by seven symbols: `I` (1), `V` (5), `X` (10), `L` (50), `C` (100), `D` (500), and `M` (1000), using the standard subtractive notation (`IV`=4, `IX`=9, `XL`=40, `XC`=90, `CD`=400, `CM`=900).\n\nInput format: a single line containing the integer `num`.\nOutput format: a single line containing the roman numeral.",
      constraints: "1 <= num <= 3999",
      difficulty: "MEDIUM",
      order: 4,
      topicId: math.id,
      starterCode: {
        javascript:
          "function intToRoman(num) {\n  // your code here\n}\n\nconst num = Number(require('fs').readFileSync(0, 'utf8').trim())\nconsole.log(intToRoman(num))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstring intToRoman(int num) {\n    // your code here\n    return \"\";\n}\n\nint main() {\n    int num;\n    cin >> num;\n    cout << intToRoman(num) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static String intToRoman(int num) {\n        // your code here\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int num = sc.nextInt();\n        System.out.println(intToRoman(num));\n    }\n}",
        python:
          "def int_to_roman(num):\n    # your code here\n    pass\n\nnum = int(input())\nprint(int_to_roman(num))",
      },
      testCases: {
        create: [
          { input: "3", expected: "III", isSample: true, order: 1 },
          { input: "58", expected: "LVIII", isSample: true, order: 2 },
          { input: "1994", expected: "MCMXCIV", isSample: false, order: 3 },
          { input: "9", expected: "IX", isSample: false, order: 4 },
          { input: "3999", expected: "MMMCMXCIX", isSample: false, order: 5 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "basic-calculator" },
    update: {
      title: "Basic Calculator",
      slug: "basic-calculator",
      statement:
        "Given a string `s` representing a valid arithmetic expression, evaluate and return its value. The expression contains non-negative integers, `+`, `-`, `(`, `)`, and spaces. Division and multiplication are not part of this expression's grammar.\n\nInput format: a single line containing the expression (may include spaces).\nOutput format: a single integer, the evaluated result.",
      constraints: "1 <= s.length <= 3 * 10^5\ns consists of digits, '+', '-', '(', ')', and ' '.\ns is a valid expression.",
      difficulty: "HARD",
      order: 5,
      topicId: math.id,
      starterCode: {
        javascript:
          "function calculate(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').replace(/\\n$/, '')\nconsole.log(calculate(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint calculate(string s) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << calculate(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int calculate(String s) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        System.out.println(calculate(s));\n    }\n}",
        python:
          "def calculate(s):\n    # your code here\n    pass\n\ns = input()\nprint(calculate(s))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "1 + 1", expected: "2", isSample: true, order: 1 },
          { input: " 2-1 + 2 ", expected: "3", isSample: true, order: 2 },
          { input: "(1+(4+5+2)-3)+(6+8)", expected: "23", isSample: false, order: 3 },
          { input: "2-(5-6)", expected: "3", isSample: false, order: 4 },
        ],
      },
    },
    create: {
      title: "Basic Calculator",
      slug: "basic-calculator",
      statement:
        "Given a string `s` representing a valid arithmetic expression, evaluate and return its value. The expression contains non-negative integers, `+`, `-`, `(`, `)`, and spaces. Division and multiplication are not part of this expression's grammar.\n\nInput format: a single line containing the expression (may include spaces).\nOutput format: a single integer, the evaluated result.",
      constraints: "1 <= s.length <= 3 * 10^5\ns consists of digits, '+', '-', '(', ')', and ' '.\ns is a valid expression.",
      difficulty: "HARD",
      order: 5,
      topicId: math.id,
      starterCode: {
        javascript:
          "function calculate(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').replace(/\\n$/, '')\nconsole.log(calculate(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint calculate(string s) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << calculate(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int calculate(String s) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine();\n        System.out.println(calculate(s));\n    }\n}",
        python:
          "def calculate(s):\n    # your code here\n    pass\n\ns = input()\nprint(calculate(s))",
      },
      testCases: {
        create: [
          { input: "1 + 1", expected: "2", isSample: true, order: 1 },
          { input: " 2-1 + 2 ", expected: "3", isSample: true, order: 2 },
          { input: "(1+(4+5+2)-3)+(6+8)", expected: "23", isSample: false, order: 3 },
          { input: "2-(5-6)", expected: "3", isSample: false, order: 4 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "rotate-array" },
    update: {
      title: "Rotate Array",
      slug: "rotate-array",
      statement:
        "Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.\n\nInput format: first line is `nums` as space-separated integers, second line is the integer `k`.\nOutput format: the rotated array as space-separated integers.",
      constraints: "1 <= nums.length <= 10^5\n-2^31 <= nums[i] <= 2^31 - 1\n0 <= k <= 10^5",
      difficulty: "EASY",
      order: 7,
      topicId: topic.id,
      starterCode: {
        javascript:
          "function rotate(nums, k) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst nums = lines[0].trim().split(' ').map(Number)\nconst k = Number(lines[1])\nconsole.log(rotate(nums, k).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> rotate(vector<int>& nums, int k) {\n    // your code here\n    return nums;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    int k = stoi(line2);\n    vector<int> res = rotate(nums, k);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int[] rotate(int[] nums, int k) {\n        // your code here\n        return nums;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);\n        int k = Integer.parseInt(sc.nextLine().trim());\n        int[] res = rotate(nums, k);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < res.length; i++) {\n            if (i > 0) sb.append(\" \");\n            sb.append(res[i]);\n        }\n        System.out.println(sb.toString());\n    }\n}",
        python:
          "def rotate(nums, k):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnums = list(map(int, lines[0].split()))\nk = int(lines[1])\nprint(*rotate(nums, k))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "1 2 3 4 5 6 7\n3", expected: "5 6 7 1 2 3 4", isSample: true, order: 1 },
          { input: "-1 -100 3 99\n2", expected: "3 99 -1 -100", isSample: true, order: 2 },
          { input: "1 2\n3", expected: "2 1", isSample: false, order: 3 },
          { input: "1\n0", expected: "1", isSample: false, order: 4 },
        ],
      },
    },
    create: {
      title: "Rotate Array",
      slug: "rotate-array",
      statement:
        "Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.\n\nInput format: first line is `nums` as space-separated integers, second line is the integer `k`.\nOutput format: the rotated array as space-separated integers.",
      constraints: "1 <= nums.length <= 10^5\n-2^31 <= nums[i] <= 2^31 - 1\n0 <= k <= 10^5",
      difficulty: "EASY",
      order: 7,
      topicId: topic.id,
      starterCode: {
        javascript:
          "function rotate(nums, k) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst nums = lines[0].trim().split(' ').map(Number)\nconst k = Number(lines[1])\nconsole.log(rotate(nums, k).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> rotate(vector<int>& nums, int k) {\n    // your code here\n    return nums;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    int k = stoi(line2);\n    vector<int> res = rotate(nums, k);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int[] rotate(int[] nums, int k) {\n        // your code here\n        return nums;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);\n        int k = Integer.parseInt(sc.nextLine().trim());\n        int[] res = rotate(nums, k);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < res.length; i++) {\n            if (i > 0) sb.append(\" \");\n            sb.append(res[i]);\n        }\n        System.out.println(sb.toString());\n    }\n}",
        python:
          "def rotate(nums, k):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nnums = list(map(int, lines[0].split()))\nk = int(lines[1])\nprint(*rotate(nums, k))",
      },
      testCases: {
        create: [
          { input: "1 2 3 4 5 6 7\n3", expected: "5 6 7 1 2 3 4", isSample: true, order: 1 },
          { input: "-1 -100 3 99\n2", expected: "3 99 -1 -100", isSample: true, order: 2 },
          { input: "1 2\n3", expected: "2 1", isSample: false, order: 3 },
          { input: "1\n0", expected: "1", isSample: false, order: 4 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "merge-intervals" },
    update: {
      title: "Merge Intervals",
      slug: "merge-intervals",
      statement:
        "Given an array of intervals where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input, sorted by start.\n\nInput format: first line is `n`, the number of intervals; each of the next `n` lines contains two space-separated integers `start end`.\nOutput format: each merged interval on its own line as `start end`, sorted by start.",
      constraints: "1 <= n <= 10^4\n0 <= start_i <= end_i <= 10^4",
      difficulty: "MEDIUM",
      order: 8,
      topicId: topic.id,
      starterCode: {
        javascript:
          "function merge(intervals) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst n = Number(lines[0])\nconst intervals = []\nfor (let i = 0; i < n; i++) intervals.push(lines[1 + i].trim().split(' ').map(Number))\nfor (const [a, b] of merge(intervals)) console.log(a + ' ' + b)",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<pair<int,int>> merge(vector<pair<int,int>>& intervals) {\n    // your code here\n    return intervals;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<pair<int,int>> intervals(n);\n    for (int i = 0; i < n; i++) cin >> intervals[i].first >> intervals[i].second;\n    for (auto& iv : merge(intervals)) cout << iv.first << \" \" << iv.second << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int[][] merge(int[][] intervals) {\n        // your code here\n        return intervals;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[][] intervals = new int[n][2];\n        for (int i = 0; i < n; i++) {\n            intervals[i][0] = sc.nextInt();\n            intervals[i][1] = sc.nextInt();\n        }\n        for (int[] iv : merge(intervals)) System.out.println(iv[0] + \" \" + iv[1]);\n    }\n}",
        python:
          "def merge(intervals):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nn = int(lines[0])\nintervals = [list(map(int, lines[1 + i].split())) for i in range(n)]\nfor a, b in merge(intervals):\n    print(a, b)",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "4\n1 3\n2 6\n8 10\n15 18", expected: "1 6\n8 10\n15 18", isSample: true, order: 1 },
          { input: "2\n1 4\n4 5", expected: "1 5", isSample: true, order: 2 },
          { input: "1\n1 4", expected: "1 4", isSample: false, order: 3 },
          { input: "3\n1 4\n0 4\n3 5", expected: "0 5", isSample: false, order: 4 },
        ],
      },
    },
    create: {
      title: "Merge Intervals",
      slug: "merge-intervals",
      statement:
        "Given an array of intervals where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input, sorted by start.\n\nInput format: first line is `n`, the number of intervals; each of the next `n` lines contains two space-separated integers `start end`.\nOutput format: each merged interval on its own line as `start end`, sorted by start.",
      constraints: "1 <= n <= 10^4\n0 <= start_i <= end_i <= 10^4",
      difficulty: "MEDIUM",
      order: 8,
      topicId: topic.id,
      starterCode: {
        javascript:
          "function merge(intervals) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst n = Number(lines[0])\nconst intervals = []\nfor (let i = 0; i < n; i++) intervals.push(lines[1 + i].trim().split(' ').map(Number))\nfor (const [a, b] of merge(intervals)) console.log(a + ' ' + b)",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<pair<int,int>> merge(vector<pair<int,int>>& intervals) {\n    // your code here\n    return intervals;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<pair<int,int>> intervals(n);\n    for (int i = 0; i < n; i++) cin >> intervals[i].first >> intervals[i].second;\n    for (auto& iv : merge(intervals)) cout << iv.first << \" \" << iv.second << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int[][] merge(int[][] intervals) {\n        // your code here\n        return intervals;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        int[][] intervals = new int[n][2];\n        for (int i = 0; i < n; i++) {\n            intervals[i][0] = sc.nextInt();\n            intervals[i][1] = sc.nextInt();\n        }\n        for (int[] iv : merge(intervals)) System.out.println(iv[0] + \" \" + iv[1]);\n    }\n}",
        python:
          "def merge(intervals):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nn = int(lines[0])\nintervals = [list(map(int, lines[1 + i].split())) for i in range(n)]\nfor a, b in merge(intervals):\n    print(a, b)",
      },
      testCases: {
        create: [
          { input: "4\n1 3\n2 6\n8 10\n15 18", expected: "1 6\n8 10\n15 18", isSample: true, order: 1 },
          { input: "2\n1 4\n4 5", expected: "1 5", isSample: true, order: 2 },
          { input: "1\n1 4", expected: "1 4", isSample: false, order: 3 },
          { input: "3\n1 4\n0 4\n3 5", expected: "0 5", isSample: false, order: 4 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "sort-colors" },
    update: {
      title: "Sort Colors",
      slug: "sort-colors",
      statement:
        "Given an array `nums` with `n` objects colored red, white, or blue, represented by the integers `0`, `1`, and `2` respectively, sort them in place so that objects of the same color are adjacent, in the order red, white, blue (ascending order). Return the sorted array.\n\nInput format: a single line of space-separated integers, each `0`, `1`, or `2`.\nOutput format: the sorted array as space-separated integers.",
      constraints: "1 <= nums.length <= 300\nnums[i] is 0, 1, or 2.",
      difficulty: "MEDIUM",
      order: 5,
      topicId: twoPointers.id,
      starterCode: {
        javascript:
          "function sortColors(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(sortColors(nums).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> sortColors(vector<int>& nums) {\n    // your code here\n    return nums;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    vector<int> res = sortColors(nums);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int[] sortColors(int[] nums) {\n        // your code here\n        return nums;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);\n        int[] res = sortColors(nums);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < res.length; i++) {\n            if (i > 0) sb.append(\" \");\n            sb.append(res[i]);\n        }\n        System.out.println(sb.toString());\n    }\n}",
        python:
          "def sort_colors(nums):\n    # your code here\n    pass\n\nnums = list(map(int, input().split()))\nprint(*sort_colors(nums))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "2 0 2 1 1 0", expected: "0 0 1 1 2 2", isSample: true, order: 1 },
          { input: "2 0 1", expected: "0 1 2", isSample: true, order: 2 },
          { input: "0", expected: "0", isSample: false, order: 3 },
          { input: "1 2 0", expected: "0 1 2", isSample: false, order: 4 },
        ],
      },
    },
    create: {
      title: "Sort Colors",
      slug: "sort-colors",
      statement:
        "Given an array `nums` with `n` objects colored red, white, or blue, represented by the integers `0`, `1`, and `2` respectively, sort them in place so that objects of the same color are adjacent, in the order red, white, blue (ascending order). Return the sorted array.\n\nInput format: a single line of space-separated integers, each `0`, `1`, or `2`.\nOutput format: the sorted array as space-separated integers.",
      constraints: "1 <= nums.length <= 300\nnums[i] is 0, 1, or 2.",
      difficulty: "MEDIUM",
      order: 5,
      topicId: twoPointers.id,
      starterCode: {
        javascript:
          "function sortColors(nums) {\n  // your code here\n}\n\nconst nums = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(sortColors(nums).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> sortColors(vector<int>& nums) {\n    // your code here\n    return nums;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> nums;\n    int x;\n    while (ss >> x) nums.push_back(x);\n    vector<int> res = sortColors(nums);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int[] sortColors(int[] nums) {\n        // your code here\n        return nums;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i]);\n        int[] res = sortColors(nums);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < res.length; i++) {\n            if (i > 0) sb.append(\" \");\n            sb.append(res[i]);\n        }\n        System.out.println(sb.toString());\n    }\n}",
        python:
          "def sort_colors(nums):\n    # your code here\n    pass\n\nnums = list(map(int, input().split()))\nprint(*sort_colors(nums))",
      },
      testCases: {
        create: [
          { input: "2 0 2 1 1 0", expected: "0 0 1 1 2 2", isSample: true, order: 1 },
          { input: "2 0 1", expected: "0 1 2", isSample: true, order: 2 },
          { input: "0", expected: "0", isSample: false, order: 3 },
          { input: "1 2 0", expected: "0 1 2", isSample: false, order: 4 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "trapping-rain-water" },
    update: {
      title: "Trapping Rain Water",
      slug: "trapping-rain-water",
      statement:
        "Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.\n\nInput format: a single line of space-separated integers, the heights.\nOutput format: a single integer, the total trapped water.",
      constraints: "1 <= n <= 2 * 10^4\n0 <= height[i] <= 10^5",
      difficulty: "HARD",
      order: 6,
      topicId: twoPointers.id,
      starterCode: {
        javascript:
          "function trap(height) {\n  // your code here\n}\n\nconst height = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(trap(height))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint trap(vector<int>& height) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> height;\n    int x;\n    while (ss >> x) height.push_back(x);\n    cout << trap(height) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int trap(int[] height) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] height = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) height[i] = Integer.parseInt(parts[i]);\n        System.out.println(trap(height));\n    }\n}",
        python:
          "def trap(height):\n    # your code here\n    pass\n\nheight = list(map(int, input().split()))\nprint(trap(height))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "0 1 0 2 1 0 1 3 2 1 2 1", expected: "6", isSample: true, order: 1 },
          { input: "4 2 0 3 2 5", expected: "9", isSample: true, order: 2 },
          { input: "1 1", expected: "0", isSample: false, order: 3 },
          { input: "5 4 1 2", expected: "1", isSample: false, order: 4 },
        ],
      },
    },
    create: {
      title: "Trapping Rain Water",
      slug: "trapping-rain-water",
      statement:
        "Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.\n\nInput format: a single line of space-separated integers, the heights.\nOutput format: a single integer, the total trapped water.",
      constraints: "1 <= n <= 2 * 10^4\n0 <= height[i] <= 10^5",
      difficulty: "HARD",
      order: 6,
      topicId: twoPointers.id,
      starterCode: {
        javascript:
          "function trap(height) {\n  // your code here\n}\n\nconst height = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(trap(height))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint trap(vector<int>& height) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> height;\n    int x;\n    while (ss >> x) height.push_back(x);\n    cout << trap(height) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int trap(int[] height) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] height = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) height[i] = Integer.parseInt(parts[i]);\n        System.out.println(trap(height));\n    }\n}",
        python:
          "def trap(height):\n    # your code here\n    pass\n\nheight = list(map(int, input().split()))\nprint(trap(height))",
      },
      testCases: {
        create: [
          { input: "0 1 0 2 1 0 1 3 2 1 2 1", expected: "6", isSample: true, order: 1 },
          { input: "4 2 0 3 2 5", expected: "9", isSample: true, order: 2 },
          { input: "1 1", expected: "0", isSample: false, order: 3 },
          { input: "5 4 1 2", expected: "1", isSample: false, order: 4 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "permutation-in-string" },
    update: {
      title: "Permutation in String",
      slug: "permutation-in-string",
      statement:
        "Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1` as a contiguous substring, or `false` otherwise.\n\nInput format: first line is `s1`, second line is `s2`.\nOutput format: `true` or `false`.",
      constraints: "1 <= s1.length, s2.length <= 10^4\ns1 and s2 consist of lowercase English letters.",
      difficulty: "MEDIUM",
      order: 5,
      topicId: slidingWindow.id,
      starterCode: {
        javascript:
          "function checkInclusion(s1, s2) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst s1 = lines[0].trim()\nconst s2 = lines[1].trim()\nconsole.log(checkInclusion(s1, s2))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool checkInclusion(string s1, string s2) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string s1, s2;\n    cin >> s1 >> s2;\n    cout << (checkInclusion(s1, s2) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static boolean checkInclusion(String s1, String s2) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s1 = sc.next();\n        String s2 = sc.next();\n        System.out.println(checkInclusion(s1, s2) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def check_inclusion(s1, s2):\n    # your code here\n    pass\n\ns1 = input().strip()\ns2 = input().strip()\nprint(str(check_inclusion(s1, s2)).lower())",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "ab\neidbaooo", expected: "true", isSample: true, order: 1 },
          { input: "ab\neidboaoo", expected: "false", isSample: true, order: 2 },
          { input: "adc\ndcda", expected: "true", isSample: false, order: 3 },
          { input: "abc\nccccbbbbaaaa", expected: "false", isSample: false, order: 4 },
        ],
      },
    },
    create: {
      title: "Permutation in String",
      slug: "permutation-in-string",
      statement:
        "Given two strings `s1` and `s2`, return `true` if `s2` contains a permutation of `s1` as a contiguous substring, or `false` otherwise.\n\nInput format: first line is `s1`, second line is `s2`.\nOutput format: `true` or `false`.",
      constraints: "1 <= s1.length, s2.length <= 10^4\ns1 and s2 consist of lowercase English letters.",
      difficulty: "MEDIUM",
      order: 5,
      topicId: slidingWindow.id,
      starterCode: {
        javascript:
          "function checkInclusion(s1, s2) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst s1 = lines[0].trim()\nconst s2 = lines[1].trim()\nconsole.log(checkInclusion(s1, s2))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nbool checkInclusion(string s1, string s2) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string s1, s2;\n    cin >> s1 >> s2;\n    cout << (checkInclusion(s1, s2) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static boolean checkInclusion(String s1, String s2) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s1 = sc.next();\n        String s2 = sc.next();\n        System.out.println(checkInclusion(s1, s2) ? \"true\" : \"false\");\n    }\n}",
        python:
          "def check_inclusion(s1, s2):\n    # your code here\n    pass\n\ns1 = input().strip()\ns2 = input().strip()\nprint(str(check_inclusion(s1, s2)).lower())",
      },
      testCases: {
        create: [
          { input: "ab\neidbaooo", expected: "true", isSample: true, order: 1 },
          { input: "ab\neidboaoo", expected: "false", isSample: true, order: 2 },
          { input: "adc\ndcda", expected: "true", isSample: false, order: 3 },
          { input: "abc\nccccbbbbaaaa", expected: "false", isSample: false, order: 4 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "find-all-anagrams-in-a-string" },
    update: {
      title: "Find All Anagrams in a String",
      slug: "find-all-anagrams-in-a-string",
      statement:
        "Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`. You may return the answer in any order, but for grading purposes it must be sorted in ascending order.\n\nInput format: first line is `s`, second line is `p`.\nOutput format: the start indices as space-separated integers, sorted ascending (an empty line if none).",
      constraints: "1 <= s.length, p.length <= 3 * 10^4\ns and p consist of lowercase English letters.",
      difficulty: "MEDIUM",
      order: 6,
      topicId: slidingWindow.id,
      starterCode: {
        javascript:
          "function findAnagrams(s, p) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst s = lines[0].trim()\nconst p = lines[1].trim()\nconsole.log(findAnagrams(s, p).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> findAnagrams(string s, string p) {\n    // your code here\n    return {};\n}\n\nint main() {\n    string s, p;\n    cin >> s >> p;\n    vector<int> res = findAnagrams(s, p);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static List<Integer> findAnagrams(String s, String p) {\n        // your code here\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        String p = sc.next();\n        List<Integer> res = findAnagrams(s, p);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < res.size(); i++) {\n            if (i > 0) sb.append(\" \");\n            sb.append(res.get(i));\n        }\n        System.out.println(sb.toString());\n    }\n}",
        python:
          "def find_anagrams(s, p):\n    # your code here\n    pass\n\ns = input().strip()\np = input().strip()\nprint(*find_anagrams(s, p))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "cbaebabacd\nabc", expected: "0 6", isSample: true, order: 1 },
          { input: "abab\nab", expected: "0 1 2", isSample: true, order: 2 },
          { input: "a\nab", expected: "", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Find All Anagrams in a String",
      slug: "find-all-anagrams-in-a-string",
      statement:
        "Given two strings `s` and `p`, return an array of all the start indices of `p`'s anagrams in `s`. You may return the answer in any order, but for grading purposes it must be sorted in ascending order.\n\nInput format: first line is `s`, second line is `p`.\nOutput format: the start indices as space-separated integers, sorted ascending (an empty line if none).",
      constraints: "1 <= s.length, p.length <= 3 * 10^4\ns and p consist of lowercase English letters.",
      difficulty: "MEDIUM",
      order: 6,
      topicId: slidingWindow.id,
      starterCode: {
        javascript:
          "function findAnagrams(s, p) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst s = lines[0].trim()\nconst p = lines[1].trim()\nconsole.log(findAnagrams(s, p).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> findAnagrams(string s, string p) {\n    // your code here\n    return {};\n}\n\nint main() {\n    string s, p;\n    cin >> s >> p;\n    vector<int> res = findAnagrams(s, p);\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static List<Integer> findAnagrams(String s, String p) {\n        // your code here\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        String p = sc.next();\n        List<Integer> res = findAnagrams(s, p);\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < res.size(); i++) {\n            if (i > 0) sb.append(\" \");\n            sb.append(res.get(i));\n        }\n        System.out.println(sb.toString());\n    }\n}",
        python:
          "def find_anagrams(s, p):\n    # your code here\n    pass\n\ns = input().strip()\np = input().strip()\nprint(*find_anagrams(s, p))",
      },
      testCases: {
        create: [
          { input: "cbaebabacd\nabc", expected: "0 6", isSample: true, order: 1 },
          { input: "abab\nab", expected: "0 1 2", isSample: true, order: 2 },
          { input: "a\nab", expected: "", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "minimum-window-substring" },
    update: {
      title: "Minimum Window Substring",
      slug: "minimum-window-substring",
      statement:
        "Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string.\n\nInput format: first line is `s`, second line is `t`.\nOutput format: the minimum window substring, or an empty line if none exists.",
      constraints: "1 <= s.length, t.length <= 10^5\ns and t consist of uppercase and lowercase English letters.",
      difficulty: "HARD",
      order: 7,
      topicId: slidingWindow.id,
      starterCode: {
        javascript:
          "function minWindow(s, t) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst s = lines[0].trim()\nconst t = lines[1].trim()\nconsole.log(minWindow(s, t))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstring minWindow(string s, string t) {\n    // your code here\n    return \"\";\n}\n\nint main() {\n    string s, t;\n    cin >> s >> t;\n    cout << minWindow(s, t) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static String minWindow(String s, String t) {\n        // your code here\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        String t = sc.next();\n        System.out.println(minWindow(s, t));\n    }\n}",
        python:
          "def min_window(s, t):\n    # your code here\n    pass\n\ns = input().strip()\nt = input().strip()\nprint(min_window(s, t))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "ADOBECODEBANC\nABC", expected: "BANC", isSample: true, order: 1 },
          { input: "a\na", expected: "a", isSample: true, order: 2 },
          { input: "a\naa", expected: "", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Minimum Window Substring",
      slug: "minimum-window-substring",
      statement:
        "Given two strings `s` and `t`, return the minimum window substring of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string.\n\nInput format: first line is `s`, second line is `t`.\nOutput format: the minimum window substring, or an empty line if none exists.",
      constraints: "1 <= s.length, t.length <= 10^5\ns and t consist of uppercase and lowercase English letters.",
      difficulty: "HARD",
      order: 7,
      topicId: slidingWindow.id,
      starterCode: {
        javascript:
          "function minWindow(s, t) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst s = lines[0].trim()\nconst t = lines[1].trim()\nconsole.log(minWindow(s, t))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstring minWindow(string s, string t) {\n    // your code here\n    return \"\";\n}\n\nint main() {\n    string s, t;\n    cin >> s >> t;\n    cout << minWindow(s, t) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static String minWindow(String s, String t) {\n        // your code here\n        return \"\";\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.next();\n        String t = sc.next();\n        System.out.println(minWindow(s, t));\n    }\n}",
        python:
          "def min_window(s, t):\n    # your code here\n    pass\n\ns = input().strip()\nt = input().strip()\nprint(min_window(s, t))",
      },
      testCases: {
        create: [
          { input: "ADOBECODEBANC\nABC", expected: "BANC", isSample: true, order: 1 },
          { input: "a\na", expected: "a", isSample: true, order: 2 },
          { input: "a\naa", expected: "", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "sqrtx" },
    update: {
      title: "Sqrt(x)",
      slug: "sqrtx",
      statement:
        "Given a non-negative integer `x`, return the square root of `x` rounded down to the nearest integer. You must not use any built-in exponent function or operator (e.g. `pow(x, 0.5)` or `x ** 0.5`).\n\nInput format: a single line containing the integer `x`.\nOutput format: a single integer, the floor of the square root.",
      constraints: "0 <= x <= 2^31 - 1",
      difficulty: "EASY",
      order: 5,
      topicId: binarySearch.id,
      starterCode: {
        javascript:
          "function mySqrt(x) {\n  // your code here\n}\n\nconst x = Number(require('fs').readFileSync(0, 'utf8').trim())\nconsole.log(mySqrt(x))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint mySqrt(int x) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int x;\n    cin >> x;\n    cout << mySqrt(x) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int mySqrt(int x) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int x = sc.nextInt();\n        System.out.println(mySqrt(x));\n    }\n}",
        python:
          "def my_sqrt(x):\n    # your code here\n    pass\n\nx = int(input())\nprint(my_sqrt(x))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "4", expected: "2", isSample: true, order: 1 },
          { input: "8", expected: "2", isSample: true, order: 2 },
          { input: "0", expected: "0", isSample: false, order: 3 },
          { input: "1", expected: "1", isSample: false, order: 4 },
          { input: "2147395599", expected: "46339", isSample: false, order: 5 },
        ],
      },
    },
    create: {
      title: "Sqrt(x)",
      slug: "sqrtx",
      statement:
        "Given a non-negative integer `x`, return the square root of `x` rounded down to the nearest integer. You must not use any built-in exponent function or operator (e.g. `pow(x, 0.5)` or `x ** 0.5`).\n\nInput format: a single line containing the integer `x`.\nOutput format: a single integer, the floor of the square root.",
      constraints: "0 <= x <= 2^31 - 1",
      difficulty: "EASY",
      order: 5,
      topicId: binarySearch.id,
      starterCode: {
        javascript:
          "function mySqrt(x) {\n  // your code here\n}\n\nconst x = Number(require('fs').readFileSync(0, 'utf8').trim())\nconsole.log(mySqrt(x))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint mySqrt(int x) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int x;\n    cin >> x;\n    cout << mySqrt(x) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int mySqrt(int x) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int x = sc.nextInt();\n        System.out.println(mySqrt(x));\n    }\n}",
        python:
          "def my_sqrt(x):\n    # your code here\n    pass\n\nx = int(input())\nprint(my_sqrt(x))",
      },
      testCases: {
        create: [
          { input: "4", expected: "2", isSample: true, order: 1 },
          { input: "8", expected: "2", isSample: true, order: 2 },
          { input: "0", expected: "0", isSample: false, order: 3 },
          { input: "1", expected: "1", isSample: false, order: 4 },
          { input: "2147395599", expected: "46339", isSample: false, order: 5 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "first-bad-version" },
    update: {
      title: "First Bad Version",
      slug: "first-bad-version",
      statement:
        "You are a product manager and, given `n` versions `[1, 2, ..., n]`, want to find the first bad version, since it and all versions after it are bad. You are given an API `isBadVersion(version)` which returns whether `version` is bad. Find and return the first bad version, minimizing the number of calls to the API.\n\nThe judge provides `isBadVersion` pre-implemented for you, backed by a hidden threshold `bad`.\n\nInput format: first line is `n`, second line is `bad` (used internally by the provided `isBadVersion`; your solution should call `isBadVersion`, not read this value directly).\nOutput format: a single integer, the first bad version.",
      constraints: "1 <= bad <= n <= 2^31 - 1",
      difficulty: "EASY",
      order: 6,
      topicId: binarySearch.id,
      starterCode: {
        javascript:
          "const lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst n = Number(lines[0])\nconst bad = Number(lines[1])\n\nfunction isBadVersion(version) {\n  return version >= bad\n}\n\nfunction firstBadVersion(n) {\n  // your code here\n}\n\nconsole.log(firstBadVersion(n))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nlong long bad;\n\nbool isBadVersion(long long version) {\n    return version >= bad;\n}\n\nlong long firstBadVersion(long long n) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    long long n;\n    cin >> n >> bad;\n    cout << firstBadVersion(n) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static long bad;\n\n    static boolean isBadVersion(long version) {\n        return version >= bad;\n    }\n\n    static long firstBadVersion(long n) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = Long.parseLong(sc.nextLine().trim());\n        bad = Long.parseLong(sc.nextLine().trim());\n        System.out.println(firstBadVersion(n));\n    }\n}",
        python:
          "import sys\nlines = sys.stdin.read().split('\\n')\nn = int(lines[0])\nbad = int(lines[1])\n\ndef is_bad_version(version):\n    return version >= bad\n\ndef first_bad_version(n):\n    # your code here\n    pass\n\nprint(first_bad_version(n))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "5\n4", expected: "4", isSample: true, order: 1 },
          { input: "1\n1", expected: "1", isSample: true, order: 2 },
          { input: "2126753390\n1702766719", expected: "1702766719", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "First Bad Version",
      slug: "first-bad-version",
      statement:
        "You are a product manager and, given `n` versions `[1, 2, ..., n]`, want to find the first bad version, since it and all versions after it are bad. You are given an API `isBadVersion(version)` which returns whether `version` is bad. Find and return the first bad version, minimizing the number of calls to the API.\n\nThe judge provides `isBadVersion` pre-implemented for you, backed by a hidden threshold `bad`.\n\nInput format: first line is `n`, second line is `bad` (used internally by the provided `isBadVersion`; your solution should call `isBadVersion`, not read this value directly).\nOutput format: a single integer, the first bad version.",
      constraints: "1 <= bad <= n <= 2^31 - 1",
      difficulty: "EASY",
      order: 6,
      topicId: binarySearch.id,
      starterCode: {
        javascript:
          "const lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst n = Number(lines[0])\nconst bad = Number(lines[1])\n\nfunction isBadVersion(version) {\n  return version >= bad\n}\n\nfunction firstBadVersion(n) {\n  // your code here\n}\n\nconsole.log(firstBadVersion(n))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nlong long bad;\n\nbool isBadVersion(long long version) {\n    return version >= bad;\n}\n\nlong long firstBadVersion(long long n) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    long long n;\n    cin >> n >> bad;\n    cout << firstBadVersion(n) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static long bad;\n\n    static boolean isBadVersion(long version) {\n        return version >= bad;\n    }\n\n    static long firstBadVersion(long n) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        long n = Long.parseLong(sc.nextLine().trim());\n        bad = Long.parseLong(sc.nextLine().trim());\n        System.out.println(firstBadVersion(n));\n    }\n}",
        python:
          "import sys\nlines = sys.stdin.read().split('\\n')\nn = int(lines[0])\nbad = int(lines[1])\n\ndef is_bad_version(version):\n    return version >= bad\n\ndef first_bad_version(n):\n    # your code here\n    pass\n\nprint(first_bad_version(n))",
      },
      testCases: {
        create: [
          { input: "5\n4", expected: "4", isSample: true, order: 1 },
          { input: "1\n1", expected: "1", isSample: true, order: 2 },
          { input: "2126753390\n1702766719", expected: "1702766719", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "koko-eating-bananas" },
    update: {
      title: "Koko Eating Bananas",
      slug: "koko-eating-bananas",
      statement:
        "Koko loves to eat bananas. There are `n` piles of bananas, the `i`-th pile has `piles[i]` bananas. Koko can decide her eating speed of `k` bananas per hour. Each hour, she chooses a pile and eats `k` bananas from it; if the pile has fewer than `k` bananas, she eats all of them and won't eat more during that hour. Koko wants to finish eating all the piles within `h` hours. Return the minimum integer `k` such that she can eat all the bananas within `h` hours.\n\nInput format: first line is `piles` as space-separated integers, second line is the integer `h`.\nOutput format: a single integer, the minimum eating speed.",
      constraints: "1 <= piles.length <= 10^4\npiles.length <= h <= 10^9\n1 <= piles[i] <= 10^9",
      difficulty: "MEDIUM",
      order: 7,
      topicId: binarySearch.id,
      starterCode: {
        javascript:
          "function minEatingSpeed(piles, h) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst piles = lines[0].trim().split(' ').map(Number)\nconst h = Number(lines[1])\nconsole.log(minEatingSpeed(piles, h))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint minEatingSpeed(vector<int>& piles, int h) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> piles;\n    int x;\n    while (ss >> x) piles.push_back(x);\n    int h = stoi(line2);\n    cout << minEatingSpeed(piles, h) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int minEatingSpeed(int[] piles, int h) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] piles = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) piles[i] = Integer.parseInt(parts[i]);\n        int h = Integer.parseInt(sc.nextLine().trim());\n        System.out.println(minEatingSpeed(piles, h));\n    }\n}",
        python:
          "def min_eating_speed(piles, h):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\npiles = list(map(int, lines[0].split()))\nh = int(lines[1])\nprint(min_eating_speed(piles, h))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "3 6 7 11\n8", expected: "4", isSample: true, order: 1 },
          { input: "30 11 23 4 20\n5", expected: "30", isSample: true, order: 2 },
          { input: "30 11 23 4 20\n6", expected: "23", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Koko Eating Bananas",
      slug: "koko-eating-bananas",
      statement:
        "Koko loves to eat bananas. There are `n` piles of bananas, the `i`-th pile has `piles[i]` bananas. Koko can decide her eating speed of `k` bananas per hour. Each hour, she chooses a pile and eats `k` bananas from it; if the pile has fewer than `k` bananas, she eats all of them and won't eat more during that hour. Koko wants to finish eating all the piles within `h` hours. Return the minimum integer `k` such that she can eat all the bananas within `h` hours.\n\nInput format: first line is `piles` as space-separated integers, second line is the integer `h`.\nOutput format: a single integer, the minimum eating speed.",
      constraints: "1 <= piles.length <= 10^4\npiles.length <= h <= 10^9\n1 <= piles[i] <= 10^9",
      difficulty: "MEDIUM",
      order: 7,
      topicId: binarySearch.id,
      starterCode: {
        javascript:
          "function minEatingSpeed(piles, h) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst piles = lines[0].trim().split(' ').map(Number)\nconst h = Number(lines[1])\nconsole.log(minEatingSpeed(piles, h))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint minEatingSpeed(vector<int>& piles, int h) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss(line1);\n    vector<int> piles;\n    int x;\n    while (ss >> x) piles.push_back(x);\n    int h = stoi(line2);\n    cout << minEatingSpeed(piles, h) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int minEatingSpeed(int[] piles, int h) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] piles = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) piles[i] = Integer.parseInt(parts[i]);\n        int h = Integer.parseInt(sc.nextLine().trim());\n        System.out.println(minEatingSpeed(piles, h));\n    }\n}",
        python:
          "def min_eating_speed(piles, h):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\npiles = list(map(int, lines[0].split()))\nh = int(lines[1])\nprint(min_eating_speed(piles, h))",
      },
      testCases: {
        create: [
          { input: "3 6 7 11\n8", expected: "4", isSample: true, order: 1 },
          { input: "30 11 23 4 20\n5", expected: "30", isSample: true, order: 2 },
          { input: "30 11 23 4 20\n6", expected: "23", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "palindrome-linked-list" },
    update: {
      title: "Palindrome Linked List",
      slug: "palindrome-linked-list",
      statement:
        "Given the head of a singly linked list (represented as an array of values from head to tail), return `true` if it is a palindrome, or `false` otherwise.\n\nInput format: a single line with the list values as space-separated integers.\nOutput format: `true` or `false`.",
      constraints: "1 <= list length <= 10^5\n0 <= node value <= 9",
      difficulty: "EASY",
      order: 5,
      topicId: linkedLists.id,
      starterCode: {
        javascript:
          "class ListNode {\n  constructor(val, next = null) {\n    this.val = val\n    this.next = next\n  }\n}\nfunction arrayToList(arr) {\n  const dummy = new ListNode(0)\n  let cur = dummy\n  for (const v of arr) {\n    cur.next = new ListNode(v)\n    cur = cur.next\n  }\n  return dummy.next\n}\n\nfunction isPalindrome(head) {\n  // your code here\n}\n\nconst arr = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconst head = arrayToList(arr)\nconsole.log(isPalindrome(head))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* arrayToList(vector<int>& arr) {\n    ListNode dummy(0);\n    ListNode* cur = &dummy;\n    for (int v : arr) {\n        cur->next = new ListNode(v);\n        cur = cur->next;\n    }\n    return dummy.next;\n}\n\nbool isPalindrome(ListNode* head) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> arr;\n    int x;\n    while (ss >> x) arr.push_back(x);\n    ListNode* head = arrayToList(arr);\n    cout << (isPalindrome(head) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x){ val = x; } }\n    static ListNode arrayToList(int[] arr) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        for (int v : arr) { cur.next = new ListNode(v); cur = cur.next; }\n        return dummy.next;\n    }\n    static boolean isPalindrome(ListNode head) {\n        // your code here\n        return false;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] arr = parseInts(br.readLine());\n        ListNode head = arrayToList(arr);\n        System.out.println(isPalindrome(head) ? \"true\" : \"false\");\n    }\n}",
        python:
          "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef array_to_list(arr):\n    dummy = ListNode()\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef is_palindrome(head):\n    # your code here\n    pass\n\narr = list(map(int, input().split()))\nhead = array_to_list(arr)\nprint(str(is_palindrome(head)).lower())",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "1 2 2 1", expected: "true", isSample: true, order: 1 },
          { input: "1 2", expected: "false", isSample: true, order: 2 },
          { input: "1", expected: "true", isSample: false, order: 3 },
          { input: "1 2 3 2 1", expected: "true", isSample: false, order: 4 },
        ],
      },
    },
    create: {
      title: "Palindrome Linked List",
      slug: "palindrome-linked-list",
      statement:
        "Given the head of a singly linked list (represented as an array of values from head to tail), return `true` if it is a palindrome, or `false` otherwise.\n\nInput format: a single line with the list values as space-separated integers.\nOutput format: `true` or `false`.",
      constraints: "1 <= list length <= 10^5\n0 <= node value <= 9",
      difficulty: "EASY",
      order: 5,
      topicId: linkedLists.id,
      starterCode: {
        javascript:
          "class ListNode {\n  constructor(val, next = null) {\n    this.val = val\n    this.next = next\n  }\n}\nfunction arrayToList(arr) {\n  const dummy = new ListNode(0)\n  let cur = dummy\n  for (const v of arr) {\n    cur.next = new ListNode(v)\n    cur = cur.next\n  }\n  return dummy.next\n}\n\nfunction isPalindrome(head) {\n  // your code here\n}\n\nconst arr = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconst head = arrayToList(arr)\nconsole.log(isPalindrome(head))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* arrayToList(vector<int>& arr) {\n    ListNode dummy(0);\n    ListNode* cur = &dummy;\n    for (int v : arr) {\n        cur->next = new ListNode(v);\n        cur = cur->next;\n    }\n    return dummy.next;\n}\n\nbool isPalindrome(ListNode* head) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> arr;\n    int x;\n    while (ss >> x) arr.push_back(x);\n    ListNode* head = arrayToList(arr);\n    cout << (isPalindrome(head) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x){ val = x; } }\n    static ListNode arrayToList(int[] arr) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        for (int v : arr) { cur.next = new ListNode(v); cur = cur.next; }\n        return dummy.next;\n    }\n    static boolean isPalindrome(ListNode head) {\n        // your code here\n        return false;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] arr = parseInts(br.readLine());\n        ListNode head = arrayToList(arr);\n        System.out.println(isPalindrome(head) ? \"true\" : \"false\");\n    }\n}",
        python:
          "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef array_to_list(arr):\n    dummy = ListNode()\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef is_palindrome(head):\n    # your code here\n    pass\n\narr = list(map(int, input().split()))\nhead = array_to_list(arr)\nprint(str(is_palindrome(head)).lower())",
      },
      testCases: {
        create: [
          { input: "1 2 2 1", expected: "true", isSample: true, order: 1 },
          { input: "1 2", expected: "false", isSample: true, order: 2 },
          { input: "1", expected: "true", isSample: false, order: 3 },
          { input: "1 2 3 2 1", expected: "true", isSample: false, order: 4 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "add-two-numbers" },
    update: {
      title: "Add Two Numbers",
      slug: "add-two-numbers",
      statement:
        "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each node contains a single digit. Add the two numbers and return the sum as a linked list, again with digits in reverse order.\n\nInput format: first line is `l1`'s digits (reverse order) as space-separated integers, second line is `l2`'s digits (reverse order) as space-separated integers.\nOutput format: the sum's digits in reverse order, space-separated.",
      constraints: "1 <= list length <= 100\n0 <= node value <= 9\nNeither list contains leading zeros, except the number 0 itself.",
      difficulty: "MEDIUM",
      order: 6,
      topicId: linkedLists.id,
      starterCode: {
        javascript:
          "class ListNode {\n  constructor(val, next = null) {\n    this.val = val\n    this.next = next\n  }\n}\nfunction arrayToList(arr) {\n  const dummy = new ListNode(0)\n  let cur = dummy\n  for (const v of arr) {\n    cur.next = new ListNode(v)\n    cur = cur.next\n  }\n  return dummy.next\n}\nfunction listToArray(head) {\n  const res = []\n  while (head) {\n    res.push(head.val)\n    head = head.next\n  }\n  return res\n}\n\nfunction addTwoNumbers(l1, l2) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst l1 = arrayToList(lines[0].split(' ').map(Number))\nconst l2 = arrayToList(lines[1].split(' ').map(Number))\nconsole.log(listToArray(addTwoNumbers(l1, l2)).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* arrayToList(vector<int>& arr) {\n    ListNode dummy(0);\n    ListNode* cur = &dummy;\n    for (int v : arr) {\n        cur->next = new ListNode(v);\n        cur = cur->next;\n    }\n    return dummy.next;\n}\n\nvector<int> listToArray(ListNode* head) {\n    vector<int> res;\n    while (head) {\n        res.push_back(head->val);\n        head = head->next;\n    }\n    return res;\n}\n\nListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n    // your code here\n    return nullptr;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss1(line1), ss2(line2);\n    vector<int> a1, a2;\n    int x;\n    while (ss1 >> x) a1.push_back(x);\n    while (ss2 >> x) a2.push_back(x);\n    ListNode* l1 = arrayToList(a1);\n    ListNode* l2 = arrayToList(a2);\n    vector<int> res = listToArray(addTwoNumbers(l1, l2));\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x){ val = x; } }\n    static ListNode arrayToList(int[] arr) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        for (int v : arr) { cur.next = new ListNode(v); cur = cur.next; }\n        return dummy.next;\n    }\n    static int[] listToArray(ListNode head) {\n        ArrayList<Integer> res = new ArrayList<>();\n        while (head != null) { res.add(head.val); head = head.next; }\n        int[] a = new int[res.size()];\n        for (int i = 0; i < a.length; i++) a[i] = res.get(i);\n        return a;\n    }\n    static ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        // your code here\n        return null;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] a1 = parseInts(br.readLine());\n        int[] a2 = parseInts(br.readLine());\n        int[] res = listToArray(addTwoNumbers(arrayToList(a1), arrayToList(a2)));\n        System.out.println(join(res));\n    }\n}",
        python:
          "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef array_to_list(arr):\n    dummy = ListNode()\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef list_to_array(head):\n    res = []\n    while head:\n        res.append(head.val)\n        head = head.next\n    return res\n\ndef add_two_numbers(l1, l2):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nl1 = array_to_list(list(map(int, lines[0].split())))\nl2 = array_to_list(list(map(int, lines[1].split())))\nprint(*list_to_array(add_two_numbers(l1, l2)))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "2 4 3\n5 6 4", expected: "7 0 8", isSample: true, order: 1 },
          { input: "0\n0", expected: "0", isSample: true, order: 2 },
          { input: "9 9 9 9 9 9 9\n9 9 9 9", expected: "8 9 9 9 0 0 0 1", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Add Two Numbers",
      slug: "add-two-numbers",
      statement:
        "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each node contains a single digit. Add the two numbers and return the sum as a linked list, again with digits in reverse order.\n\nInput format: first line is `l1`'s digits (reverse order) as space-separated integers, second line is `l2`'s digits (reverse order) as space-separated integers.\nOutput format: the sum's digits in reverse order, space-separated.",
      constraints: "1 <= list length <= 100\n0 <= node value <= 9\nNeither list contains leading zeros, except the number 0 itself.",
      difficulty: "MEDIUM",
      order: 6,
      topicId: linkedLists.id,
      starterCode: {
        javascript:
          "class ListNode {\n  constructor(val, next = null) {\n    this.val = val\n    this.next = next\n  }\n}\nfunction arrayToList(arr) {\n  const dummy = new ListNode(0)\n  let cur = dummy\n  for (const v of arr) {\n    cur.next = new ListNode(v)\n    cur = cur.next\n  }\n  return dummy.next\n}\nfunction listToArray(head) {\n  const res = []\n  while (head) {\n    res.push(head.val)\n    head = head.next\n  }\n  return res\n}\n\nfunction addTwoNumbers(l1, l2) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst l1 = arrayToList(lines[0].split(' ').map(Number))\nconst l2 = arrayToList(lines[1].split(' ').map(Number))\nconsole.log(listToArray(addTwoNumbers(l1, l2)).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* arrayToList(vector<int>& arr) {\n    ListNode dummy(0);\n    ListNode* cur = &dummy;\n    for (int v : arr) {\n        cur->next = new ListNode(v);\n        cur = cur->next;\n    }\n    return dummy.next;\n}\n\nvector<int> listToArray(ListNode* head) {\n    vector<int> res;\n    while (head) {\n        res.push_back(head->val);\n        head = head->next;\n    }\n    return res;\n}\n\nListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n    // your code here\n    return nullptr;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss1(line1), ss2(line2);\n    vector<int> a1, a2;\n    int x;\n    while (ss1 >> x) a1.push_back(x);\n    while (ss2 >> x) a2.push_back(x);\n    ListNode* l1 = arrayToList(a1);\n    ListNode* l2 = arrayToList(a2);\n    vector<int> res = listToArray(addTwoNumbers(l1, l2));\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x){ val = x; } }\n    static ListNode arrayToList(int[] arr) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        for (int v : arr) { cur.next = new ListNode(v); cur = cur.next; }\n        return dummy.next;\n    }\n    static int[] listToArray(ListNode head) {\n        ArrayList<Integer> res = new ArrayList<>();\n        while (head != null) { res.add(head.val); head = head.next; }\n        int[] a = new int[res.size()];\n        for (int i = 0; i < a.length; i++) a[i] = res.get(i);\n        return a;\n    }\n    static ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        // your code here\n        return null;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int[] a1 = parseInts(br.readLine());\n        int[] a2 = parseInts(br.readLine());\n        int[] res = listToArray(addTwoNumbers(arrayToList(a1), arrayToList(a2)));\n        System.out.println(join(res));\n    }\n}",
        python:
          "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef array_to_list(arr):\n    dummy = ListNode()\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef list_to_array(head):\n    res = []\n    while head:\n        res.append(head.val)\n        head = head.next\n    return res\n\ndef add_two_numbers(l1, l2):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nl1 = array_to_list(list(map(int, lines[0].split())))\nl2 = array_to_list(list(map(int, lines[1].split())))\nprint(*list_to_array(add_two_numbers(l1, l2)))",
      },
      testCases: {
        create: [
          { input: "2 4 3\n5 6 4", expected: "7 0 8", isSample: true, order: 1 },
          { input: "0\n0", expected: "0", isSample: true, order: 2 },
          { input: "9 9 9 9 9 9 9\n9 9 9 9", expected: "8 9 9 9 0 0 0 1", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "merge-k-sorted-lists" },
    update: {
      title: "Merge k Sorted Lists",
      slug: "merge-k-sorted-lists",
      statement:
        "You are given an array of `k` linked lists, each sorted in ascending order (each represented as an array of values). Merge all the linked lists into one sorted list and return it as an array.\n\nInput format: first line is `k`; each of the next `k` lines is a list's values as space-separated integers (a blank line represents an empty list).\nOutput format: the merged sorted list, space-separated (an empty line if the result is empty).",
      constraints: "0 <= k <= 10^4\n0 <= list length <= 500\n-10^4 <= node value <= 10^4",
      difficulty: "HARD",
      order: 7,
      topicId: linkedLists.id,
      starterCode: {
        javascript:
          "class ListNode {\n  constructor(val, next = null) {\n    this.val = val\n    this.next = next\n  }\n}\nfunction arrayToList(arr) {\n  const dummy = new ListNode(0)\n  let cur = dummy\n  for (const v of arr) {\n    cur.next = new ListNode(v)\n    cur = cur.next\n  }\n  return dummy.next\n}\nfunction listToArray(head) {\n  const res = []\n  while (head) {\n    res.push(head.val)\n    head = head.next\n  }\n  return res\n}\n\nfunction mergeKLists(lists) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst k = Number(lines[0])\nconst lists = []\nfor (let i = 0; i < k; i++) {\n  const line = (lines[1 + i] || '').trim()\n  lists.push(arrayToList(line ? line.split(' ').map(Number) : []))\n}\nconsole.log(listToArray(mergeKLists(lists)).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* arrayToList(vector<int>& arr) {\n    ListNode dummy(0);\n    ListNode* cur = &dummy;\n    for (int v : arr) {\n        cur->next = new ListNode(v);\n        cur = cur->next;\n    }\n    return dummy.next;\n}\n\nvector<int> listToArray(ListNode* head) {\n    vector<int> res;\n    while (head) {\n        res.push_back(head->val);\n        head = head->next;\n    }\n    return res;\n}\n\nListNode* mergeKLists(vector<ListNode*>& lists) {\n    // your code here\n    return nullptr;\n}\n\nint main() {\n    int k;\n    cin >> k;\n    cin.ignore();\n    vector<ListNode*> lists;\n    for (int i = 0; i < k; i++) {\n        string line;\n        getline(cin, line);\n        stringstream ss(line);\n        vector<int> arr;\n        int x;\n        while (ss >> x) arr.push_back(x);\n        lists.push_back(arrayToList(arr));\n    }\n    vector<int> res = listToArray(mergeKLists(lists));\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x){ val = x; } }\n    static ListNode arrayToList(int[] arr) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        for (int v : arr) { cur.next = new ListNode(v); cur = cur.next; }\n        return dummy.next;\n    }\n    static int[] listToArray(ListNode head) {\n        ArrayList<Integer> res = new ArrayList<>();\n        while (head != null) { res.add(head.val); head = head.next; }\n        int[] a = new int[res.size()];\n        for (int i = 0; i < a.length; i++) a[i] = res.get(i);\n        return a;\n    }\n    static ListNode mergeKLists(ListNode[] lists) {\n        // your code here\n        return null;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int k = Integer.parseInt(br.readLine().trim());\n        ListNode[] lists = new ListNode[k];\n        for (int i = 0; i < k; i++) {\n            lists[i] = arrayToList(parseInts(br.readLine()));\n        }\n        int[] res = listToArray(mergeKLists(lists));\n        System.out.println(join(res));\n    }\n}",
        python:
          "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef array_to_list(arr):\n    dummy = ListNode()\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef list_to_array(head):\n    res = []\n    while head:\n        res.append(head.val)\n        head = head.next\n    return res\n\ndef merge_k_lists(lists):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nk = int(lines[0])\nlists = []\nfor i in range(k):\n    line = lines[1 + i] if 1 + i < len(lines) else ''\n    lists.append(array_to_list(list(map(int, line.split())) if line.strip() else []))\nprint(*list_to_array(merge_k_lists(lists)))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "3\n1 4 5\n1 3 4\n2 6", expected: "1 1 2 3 4 4 5 6", isSample: true, order: 1 },
          { input: "0", expected: "", isSample: true, order: 2 },
          { input: "1\n", expected: "", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Merge k Sorted Lists",
      slug: "merge-k-sorted-lists",
      statement:
        "You are given an array of `k` linked lists, each sorted in ascending order (each represented as an array of values). Merge all the linked lists into one sorted list and return it as an array.\n\nInput format: first line is `k`; each of the next `k` lines is a list's values as space-separated integers (a blank line represents an empty list).\nOutput format: the merged sorted list, space-separated (an empty line if the result is empty).",
      constraints: "0 <= k <= 10^4\n0 <= list length <= 500\n-10^4 <= node value <= 10^4",
      difficulty: "HARD",
      order: 7,
      topicId: linkedLists.id,
      starterCode: {
        javascript:
          "class ListNode {\n  constructor(val, next = null) {\n    this.val = val\n    this.next = next\n  }\n}\nfunction arrayToList(arr) {\n  const dummy = new ListNode(0)\n  let cur = dummy\n  for (const v of arr) {\n    cur.next = new ListNode(v)\n    cur = cur.next\n  }\n  return dummy.next\n}\nfunction listToArray(head) {\n  const res = []\n  while (head) {\n    res.push(head.val)\n    head = head.next\n  }\n  return res\n}\n\nfunction mergeKLists(lists) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst k = Number(lines[0])\nconst lists = []\nfor (let i = 0; i < k; i++) {\n  const line = (lines[1 + i] || '').trim()\n  lists.push(arrayToList(line ? line.split(' ').map(Number) : []))\n}\nconsole.log(listToArray(mergeKLists(lists)).join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(nullptr) {}\n};\n\nListNode* arrayToList(vector<int>& arr) {\n    ListNode dummy(0);\n    ListNode* cur = &dummy;\n    for (int v : arr) {\n        cur->next = new ListNode(v);\n        cur = cur->next;\n    }\n    return dummy.next;\n}\n\nvector<int> listToArray(ListNode* head) {\n    vector<int> res;\n    while (head) {\n        res.push_back(head->val);\n        head = head->next;\n    }\n    return res;\n}\n\nListNode* mergeKLists(vector<ListNode*>& lists) {\n    // your code here\n    return nullptr;\n}\n\nint main() {\n    int k;\n    cin >> k;\n    cin.ignore();\n    vector<ListNode*> lists;\n    for (int i = 0; i < k; i++) {\n        string line;\n        getline(cin, line);\n        stringstream ss(line);\n        vector<int> arr;\n        int x;\n        while (ss >> x) arr.push_back(x);\n        lists.push_back(arrayToList(arr));\n    }\n    vector<int> res = listToArray(mergeKLists(lists));\n    for (size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 < res.size() ? \" \" : \"\");\n    cout << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class ListNode { int val; ListNode next; ListNode(int x){ val = x; } }\n    static ListNode arrayToList(int[] arr) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        for (int v : arr) { cur.next = new ListNode(v); cur = cur.next; }\n        return dummy.next;\n    }\n    static int[] listToArray(ListNode head) {\n        ArrayList<Integer> res = new ArrayList<>();\n        while (head != null) { res.add(head.val); head = head.next; }\n        int[] a = new int[res.size()];\n        for (int i = 0; i < a.length; i++) a[i] = res.get(i);\n        return a;\n    }\n    static ListNode mergeKLists(ListNode[] lists) {\n        // your code here\n        return null;\n    }\n\n    static int[] parseInts(String line) {\n        if (line == null) return new int[]{};\n        line = line.trim();\n        if (line.isEmpty()) return new int[]{};\n        String[] p = line.split(\" +\");\n        int[] a = new int[p.length];\n        for (int i = 0; i < p.length; i++) a[i] = Integer.parseInt(p[i]);\n        return a;\n    }\n    static String join(int[] a) {\n        StringBuilder sb = new StringBuilder();\n        for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(\" \"); sb.append(a[i]); }\n        return sb.toString();\n    }\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int k = Integer.parseInt(br.readLine().trim());\n        ListNode[] lists = new ListNode[k];\n        for (int i = 0; i < k; i++) {\n            lists[i] = arrayToList(parseInts(br.readLine()));\n        }\n        int[] res = listToArray(mergeKLists(lists));\n        System.out.println(join(res));\n    }\n}",
        python:
          "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef array_to_list(arr):\n    dummy = ListNode()\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef list_to_array(head):\n    res = []\n    while head:\n        res.append(head.val)\n        head = head.next\n    return res\n\ndef merge_k_lists(lists):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nk = int(lines[0])\nlists = []\nfor i in range(k):\n    line = lines[1 + i] if 1 + i < len(lines) else ''\n    lists.append(array_to_list(list(map(int, line.split())) if line.strip() else []))\nprint(*list_to_array(merge_k_lists(lists)))",
      },
      testCases: {
        create: [
          { input: "3\n1 4 5\n1 3 4\n2 6", expected: "1 1 2 3 4 4 5 6", isSample: true, order: 1 },
          { input: "0", expected: "", isSample: true, order: 2 },
          { input: "1\n", expected: "", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "baseball-game" },
    update: {
      title: "Baseball Game",
      slug: "baseball-game",
      statement:
        "You are keeping score for a baseball game with strange rules. At the start, the record is empty. You are given a list of operation tokens, where each token is one of:\n- An integer `x`: record a new score of `x`.\n- `\"+\"`: record a new score that is the sum of the previous two scores.\n- `\"D\"`: record a new score that is double the previous score.\n- `\"C\"`: invalidate the previous score, removing it from the record.\n\nReturn the sum of all the scores on the record after applying every operation.\n\nInput format: first line is `m`, the number of operations; each of the next `m` lines is one operation token.\nOutput format: a single integer, the sum of the scores.",
      constraints: "1 <= number of operations <= 1000\n-3 * 10^4 <= score <= 3 * 10^4",
      difficulty: "EASY",
      order: 5,
      topicId: stackTopic.id,
      starterCode: {
        javascript:
          "function calPoints(ops) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst m = Number(lines[0])\nconst ops = []\nfor (let i = 0; i < m; i++) ops.push(lines[1 + i].trim())\nconsole.log(calPoints(ops))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint calPoints(vector<string>& ops) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int m;\n    cin >> m;\n    vector<string> ops(m);\n    for (int i = 0; i < m; i++) cin >> ops[i];\n    cout << calPoints(ops) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int calPoints(String[] ops) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int m = Integer.parseInt(sc.nextLine().trim());\n        String[] ops = new String[m];\n        for (int i = 0; i < m; i++) ops[i] = sc.nextLine().trim();\n        System.out.println(calPoints(ops));\n    }\n}",
        python:
          "def cal_points(ops):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nm = int(lines[0])\nops = [lines[1 + i].strip() for i in range(m)]\nprint(cal_points(ops))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "5\n5\n2\nC\nD\n+", expected: "30", isSample: true, order: 1 },
          { input: "8\n5\n-2\n4\nC\nD\n9\n+\n+", expected: "27", isSample: true, order: 2 },
          { input: "1\n1", expected: "1", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Baseball Game",
      slug: "baseball-game",
      statement:
        "You are keeping score for a baseball game with strange rules. At the start, the record is empty. You are given a list of operation tokens, where each token is one of:\n- An integer `x`: record a new score of `x`.\n- `\"+\"`: record a new score that is the sum of the previous two scores.\n- `\"D\"`: record a new score that is double the previous score.\n- `\"C\"`: invalidate the previous score, removing it from the record.\n\nReturn the sum of all the scores on the record after applying every operation.\n\nInput format: first line is `m`, the number of operations; each of the next `m` lines is one operation token.\nOutput format: a single integer, the sum of the scores.",
      constraints: "1 <= number of operations <= 1000\n-3 * 10^4 <= score <= 3 * 10^4",
      difficulty: "EASY",
      order: 5,
      topicId: stackTopic.id,
      starterCode: {
        javascript:
          "function calPoints(ops) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst m = Number(lines[0])\nconst ops = []\nfor (let i = 0; i < m; i++) ops.push(lines[1 + i].trim())\nconsole.log(calPoints(ops))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint calPoints(vector<string>& ops) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int m;\n    cin >> m;\n    vector<string> ops(m);\n    for (int i = 0; i < m; i++) cin >> ops[i];\n    cout << calPoints(ops) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int calPoints(String[] ops) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int m = Integer.parseInt(sc.nextLine().trim());\n        String[] ops = new String[m];\n        for (int i = 0; i < m; i++) ops[i] = sc.nextLine().trim();\n        System.out.println(calPoints(ops));\n    }\n}",
        python:
          "def cal_points(ops):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nm = int(lines[0])\nops = [lines[1 + i].strip() for i in range(m)]\nprint(cal_points(ops))",
      },
      testCases: {
        create: [
          { input: "5\n5\n2\nC\nD\n+", expected: "30", isSample: true, order: 1 },
          { input: "8\n5\n-2\n4\nC\nD\n9\n+\n+", expected: "27", isSample: true, order: 2 },
          { input: "1\n1", expected: "1", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "min-stack" },
    update: {
      title: "Min Stack",
      slug: "min-stack",
      statement:
        "Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element, all in constant time.\n\nThe judge feeds a sequence of operations to your `MinStack`. Implement `push(x)`, `pop()`, `top()`, and `getMin()` so that each `top` or `getMin` operation produces the correct value.\n\nInput format: first line is `m`, the number of operations; each of the next `m` lines is one of `push x`, `pop`, `top`, or `getMin`.\nOutput format: for each `top` or `getMin` operation, print the returned value on its own line, in order.",
      constraints: "-2^31 <= x <= 2^31 - 1\n1 <= number of operations <= 3 * 10^4\npop, top, and getMin are always called on a non-empty stack.",
      difficulty: "MEDIUM",
      order: 6,
      topicId: stackTopic.id,
      starterCode: {
        javascript:
          "class MinStack {\n  constructor() {\n    // your code here\n  }\n  push(x) {\n    // your code here\n  }\n  pop() {\n    // your code here\n  }\n  top() {\n    // your code here\n  }\n  getMin() {\n    // your code here\n  }\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst m = Number(lines[0])\nconst st = new MinStack()\nconst out = []\nfor (let i = 0; i < m; i++) {\n  const parts = lines[1 + i].trim().split(' ')\n  const cmd = parts[0]\n  if (cmd === 'push') st.push(Number(parts[1]))\n  else if (cmd === 'pop') st.pop()\n  else if (cmd === 'top') out.push(String(st.top()))\n  else if (cmd === 'getMin') out.push(String(st.getMin()))\n}\nconsole.log(out.join('\\n'))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nclass MinStack {\npublic:\n    MinStack() {\n        // your code here\n    }\n    void push(int x) {\n        // your code here\n    }\n    void pop() {\n        // your code here\n    }\n    int top() {\n        // your code here\n        return 0;\n    }\n    int getMin() {\n        // your code here\n        return 0;\n    }\n};\n\nint main() {\n    int m;\n    cin >> m;\n    cin.ignore();\n    MinStack st;\n    vector<string> out;\n    for (int i = 0; i < m; i++) {\n        string line;\n        getline(cin, line);\n        stringstream ss(line);\n        string cmd;\n        ss >> cmd;\n        if (cmd == \"push\") {\n            int x;\n            ss >> x;\n            st.push(x);\n        } else if (cmd == \"pop\") {\n            st.pop();\n        } else if (cmd == \"top\") {\n            out.push_back(to_string(st.top()));\n        } else if (cmd == \"getMin\") {\n            out.push_back(to_string(st.getMin()));\n        }\n    }\n    for (auto& s : out) cout << s << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class MinStack {\n        MinStack() {\n            // your code here\n        }\n        void push(int x) {\n            // your code here\n        }\n        void pop() {\n            // your code here\n        }\n        int top() {\n            // your code here\n            return 0;\n        }\n        int getMin() {\n            // your code here\n            return 0;\n        }\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int m = Integer.parseInt(br.readLine().trim());\n        MinStack st = new MinStack();\n        StringBuilder out = new StringBuilder();\n        for (int i = 0; i < m; i++) {\n            String[] parts = br.readLine().trim().split(\" +\");\n            String cmd = parts[0];\n            if (cmd.equals(\"push\")) st.push(Integer.parseInt(parts[1]));\n            else if (cmd.equals(\"pop\")) st.pop();\n            else if (cmd.equals(\"top\")) out.append(st.top()).append(\"\\n\");\n            else if (cmd.equals(\"getMin\")) out.append(st.getMin()).append(\"\\n\");\n        }\n        System.out.print(out);\n    }\n}",
        python:
          "class MinStack:\n    def __init__(self):\n        # your code here\n        pass\n\n    def push(self, x):\n        # your code here\n        pass\n\n    def pop(self):\n        # your code here\n        pass\n\n    def top(self):\n        # your code here\n        pass\n\n    def get_min(self):\n        # your code here\n        pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nm = int(lines[0])\nst = MinStack()\nout = []\nfor i in range(m):\n    parts = lines[1 + i].split()\n    cmd = parts[0]\n    if cmd == 'push':\n        st.push(int(parts[1]))\n    elif cmd == 'pop':\n        st.pop()\n    elif cmd == 'top':\n        out.append(str(st.top()))\n    elif cmd == 'getMin':\n        out.append(str(st.get_min()))\nprint('\\n'.join(out))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "7\npush -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin", expected: "-3\n0\n-2", isSample: true, order: 1 },
          { input: "4\npush 1\npush 2\ntop\ngetMin", expected: "2\n1", isSample: false, order: 2 },
        ],
      },
    },
    create: {
      title: "Min Stack",
      slug: "min-stack",
      statement:
        "Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element, all in constant time.\n\nThe judge feeds a sequence of operations to your `MinStack`. Implement `push(x)`, `pop()`, `top()`, and `getMin()` so that each `top` or `getMin` operation produces the correct value.\n\nInput format: first line is `m`, the number of operations; each of the next `m` lines is one of `push x`, `pop`, `top`, or `getMin`.\nOutput format: for each `top` or `getMin` operation, print the returned value on its own line, in order.",
      constraints: "-2^31 <= x <= 2^31 - 1\n1 <= number of operations <= 3 * 10^4\npop, top, and getMin are always called on a non-empty stack.",
      difficulty: "MEDIUM",
      order: 6,
      topicId: stackTopic.id,
      starterCode: {
        javascript:
          "class MinStack {\n  constructor() {\n    // your code here\n  }\n  push(x) {\n    // your code here\n  }\n  pop() {\n    // your code here\n  }\n  top() {\n    // your code here\n  }\n  getMin() {\n    // your code here\n  }\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst m = Number(lines[0])\nconst st = new MinStack()\nconst out = []\nfor (let i = 0; i < m; i++) {\n  const parts = lines[1 + i].trim().split(' ')\n  const cmd = parts[0]\n  if (cmd === 'push') st.push(Number(parts[1]))\n  else if (cmd === 'pop') st.pop()\n  else if (cmd === 'top') out.push(String(st.top()))\n  else if (cmd === 'getMin') out.push(String(st.getMin()))\n}\nconsole.log(out.join('\\n'))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nclass MinStack {\npublic:\n    MinStack() {\n        // your code here\n    }\n    void push(int x) {\n        // your code here\n    }\n    void pop() {\n        // your code here\n    }\n    int top() {\n        // your code here\n        return 0;\n    }\n    int getMin() {\n        // your code here\n        return 0;\n    }\n};\n\nint main() {\n    int m;\n    cin >> m;\n    cin.ignore();\n    MinStack st;\n    vector<string> out;\n    for (int i = 0; i < m; i++) {\n        string line;\n        getline(cin, line);\n        stringstream ss(line);\n        string cmd;\n        ss >> cmd;\n        if (cmd == \"push\") {\n            int x;\n            ss >> x;\n            st.push(x);\n        } else if (cmd == \"pop\") {\n            st.pop();\n        } else if (cmd == \"top\") {\n            out.push_back(to_string(st.top()));\n        } else if (cmd == \"getMin\") {\n            out.push_back(to_string(st.getMin()));\n        }\n    }\n    for (auto& s : out) cout << s << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class MinStack {\n        MinStack() {\n            // your code here\n        }\n        void push(int x) {\n            // your code here\n        }\n        void pop() {\n            // your code here\n        }\n        int top() {\n            // your code here\n            return 0;\n        }\n        int getMin() {\n            // your code here\n            return 0;\n        }\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int m = Integer.parseInt(br.readLine().trim());\n        MinStack st = new MinStack();\n        StringBuilder out = new StringBuilder();\n        for (int i = 0; i < m; i++) {\n            String[] parts = br.readLine().trim().split(\" +\");\n            String cmd = parts[0];\n            if (cmd.equals(\"push\")) st.push(Integer.parseInt(parts[1]));\n            else if (cmd.equals(\"pop\")) st.pop();\n            else if (cmd.equals(\"top\")) out.append(st.top()).append(\"\\n\");\n            else if (cmd.equals(\"getMin\")) out.append(st.getMin()).append(\"\\n\");\n        }\n        System.out.print(out);\n    }\n}",
        python:
          "class MinStack:\n    def __init__(self):\n        # your code here\n        pass\n\n    def push(self, x):\n        # your code here\n        pass\n\n    def pop(self):\n        # your code here\n        pass\n\n    def top(self):\n        # your code here\n        pass\n\n    def get_min(self):\n        # your code here\n        pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nm = int(lines[0])\nst = MinStack()\nout = []\nfor i in range(m):\n    parts = lines[1 + i].split()\n    cmd = parts[0]\n    if cmd == 'push':\n        st.push(int(parts[1]))\n    elif cmd == 'pop':\n        st.pop()\n    elif cmd == 'top':\n        out.append(str(st.top()))\n    elif cmd == 'getMin':\n        out.append(str(st.get_min()))\nprint('\\n'.join(out))",
      },
      testCases: {
        create: [
          { input: "7\npush -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin", expected: "-3\n0\n-2", isSample: true, order: 1 },
          { input: "4\npush 1\npush 2\ntop\ngetMin", expected: "2\n1", isSample: false, order: 2 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "largest-rectangle-in-histogram" },
    update: {
      title: "Largest Rectangle in Histogram",
      slug: "largest-rectangle-in-histogram",
      statement:
        "Given an array of integers `heights` representing the histogram's bar heights where the width of each bar is `1`, return the area of the largest rectangle that can be formed within the histogram.\n\nInput format: a single line of space-separated integers, the bar heights.\nOutput format: a single integer, the maximum rectangle area.",
      constraints: "1 <= heights.length <= 10^5\n0 <= heights[i] <= 10^4",
      difficulty: "HARD",
      order: 7,
      topicId: stackTopic.id,
      starterCode: {
        javascript:
          "function largestRectangleArea(heights) {\n  // your code here\n}\n\nconst heights = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(largestRectangleArea(heights))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint largestRectangleArea(vector<int>& heights) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> heights;\n    int x;\n    while (ss >> x) heights.push_back(x);\n    cout << largestRectangleArea(heights) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int largestRectangleArea(int[] heights) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] heights = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) heights[i] = Integer.parseInt(parts[i]);\n        System.out.println(largestRectangleArea(heights));\n    }\n}",
        python:
          "def largest_rectangle_area(heights):\n    # your code here\n    pass\n\nheights = list(map(int, input().split()))\nprint(largest_rectangle_area(heights))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "2 1 5 6 2 3", expected: "10", isSample: true, order: 1 },
          { input: "2 4", expected: "4", isSample: true, order: 2 },
          { input: "0", expected: "0", isSample: false, order: 3 },
          { input: "1 1", expected: "2", isSample: false, order: 4 },
        ],
      },
    },
    create: {
      title: "Largest Rectangle in Histogram",
      slug: "largest-rectangle-in-histogram",
      statement:
        "Given an array of integers `heights` representing the histogram's bar heights where the width of each bar is `1`, return the area of the largest rectangle that can be formed within the histogram.\n\nInput format: a single line of space-separated integers, the bar heights.\nOutput format: a single integer, the maximum rectangle area.",
      constraints: "1 <= heights.length <= 10^5\n0 <= heights[i] <= 10^4",
      difficulty: "HARD",
      order: 7,
      topicId: stackTopic.id,
      starterCode: {
        javascript:
          "function largestRectangleArea(heights) {\n  // your code here\n}\n\nconst heights = require('fs').readFileSync(0, 'utf8').trim().split(' ').map(Number)\nconsole.log(largestRectangleArea(heights))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint largestRectangleArea(vector<int>& heights) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<int> heights;\n    int x;\n    while (ss >> x) heights.push_back(x);\n    cout << largestRectangleArea(heights) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int largestRectangleArea(int[] heights) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String[] parts = sc.nextLine().trim().split(\"\\\\s+\");\n        int[] heights = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) heights[i] = Integer.parseInt(parts[i]);\n        System.out.println(largestRectangleArea(heights));\n    }\n}",
        python:
          "def largest_rectangle_area(heights):\n    # your code here\n    pass\n\nheights = list(map(int, input().split()))\nprint(largest_rectangle_area(heights))",
      },
      testCases: {
        create: [
          { input: "2 1 5 6 2 3", expected: "10", isSample: true, order: 1 },
          { input: "2 4", expected: "4", isSample: true, order: 2 },
          { input: "0", expected: "0", isSample: false, order: 3 },
          { input: "1 1", expected: "2", isSample: false, order: 4 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "same-tree" },
    update: {
      title: "Same Tree",
      slug: "same-tree",
      statement:
        "Given the roots of two binary trees `p` and `q` (each represented as a level-order array where `null` marks a missing child), return `true` if the two trees are structurally identical and the nodes have the same values, or `false` otherwise.\n\nInput format: first line is `p`'s tokens, second line is `q`'s tokens.\nOutput format: `true` or `false`.",
      constraints: "0 <= number of nodes in each tree <= 100\n-10^4 <= node value <= 10^4",
      difficulty: "EASY",
      order: 5,
      topicId: trees.id,
      starterCode: {
        javascript:
          "class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val\n    this.left = left\n    this.right = right\n  }\n}\nfunction buildTree(tokens) {\n  if (tokens.length === 0 || tokens[0] === 'null') return null\n  const root = new TreeNode(Number(tokens[0]))\n  const queue = [root]\n  let i = 1\n  while (queue.length && i < tokens.length) {\n    const node = queue.shift()\n    if (i < tokens.length) {\n      const leftVal = tokens[i++]\n      if (leftVal !== 'null') {\n        node.left = new TreeNode(Number(leftVal))\n        queue.push(node.left)\n      }\n    }\n    if (i < tokens.length) {\n      const rightVal = tokens[i++]\n      if (rightVal !== 'null') {\n        node.right = new TreeNode(Number(rightVal))\n        queue.push(node.right)\n      }\n    }\n  }\n  return root\n}\n\nfunction isSameTree(p, q) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst p = buildTree(lines[0].split(' '))\nconst q = buildTree(lines[1].split(' '))\nconsole.log(isSameTree(p, q))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* buildTree(vector<string>& tokens) {\n    if (tokens.empty() || tokens[0] == \"null\") return nullptr;\n    TreeNode* root = new TreeNode(stoi(tokens[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < tokens.size()) {\n        TreeNode* node = q.front(); q.pop();\n        if (i < tokens.size()) {\n            string leftVal = tokens[i++];\n            if (leftVal != \"null\") {\n                node->left = new TreeNode(stoi(leftVal));\n                q.push(node->left);\n            }\n        }\n        if (i < tokens.size()) {\n            string rightVal = tokens[i++];\n            if (rightVal != \"null\") {\n                node->right = new TreeNode(stoi(rightVal));\n                q.push(node->right);\n            }\n        }\n    }\n    return root;\n}\n\nbool isSameTree(TreeNode* p, TreeNode* q) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss1(line1), ss2(line2);\n    vector<string> t1, t2;\n    string tok;\n    while (ss1 >> tok) t1.push_back(tok);\n    while (ss2 >> tok) t2.push_back(tok);\n    TreeNode* p = buildTree(t1);\n    TreeNode* q = buildTree(t2);\n    cout << (isSameTree(p, q) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x){ val = x; } }\n    static TreeNode buildTree(String[] tokens) {\n        if (tokens.length == 0 || tokens[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        int i = 1;\n        while (!q.isEmpty() && i < tokens.length) {\n            TreeNode node = q.poll();\n            if (i < tokens.length) { String lv = tokens[i++]; if (!lv.equals(\"null\")) { node.left = new TreeNode(Integer.parseInt(lv)); q.add(node.left); } }\n            if (i < tokens.length) { String rv = tokens[i++]; if (!rv.equals(\"null\")) { node.right = new TreeNode(Integer.parseInt(rv)); q.add(node.right); } }\n        }\n        return root;\n    }\n    static boolean isSameTree(TreeNode p, TreeNode q) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String l1 = br.readLine();\n        String l2 = br.readLine();\n        String[] t1 = (l1 == null || l1.trim().isEmpty()) ? new String[]{} : l1.trim().split(\" +\");\n        String[] t2 = (l2 == null || l2.trim().isEmpty()) ? new String[]{} : l2.trim().split(\" +\");\n        System.out.println(isSameTree(buildTree(t1), buildTree(t2)) ? \"true\" : \"false\");\n    }\n}",
        python:
          "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef build_tree(tokens):\n    if not tokens or tokens[0] == 'null':\n        return None\n    root = TreeNode(int(tokens[0]))\n    queue = [root]\n    i = 1\n    while queue and i < len(tokens):\n        node = queue.pop(0)\n        if i < len(tokens):\n            left_val = tokens[i]\n            i += 1\n            if left_val != 'null':\n                node.left = TreeNode(int(left_val))\n                queue.append(node.left)\n        if i < len(tokens):\n            right_val = tokens[i]\n            i += 1\n            if right_val != 'null':\n                node.right = TreeNode(int(right_val))\n                queue.append(node.right)\n    return root\n\ndef is_same_tree(p, q):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\np = build_tree(lines[0].split())\nq = build_tree(lines[1].split())\nprint(str(is_same_tree(p, q)).lower())",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "1 2 3\n1 2 3", expected: "true", isSample: true, order: 1 },
          { input: "1 2\n1 null 2", expected: "false", isSample: true, order: 2 },
          { input: "1 2 1\n1 1 2", expected: "false", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Same Tree",
      slug: "same-tree",
      statement:
        "Given the roots of two binary trees `p` and `q` (each represented as a level-order array where `null` marks a missing child), return `true` if the two trees are structurally identical and the nodes have the same values, or `false` otherwise.\n\nInput format: first line is `p`'s tokens, second line is `q`'s tokens.\nOutput format: `true` or `false`.",
      constraints: "0 <= number of nodes in each tree <= 100\n-10^4 <= node value <= 10^4",
      difficulty: "EASY",
      order: 5,
      topicId: trees.id,
      starterCode: {
        javascript:
          "class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val\n    this.left = left\n    this.right = right\n  }\n}\nfunction buildTree(tokens) {\n  if (tokens.length === 0 || tokens[0] === 'null') return null\n  const root = new TreeNode(Number(tokens[0]))\n  const queue = [root]\n  let i = 1\n  while (queue.length && i < tokens.length) {\n    const node = queue.shift()\n    if (i < tokens.length) {\n      const leftVal = tokens[i++]\n      if (leftVal !== 'null') {\n        node.left = new TreeNode(Number(leftVal))\n        queue.push(node.left)\n      }\n    }\n    if (i < tokens.length) {\n      const rightVal = tokens[i++]\n      if (rightVal !== 'null') {\n        node.right = new TreeNode(Number(rightVal))\n        queue.push(node.right)\n      }\n    }\n  }\n  return root\n}\n\nfunction isSameTree(p, q) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').trim().split('\\n')\nconst p = buildTree(lines[0].split(' '))\nconst q = buildTree(lines[1].split(' '))\nconsole.log(isSameTree(p, q))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* buildTree(vector<string>& tokens) {\n    if (tokens.empty() || tokens[0] == \"null\") return nullptr;\n    TreeNode* root = new TreeNode(stoi(tokens[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < tokens.size()) {\n        TreeNode* node = q.front(); q.pop();\n        if (i < tokens.size()) {\n            string leftVal = tokens[i++];\n            if (leftVal != \"null\") {\n                node->left = new TreeNode(stoi(leftVal));\n                q.push(node->left);\n            }\n        }\n        if (i < tokens.size()) {\n            string rightVal = tokens[i++];\n            if (rightVal != \"null\") {\n                node->right = new TreeNode(stoi(rightVal));\n                q.push(node->right);\n            }\n        }\n    }\n    return root;\n}\n\nbool isSameTree(TreeNode* p, TreeNode* q) {\n    // your code here\n    return false;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    stringstream ss1(line1), ss2(line2);\n    vector<string> t1, t2;\n    string tok;\n    while (ss1 >> tok) t1.push_back(tok);\n    while (ss2 >> tok) t2.push_back(tok);\n    TreeNode* p = buildTree(t1);\n    TreeNode* q = buildTree(t2);\n    cout << (isSameTree(p, q) ? \"true\" : \"false\") << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x){ val = x; } }\n    static TreeNode buildTree(String[] tokens) {\n        if (tokens.length == 0 || tokens[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        int i = 1;\n        while (!q.isEmpty() && i < tokens.length) {\n            TreeNode node = q.poll();\n            if (i < tokens.length) { String lv = tokens[i++]; if (!lv.equals(\"null\")) { node.left = new TreeNode(Integer.parseInt(lv)); q.add(node.left); } }\n            if (i < tokens.length) { String rv = tokens[i++]; if (!rv.equals(\"null\")) { node.right = new TreeNode(Integer.parseInt(rv)); q.add(node.right); } }\n        }\n        return root;\n    }\n    static boolean isSameTree(TreeNode p, TreeNode q) {\n        // your code here\n        return false;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String l1 = br.readLine();\n        String l2 = br.readLine();\n        String[] t1 = (l1 == null || l1.trim().isEmpty()) ? new String[]{} : l1.trim().split(\" +\");\n        String[] t2 = (l2 == null || l2.trim().isEmpty()) ? new String[]{} : l2.trim().split(\" +\");\n        System.out.println(isSameTree(buildTree(t1), buildTree(t2)) ? \"true\" : \"false\");\n    }\n}",
        python:
          "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef build_tree(tokens):\n    if not tokens or tokens[0] == 'null':\n        return None\n    root = TreeNode(int(tokens[0]))\n    queue = [root]\n    i = 1\n    while queue and i < len(tokens):\n        node = queue.pop(0)\n        if i < len(tokens):\n            left_val = tokens[i]\n            i += 1\n            if left_val != 'null':\n                node.left = TreeNode(int(left_val))\n                queue.append(node.left)\n        if i < len(tokens):\n            right_val = tokens[i]\n            i += 1\n            if right_val != 'null':\n                node.right = TreeNode(int(right_val))\n                queue.append(node.right)\n    return root\n\ndef is_same_tree(p, q):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\np = build_tree(lines[0].split())\nq = build_tree(lines[1].split())\nprint(str(is_same_tree(p, q)).lower())",
      },
      testCases: {
        create: [
          { input: "1 2 3\n1 2 3", expected: "true", isSample: true, order: 1 },
          { input: "1 2\n1 null 2", expected: "false", isSample: true, order: 2 },
          { input: "1 2 1\n1 1 2", expected: "false", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "binary-tree-level-order-traversal" },
    update: {
      title: "Binary Tree Level Order Traversal",
      slug: "binary-tree-level-order-traversal",
      statement:
        "Given the root of a binary tree (represented as a level-order array where `null` marks a missing child), return the level order traversal of its nodes' values (i.e., left to right, level by level).\n\nInput format: a single line with the tree as space-separated tokens (integers and the literal `null`).\nOutput format: each level's values on its own line, space-separated.",
      constraints: "0 <= number of nodes <= 2000\n-1000 <= node value <= 1000",
      difficulty: "MEDIUM",
      order: 6,
      topicId: trees.id,
      starterCode: {
        javascript:
          "class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val\n    this.left = left\n    this.right = right\n  }\n}\nfunction buildTree(tokens) {\n  if (tokens.length === 0 || tokens[0] === 'null') return null\n  const root = new TreeNode(Number(tokens[0]))\n  const queue = [root]\n  let i = 1\n  while (queue.length && i < tokens.length) {\n    const node = queue.shift()\n    if (i < tokens.length) {\n      const leftVal = tokens[i++]\n      if (leftVal !== 'null') {\n        node.left = new TreeNode(Number(leftVal))\n        queue.push(node.left)\n      }\n    }\n    if (i < tokens.length) {\n      const rightVal = tokens[i++]\n      if (rightVal !== 'null') {\n        node.right = new TreeNode(Number(rightVal))\n        queue.push(node.right)\n      }\n    }\n  }\n  return root\n}\n\nfunction levelOrder(root) {\n  // your code here\n}\n\nconst tokens = require('fs').readFileSync(0, 'utf8').trim().split(' ')\nconst root = buildTree(tokens)\nfor (const level of levelOrder(root)) console.log(level.join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* buildTree(vector<string>& tokens) {\n    if (tokens.empty() || tokens[0] == \"null\") return nullptr;\n    TreeNode* root = new TreeNode(stoi(tokens[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < tokens.size()) {\n        TreeNode* node = q.front(); q.pop();\n        if (i < tokens.size()) {\n            string leftVal = tokens[i++];\n            if (leftVal != \"null\") {\n                node->left = new TreeNode(stoi(leftVal));\n                q.push(node->left);\n            }\n        }\n        if (i < tokens.size()) {\n            string rightVal = tokens[i++];\n            if (rightVal != \"null\") {\n                node->right = new TreeNode(stoi(rightVal));\n                q.push(node->right);\n            }\n        }\n    }\n    return root;\n}\n\nvector<vector<int>> levelOrder(TreeNode* root) {\n    // your code here\n    return {};\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<string> tokens;\n    string tok;\n    while (ss >> tok) tokens.push_back(tok);\n    TreeNode* root = buildTree(tokens);\n    for (auto& level : levelOrder(root)) {\n        for (size_t i = 0; i < level.size(); i++) cout << level[i] << (i + 1 < level.size() ? \" \" : \"\");\n        cout << endl;\n    }\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x){ val = x; } }\n    static TreeNode buildTree(String[] tokens) {\n        if (tokens.length == 0 || tokens[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        int i = 1;\n        while (!q.isEmpty() && i < tokens.length) {\n            TreeNode node = q.poll();\n            if (i < tokens.length) { String lv = tokens[i++]; if (!lv.equals(\"null\")) { node.left = new TreeNode(Integer.parseInt(lv)); q.add(node.left); } }\n            if (i < tokens.length) { String rv = tokens[i++]; if (!rv.equals(\"null\")) { node.right = new TreeNode(Integer.parseInt(rv)); q.add(node.right); } }\n        }\n        return root;\n    }\n    static List<List<Integer>> levelOrder(TreeNode root) {\n        // your code here\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String __line = br.readLine();\n        String[] tokens = (__line == null || __line.trim().isEmpty()) ? new String[]{} : __line.trim().split(\" +\");\n        TreeNode root = buildTree(tokens);\n        StringBuilder out = new StringBuilder();\n        for (List<Integer> level : levelOrder(root)) {\n            StringBuilder sb = new StringBuilder();\n            for (int i = 0; i < level.size(); i++) { if (i > 0) sb.append(\" \"); sb.append(level.get(i)); }\n            out.append(sb).append(\"\\n\");\n        }\n        System.out.print(out);\n    }\n}",
        python:
          "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef build_tree(tokens):\n    if not tokens or tokens[0] == 'null':\n        return None\n    root = TreeNode(int(tokens[0]))\n    queue = [root]\n    i = 1\n    while queue and i < len(tokens):\n        node = queue.pop(0)\n        if i < len(tokens):\n            left_val = tokens[i]\n            i += 1\n            if left_val != 'null':\n                node.left = TreeNode(int(left_val))\n                queue.append(node.left)\n        if i < len(tokens):\n            right_val = tokens[i]\n            i += 1\n            if right_val != 'null':\n                node.right = TreeNode(int(right_val))\n                queue.append(node.right)\n    return root\n\ndef level_order(root):\n    # your code here\n    pass\n\ntokens = input().split()\nroot = build_tree(tokens)\nfor level in level_order(root):\n    print(*level)",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "3 9 20 null null 15 7", expected: "3\n9 20\n15 7", isSample: true, order: 1 },
          { input: "1", expected: "1", isSample: true, order: 2 },
        ],
      },
    },
    create: {
      title: "Binary Tree Level Order Traversal",
      slug: "binary-tree-level-order-traversal",
      statement:
        "Given the root of a binary tree (represented as a level-order array where `null` marks a missing child), return the level order traversal of its nodes' values (i.e., left to right, level by level).\n\nInput format: a single line with the tree as space-separated tokens (integers and the literal `null`).\nOutput format: each level's values on its own line, space-separated.",
      constraints: "0 <= number of nodes <= 2000\n-1000 <= node value <= 1000",
      difficulty: "MEDIUM",
      order: 6,
      topicId: trees.id,
      starterCode: {
        javascript:
          "class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val\n    this.left = left\n    this.right = right\n  }\n}\nfunction buildTree(tokens) {\n  if (tokens.length === 0 || tokens[0] === 'null') return null\n  const root = new TreeNode(Number(tokens[0]))\n  const queue = [root]\n  let i = 1\n  while (queue.length && i < tokens.length) {\n    const node = queue.shift()\n    if (i < tokens.length) {\n      const leftVal = tokens[i++]\n      if (leftVal !== 'null') {\n        node.left = new TreeNode(Number(leftVal))\n        queue.push(node.left)\n      }\n    }\n    if (i < tokens.length) {\n      const rightVal = tokens[i++]\n      if (rightVal !== 'null') {\n        node.right = new TreeNode(Number(rightVal))\n        queue.push(node.right)\n      }\n    }\n  }\n  return root\n}\n\nfunction levelOrder(root) {\n  // your code here\n}\n\nconst tokens = require('fs').readFileSync(0, 'utf8').trim().split(' ')\nconst root = buildTree(tokens)\nfor (const level of levelOrder(root)) console.log(level.join(' '))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* buildTree(vector<string>& tokens) {\n    if (tokens.empty() || tokens[0] == \"null\") return nullptr;\n    TreeNode* root = new TreeNode(stoi(tokens[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < tokens.size()) {\n        TreeNode* node = q.front(); q.pop();\n        if (i < tokens.size()) {\n            string leftVal = tokens[i++];\n            if (leftVal != \"null\") {\n                node->left = new TreeNode(stoi(leftVal));\n                q.push(node->left);\n            }\n        }\n        if (i < tokens.size()) {\n            string rightVal = tokens[i++];\n            if (rightVal != \"null\") {\n                node->right = new TreeNode(stoi(rightVal));\n                q.push(node->right);\n            }\n        }\n    }\n    return root;\n}\n\nvector<vector<int>> levelOrder(TreeNode* root) {\n    // your code here\n    return {};\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<string> tokens;\n    string tok;\n    while (ss >> tok) tokens.push_back(tok);\n    TreeNode* root = buildTree(tokens);\n    for (auto& level : levelOrder(root)) {\n        for (size_t i = 0; i < level.size(); i++) cout << level[i] << (i + 1 < level.size() ? \" \" : \"\");\n        cout << endl;\n    }\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x){ val = x; } }\n    static TreeNode buildTree(String[] tokens) {\n        if (tokens.length == 0 || tokens[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        int i = 1;\n        while (!q.isEmpty() && i < tokens.length) {\n            TreeNode node = q.poll();\n            if (i < tokens.length) { String lv = tokens[i++]; if (!lv.equals(\"null\")) { node.left = new TreeNode(Integer.parseInt(lv)); q.add(node.left); } }\n            if (i < tokens.length) { String rv = tokens[i++]; if (!rv.equals(\"null\")) { node.right = new TreeNode(Integer.parseInt(rv)); q.add(node.right); } }\n        }\n        return root;\n    }\n    static List<List<Integer>> levelOrder(TreeNode root) {\n        // your code here\n        return new ArrayList<>();\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String __line = br.readLine();\n        String[] tokens = (__line == null || __line.trim().isEmpty()) ? new String[]{} : __line.trim().split(\" +\");\n        TreeNode root = buildTree(tokens);\n        StringBuilder out = new StringBuilder();\n        for (List<Integer> level : levelOrder(root)) {\n            StringBuilder sb = new StringBuilder();\n            for (int i = 0; i < level.size(); i++) { if (i > 0) sb.append(\" \"); sb.append(level.get(i)); }\n            out.append(sb).append(\"\\n\");\n        }\n        System.out.print(out);\n    }\n}",
        python:
          "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef build_tree(tokens):\n    if not tokens or tokens[0] == 'null':\n        return None\n    root = TreeNode(int(tokens[0]))\n    queue = [root]\n    i = 1\n    while queue and i < len(tokens):\n        node = queue.pop(0)\n        if i < len(tokens):\n            left_val = tokens[i]\n            i += 1\n            if left_val != 'null':\n                node.left = TreeNode(int(left_val))\n                queue.append(node.left)\n        if i < len(tokens):\n            right_val = tokens[i]\n            i += 1\n            if right_val != 'null':\n                node.right = TreeNode(int(right_val))\n                queue.append(node.right)\n    return root\n\ndef level_order(root):\n    # your code here\n    pass\n\ntokens = input().split()\nroot = build_tree(tokens)\nfor level in level_order(root):\n    print(*level)",
      },
      testCases: {
        create: [
          { input: "3 9 20 null null 15 7", expected: "3\n9 20\n15 7", isSample: true, order: 1 },
          { input: "1", expected: "1", isSample: true, order: 2 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "binary-tree-maximum-path-sum" },
    update: {
      title: "Binary Tree Maximum Path Sum",
      slug: "binary-tree-maximum-path-sum",
      statement:
        "Given the root of a binary tree (represented as a level-order array where `null` marks a missing child, and values may be negative), return the maximum path sum of any non-empty path. A path is a sequence of nodes where each pair of adjacent nodes has an edge, no node appears more than once, and the path does not need to pass through the root.\n\nInput format: a single line with the tree as space-separated tokens (integers and the literal `null`).\nOutput format: a single integer, the maximum path sum.",
      constraints: "1 <= number of nodes <= 3 * 10^4\n-1000 <= node value <= 1000",
      difficulty: "HARD",
      order: 7,
      topicId: trees.id,
      starterCode: {
        javascript:
          "class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val\n    this.left = left\n    this.right = right\n  }\n}\nfunction buildTree(tokens) {\n  if (tokens.length === 0 || tokens[0] === 'null') return null\n  const root = new TreeNode(Number(tokens[0]))\n  const queue = [root]\n  let i = 1\n  while (queue.length && i < tokens.length) {\n    const node = queue.shift()\n    if (i < tokens.length) {\n      const leftVal = tokens[i++]\n      if (leftVal !== 'null') {\n        node.left = new TreeNode(Number(leftVal))\n        queue.push(node.left)\n      }\n    }\n    if (i < tokens.length) {\n      const rightVal = tokens[i++]\n      if (rightVal !== 'null') {\n        node.right = new TreeNode(Number(rightVal))\n        queue.push(node.right)\n      }\n    }\n  }\n  return root\n}\n\nfunction maxPathSum(root) {\n  // your code here\n}\n\nconst tokens = require('fs').readFileSync(0, 'utf8').trim().split(' ')\nconst root = buildTree(tokens)\nconsole.log(maxPathSum(root))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* buildTree(vector<string>& tokens) {\n    if (tokens.empty() || tokens[0] == \"null\") return nullptr;\n    TreeNode* root = new TreeNode(stoi(tokens[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < tokens.size()) {\n        TreeNode* node = q.front(); q.pop();\n        if (i < tokens.size()) {\n            string leftVal = tokens[i++];\n            if (leftVal != \"null\") {\n                node->left = new TreeNode(stoi(leftVal));\n                q.push(node->left);\n            }\n        }\n        if (i < tokens.size()) {\n            string rightVal = tokens[i++];\n            if (rightVal != \"null\") {\n                node->right = new TreeNode(stoi(rightVal));\n                q.push(node->right);\n            }\n        }\n    }\n    return root;\n}\n\nint maxPathSum(TreeNode* root) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<string> tokens;\n    string tok;\n    while (ss >> tok) tokens.push_back(tok);\n    TreeNode* root = buildTree(tokens);\n    cout << maxPathSum(root) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x){ val = x; } }\n    static TreeNode buildTree(String[] tokens) {\n        if (tokens.length == 0 || tokens[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        int i = 1;\n        while (!q.isEmpty() && i < tokens.length) {\n            TreeNode node = q.poll();\n            if (i < tokens.length) { String lv = tokens[i++]; if (!lv.equals(\"null\")) { node.left = new TreeNode(Integer.parseInt(lv)); q.add(node.left); } }\n            if (i < tokens.length) { String rv = tokens[i++]; if (!rv.equals(\"null\")) { node.right = new TreeNode(Integer.parseInt(rv)); q.add(node.right); } }\n        }\n        return root;\n    }\n    static int maxPathSum(TreeNode root) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String __line = br.readLine();\n        String[] tokens = (__line == null || __line.trim().isEmpty()) ? new String[]{} : __line.trim().split(\" +\");\n        System.out.println(maxPathSum(buildTree(tokens)));\n    }\n}",
        python:
          "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef build_tree(tokens):\n    if not tokens or tokens[0] == 'null':\n        return None\n    root = TreeNode(int(tokens[0]))\n    queue = [root]\n    i = 1\n    while queue and i < len(tokens):\n        node = queue.pop(0)\n        if i < len(tokens):\n            left_val = tokens[i]\n            i += 1\n            if left_val != 'null':\n                node.left = TreeNode(int(left_val))\n                queue.append(node.left)\n        if i < len(tokens):\n            right_val = tokens[i]\n            i += 1\n            if right_val != 'null':\n                node.right = TreeNode(int(right_val))\n                queue.append(node.right)\n    return root\n\ndef max_path_sum(root):\n    # your code here\n    pass\n\ntokens = input().split()\nroot = build_tree(tokens)\nprint(max_path_sum(root))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "1 2 3", expected: "6", isSample: true, order: 1 },
          { input: "-10 9 20 null null 15 7", expected: "42", isSample: true, order: 2 },
          { input: "-3", expected: "-3", isSample: false, order: 3 },
          { input: "2 -1", expected: "2", isSample: false, order: 4 },
        ],
      },
    },
    create: {
      title: "Binary Tree Maximum Path Sum",
      slug: "binary-tree-maximum-path-sum",
      statement:
        "Given the root of a binary tree (represented as a level-order array where `null` marks a missing child, and values may be negative), return the maximum path sum of any non-empty path. A path is a sequence of nodes where each pair of adjacent nodes has an edge, no node appears more than once, and the path does not need to pass through the root.\n\nInput format: a single line with the tree as space-separated tokens (integers and the literal `null`).\nOutput format: a single integer, the maximum path sum.",
      constraints: "1 <= number of nodes <= 3 * 10^4\n-1000 <= node value <= 1000",
      difficulty: "HARD",
      order: 7,
      topicId: trees.id,
      starterCode: {
        javascript:
          "class TreeNode {\n  constructor(val, left = null, right = null) {\n    this.val = val\n    this.left = left\n    this.right = right\n  }\n}\nfunction buildTree(tokens) {\n  if (tokens.length === 0 || tokens[0] === 'null') return null\n  const root = new TreeNode(Number(tokens[0]))\n  const queue = [root]\n  let i = 1\n  while (queue.length && i < tokens.length) {\n    const node = queue.shift()\n    if (i < tokens.length) {\n      const leftVal = tokens[i++]\n      if (leftVal !== 'null') {\n        node.left = new TreeNode(Number(leftVal))\n        queue.push(node.left)\n      }\n    }\n    if (i < tokens.length) {\n      const rightVal = tokens[i++]\n      if (rightVal !== 'null') {\n        node.right = new TreeNode(Number(rightVal))\n        queue.push(node.right)\n      }\n    }\n  }\n  return root\n}\n\nfunction maxPathSum(root) {\n  // your code here\n}\n\nconst tokens = require('fs').readFileSync(0, 'utf8').trim().split(' ')\nconst root = buildTree(tokens)\nconsole.log(maxPathSum(root))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left, *right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* buildTree(vector<string>& tokens) {\n    if (tokens.empty() || tokens[0] == \"null\") return nullptr;\n    TreeNode* root = new TreeNode(stoi(tokens[0]));\n    queue<TreeNode*> q;\n    q.push(root);\n    size_t i = 1;\n    while (!q.empty() && i < tokens.size()) {\n        TreeNode* node = q.front(); q.pop();\n        if (i < tokens.size()) {\n            string leftVal = tokens[i++];\n            if (leftVal != \"null\") {\n                node->left = new TreeNode(stoi(leftVal));\n                q.push(node->left);\n            }\n        }\n        if (i < tokens.size()) {\n            string rightVal = tokens[i++];\n            if (rightVal != \"null\") {\n                node->right = new TreeNode(stoi(rightVal));\n                q.push(node->right);\n            }\n        }\n    }\n    return root;\n}\n\nint maxPathSum(TreeNode* root) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    stringstream ss(line);\n    vector<string> tokens;\n    string tok;\n    while (ss >> tok) tokens.push_back(tok);\n    TreeNode* root = buildTree(tokens);\n    cout << maxPathSum(root) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class TreeNode { int val; TreeNode left, right; TreeNode(int x){ val = x; } }\n    static TreeNode buildTree(String[] tokens) {\n        if (tokens.length == 0 || tokens[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n        Queue<TreeNode> q = new LinkedList<>();\n        q.add(root);\n        int i = 1;\n        while (!q.isEmpty() && i < tokens.length) {\n            TreeNode node = q.poll();\n            if (i < tokens.length) { String lv = tokens[i++]; if (!lv.equals(\"null\")) { node.left = new TreeNode(Integer.parseInt(lv)); q.add(node.left); } }\n            if (i < tokens.length) { String rv = tokens[i++]; if (!rv.equals(\"null\")) { node.right = new TreeNode(Integer.parseInt(rv)); q.add(node.right); } }\n        }\n        return root;\n    }\n    static int maxPathSum(TreeNode root) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String __line = br.readLine();\n        String[] tokens = (__line == null || __line.trim().isEmpty()) ? new String[]{} : __line.trim().split(\" +\");\n        System.out.println(maxPathSum(buildTree(tokens)));\n    }\n}",
        python:
          "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef build_tree(tokens):\n    if not tokens or tokens[0] == 'null':\n        return None\n    root = TreeNode(int(tokens[0]))\n    queue = [root]\n    i = 1\n    while queue and i < len(tokens):\n        node = queue.pop(0)\n        if i < len(tokens):\n            left_val = tokens[i]\n            i += 1\n            if left_val != 'null':\n                node.left = TreeNode(int(left_val))\n                queue.append(node.left)\n        if i < len(tokens):\n            right_val = tokens[i]\n            i += 1\n            if right_val != 'null':\n                node.right = TreeNode(int(right_val))\n                queue.append(node.right)\n    return root\n\ndef max_path_sum(root):\n    # your code here\n    pass\n\ntokens = input().split()\nroot = build_tree(tokens)\nprint(max_path_sum(root))",
      },
      testCases: {
        create: [
          { input: "1 2 3", expected: "6", isSample: true, order: 1 },
          { input: "-10 9 20 null null 15 7", expected: "42", isSample: true, order: 2 },
          { input: "-3", expected: "-3", isSample: false, order: 3 },
          { input: "2 -1", expected: "2", isSample: false, order: 4 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "kth-largest-element-in-a-stream" },
    update: {
      title: "Kth Largest Element in a Stream",
      slug: "kth-largest-element-in-a-stream",
      statement:
        "Design a class `KthLargest` that finds the `k`-th largest element in a stream of numbers. It is initialized with an integer `k` and an initial array `nums`. Each call to `add(val)` appends `val` to the stream and returns the `k`-th largest element in the stream so far.\n\nInput format: first line is `k` and `n` (the size of the initial array), second line is the initial `nums` as `n` space-separated integers (blank if `n` is `0`), third line is `m` (the number of `add` calls), then `m` lines each with a value to add.\nOutput format: for each `add` call, print the returned `k`-th largest value on its own line.",
      constraints: "1 <= k <= 10^4\n0 <= nums.length <= 10^4\n-10^4 <= nums[i] <= 10^4\nAt least k elements will exist in the stream when add is called.",
      difficulty: "EASY",
      order: 5,
      topicId: heaps.id,
      starterCode: {
        javascript:
          "class KthLargest {\n  constructor(k, nums) {\n    // your code here\n  }\n  add(val) {\n    // your code here\n  }\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst [k, n] = lines[0].trim().split(' ').map(Number)\nconst nums = n > 0 ? lines[1].trim().split(' ').map(Number) : []\nconst m = Number(lines[2])\nconst kl = new KthLargest(k, nums)\nconst out = []\nfor (let i = 0; i < m; i++) out.push(String(kl.add(Number(lines[3 + i]))))\nconsole.log(out.join('\\n'))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nclass KthLargest {\npublic:\n    KthLargest(int k, vector<int>& nums) {\n        // your code here\n    }\n    int add(int val) {\n        // your code here\n        return 0;\n    }\n};\n\nint main() {\n    int k, n;\n    cin >> k >> n;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    int m;\n    cin >> m;\n    KthLargest kl(k, nums);\n    for (int i = 0; i < m; i++) {\n        int val;\n        cin >> val;\n        cout << kl.add(val) << endl;\n    }\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static class KthLargest {\n        KthLargest(int k, int[] nums) {\n            // your code here\n        }\n        int add(int val) {\n            // your code here\n            return 0;\n        }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int k = sc.nextInt();\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        int m = sc.nextInt();\n        KthLargest kl = new KthLargest(k, nums);\n        StringBuilder out = new StringBuilder();\n        for (int i = 0; i < m; i++) {\n            int val = sc.nextInt();\n            out.append(kl.add(val)).append(\"\\n\");\n        }\n        System.out.print(out);\n    }\n}",
        python:
          "class KthLargest:\n    def __init__(self, k, nums):\n        # your code here\n        pass\n\n    def add(self, val):\n        # your code here\n        pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nk, n = map(int, lines[0].split())\nnums = list(map(int, lines[1].split())) if n > 0 else []\nm = int(lines[2])\nkl = KthLargest(k, nums)\nout = []\nfor i in range(m):\n    out.append(str(kl.add(int(lines[3 + i]))))\nprint('\\n'.join(out))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "3 4\n4 5 8 2\n5\n3\n5\n10\n9\n4", expected: "4\n5\n5\n8\n8", isSample: true, order: 1 },
          { input: "1 0\n\n3\n5\n10\n3", expected: "5\n10\n10", isSample: false, order: 2 },
        ],
      },
    },
    create: {
      title: "Kth Largest Element in a Stream",
      slug: "kth-largest-element-in-a-stream",
      statement:
        "Design a class `KthLargest` that finds the `k`-th largest element in a stream of numbers. It is initialized with an integer `k` and an initial array `nums`. Each call to `add(val)` appends `val` to the stream and returns the `k`-th largest element in the stream so far.\n\nInput format: first line is `k` and `n` (the size of the initial array), second line is the initial `nums` as `n` space-separated integers (blank if `n` is `0`), third line is `m` (the number of `add` calls), then `m` lines each with a value to add.\nOutput format: for each `add` call, print the returned `k`-th largest value on its own line.",
      constraints: "1 <= k <= 10^4\n0 <= nums.length <= 10^4\n-10^4 <= nums[i] <= 10^4\nAt least k elements will exist in the stream when add is called.",
      difficulty: "EASY",
      order: 5,
      topicId: heaps.id,
      starterCode: {
        javascript:
          "class KthLargest {\n  constructor(k, nums) {\n    // your code here\n  }\n  add(val) {\n    // your code here\n  }\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst [k, n] = lines[0].trim().split(' ').map(Number)\nconst nums = n > 0 ? lines[1].trim().split(' ').map(Number) : []\nconst m = Number(lines[2])\nconst kl = new KthLargest(k, nums)\nconst out = []\nfor (let i = 0; i < m; i++) out.push(String(kl.add(Number(lines[3 + i]))))\nconsole.log(out.join('\\n'))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nclass KthLargest {\npublic:\n    KthLargest(int k, vector<int>& nums) {\n        // your code here\n    }\n    int add(int val) {\n        // your code here\n        return 0;\n    }\n};\n\nint main() {\n    int k, n;\n    cin >> k >> n;\n    vector<int> nums(n);\n    for (int i = 0; i < n; i++) cin >> nums[i];\n    int m;\n    cin >> m;\n    KthLargest kl(k, nums);\n    for (int i = 0; i < m; i++) {\n        int val;\n        cin >> val;\n        cout << kl.add(val) << endl;\n    }\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static class KthLargest {\n        KthLargest(int k, int[] nums) {\n            // your code here\n        }\n        int add(int val) {\n            // your code here\n            return 0;\n        }\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int k = sc.nextInt();\n        int n = sc.nextInt();\n        int[] nums = new int[n];\n        for (int i = 0; i < n; i++) nums[i] = sc.nextInt();\n        int m = sc.nextInt();\n        KthLargest kl = new KthLargest(k, nums);\n        StringBuilder out = new StringBuilder();\n        for (int i = 0; i < m; i++) {\n            int val = sc.nextInt();\n            out.append(kl.add(val)).append(\"\\n\");\n        }\n        System.out.print(out);\n    }\n}",
        python:
          "class KthLargest:\n    def __init__(self, k, nums):\n        # your code here\n        pass\n\n    def add(self, val):\n        # your code here\n        pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nk, n = map(int, lines[0].split())\nnums = list(map(int, lines[1].split())) if n > 0 else []\nm = int(lines[2])\nkl = KthLargest(k, nums)\nout = []\nfor i in range(m):\n    out.append(str(kl.add(int(lines[3 + i]))))\nprint('\\n'.join(out))",
      },
      testCases: {
        create: [
          { input: "3 4\n4 5 8 2\n5\n3\n5\n10\n9\n4", expected: "4\n5\n5\n8\n8", isSample: true, order: 1 },
          { input: "1 0\n\n3\n5\n10\n3", expected: "5\n10\n10", isSample: false, order: 2 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "find-median-from-data-stream" },
    update: {
      title: "Find Median from Data Stream",
      slug: "find-median-from-data-stream",
      statement:
        "The median is the middle value in an ordered list of integers. If the size is even, the median is the average of the two middle values. Design a data structure that supports adding integers from a stream and finding the median of all elements added so far.\n\nInput format: first line is `m`, the number of operations; each of the next `m` lines is either `addNum x` or `findMedian`.\nOutput format: for each `findMedian` operation, print the median formatted to exactly 1 decimal place, on its own line, in order.",
      constraints: "-10^5 <= x <= 10^5\nAt least one addNum operation occurs before any findMedian operation.\n1 <= number of operations <= 5 * 10^4",
      difficulty: "HARD",
      order: 6,
      topicId: heaps.id,
      starterCode: {
        javascript:
          "class MedianFinder {\n  constructor() {\n    // your code here\n  }\n  addNum(num) {\n    // your code here\n  }\n  findMedian() {\n    // your code here\n  }\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst m = Number(lines[0])\nconst mf = new MedianFinder()\nconst out = []\nfor (let i = 0; i < m; i++) {\n  const parts = lines[1 + i].trim().split(' ')\n  if (parts[0] === 'addNum') mf.addNum(Number(parts[1]))\n  else out.push(mf.findMedian().toFixed(1))\n}\nconsole.log(out.join('\\n'))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nclass MedianFinder {\npublic:\n    MedianFinder() {\n        // your code here\n    }\n    void addNum(int num) {\n        // your code here\n    }\n    double findMedian() {\n        // your code here\n        return 0;\n    }\n};\n\nint main() {\n    int m;\n    cin >> m;\n    cin.ignore();\n    MedianFinder mf;\n    vector<string> out;\n    for (int i = 0; i < m; i++) {\n        string line;\n        getline(cin, line);\n        stringstream ss(line);\n        string cmd;\n        ss >> cmd;\n        if (cmd == \"addNum\") {\n            int num;\n            ss >> num;\n            mf.addNum(num);\n        } else {\n            ostringstream oss;\n            oss << fixed << setprecision(1) << mf.findMedian();\n            out.push_back(oss.str());\n        }\n    }\n    for (auto& s : out) cout << s << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class MedianFinder {\n        MedianFinder() {\n            // your code here\n        }\n        void addNum(int num) {\n            // your code here\n        }\n        double findMedian() {\n            // your code here\n            return 0;\n        }\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int m = Integer.parseInt(br.readLine().trim());\n        MedianFinder mf = new MedianFinder();\n        StringBuilder out = new StringBuilder();\n        for (int i = 0; i < m; i++) {\n            String[] parts = br.readLine().trim().split(\" +\");\n            if (parts[0].equals(\"addNum\")) mf.addNum(Integer.parseInt(parts[1]));\n            else out.append(String.format(\"%.1f\", mf.findMedian())).append(\"\\n\");\n        }\n        System.out.print(out);\n    }\n}",
        python:
          "class MedianFinder:\n    def __init__(self):\n        # your code here\n        pass\n\n    def add_num(self, num):\n        # your code here\n        pass\n\n    def find_median(self):\n        # your code here\n        pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nm = int(lines[0])\nmf = MedianFinder()\nout = []\nfor i in range(m):\n    parts = lines[1 + i].split()\n    if parts[0] == 'addNum':\n        mf.add_num(int(parts[1]))\n    else:\n        out.append('%.1f' % mf.find_median())\nprint('\\n'.join(out))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "4\naddNum 1\naddNum 2\nfindMedian\naddNum 3", expected: "1.5", isSample: true, order: 1 },
          { input: "5\naddNum 1\naddNum 2\nfindMedian\naddNum 3\nfindMedian", expected: "1.5\n2.0", isSample: true, order: 2 },
        ],
      },
    },
    create: {
      title: "Find Median from Data Stream",
      slug: "find-median-from-data-stream",
      statement:
        "The median is the middle value in an ordered list of integers. If the size is even, the median is the average of the two middle values. Design a data structure that supports adding integers from a stream and finding the median of all elements added so far.\n\nInput format: first line is `m`, the number of operations; each of the next `m` lines is either `addNum x` or `findMedian`.\nOutput format: for each `findMedian` operation, print the median formatted to exactly 1 decimal place, on its own line, in order.",
      constraints: "-10^5 <= x <= 10^5\nAt least one addNum operation occurs before any findMedian operation.\n1 <= number of operations <= 5 * 10^4",
      difficulty: "HARD",
      order: 6,
      topicId: heaps.id,
      starterCode: {
        javascript:
          "class MedianFinder {\n  constructor() {\n    // your code here\n  }\n  addNum(num) {\n    // your code here\n  }\n  findMedian() {\n    // your code here\n  }\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst m = Number(lines[0])\nconst mf = new MedianFinder()\nconst out = []\nfor (let i = 0; i < m; i++) {\n  const parts = lines[1 + i].trim().split(' ')\n  if (parts[0] === 'addNum') mf.addNum(Number(parts[1]))\n  else out.push(mf.findMedian().toFixed(1))\n}\nconsole.log(out.join('\\n'))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nclass MedianFinder {\npublic:\n    MedianFinder() {\n        // your code here\n    }\n    void addNum(int num) {\n        // your code here\n    }\n    double findMedian() {\n        // your code here\n        return 0;\n    }\n};\n\nint main() {\n    int m;\n    cin >> m;\n    cin.ignore();\n    MedianFinder mf;\n    vector<string> out;\n    for (int i = 0; i < m; i++) {\n        string line;\n        getline(cin, line);\n        stringstream ss(line);\n        string cmd;\n        ss >> cmd;\n        if (cmd == \"addNum\") {\n            int num;\n            ss >> num;\n            mf.addNum(num);\n        } else {\n            ostringstream oss;\n            oss << fixed << setprecision(1) << mf.findMedian();\n            out.push_back(oss.str());\n        }\n    }\n    for (auto& s : out) cout << s << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static class MedianFinder {\n        MedianFinder() {\n            // your code here\n        }\n        void addNum(int num) {\n            // your code here\n        }\n        double findMedian() {\n            // your code here\n            return 0;\n        }\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        int m = Integer.parseInt(br.readLine().trim());\n        MedianFinder mf = new MedianFinder();\n        StringBuilder out = new StringBuilder();\n        for (int i = 0; i < m; i++) {\n            String[] parts = br.readLine().trim().split(\" +\");\n            if (parts[0].equals(\"addNum\")) mf.addNum(Integer.parseInt(parts[1]));\n            else out.append(String.format(\"%.1f\", mf.findMedian())).append(\"\\n\");\n        }\n        System.out.print(out);\n    }\n}",
        python:
          "class MedianFinder:\n    def __init__(self):\n        # your code here\n        pass\n\n    def add_num(self, num):\n        # your code here\n        pass\n\n    def find_median(self):\n        # your code here\n        pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nm = int(lines[0])\nmf = MedianFinder()\nout = []\nfor i in range(m):\n    parts = lines[1 + i].split()\n    if parts[0] == 'addNum':\n        mf.add_num(int(parts[1]))\n    else:\n        out.append('%.1f' % mf.find_median())\nprint('\\n'.join(out))",
      },
      testCases: {
        create: [
          { input: "4\naddNum 1\naddNum 2\nfindMedian\naddNum 3", expected: "1.5", isSample: true, order: 1 },
          { input: "5\naddNum 1\naddNum 2\nfindMedian\naddNum 3\nfindMedian", expected: "1.5\n2.0", isSample: true, order: 2 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "edit-distance" },
    update: {
      title: "Edit Distance",
      slug: "edit-distance",
      statement:
        "Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`. You may insert a character, delete a character, or replace a character.\n\nInput format: first line is `word1`, second line is `word2` (either may be empty).\nOutput format: a single integer, the minimum edit distance.",
      constraints: "0 <= word1.length, word2.length <= 500\nword1 and word2 consist of lowercase English letters.",
      difficulty: "HARD",
      order: 5,
      topicId: dynamicProgramming.id,
      starterCode: {
        javascript:
          "function minDistance(word1, word2) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst word1 = lines[0]\nconst word2 = lines[1]\nconsole.log(minDistance(word1, word2))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint minDistance(string word1, string word2) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string word1, word2;\n    getline(cin, word1);\n    getline(cin, word2);\n    cout << minDistance(word1, word2) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int minDistance(String word1, String word2) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String word1 = br.readLine();\n        String word2 = br.readLine();\n        if (word1 == null) word1 = \"\";\n        if (word2 == null) word2 = \"\";\n        System.out.println(minDistance(word1, word2));\n    }\n}",
        python:
          "def min_distance(word1, word2):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nword1 = lines[0]\nword2 = lines[1]\nprint(min_distance(word1, word2))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "horse\nros", expected: "3", isSample: true, order: 1 },
          { input: "intention\nexecution", expected: "5", isSample: true, order: 2 },
          { input: "\nabc", expected: "3", isSample: false, order: 3 },
          { input: "abc\nabc", expected: "0", isSample: false, order: 4 },
        ],
      },
    },
    create: {
      title: "Edit Distance",
      slug: "edit-distance",
      statement:
        "Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`. You may insert a character, delete a character, or replace a character.\n\nInput format: first line is `word1`, second line is `word2` (either may be empty).\nOutput format: a single integer, the minimum edit distance.",
      constraints: "0 <= word1.length, word2.length <= 500\nword1 and word2 consist of lowercase English letters.",
      difficulty: "HARD",
      order: 5,
      topicId: dynamicProgramming.id,
      starterCode: {
        javascript:
          "function minDistance(word1, word2) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst word1 = lines[0]\nconst word2 = lines[1]\nconsole.log(minDistance(word1, word2))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint minDistance(string word1, string word2) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string word1, word2;\n    getline(cin, word1);\n    getline(cin, word2);\n    cout << minDistance(word1, word2) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int minDistance(String word1, String word2) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String word1 = br.readLine();\n        String word2 = br.readLine();\n        if (word1 == null) word1 = \"\";\n        if (word2 == null) word2 = \"\";\n        System.out.println(minDistance(word1, word2));\n    }\n}",
        python:
          "def min_distance(word1, word2):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nword1 = lines[0]\nword2 = lines[1]\nprint(min_distance(word1, word2))",
      },
      testCases: {
        create: [
          { input: "horse\nros", expected: "3", isSample: true, order: 1 },
          { input: "intention\nexecution", expected: "5", isSample: true, order: 2 },
          { input: "\nabc", expected: "3", isSample: false, order: 3 },
          { input: "abc\nabc", expected: "0", isSample: false, order: 4 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "maximal-square" },
    update: {
      title: "Maximal Square",
      slug: "maximal-square",
      statement:
        "Given a `rows x cols` binary matrix filled with `0`s and `1`s, find the largest square containing only `1`s and return its area.\n\nInput format: first line is `rows cols`, then `rows` lines each a string of `cols` characters (`0` or `1`, no spaces).\nOutput format: a single integer, the area of the largest all-`1`s square.",
      constraints: "1 <= rows, cols <= 300\nmatrix[i][j] is '0' or '1'.",
      difficulty: "HARD",
      order: 6,
      topicId: dynamicProgramming.id,
      starterCode: {
        javascript:
          "function maximalSquare(matrix) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst [rows, cols] = lines[0].trim().split(' ').map(Number)\nconst matrix = []\nfor (let i = 0; i < rows; i++) matrix.push(lines[1 + i])\nconsole.log(maximalSquare(matrix))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint maximalSquare(vector<string>& matrix) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int rows, cols;\n    cin >> rows >> cols;\n    vector<string> matrix(rows);\n    for (int i = 0; i < rows; i++) cin >> matrix[i];\n    cout << maximalSquare(matrix) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int maximalSquare(String[] matrix) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        String[] matrix = new String[rows];\n        for (int i = 0; i < rows; i++) matrix[i] = sc.next();\n        System.out.println(maximalSquare(matrix));\n    }\n}",
        python:
          "def maximal_square(matrix):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nrows, cols = map(int, lines[0].split())\nmatrix = [lines[1 + i] for i in range(rows)]\nprint(maximal_square(matrix))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "4 5\n10100\n10111\n11111\n10010", expected: "4", isSample: true, order: 1 },
          { input: "2 2\n01\n10", expected: "1", isSample: true, order: 2 },
          { input: "1 1\n0", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Maximal Square",
      slug: "maximal-square",
      statement:
        "Given a `rows x cols` binary matrix filled with `0`s and `1`s, find the largest square containing only `1`s and return its area.\n\nInput format: first line is `rows cols`, then `rows` lines each a string of `cols` characters (`0` or `1`, no spaces).\nOutput format: a single integer, the area of the largest all-`1`s square.",
      constraints: "1 <= rows, cols <= 300\nmatrix[i][j] is '0' or '1'.",
      difficulty: "HARD",
      order: 6,
      topicId: dynamicProgramming.id,
      starterCode: {
        javascript:
          "function maximalSquare(matrix) {\n  // your code here\n}\n\nconst lines = require('fs').readFileSync(0, 'utf8').split('\\n')\nconst [rows, cols] = lines[0].trim().split(' ').map(Number)\nconst matrix = []\nfor (let i = 0; i < rows; i++) matrix.push(lines[1 + i])\nconsole.log(maximalSquare(matrix))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint maximalSquare(vector<string>& matrix) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    int rows, cols;\n    cin >> rows >> cols;\n    vector<string> matrix(rows);\n    for (int i = 0; i < rows; i++) cin >> matrix[i];\n    cout << maximalSquare(matrix) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\n\npublic class Main {\n    static int maximalSquare(String[] matrix) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        String[] matrix = new String[rows];\n        for (int i = 0; i < rows; i++) matrix[i] = sc.next();\n        System.out.println(maximalSquare(matrix));\n    }\n}",
        python:
          "def maximal_square(matrix):\n    # your code here\n    pass\n\nimport sys\nlines = sys.stdin.read().split('\\n')\nrows, cols = map(int, lines[0].split())\nmatrix = [lines[1 + i] for i in range(rows)]\nprint(maximal_square(matrix))",
      },
      testCases: {
        create: [
          { input: "4 5\n10100\n10111\n11111\n10010", expected: "4", isSample: true, order: 1 },
          { input: "2 2\n01\n10", expected: "1", isSample: true, order: 2 },
          { input: "1 1\n0", expected: "0", isSample: false, order: 3 },
        ],
      },
    },
  });

  await prisma.problem.upsert({
    where: { slug: "longest-valid-parentheses" },
    update: {
      title: "Longest Valid Parentheses",
      slug: "longest-valid-parentheses",
      statement:
        "Given a string `s` containing just the characters `(` and `)`, return the length of the longest valid (well-formed) parentheses substring.\n\nInput format: a single line containing `s` (may be empty).\nOutput format: a single integer, the length of the longest valid parentheses substring.",
      constraints: "0 <= s.length <= 3 * 10^4\ns[i] is '(' or ')'.",
      difficulty: "HARD",
      order: 7,
      topicId: dynamicProgramming.id,
      starterCode: {
        javascript:
          "function longestValidParentheses(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').split('\\n')[0]\nconsole.log(longestValidParentheses(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint longestValidParentheses(string s) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << longestValidParentheses(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int longestValidParentheses(String s) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        System.out.println(longestValidParentheses(s));\n    }\n}",
        python:
          "def longest_valid_parentheses(s):\n    # your code here\n    pass\n\nimport sys\ns = sys.stdin.readline().rstrip('\\n')\nprint(longest_valid_parentheses(s))",
      },
      testCases: {
        deleteMany: {},
        create: [
          { input: "(()", expected: "2", isSample: true, order: 1 },
          { input: ")()())", expected: "4", isSample: true, order: 2 },
          { input: "()(()", expected: "2", isSample: false, order: 3 },
        ],
      },
    },
    create: {
      title: "Longest Valid Parentheses",
      slug: "longest-valid-parentheses",
      statement:
        "Given a string `s` containing just the characters `(` and `)`, return the length of the longest valid (well-formed) parentheses substring.\n\nInput format: a single line containing `s` (may be empty).\nOutput format: a single integer, the length of the longest valid parentheses substring.",
      constraints: "0 <= s.length <= 3 * 10^4\ns[i] is '(' or ')'.",
      difficulty: "HARD",
      order: 7,
      topicId: dynamicProgramming.id,
      starterCode: {
        javascript:
          "function longestValidParentheses(s) {\n  // your code here\n}\n\nconst s = require('fs').readFileSync(0, 'utf8').split('\\n')[0]\nconsole.log(longestValidParentheses(s))",
        cpp:
          "#include <bits/stdc++.h>\nusing namespace std;\n\nint longestValidParentheses(string s) {\n    // your code here\n    return 0;\n}\n\nint main() {\n    string s;\n    getline(cin, s);\n    cout << longestValidParentheses(s) << endl;\n    return 0;\n}",
        java:
          "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    static int longestValidParentheses(String s) {\n        // your code here\n        return 0;\n    }\n\n    public static void main(String[] args) throws IOException {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        System.out.println(longestValidParentheses(s));\n    }\n}",
        python:
          "def longest_valid_parentheses(s):\n    # your code here\n    pass\n\nimport sys\ns = sys.stdin.readline().rstrip('\\n')\nprint(longest_valid_parentheses(s))",
      },
      testCases: {
        create: [
          { input: "(()", expected: "2", isSample: true, order: 1 },
          { input: ")()())", expected: "4", isSample: true, order: 2 },
          { input: "()(()", expected: "2", isSample: false, order: 3 },
        ],
      },
    },
  });

  console.log("Seeded all topics and problems");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
