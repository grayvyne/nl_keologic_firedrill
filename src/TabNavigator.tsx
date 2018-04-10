import * as React from 'react';
import { BottomNavigation, BottomNavigationItem } from 'material-ui';

export interface TabRouteConfig {
    [name: string]: React.ComponentType;
}

interface TabNavigatorState {
    currentRoute: number;
}

export function createTabNavigator(routes: TabRouteConfig): React.ComponentClass {
    return class TabNavigator extends React.Component<{}, TabNavigatorState> {
        public state: TabNavigatorState = { currentRoute: 0 };

        render() {
            return (
                <div>
                    {Object.keys(routes).map((route, index) => {
                        const RouteElement = routes[route];
                        return (
                            <div
                                key={route}
                                className="App"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    bottom: 50,
                                    left: 0,
                                    right: 0,
                                    display: this.state.currentRoute === index ? 'block' : 'none'
                                }}
                            >
                                <RouteElement />
                            </div>
                        );
                    })}
                    <BottomNavigation
                        style={{ position: 'absolute', right: 0, left: 0, bottom: 0, height: 50 }}
                        selectedIndex={this.state.currentRoute}
                    >
                        {Object.keys(routes).map((route, index) => (
                            <BottomNavigationItem
                                icon={<div />}
                                onClick={() => this.setState({ currentRoute: index })}
                                key={route}
                                label={route}
                            />
                        ))}
                    </BottomNavigation>
                </div>
            );
        }
    };
}
