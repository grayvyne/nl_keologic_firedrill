import * as React from 'react';
import { BottomNavigation, FontIcon, TabsContainer, Tabs, Tab } from 'react-md';

const links = [
    {
        label: 'Classes',
        icon: <FontIcon>access_time</FontIcon>
    },
    { label: 'Missing' },
    { label: 'Search' },
    { label: 'Checklist' }
];

export class Home extends React.Component {
    public render() {
        return (
            <div>
                <TabsContainer>
                    <Tabs tabId={1}>
                        <Tab label={'A'} />
                    </Tabs>
                </TabsContainer>
                <BottomNavigation links={links} style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
            </div>
        );
    }
}
