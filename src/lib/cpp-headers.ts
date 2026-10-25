// Works out the minimal set of standard headers a C++ snippet needs, so starter
// templates can use <iostream> + only what they use instead of the heavy
// <bits/stdc++.h> (which costs ~1s of compile time on every run).
//
// Detection is deliberately generous (an extra header is harmless, a missing
// one is a compile error); scripts/trim-cpp-includes.mts additionally compiles
// every rewritten starter against Piston before anything is written.

const RULES: [string, RegExp][] = [
  ["algorithm", /\b(sort|stable_sort|partial_sort|nth_element|reverse|max|min|swap|min_element|max_element|minmax|lower_bound|upper_bound|binary_search|unique|fill|count|count_if|find|find_if|next_permutation|prev_permutation|all_of|any_of|none_of|rotate|equal|copy|remove|remove_if|replace|transform|for_each|merge|set_union|set_intersection|is_sorted|iter_swap|shuffle)\s*[(<]/],
  ["bitset", /\bbitset\s*</],
  ["cassert", /\bassert\s*\(/],
  ["cctype", /\b(isalpha|isdigit|isalnum|isspace|isupper|islower|ispunct|tolower|toupper)\s*\(/],
  ["chrono", /\bchrono\b/],
  ["climits", /\b(INT_MAX|INT_MIN|LLONG_MAX|LLONG_MIN|UINT_MAX|ULLONG_MAX|LONG_MAX|LONG_MIN|SHRT_MAX|CHAR_BIT)\b/],
  ["cmath", /\b(sqrt|pow|floor|ceil|fabs|exp|log|log2|log10|sin|cos|tan|round|hypot|cbrt|fmod|trunc|abs|llabs)\s*\(/],
  ["cstdint", /\b(u?int(8|16|32|64)_t|uintptr_t|intptr_t)\b/],
  ["cstdio", /\b(printf|scanf|sprintf|snprintf|puts|getchar|putchar|fgets|fopen|FILE|stdin|stdout|stderr)\b/],
  ["cstdlib", /\b(abs|llabs|atoi|atol|atoll|rand|srand|exit|malloc|free|qsort|strtol|strtoll)\s*\(/],
  ["cstring", /\b(memset|memcpy|memmove|memcmp|strlen|strcmp|strcpy|strncpy|strcat|strchr|strstr)\s*\(/],
  ["deque", /\bdeque\s*</],
  ["functional", /\b(function\s*<|greater\s*<|less\s*<|hash\s*<|bind\s*\(|plus\s*<|multiplies\s*<)/],
  ["iomanip", /\b(setprecision|setw|setfill|setbase|fixed|scientific)\b/],
  ["limits", /\bnumeric_limits\b/],
  ["list", /(?<![\w:])list\s*</],
  ["map", /(?<![\w])(multi)?map\s*</],
  ["numeric", /\b(accumulate|iota|gcd|lcm|partial_sum|inner_product|adjacent_difference|reduce)\s*[(<]/],
  ["queue", /\b(priority_queue|queue)\s*</],
  ["random", /\b(mt19937|mt19937_64|random_device|uniform_int_distribution|uniform_real_distribution)\b/],
  ["set", /(?<![\w])(multi)?set\s*</],
  ["sstream", /\b(stringstream|istringstream|ostringstream)\b/],
  ["stack", /\bstack\s*</],
  ["string", /\b(string|to_string|stoi|stol|stoll|stod|stof|getline|npos)\b/],
  ["tuple", /\b(tuple\s*<|make_tuple|tie\s*\(|get\s*<|tuple_size)/],
  ["unordered_map", /\bunordered_(multi)?map\b/],
  ["unordered_set", /\bunordered_(multi)?set\b/],
  ["utility", /\b(pair\s*<|make_pair|move\s*\(|forward\s*<|swap\s*\()/],
  ["vector", /\bvector\s*</],
  ["array", /(?<![\w])array\s*</],
];

// `iostream` first (always: the starters read stdin / print), then the rest
// alphabetically so output is stable. `code` must use real newlines.
export function detectHeaders(code: string): string[] {
  // Drop the bits include itself and line comments so a word in a comment
  // (e.g. "// your code here") can't pull in headers.
  const body = code
    .replace(/#include\s*<bits\/stdc\+\+\.h>/g, "")
    .replace(/\/\/[^\n]*/g, "");
  const found = new Set<string>();
  for (const [header, re] of RULES) {
    if (re.test(body)) found.add(header);
  }
  return ["iostream", ...[...found].sort()];
}

export function includeBlock(headers: string[], newline: string): string {
  return headers.map((h) => `#include <${h}>`).join(newline);
}

export function rewriteStarter(
  code: string,
  newline = "\n"
): { headers: string[]; code: string } | null {
  if (!code.includes("#include <bits/stdc++.h>")) return null;
  const headers = detectHeaders(code);
  return {
    headers,
    code: code.replace("#include <bits/stdc++.h>", includeBlock(headers, newline)),
  };
}
