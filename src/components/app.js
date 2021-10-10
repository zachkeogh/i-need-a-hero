import React from "react"

export default () => {
  const word = typeof window !== 'undefined' ? 'frontend' : 'backend';
  return <div>{`This is the ${word} app component`}</div>
}