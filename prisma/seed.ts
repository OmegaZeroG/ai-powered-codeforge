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
