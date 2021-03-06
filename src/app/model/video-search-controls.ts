export type SortBy = "publishedAt" | "title"

export type FilterDate = "any" | "day" | "week" | "month" | "year"

export interface Controls {
    sortBy: SortBy,
    filterDate: FilterDate,
}