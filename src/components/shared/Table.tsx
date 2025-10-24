"use client"

import { type ReactNode, useState, useRef, useEffect } from "react"
import { Edit2, Palette, Trash2 } from "lucide-react"
import Card from "./Card"


interface SelectOption {
  label: string
  value: string
  color: string
  bg: string
}

interface EditingOption {
  value: string
  isEditing: boolean
  showColorPicker: boolean
}

export interface Column<T> {
  header: string
  accessor: keyof T | ((item: T) => ReactNode)
  width?: string
  className?: string
  editable?: boolean
  type?: 'text' | 'select'
  options?: SelectOption[]
  onChange?: (value: string, item: T) => void
  onAddOption?: (value: string) => void
  onEditOption?: (oldValue: string, newValue: string, color: string, bg: string) => void
  onDeleteOption?: (value: string) => void
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  mobileCardContent?: (item: T) => ReactNode
  className?: string
}

function SelectCell<T>({ 
  value, 
  options = [], 
  onChange,
  onAddOption,
  onEditOption,
  onDeleteOption
}: { 
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
  onAddOption?: (value: string) => void
  onEditOption?: (oldValue: string, newValue: string, color: string, bg: string) => void
  onDeleteOption?: (value: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [editingOption, setEditingOption] = useState<{ value: string; isEditing: boolean; showColorPicker: boolean } | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState<{ isOpen: boolean; value: string } | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const editInputRef = useRef<HTMLInputElement>(null)
  const selectedOption = options.find(opt => opt.value === value)

  const colorOptions = [
    { name: "Default", color: "#E2E2E2", bg: "#F5F5F5" },
    { name: "Gray", color: "#909090", bg: "#EAEAEA" },
    { name: "Brown", color: "#A95A2C", bg: "#F4E4DC" },
    { name: "Orange", color: "#FF9D48", bg: "#FFE8D7" },
    { name: "Yellow", color: "#FFD60A", bg: "#FFF4CC" },
    { name: "Green", color: "#4DAB9A", bg: "#DCF5F0" },
    { name: "Blue", color: "#529CCA", bg: "#E4F0F7" },
    { name: "Purple", color: "#9A6DD7", bg: "#EEE4F7" },
    { name: "Pink", color: "#E255A1", bg: "#FCE4F0" },
    { name: "Red", color: "#FF6369", bg: "#FFE6E6" }
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredOptions = options.filter(opt => 
    opt.label.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleAddOption = () => {
    if (searchValue && onAddOption) {
      onAddOption(searchValue)
      setSearchValue("")
      inputRef.current?.focus()
    }
  }

  const closeDropdown = () => {
    setIsOpen(false)
    setSearchValue("")
    setEditingOption(null)
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDropdown()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left px-2 py-1 -mx-2 rounded hover:bg-[var(--surface)] transition-colors min-w-[120px] flex items-center gap-2"
        >
          {selectedOption ? (
            <span 
              className="inline-flex items-center px-2 py-0.5 rounded text-sm"
              style={{ 
                backgroundColor: selectedOption.bg || 'var(--surface)',
                color: selectedOption.color || 'var(--text-primary)',
                border: selectedOption.color ? `1px solid ${selectedOption.color}` : '1px solid var(--border)'
              }}
            >
              {selectedOption.label}
            </span>
          ) : (
            <span className="text-[var(--text-secondary)]">Select an option...</span>
          )}
        </button>
      </div>

      {isOpen && (
        <div 
          className="fixed z-50 w-[200px] bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg"
          style={{
            top: dropdownRef.current ? `${dropdownRef.current.getBoundingClientRect().bottom + 4}px` : 0,
            left: dropdownRef.current ? `${dropdownRef.current.getBoundingClientRect().left}px` : 0,
          }}
        >
          <div className="p-1">
            <form onSubmit={(e) => {
              e.preventDefault();
              if (searchValue && onAddOption) {
                handleAddOption();
              }
            }}>
              <input
                ref={inputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search or add new..."
                className="w-full px-2 py-1.5 bg-[var(--surface)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] border border-[var(--border)] rounded focus:outline-none focus:border-[var(--primary)] text-sm"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    closeDropdown();
                  }
                }}
                autoFocus
              />
            </form>
          </div>
          <div className="max-h-[240px] overflow-y-auto py-1 px-1">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`group flex items-center justify-between px-3 py-1.5 hover:bg-[var(--surface)] transition-colors ${
                  value === option.value ? 'bg-[var(--surface)]' : ''
                }`}
              >
                {editingOption?.value === option.value && editingOption.isEditing ? (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (editInputRef.current?.value && onEditOption) {
                      onEditOption(option.value, editInputRef.current.value, option.color || '', option.bg || '');
                      setEditingOption(null);
                    }
                  }}>
                    <input
                      ref={editInputRef}
                      defaultValue={option.label}
                      className="w-full px-2 py-1 bg-[var(--background)] border border-[var(--primary)] rounded text-sm focus:outline-none"
                      autoFocus
                      onClick={(e) => e.stopPropagation()}
                    />
                  </form>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        onChange(option.value);
                        closeDropdown();
                      }}
                      className="flex-1 text-left"
                    >
                      <div 
                        className="inline-flex items-center px-2 py-0.5 rounded text-sm"
                        style={{ 
                          backgroundColor: option.bg || 'var(--surface)',
                          color: option.color || 'var(--text-primary)',
                          border: option.color ? `1px solid ${option.color}` : '1px solid var(--border)'
                        }}
                      >
                        {editingOption?.value === option.value && editingOption.isEditing ? (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (editInputRef.current?.value && onEditOption) {
                                onEditOption(option.value, editInputRef.current.value, option.color, option.bg);
                                setEditingOption(null);
                              }
                            }}
                          >
                            <input
                              ref={editInputRef}
                              defaultValue={option.label}
                              className="w-full px-2 py-1 bg-[var(--background)] border border-[var(--primary)] rounded text-sm focus:outline-none"
                              autoFocus
                              onClick={(e) => e.stopPropagation()}
                              onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                  setEditingOption(null);
                                }
                              }}
                              onBlur={() => {
                                if (editInputRef.current?.value && onEditOption) {
                                  onEditOption(option.value, editInputRef.current.value, option.color, option.bg);
                                  setEditingOption(null);
                                }
                              }}
                            />
                          </form>
                        ) : (
                          option.label
                        )}
                      </div>
                    </button>
                    
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {editingOption?.value === option.value && editingOption.showColorPicker ? (
                        <div className="absolute right-full mr-2 p-2 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg w-[200px] z-50">
                          <div className="text-sm font-medium mb-2 text-[var(--text-primary)]">Colors</div>
                          <div className="space-y-1">
                            {colorOptions.map((colorOpt) => (
                              <button
                                key={colorOpt.name}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onEditOption) {
                                    onEditOption(option.value, option.label, colorOpt.color, colorOpt.bg);
                                    setEditingOption(null);
                                  }
                                }}
                                className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-[var(--surface)] rounded-md text-sm"
                              >
                                <span className="w-4 h-4 rounded" style={{ backgroundColor: colorOpt.bg, border: `1px solid ${colorOpt.color}` }} />
                                <span>{colorOpt.name}</span>
                                {option.color === colorOpt.color && (
                                  <span className="ml-auto text-[var(--primary)]">✓</span>
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : null}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingOption({ value: option.value, isEditing: false, showColorPicker: true });
                        }}
                        className="p-1 hover:bg-[var(--border)] rounded"
                      >
                        <Palette size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingOption({ value: option.value, isEditing: true, showColorPicker: false });
                        }}
                        className="p-1 hover:bg-[var(--border)] rounded"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteConfirmation({
                            isOpen: true,
                            value: option.value
                          });
                        }}
                        className="p-1 hover:bg-red-100 rounded text-red-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
            {searchValue && !filteredOptions.length && onAddOption && (
              <button
                onClick={handleAddOption}
                className="w-full text-left px-3 py-1.5 hover:bg-[var(--surface)] transition-colors rounded-md text-[var(--primary)]"
              >
                + Add "{searchValue}"
              </button>
            )}
            {!searchValue && !filteredOptions.length && (
              <div className="px-3 py-1.5 text-[var(--text-secondary)] text-sm">
                No options found
              </div>
            )}
          </div>
        </div>
      )}

      {deleteConfirmation?.isOpen && (() => {
        if (window.confirm("Are you sure you want to delete this option? This action cannot be undone.")) {
          onDeleteOption?.(deleteConfirmation.value);
        }
        setDeleteConfirmation(null);
        return null;
      })()}
    </div>
  )
}

