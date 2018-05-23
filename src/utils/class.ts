import { FiredrillClass } from '../models/FiredrillClass';

export function orderClassesByGradeAndName(classA: FiredrillClass, classB: FiredrillClass): number {
    const gradeLevelDiff = classA.gradeLevel - classB.gradeLevel;
    if (0 === gradeLevelDiff) {
        return classA.name.localeCompare(classB.name);
    }

    return gradeLevelDiff;
}
