import React from 'react'

export default function paginate(data) {
  // console.log({ data }, 'pag')
  const itemsPerPage = 10;
  const pages = Math.ceil(data.length / itemsPerPage);
  const newData = Array.from({ length: pages }, (_, index) => {
    const start = index * itemsPerPage;
    return data.slice(start, start + itemsPerPage)
  })
  return newData
}