export default function Table<T extends { id: string }>({ 
  data, 
  columns,
  mobileCardContent,
  className = ""
}: TableProps<T>) {
  const [focusedCell, setFocusedCell] = useState<string | null>(null)

  return (
    <div className={`bg-[var(--background)] rounded-lg border border-[var(--border)] ${className}`}>
      {/* Desktop view */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {columns.map((column, index) => (
                <th
                  key={index}
                  className={`text-left py-2.5 px-4 text-sm font-medium text-[var(--text-secondary)] bg-[var(--surface)] transition-colors duration-200 first:rounded-tl-lg last:rounded-tr-lg ${
                    column.width || ""
                  } ${column.className || ""}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr 
                key={item.id} 
                className="border-b border-[var(--border)] hover:bg-[var(--surface)] transition-all duration-200 group"
              >
                {columns.map((column, index) => (
                  <td
                    key={index}
                    className={`py-2.5 px-4 transition-all duration-200 ${column.className || ""}`}
                  >
                    {column.editable && typeof column.accessor === "string" ? (
                      column.type === 'select' ? (
                        <SelectCell
                          value={item[column.accessor] as string}
                          options={column.options || []}
                          onChange={(value) => column.onChange?.(value, item)}
                          onAddOption={column.onAddOption}
                        />
                      ) : (
                        <div className="relative">
                          <input
                            type="text"
                            value={item[column.accessor] as string}
                            onChange={(e) => column.onChange?.(e.target.value, item)}
                            onFocus={() => setFocusedCell(`${item.id}-${String(column.accessor)}`)}
                            onBlur={() => setFocusedCell(null)}
                            className="w-full bg-transparent border-none focus:outline-none hover:bg-[var(--hover)] focus:bg-[var(--surface)] rounded-md px-2 py-1.5 -mx-2 text-[var(--text-primary)] transition-all duration-200"
                          />
                          {focusedCell === `${item.id}-${String(column.accessor)}` && (
                            <div className="absolute inset-0 pointer-events-none">
                              <div className="absolute -inset-px border border-[var(--primary)] rounded opacity-50" />
                            </div>
                          )}
                        </div>
                      )
                    ) : (
                      <div className="px-2 py-1.5 -mx-2 rounded-md transition-all duration-200 group-hover:bg-[var(--hover)]">
                        {typeof column.accessor === "function"
                          ? column.accessor(item)
                          : item[column.accessor] as ReactNode}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view */}
      {mobileCardContent && (
        <div className="md:hidden p-4 space-y-4">
          {data.map((item) => mobileCardContent(item))}
        </div>
      )}
    </div>
  )
}
