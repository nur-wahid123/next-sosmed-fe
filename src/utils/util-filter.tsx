import { Input } from "@/components/ui/input";
import { Column, RowData } from "@tanstack/react-table";
import React from "react";
declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select'
  }
}

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }: {
    value: string | number
    onChange: (value: string | number) => void
    debounce?: number
  } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
    const [value, setValue] = React.useState(initialValue)
  
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    React.useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value)
      }, debounce)
  
      return () => clearTimeout(timeout)
    }, [debounce, onChange, value])
  
    return (
      <Input {...props} value={value} onChange={e => setValue(e.target.value)} />
    )
  }

export function Filter({ column }: { column: Column<any, unknown>|undefined }) {
    const columnFilterValue = column?.getFilterValue()
    const { filterVariant } = column?.columnDef.meta ?? {}
  
    return filterVariant === 'range' ? (
      <div>
        <div className="flex space-x-2">
          {/* See faceted column filters example for min max values functionality */}
          <DebouncedInput
            type="number"
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={value =>
              column?.setFilterValue((old: [number, number]) => [value, old?.[1]])
            }
            placeholder={`Min`}
          />
          <DebouncedInput
            type="number"
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={value =>
              column?.setFilterValue((old: [number, number]) => [old?.[0], value])
            }
            placeholder={`Max`}
          />
        </div>
        <div className="h-1" />
      </div>
    ) : filterVariant === 'select' ? (
      <select
        onChange={e => column?.setFilterValue(e.target.value)}
        value={columnFilterValue?.toString()}
      >
        {/* See faceted column filters example for dynamic select options */}
        <option value="">All</option>
        <option value="complicated">complicated</option>
        <option value="relationship">relationship</option>
        <option value="single">single</option>
      </select>
    ) : (
      <DebouncedInput
        onChange={value => column?.setFilterValue(value)}
        placeholder={`Search...`}
        type="text"
        value={(columnFilterValue ?? '') as string}
      />
      // See faceted column filters example for datalist search suggestions
    )
  }
  