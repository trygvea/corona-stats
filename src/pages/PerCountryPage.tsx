import React, { useState } from 'react'
import './PerCountryPage.scss'
import { usePageLoader } from './PerCountryPageLoader'
import PerCountryTable from '../components/PerCountryTable'
import { Button, Drawer } from 'antd'
import SearchPropsForm, { SearchProps, SearchPropsDefault } from '../components/SearchPropsForm'
import { last } from '../utils/array-util'

export const PerCountryPageContext = React.createContext(SearchPropsDefault)

const PerCountryPage = () => {
    const countryData = usePageLoader()
    const [drawerVisible, setDrawerVisible] = useState<boolean>(false)
    const [searchProps, setSearchProps] = useState<SearchProps>(SearchPropsDefault)

    const lastLoaded = countryData.length > 0 && last(countryData[0].deaths.values)?.date

    const onCloseDrawer = () => setDrawerVisible(false)

    return (
        <PerCountryPageContext.Provider value={searchProps}>
            <div className="per-country-page-header pll">
                <h1 className="mbs">Coronavirus - deaths per capita</h1>
                <div className="github-source mam">
                    <a href="https://github.com/trygvea/corona-stats" target="_blank" rel="noopener noreferrer">
                        Source on <img src="/corona-stats/GitHub-Mark-32px.png" height={24} alt="github"></img>
                        <img src="/corona-stats/GitHub_Logo.png" height={24} alt="github"></img>
                    </a>
                </div>
            </div>

            <div className="per-country-page mll mtm">
                <p className="info-text">
                    There are many small countries that are hit much harder than the big countries. This graph shows
                    coronavirus cases per country ordered per capita.
                </p>

                <p className="info-small mbxs">
                    Using data from{' '}
                    <a href="https://ourworldindata.org/coronavirus-source-data">
                        ourworldindata.org/coronavirus-source-data
                    </a>{' '}
                    and{' '}
                    <a href="https://datahub.io/JohnSnowLabs/population-figures-by-country">datahub.io/JohnSnowLabs</a>.
                    <br />
                    New data from the day before are present every day at 13:00 CET, according to{' '}
                    <a href="https://ourworldindata.org/coronavirus">ourworldindata.org/coronavirus</a>
                    <br />
                    {lastLoaded && `This data was loaded ${lastLoaded}`}
                </p>

                <Button type="primary" onClick={() => setDrawerVisible(true)}>
                    Configure
                </Button>
                <Drawer
                    title="Search details"
                    placement="left"
                    closable={true}
                    onClose={onCloseDrawer}
                    visible={drawerVisible}
                    width={300}
                >
                    <SearchPropsForm updateSearchProps={setSearchProps} onCloseDrawer={onCloseDrawer} />
                </Drawer>

                <PerCountryTable countryData={countryData} />
            </div>
        </PerCountryPageContext.Provider>
    )
}

export default PerCountryPage
