import React, { FC } from 'react'
import { PagContainer } from './styled-component/PagContainer'
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";

interface Props {
  actualPage: number | null | undefined
  totalPage: number | null | undefined
  nextPage: number | null | undefined
  prevPage: number | null | undefined
  getContentFn: (page: number) => Promise<void>
}

const Pagination: FC<Props> = ({actualPage, totalPage, nextPage, prevPage, getContentFn}) => {
  return (
    <PagContainer>
      <button disabled={!prevPage} className='arrow' onClick={ async () => prevPage&& await getContentFn(prevPage as number)}>
        <BiLeftArrow size={20} />
      </button>
      <div className='page_number'>
        <h4>{actualPage}</h4>
        <h4>de</h4>
        <h4>{totalPage}</h4>
      </div>
      <button disabled={!nextPage} className='arrow' onClick={ async () => nextPage&& await getContentFn(nextPage as number)}>
        <BiRightArrow size={20} />
      </button>
    </PagContainer>
  )
}

export default Pagination