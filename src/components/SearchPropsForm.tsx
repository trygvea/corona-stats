import React, { useContext } from 'react'
import { Button, Form, Slider, Switch } from 'antd'
import { PerCountryPageContext } from '../pages/PerCountryPage'

export const SearchPropsDefault = {
    showWorldFirst: false,
    hideTinyCountries: true,
    showDeathsNew: true,
    showDeathsTotal: true,
    showCasesNew: false,
    showCasesTotal: false,
    numHistoryDays: 30,
}

export type SearchProps = typeof SearchPropsDefault

const SearchPropsForm: React.FC<{
    updateSearchProps: (p: SearchProps) => void
    onCloseDrawer?: () => void
}> = ({ updateSearchProps, onCloseDrawer = () => {} }) => {
    const searchProps = useContext(PerCountryPageContext)

    const updateProp = (prop: keyof SearchProps) => (value: SearchProps[keyof SearchProps] | [number, number]): void =>
        updateSearchProps({ ...searchProps, [prop]: value })

    return (
        <Form>
            <Form.Item label="Show world first">
                <Switch checked={searchProps.showWorldFirst} onChange={updateProp('showWorldFirst')} />
            </Form.Item>
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
            <Form.Item label="Days of history">
                <Slider min={1} max={60} value={searchProps.numHistoryDays} onChange={updateProp('numHistoryDays')} />
            </Form.Item>
            <Button type="primary" onClick={onCloseDrawer}>
                Close
            </Button>
        </Form>
    )
}

export default SearchPropsForm
