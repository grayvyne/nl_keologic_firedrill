/*
 * Merges a new definitions for `inject` into `mobx-react` to help deal with the prop types of injected components.
 * Does not work with the `@inject()` decorator pattern. Recommended use is, roughly:
 * ```
 * interface StoreProps {
 *     aPropertyOrMethodOfAStore: any;
 * }
 * 
 * interface Props extends StoreProps {
 *     ...
 * }
 * 
 * class AComponent extends React.Component<Props> {
 *     private someMethod(): void {
 *         console.log(this.props.aPropertyOrMethodOfAStore);
 *     }
 *     ...
 * }
 * 
 * function mapStoresToProps(stores: Stores, props: Props): StoreProps {
 *     return {
 *         aPropertyOrMethodOfAStore: stores.someStore.someProperty
 *     };
 * }
 * 
 * export default inject(mapStoresToProps)(AComponent);
 * ```
 */

import { IReactComponent } from 'mobx-react';

type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];

type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

declare module 'mobx-react' {
    export function inject<R, P extends R, T extends Pick<P, keyof R>, S, C>(
        storesToProps: (stores: S, props: P, context: C) => R
    ): (target: IReactComponent<P>) => React.ComponentClass<Omit<P, keyof R>>;
}
