'use client'
import { useState, useTransition } from "react"
import { collections, CollectionName, CollectionField } from "@/content/collections"
import { deleteItem, moveItem, saveItem, ActionResult } from "@/app/(dashboard)/admin/actions"
import { buttonClass, FormError, inputClass } from "./ui"
import MediaField from "./MediaField"

export type CollectionItem = { id: number } & Record<string, string | number | null>

type CollectionEditorProps = {
  name: CollectionName,
  locale: string,
  items: CollectionItem[],
}

// Add / edit / reorder / delete for one locale of a list (experience,
// projects, tech stack, services).
const CollectionEditor = ({ name, locale, items }: CollectionEditorProps) => {
  const config = collections[name]
  const [editing, setEditing] = useState<number | 'new' | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const act = (action: () => Promise<ActionResult>, onDone?: () => void) => {
    setError(null)
    startTransition(async () => {
      const result = await action()
      if (result.ok) onDone?.()
      else setError(result.error)
    })
  }

  const groupField = config.groupBy ? config.fields.find((f) => f.name === config.groupBy) : undefined
  const groups = groupField?.options
    ? groupField.options.map((option) => ({ title: option, items: items.filter((i) => i[config.groupBy!] === option) }))
    : [{ title: '', items }]

  const secondary = config.fields.find((f) => f.name !== config.summary && f.type !== 'textarea' && f.name !== config.groupBy)

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm text-fg-muted">{items.length} {items.length === 1 ? config.itemLabel : `${config.itemLabel} entries`}</p>
        <button type="button" className={buttonClass.primary} disabled={pending || editing === 'new'} onClick={() => { setError(null); setEditing('new') }}>
          Add {config.itemLabel}
        </button>
      </div>
      {editing !== 'new' && <FormError error={error} />}

      {editing === 'new' && (
        <ItemForm
          fields={config.fields}
          title={`New ${config.itemLabel}`}
          pending={pending}
          error={error}
          onCancel={() => setEditing(null)}
          onSave={(data) => act(() => saveItem(name, locale, data), () => setEditing(null))}
        />
      )}

      {groups.map((group) => (
        <section key={group.title} className="mb-8">
          {group.title && <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-fg-muted">{group.title}</h2>}
          {group.items.length === 0 && <p className="rounded-md border border-dashed border-border p-4 text-sm text-fg-muted">Nothing here yet.</p>}
          <ol className="space-y-2">
            {group.items.map((item, index) => (
              <li key={item.id}>
                {editing === item.id ? (
                  <ItemForm
                    fields={config.fields}
                    title={`Edit ${config.itemLabel}`}
                    initial={item}
                    pending={pending}
                    error={error}
                    onCancel={() => setEditing(null)}
                    onSave={(data) => act(() => saveItem(name, locale, data, item.id), () => setEditing(null))}
                  />
                ) : (
                  <div className="flex items-center gap-3 rounded-md border border-border bg-surface px-4 py-3">
                    {item.icon && (
                      // eslint-disable-next-line @next/next/no-img-element -- small local icon preview
                      <img src={`/icons/${item.icon}`} alt="" width={24} height={24} className="h-6 w-6 shrink-0" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{item[config.summary]}</p>
                      {secondary && item[secondary.name] && <p className="truncate text-sm text-fg-muted">{item[secondary.name]}</p>}
                    </div>
                    <button type="button" className={buttonClass.icon} aria-label="Move up" disabled={pending || index === 0} onClick={() => act(() => moveItem(name, item.id, -1))}>↑</button>
                    <button type="button" className={buttonClass.icon} aria-label="Move down" disabled={pending || index === group.items.length - 1} onClick={() => act(() => moveItem(name, item.id, 1))}>↓</button>
                    <button type="button" className={buttonClass.secondary} disabled={pending} onClick={() => { setError(null); setEditing(item.id) }}>Edit</button>
                    <button
                      type="button"
                      className={buttonClass.danger}
                      disabled={pending}
                      onClick={() => {
                        if (confirm(`Delete "${item[config.summary]}"? This can't be undone.`)) act(() => deleteItem(name, item.id))
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}

type ItemFormProps = {
  fields: CollectionField[],
  title: string,
  initial?: CollectionItem,
  pending: boolean,
  error: string | null,
  onSave: (data: Record<string, string>) => void,
  onCancel: () => void,
}

const ItemForm = ({ fields, title, initial, pending, error, onSave, onCancel }: ItemFormProps) => (
  <form
    className="mb-4 space-y-4 rounded-md border border-fg bg-surface p-5"
    onSubmit={(e) => {
      e.preventDefault()
      const data = Object.fromEntries(new FormData(e.currentTarget).entries())
      onSave(Object.fromEntries(Object.entries(data).map(([k, v]) => [k, v.toString()])))
    }}
  >
    <h3 className="font-semibold">{title}</h3>
    <div className="grid gap-4 md:grid-cols-2">
      {fields.map((field) => {
        // the media picker has its own buttons, which shouldn't sit inside a <label>
        const Wrapper = field.type === 'media' ? 'div' : 'label'
        return (
          <Wrapper key={field.name} className={`block ${field.type === 'textarea' || field.type === 'media' ? 'md:col-span-2' : ''}`}>
            <span className="mb-1 block text-sm font-medium">
              {field.label}{field.required && <span className="text-fg-muted"> *</span>}
            </span>
            <FieldInput field={field} value={initial?.[field.name]} />
            {field.hint && <span className="mt-1 block text-xs text-fg-muted">{field.hint}</span>}
          </Wrapper>
        )
      })}
    </div>
    <FormError error={error} />
    <div className="flex gap-2">
      <button type="submit" className={buttonClass.primary} disabled={pending}>{pending ? 'Saving…' : 'Save'}</button>
      <button type="button" className={buttonClass.secondary} disabled={pending} onClick={onCancel}>Cancel</button>
    </div>
  </form>
)

const FieldInput = ({ field, value }: { field: CollectionField, value?: string | number | null }) => {
  const defaultValue = value == null ? '' : String(value)
  if (field.type === 'textarea') {
    return <textarea name={field.name} defaultValue={defaultValue} required={field.required} rows={6} className={inputClass} />
  }
  if (field.type === 'media') {
    return <MediaField name={field.name} defaultValue={defaultValue} required={field.required} />
  }
  if (field.type === 'select') {
    return (
      <select name={field.name} defaultValue={defaultValue || field.options?.[0]} required={field.required} className={inputClass}>
        {field.options?.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    )
  }
  return <input name={field.name} type={field.type === 'url' ? 'url' : 'text'} defaultValue={defaultValue} required={field.required} className={inputClass} />
}

export default CollectionEditor
