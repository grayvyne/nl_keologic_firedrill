import * as React from 'react';
import { BottomNavigation, FontIcon, TabsContainer, Tabs, Tab } from 'react-md';

const links = [
    {
        label: 'Recent',
        icon: <FontIcon>access_time</FontIcon>
    },
    {
        label: 'Favorites',
        icon: <FontIcon>favorite</FontIcon>
    },
    {
        label: 'Nearby',
        icon: <FontIcon>place</FontIcon>
    }
];

interface HomeState {
    activeIndex: number;
    title: string;
    children?: JSX.Element;
}

interface HomeProps {}

export class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            activeIndex: 0,
            title: links[0].label,
            children: (
                <TabsContainer style={{ width: '100%' }}>
                    <Tabs tabId={1}>
                        <Tab label={'Test on top'}>
                            <div>Test Content 1</div>
                        </Tab>
                        <Tab label={'test else'}>
                            <div>Test Content 2</div>
                        </Tab>
                    </Tabs>
                </TabsContainer>
            )
        };
    }

    onNavChangeHandler = (activeIndex: number): void => {
        console.log(activeIndex);
        const title = links[activeIndex].label;
        let children;
        switch (activeIndex) {
            case 0:
                children = (
                    <TabsContainer style={{ width: '100%' }}>
                        <Tabs tabId={0}>
                            <Tab label={'Test on top'}>
                                <div>Test Content 1</div>
                            </Tab>
                            <Tab label={'test else'}>
                                <div>Test Content 2</div>
                            </Tab>
                        </Tabs>
                    </TabsContainer>
                );
                break;
            case 1:
                children = (
                    <TabsContainer style={{ width: '100%' }}>
                        <Tabs tabId={1}>
                            <Tab label={'Something on top'}>
                                <div>Test Content 1</div>
                            </Tab>
                            <Tab label={'Something else'}>
                                <div>Test Content 12345</div>
                            </Tab>
                        </Tabs>
                    </TabsContainer>
                );
                break;
            case 2:
                children = (
                    <TabsContainer style={{ width: '100%' }}>
                        <Tabs tabId={2}>
                            <Tab label={'Something on top'}>
                                <div>Test Content 1</div>
                            </Tab>
                            <Tab label={'Something else'}>
                                <div>Test Content 2</div>
                            </Tab>
                        </Tabs>
                    </TabsContainer>
                );
                break;
            default:
                children = (
                    <TabsContainer style={{ width: '100%' }}>
                        <Tabs tabId={0}>
                            <Tab label={'Something on top'}>
                                <div>Test Content 1</div>
                            </Tab>
                            <Tab label={'Something else'}>
                                <div>Test Content 2</div>
                            </Tab>
                        </Tabs>
                    </TabsContainer>
                );
        }

        this.setState({ title, children, activeIndex });
        // tslint:disable-next-line:semicolon
    };

    public render() {
        return (
            <div>
                {this.state.children}
                <BottomNavigation links={links} dynamic={false} onNavChange={this.onNavChangeHandler} />
            </div>
        );
    }
}
