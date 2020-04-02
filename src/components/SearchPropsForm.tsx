import React from 'react'
import { Form, Switch } from 'antd'

export type SearchProps = {
    ignoreTinyCountries: boolean
}

export const SearchPropsDefault: SearchProps = {
    ignoreTinyCountries: true,
}

const SearchPropsForm: React.FC<{
    searchProps: SearchProps
    updateSearchProps: (p: SearchProps) => void
}> = ({ searchProps: p, updateSearchProps }) => {
    const updateProp = (prop: keyof SearchProps) => (e: SearchProps[keyof SearchProps]) =>
        updateSearchProps({ ...p, ...{ [prop]: e } })

    return (
        <Form>
            <Form.Item label="Ignore tiny countries">
                <Switch checked={p.ignoreTinyCountries} onChange={updateProp('ignoreTinyCountries')} />
            </Form.Item>
        </Form>
    )
}

export default SearchPropsForm
