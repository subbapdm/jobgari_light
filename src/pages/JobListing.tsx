import Container from '@/components/Container'
import FiltersSidebar from '@/components/jobs/FiltersSidebar'
import { useJobFilters } from '@/hooks/useJobFilters'

const JobListing = () => {
   const { filters, setFilter, clearAllFilters } = useJobFilters();

   return (
      <Container>
         <div className='flex gap-6'>
            <FiltersSidebar 
               filters={filters} 
               setFilter={setFilter}
               clearAllFilters={clearAllFilters}
            />
            <div className='flex-1 bg-white p-4'>
               <div>
                  <p className='text-sm text-gray-400'>223 total results found</p>
               </div>
            </div>
         </div>
      </Container>
   )
}

export default JobListing