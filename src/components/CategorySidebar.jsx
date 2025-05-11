'use client'

import { useEffect }                    from 'react'
import { useDispatch, useSelector }     from 'react-redux'
import { fetchCategories, toggleCategory } from '../store/categorySlice'

export default function CategorySidebar() {
  const dispatch = useDispatch()
  const { items, selected, status } = useSelector(s => s.categories)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCategories())
  }, [status, dispatch])

  return (
    <aside className="w-64 ml-14 mt-8 bg-[rgba(61,53,42,0.5)] p-4 rounded-lg space-y-2 text-white font-poppins shadow-xl ring-1 ring-yellow-950/50">
      <h2 className="font-semibold text-lg">Categories</h2>
      <ul className="space-y-2">
        {items.map(({ slug, name }) => (
          <li key={slug} className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={slug}
              checked={selected.includes(slug)}
              onChange={() => dispatch(toggleCategory(slug))}
              className="w-[18px] h-[18px] bg-[rgba(43,36,23,1)] border border-white rounded-[5px] accent-orange-500"
            />
            <label htmlFor={slug}>{name}</label>
          </li>
        ))}
      </ul>
    </aside>
  )
}