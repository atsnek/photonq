export type SearchIndex = Record<
  string,
  {
    id: string
    type?: string
    title: string
    data: Record<string, string>
  }
>
