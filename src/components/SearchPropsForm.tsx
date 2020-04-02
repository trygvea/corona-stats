import React, { useContext } from 'react'
import { Form, Switch } from 'antd'
import { PerCountryPageContext } from '../pages/PerCountryPage'

export const SearchPropsDefault = {
    ignoreTinyCountries: true,
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
            <Form.Item label="Ignore tiny countries">
                <Switch checked={searchProps.ignoreTinyCountries} onChange={updateProp('ignoreTinyCountries')} />
            </Form.Item>
        </Form>
    )
}

export default SearchPropsForm
