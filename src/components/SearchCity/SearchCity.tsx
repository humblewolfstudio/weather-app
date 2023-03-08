import './SearchCity.css'

export default function SearchCity() {

    const refreshPage = () => {
        window.location.reload();
    }

    return (
        <div className="search-wrapper">
            <div>Geolocation not enabled</div>
            <button onClick={refreshPage}>Click to refresh page!</button>
            <p>After enabling ubication</p>
        </div>
    )
}