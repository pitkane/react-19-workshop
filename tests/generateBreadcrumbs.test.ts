import { generateBreadcrumbs } from '../components/dynamic-breadcrumb';

describe('generateBreadcrumbs', () => {
  it('maps /tasks/2/work to expected breadcrumb labels', () => {
    const breadcrumbs = generateBreadcrumbs('/tasks/2/work');
    const labels = breadcrumbs.map(b => b.label);
    expect(labels).toEqual([
      'React 19 Workshop',
      'Workshop Tasks',
      'Task 2: Client Components',
      'Work Area',
    ]);
    // ensure last breadcrumb is marked as last
    expect(breadcrumbs[breadcrumbs.length - 1].isLast).toBe(true);
  });
});
