import { FiredrillClass } from '../models/FiredrillClass';

export function orderClassesByGradeAndName(classA: FiredrillClass, classB: FiredrillClass): number {
    if (classA.gradeLevel > classB.gradeLevel) {
        return 1;
    } else if (classA.gradeLevel < classB.gradeLevel) {
        return -1;
    }
    return classA.name.localeCompare(classB.name);
}
