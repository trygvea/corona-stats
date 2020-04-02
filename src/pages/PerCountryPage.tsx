import React, { useState } from 'react'
import './PerCountryPage.scss'
import { usePageLoader } from './PerCountryPageLoader'
import PerCountryTable from '../components/PerCountryTable'
import { Button, Drawer } from 'antd'
import SearchPropsForm, { SearchProps, SearchPropsDefault } from '../components/SearchPropsForm'

export const PerCountryPageContext = React.createContext(SearchPropsDefault)

const PerCountryPage = () => {
    const countryData = usePageLoader()
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
    const [searchProps, setSearchProps] = useState<SearchProps>(SearchPropsDefault)

    return (
        <PerCountryPageContext.Provider value={searchProps}>
            <div className="per-country-page mll">
                <h1>Coronavirus - deaths per capita</h1>

                <p className="info-text">
                    The big countries tend to get all the coronavirus media. But there are many small countries that are
                    hit much harder than the big. This graph shows coronavirus cases per country ordered by per million
                    capita.
                </p>

                <p className="info-small mbxs">
                    Using data from <a href="https://ourworldindata.org/coronavirus">ourworldindata.org/coronavirus</a>{' '}
                    and{' '}
                    <a href="https://datahub.io/JohnSnowLabs/population-figures-by-country">datahub.io/JohnSnowLabs</a>.
                    <br />
                    New data from the day before are present every day at 13:00 CET, according to{' '}
                    <a href="https://ourworldindata.org/coronavirus">ourworldindata.org/coronavirus</a>
                </p>

                <Button type="primary" onClick={() => setDrawerVisible(true)}>
                    Change criteria
                </Button>
                <Drawer
                    title="Search details"
                    placement="left"
                    closable={true}
                    onClose={() => setDrawerVisible(false)}
                    visible={drawerVisible}
                >
                    <SearchPropsForm updateSearchProps={setSearchProps} />
                </Drawer>

                <PerCountryTable countryData={countryData} />
            </div>
        </PerCountryPageContext.Provider>
    )
}

export default PerCountryPage
