import './ServerError.scss'

export const ServerError = ({loading, error}) => {
    return(
        <>
            {loading && (
                <section className="server-error">
                    <h1>Загрузка</h1>
                </section>
            )}

            {error && (
                <section className="server-error">
                    <h1>Ошибка сервера :(</h1>
                </section>
            )}
        </>
    )
}