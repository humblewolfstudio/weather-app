import './SearchCity.css'
import cities from 'cities.json';
import { useEffect, useState } from 'react';

import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';

var madeList = false;

interface searchCityProps {
    hasCoordinates: boolean,
    setHasCoordinates: Function
}

export default function SearchCity(props: searchCityProps) {
    /*
    const [citiesList, setCitiesList] = useState<Array<string>>([]);

    const searchCity = (cityName: string) => {
        if (cityName == "") return;
        var citySearched = cityName.split("|")[0].replace(/\s/g, '');
        var country = cityName.split("|")[1].replace(/\s/g, '');
        for (var i in cities) {
            //@ts-ignore
            var city = cities[i];
            if (city.name.toLowerCase().includes(citySearched.toLocaleLowerCase()) && city.country == country) {
                localStorage.setItem('cityName', city.name);
                localStorage.setItem('latitude', city.lat);
                localStorage.setItem('longitude', city.lng);
                props.setHasCoordinates(true);
                console.log('coordinates added');
            }
        }
    }

    useEffect(() => {
        if (madeList) return;
        var list = [];
        for (var i in cities) {
            //@ts-ignore
            list.push(cities[i].name + " | " + cities[i].country);
        }
        setCitiesList(list);
        madeList = true;
    })

    */
    return (
        <div className="search-wrapper">
            <div>Geolocation not enabled</div>
        </div>
    ) //<TextInput trigger={""} options={citiesList} onSelect={(e: Event) => { searchCity(e.toString()) }} />
}