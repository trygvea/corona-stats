import React, { useContext } from 'react'
import { Form, Switch } from 'antd'
import { PerCountryPageContext } from '../pages/PerCountryPage'

export const SearchPropsDefault = {
    hideTinyCountries: false,
    showDeathsNew: true,
    showDeathsTotal: true,
    showCasesNew: false,
    showCasesTotal: false,
}

export type SearchProps = typeof SearchPropsDefault

const SearchPropsForm: React.FC<{
    updateSearchProps: (p: SearchProps) => void
    onCloseDrawer?: () => void
}> = ({ updateSearchProps, onCloseDrawer = () => {} }) => {
    const searchProps = useContext(PerCountryPageContext)
    const updateProp = (prop: keyof SearchProps) => (e: SearchProps[keyof SearchProps]) => {
        onCloseDrawer()
        updateSearchProps({ ...searchProps, ...{ [prop]: e } })
    }

    return (
        <Form>
            <Form.Item label="Hide tiny countries">
                <Switch checked={searchProps.hideTinyCountries} onChange={updateProp('hideTinyCountries')} />
            </Form.Item>
            <Form.Item label="Show new deaths">
                <Switch checked={searchProps.showDeathsNew} onChange={updateProp('showDeathsNew')} />
            </Form.Item>
            <Form.Item label="Show total deaths">
                <Switch checked={searchProps.showDeathsTotal} onChange={updateProp('showDeathsTotal')} />
            </Form.Item>
            <Form.Item label="Show new cases">
                <Switch checked={searchProps.showCasesNew} onChange={updateProp('showCasesNew')} />
            </Form.Item>
            <Form.Item label="Show total cases">
                <Switch checked={searchProps.showCasesTotal} onChange={updateProp('showCasesTotal')} />
            </Form.Item>
        </Form>
    )
}

export default SearchPropsForm
