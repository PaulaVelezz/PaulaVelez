export function getFilterOptions(projects) {
  const categories = [...new Set(projects.flatMap((p) => p.categories))];
  const types = [...new Set(projects.flatMap((p) => p.projectType))];
  const stack = [...new Set(projects.flatMap((p) => p.stack))].sort();

  return { categories, types, stack };
}
