import React from 'react'
import './PerCountryPage.scss'
import { usePageLoader } from './PerCountryPageLoader'
import PerCountryTable from '../components/PerCountryTable'

const PerCountryPage = () => {
    const countryData = usePageLoader()

    return (
        <div className="mll">
            <h1>Corona virus - deaths per capita</h1>

            <p className="info-small">
                Using data from <a href="https://ourworldindata.org/coronavirus">ourworldindata.org/coronavirus</a> and{' '}
                <a href="https://datahub.io/JohnSnowLabs/population-figures-by-country">datahub.io/JohnSnowLabs</a>.
            </p>

            <p className="info-small">
                New data from the day before are present every day at 13:00 CET, according to{' '}
                <a href="https://ourworldindata.org/coronavirus">ourworldindata.org/coronavirus</a>
            </p>

            <PerCountryTable countryData={countryData} />
        </div>
    )
}

export default PerCountryPage
