import React, { useContext } from 'react'
import { Form, Switch } from 'antd'
import { PerCountryPageContext } from '../pages/PerCountryPage'

export const SearchPropsDefault = {
    hideTinyCountries: false,
    showDeathsNew: true,
    showDeathsTotal: false,
}

export type SearchProps = typeof SearchPropsDefault

const SearchPropsForm: React.FC<{
    updateSearchProps: (p: SearchProps) => void
}> = ({ updateSearchProps }) => {
    const searchProps = useContext(PerCountryPageContext)
    const updateProp = (prop: keyof SearchProps) => (e: SearchProps[keyof SearchProps]) =>
        updateSearchProps({ ...searchProps, ...{ [prop]: e } })

    return (
        <Form>
            <Form.Item label="Hide tiny countries">
                <Switch checked={searchProps.hideTinyCountries} onChange={updateProp('hideTinyCountries')} />
            </Form.Item>
            <Form.Item label="Show new deaths per day">
                <Switch checked={searchProps.showDeathsNew} onChange={updateProp('showDeathsNew')} />
            </Form.Item>
            <Form.Item label="Show total deaths per day">
                <Switch checked={searchProps.showDeathsTotal} onChange={updateProp('showDeathsTotal')} />
            </Form.Item>
        </Form>
    )
}

export default SearchPropsForm
