import type { Course } from "@/types/course";
import { createQuery } from "../query-factory";
import { queryKeys } from "../query-keys";

/**
 * Hook to fetch all courses
 * 
 * @example
 * ```tsx
 * function CourseSelect() {
 *   const { data: courses, isLoading } = useCourses();
 *   
 *   if (isLoading) return <div>Loading courses...</div>;
 *   
 *   return (
 *     <select>
 *       {courses?.map(course => (
 *         <option key={course.id} value={course.id}>
 *           {course.name}
 *         </option>
 *       ))}
 *     </select>
 *   );
 * }
 * ```
 */
export const useCourses = () =>
  createQuery<Course[]>({
    url: "/courses",
    queryKey: queryKeys.courses.lists(),
  })();
