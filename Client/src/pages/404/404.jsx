import { useTitle } from "../../providers/TitleContext"

const notFound = () => {

  useTitle("404")

  return (
    <h1  style={{ color: 'white' }}>Not Found 404 :(</h1>
  )
}

export default notFound