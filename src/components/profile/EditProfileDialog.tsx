"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { Settings, X, Loader2 } from "lucide-react"
import { updateProfile } from "@/app/profile/actions"

/* ---------------------------------------------------------------------------
   EditProfileDialog — a self-contained modal for editing the profile fields.
   Submits the form to the updateProfile server action; on success it closes and
   the revalidated server data flows back into the page. No external UI deps.
--------------------------------------------------------------------------- */

export interface ProfileValues {
  name: string
  image: string
  bio: string
  location: string
  githubHandle: string
  website: string
}

export function EditProfileDialog({ initial }: { initial: ProfileValues }) {
  const [open, setOpen] = React.useState(false)
  const [pending, startTransition] = React.useTransition()
  const [error, setError] = React.useState<string | null>(null)
  // Portal target is only available in the browser; gate the portal on mount
  // so server render and first client render agree.
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  // Lock body scroll + close on Escape while the modal is open.
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setError(null)
    startTransition(async () => {
      const res = await updateProfile(formData)
      if (res.ok) {
        setOpen(false)
      } else {
        setError(res.error)
      }
    })
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 self-start rounded-full border border-border/70 bg-secondary/40 px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground sm:self-auto"
      >
        <Settings size={13} /> Edit profile
      </button>

      {open && mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] grid place-items-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Edit profile"
          >
          {/* backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          <form
            onSubmit={onSubmit}
            className="relative z-10 w-full max-w-lg rounded-2xl border border-border/70 bg-card p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-foreground">
                Edit profile
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <Field label="Display name" htmlFor="name">
                <input
                  id="name"
                  name="name"
                  defaultValue={initial.name}
                  maxLength={60}
                  placeholder="Ada Lovelace"
                  className={inputClass}
                />
              </Field>

              <Field label="Avatar URL" htmlFor="image">
                <input
                  id="image"
                  name="image"
                  type="url"
                  defaultValue={initial.image}
                  placeholder="https://…/avatar.png"
                  className={inputClass}
                />
              </Field>

              <Field label="Bio" htmlFor="bio">
                <textarea
                  id="bio"
                  name="bio"
                  defaultValue={initial.bio}
                  maxLength={280}
                  rows={3}
                  placeholder="A line about you."
                  className={`${inputClass} resize-none`}
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Location" htmlFor="location">
                  <input
                    id="location"
                    name="location"
                    defaultValue={initial.location}
                    maxLength={80}
                    placeholder="London, UK"
                    className={inputClass}
                  />
                </Field>
                <Field label="GitHub handle" htmlFor="githubHandle">
                  <input
                    id="githubHandle"
                    name="githubHandle"
                    defaultValue={initial.githubHandle}
                    maxLength={39}
                    placeholder="octocat"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Website" htmlFor="website">
                <input
                  id="website"
                  name="website"
                  type="url"
                  defaultValue={initial.website}
                  placeholder="https://your.site"
                  className={inputClass}
                />
              </Field>
            </div>

            {error && (
              <p className="mt-4 rounded-lg border border-hard/40 bg-hard/10 px-3 py-2 text-sm text-hard">
                {error}
              </p>
            )}

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={pending}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {pending && <Loader2 size={14} className="animate-spin" />}
                Save changes
              </button>
            </div>
          </form>
        </div>,
          document.body
        )}
    </>
  )
}

const inputClass =
  "w-full rounded-lg border border-border/70 bg-secondary/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-primary/60"

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  )
}
