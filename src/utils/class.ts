import { FiredrillClass } from '../models/FiredrillClass';

export function orderClassesByGrade(classA: FiredrillClass, classB: FiredrillClass): number {
    return classA.gradeLevel - classB.gradeLevel;
}

export function orderClassesByName(classA: FiredrillClass, classB: FiredrillClass): number {
    return classA.name.localeCompare(classB.name);
}
